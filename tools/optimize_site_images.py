"""Create responsive WebP derivatives and add intrinsic image metadata to site HTML."""

from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
GALLERY = ROOT / "assets" / "img" / "gallery"
RASTER_EXTENSIONS = {".jpg", ".jpeg", ".png"}


def optimize_gallery() -> None:
    for source in GALLERY.iterdir():
        if source.suffix.lower() not in RASTER_EXTENSIONS or re.search(r"-(640|1280)\.webp$", source.name):
            continue
        with Image.open(source) as opened:
            original = ImageOps.exif_transpose(opened)
            if original.mode not in {"RGB", "RGBA"}:
                original = original.convert("RGBA" if "transparency" in original.info else "RGB")
            for width in (640, 1280):
                resized = original.copy()
                resized.thumbnail((width, width * 2), Image.Resampling.LANCZOS)
                destination = source.with_name(f"{source.stem}-{width}.webp")
                resized.save(destination, "WEBP", quality=82, method=6)


def dimensions_for(relative_source: str) -> tuple[int, int] | None:
    path = ROOT / relative_source.split("?", 1)[0].lstrip("/")
    if path.suffix.lower() not in RASTER_EXTENSIONS or not path.exists():
        return None
    with Image.open(path) as image:
        return image.size


def update_html() -> None:
    image_pattern = re.compile(r'<img\s+([^>]*?)src="([^"]+)"([^>]*)>', re.IGNORECASE)

    def enrich(match: re.Match[str]) -> str:
        before, source, after = match.groups()
        attributes = f"{before}src=\"{source}\"{after}"
        dimensions = dimensions_for(source) if source.startswith(("assets/", "/assets/")) else None
        additions: list[str] = []
        if dimensions and not re.search(r"\bwidth=", attributes, re.IGNORECASE):
            additions.extend((f'width="{dimensions[0]}"', f'height="{dimensions[1]}"'))
        source_path = Path(source)
        source_exists = (ROOT / source.lstrip("/")).exists()
        if source_exists and "assets/img/gallery/" in source and source_path.suffix.lower() in RASTER_EXTENSIONS and not re.search(r"\bsrcset=", attributes, re.IGNORECASE):
            stem_path = source[: -len(source_path.suffix)]
            additions.append(f'srcset="{stem_path}-640.webp 640w, {stem_path}-1280.webp 1280w"')
            additions.append('sizes="(max-width: 575px) calc(100vw - 28px), (max-width: 991px) 50vw, 33vw"')
        suffix = (" " + " ".join(additions)) if additions else ""
        clean_after = re.sub(r"\s*/\s*$", "", after)
        return f'<img {before}src="{source}"{clean_after}{suffix}>'

    for html_path in ROOT.glob("*.html"):
        original = html_path.read_text(encoding="utf-8")
        updated = image_pattern.sub(enrich, original)
        updated = updated.replace(" / width=", " width=")
        updated = updated.replace(" / srcset=", " srcset=")
        if updated != original:
            html_path.write_text(updated, encoding="utf-8", newline="")


if __name__ == "__main__":
    optimize_gallery()
    update_html()
