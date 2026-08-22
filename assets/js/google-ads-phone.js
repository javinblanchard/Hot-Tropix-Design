(function () {
  var businessNumberDigits = "6145821971";
  var businessNumberPattern = /(\+?1[\s.-]?)?\(?614\)?[\s.-]*582[\s.-]*1971/g;
  var businessNumberMatch = /(\+?1[\s.-]?)?\(?614\)?[\s.-]*582[\s.-]*1971/;

  function normalizeDigits(value) {
    return (value || "").replace(/\D/g, "");
  }

  function replaceVisibleNumbers(formattedNumber) {
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          var parent = node.parentElement;
          if (!parent || /^(SCRIPT|STYLE|NOSCRIPT)$/i.test(parent.tagName)) {
            return NodeFilter.FILTER_REJECT;
          }

          return businessNumberMatch.test(node.nodeValue)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        }
      }
    );

    var nodes = [];
    var node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }

    nodes.forEach(function (textNode) {
      textNode.nodeValue = textNode.nodeValue.replace(businessNumberPattern, formattedNumber);
    });
  }

  function replaceCallableNumbers(mobileNumber) {
    if (!mobileNumber) return;

    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      var hrefDigits = normalizeDigits(link.getAttribute("href"));
      if (hrefDigits.slice(-10) === businessNumberDigits) {
        link.setAttribute("href", "tel:" + mobileNumber);
      }
    });
  }

  function applyGoogleForwardingNumber(formattedNumber, mobileNumber) {
    if (!formattedNumber) return;

    if (!document.body) {
      document.addEventListener(
        "DOMContentLoaded",
        function () {
          applyGoogleForwardingNumber(formattedNumber, mobileNumber);
        },
        { once: true }
      );
      return;
    }

    replaceVisibleNumbers(formattedNumber);
    replaceCallableNumbers(mobileNumber || normalizeDigits(formattedNumber));
  }

  if (typeof gtag === "function") {
    gtag("config", "AW-18403630469/nWKiCLoR4uUcEIW7xMdE", {
      phone_conversion_number: "(614) 582-1971",
      phone_conversion_callback: applyGoogleForwardingNumber
    });
  }
})();
