(function ($) {
  ("use strict");

  /*
|--------------------------------------------------------------------------
| Template Name: CRAS
| Author: Thememarch
| Version: 1.0.0
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
| TABLE OF CONTENTS:
|--------------------------------------------------------------------------
| 1. Preloader
| 2. Mobile Menu
| 3. Sticky Header
| 4. Dynamic Background
| 5. Slick Slider
| 6. Modal Video
| 7. Scroll Up
| 8. Hover text Animation
| 9. Pagination 
| 10. Company Tab
| 11. Accordion
| 12. Sticky Content
| 13. Comming Soon Counter
| 14. Light Gallery
| 15. Counter

    /*--------------------------------------------------------------
    Scripts initialization
--------------------------------------------------------------*/

  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    $(window).trigger("scroll");
    $(window).trigger("resize");
    preloader();
  });

  $(function () {
    // Initialize reveal effects as soon as the document is ready. Waiting for
    // every image to finish loading can leave AOS content invisible for seconds.
    if (typeof AOS !== "undefined") {
      AOS.init();
    }
    $(window).trigger("resize");
    mainNav();
    stickyHeader();
    dynamicBackground();
    swiperInit();
    modalVideo();
    scrollUp();
    textAnimation();
  });

  $(window).on("scroll", function () {
    showScrollUp();
  });

  /*-------------------------------------------------
      1. preloader  
 --------------------------------------------------------------*/

  function preloader() {
    setTimeout(function () {
      $("#preloader").addClass("loaded");
      if ($("#preloader").hasClass("loaded")) {
        $("#preloader")
          .delay(850)
          .queue(function () {
            $(this).remove();
          })
          .fadeOut();
      }
    }, 200);
  }

  /*--------------------------------------------------------------
     2. Mobile  Menu  
 -----------------------------------------------------------------*/
function mainNav() {
  // Add hamburger toggle
  $(".ak-nav").append('<button type="button" class="ak-munu_toggle" aria-label="Open navigation menu" aria-expanded="false"><span></span></button>');

  // Add dropdown toggles
  $(".menu-item-has-children").append(
    '<button type="button" class="ak-munu_dropdown_toggle" aria-label="Show services" aria-expanded="false"></button>'
  );

  function closeMobileMenu() {
    $(".ak-nav_list").slideUp();
    $(".ak-munu_toggle")
      .removeClass("ak-toggle_active")
      .attr({"aria-expanded":"false","aria-label":"Open navigation menu"});
    $(".ak-munu_dropdown_toggle")
      .removeClass("active")
      .attr({"aria-expanded":"false","aria-label":"Show services"});
    $(".menu-item-has-children").removeClass("active").children("ul").hide();
    $("body").removeClass("ht-menu-open");
  }

  // ================================
  // Mobile menu toggle (hamburger)
  // ================================
  $(".ak-munu_toggle").on("click", function () {
    const isOpen = $(this).toggleClass("ak-toggle_active").hasClass("ak-toggle_active");
    $(this).attr("aria-expanded", isOpen ? "true" : "false");
    $(this).attr("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    $(this).siblings(".ak-nav_list").slideToggle();
    $("body").toggleClass("ht-menu-open", isOpen);
  });

  // ================================
  // ✅ CLOSE MENU AFTER LINK CLICK (NEW)
  // ================================
  $(".ak-nav_list > li:not(.menu-item-has-children) > a, .ak-nav_list .menu-item-has-children ul a").on("click", function () {
    if (window.matchMedia("(max-width: 1199.98px)").matches) {
      closeMobileMenu();
    }
  });

  // ================================
  // Dropdown menu toggle
  // ================================
  $(".ak-munu_dropdown_toggle").on("click", function () {
    const isOpen = $(this).toggleClass("active").hasClass("active");
    $(this).attr("aria-expanded", isOpen ? "true" : "false");
    $(this).attr("aria-label", isOpen ? "Hide services" : "Show services");
    $(this).siblings("ul").slideToggle();
    $(this).parent().toggleClass("active", isOpen);
  });

  // Extra dropdown section
  $(".menu-item-has-black-section").append(
    '<span class="ak-munu_dropdown_toggle_1"></span>'
  );

  $(".ak-munu_dropdown_toggle_1").on("click", function () {
    $(this).toggleClass("active").siblings("ul").slideToggle();
    $(this).parent().toggleClass("active");
  });

  // Dark mode toggle
  $(".ak-mode_btn").on("click", function () {
    $(this).toggleClass("active");
    $("body").toggleClass("ak-dark");
  });

  // ================================
  // Side header (unchanged)
  // ================================
  $(".ak-icon_btn").on("click", function () {
    $(".ak-side_header").addClass("active");
  });

  $(".ak-close, .ak-side_header_overlay").on("click", function () {
    $(".ak-side_header").removeClass("active");
  });

  // ================================
  // Menu text animation (unchanged)
  // ================================
  $(".ak-animo_links > li > a").each(function () {
    let xxx = $(this).html().split("").join("</span><span>");
    $(this).html(`<span class="ak-animo_text"><span>${xxx}</span></span>`);
  });
}


  /*--------------------------------------------------------------
     3. Sticky Header
--------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $(".ak-sticky_header");
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass("ak-gescout_sticky");
      } else {
        $header.removeClass("ak-gescout_sticky");
        $header.removeClass("ak-gescout_show");
      }

      if ($header.hasClass("ak-gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $header.addClass("ak-gescout_show");
        } else {
          $header.removeClass("ak-gescout_show");
        }
      }

      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
     4. Dynamic Background
-------------------------------------------------------------*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }

  /*--------------------------------------------------------------    
     5. Slick Slider
 --------------------------------------------------------------*/

  function swiperInit() {
    if ($.exists(".ak-slider-hero-1")) {
      var swiperOptions = {
        loop: true,
        speed: 1200,
        parallax: true,
        zoom: {
          maxRatio: 5,
        },
        autoplay: {
          delay: 6500,
          disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        slidesPerView: "auto",
        pagination: {
          el: ".hero-swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<p class="' + className + '">' + (index + 1) + "</p>";
          },
        },
        navigation: {
          nextEl: ".ak-swiper-button-prev",
          prevEl: ".ak-swiper-button-next",
        },
      };

      var swiper = new Swiper(".ak-slider-hero-1", swiperOptions);
    }

    if ($.exists(".ak-slider-hero-three")) {
      var swiperOptions = {
        loop: $(".ak-slider-hero-three .swiper-slide").length > 1,
        speed: 1200,
        parallax: true,
        zoom: {
          maxRatio: 5,
        },
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".ak-swiper-button-prev.slider-three",
          prevEl: ".ak-swiper-button-next.slider-three",
        },
      };

      var swiper = new Swiper(".ak-slider-hero-three", swiperOptions);
    }

    if ($.exists(".ak-slider-hero-two-1")) {
      var swiperOptions = {
        loop: true,
        speed: 1200,
        parallax: true,
        zoom: {
          maxRatio: 5,
        },
        watchSlidesProgress: true,
      };

      var swiper = new Swiper(".ak-slider-hero-two-1", swiperOptions);
    }

    if ($.exists(".ak-slider-testimonal")) {
      var swiper = new Swiper(".ak-slider-testimonal", {
        loop: true,
        speed: 800,
        effect: "fade",
        autoplay: false,
        slidesPerView: "auto",
        pagination: {
          el: ".ak-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".testimonal-prev",
          prevEl: ".testimonal-next",
        },
      });
    }

    if ($.exists(".ak-trusted-client-slider")) {
      var swiper = new Swiper(".ak-trusted-client-slider", {
        loop: true,
        speed: 1000,
        autoplay: true,
        slidesPerView: "auto",
        pagination: {
          el: ".ak-pagination-2",
          clickable: true,
        },
      });
    }
    if ($.exists(".team-single-page-slider")) {
      var swiper = new Swiper(".team-single-page-slider", {
        loop: true,
        speed: 1000,
        autoplay: true,
        slidesPerView: "auto",
        effect: "coverflow",
        spaceBetween: "12%",
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        },
        keyboard: {
          enabled: true,
        },
        navigation: {
          nextEl: ".button-next",
          prevEl: ".button-prev",
        },
      });
    }

    if ($.exists(".ak-pricing-slider")) {
      var swiper = new Swiper(".ak-pricing-slider", {
        loop: true,
        speed: 1000,
        autoplay: true,
        slidesPerView: "auto",
        centeredSlides: true,
        pagination: {
          clickable: true,
        },
      });
      // Stop autoplay on mouse enter
      $(".ak-pricing-slider").on("mouseenter", function () {
        swiper.autoplay.stop();
      });

      // Start autoplay on mouse leave
      $(".ak-pricing-slider").on("mouseleave", function () {
        swiper.autoplay.start();
      });
    }
  }

  /*--------------------------------------------------------------
     6. Modal Video
 --------------------------------------------------------------*/
  function modalVideo() {
    $(document).on("click", ".ak-video-open", function (e) {
      e.preventDefault();
      var video = $(this).attr("href");
      video = video.split("?v=")[1].trim();
      $(".ak-video-popup-container iframe").attr(
        "src",
        `https://www.youtube.com/embed/${video}`
      );
      $(".ak-video-popup").addClass("active");
    });
    $(".ak-video-popup-close, .ak-video-popup-layer").on("click", function (e) {
      $(".ak-video-popup").removeClass("active");
      $("html").removeClass("overflow-hidden");
      $(".ak-video-popup-container iframe").attr("src", "about:blank");
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
     7. Scroll Up
--------------------------------------------------------------*/
  function scrollUp() {
    const $scrollUp = $(".ak-scrollup").attr({
      role: "button",
      tabindex: "0",
      "aria-label": "Scroll to top"
    });
    $scrollUp.on("click keydown", function (e) {
      if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        0
      );
    });
  }
  // For Scroll Up
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $(".ak-scrollup").addClass("ak-scrollup-show");
    } else {
      $(".ak-scrollup").removeClass("ak-scrollup-show");
    }
  }

  /*--------------------------------------------------------------
   8. Hover text Animation
--------------------------------------------------------------*/
  function textAnimation() {
    if ($.exists(".text-hover-animaiton")) {
      const $textAnimationElements = $(".text-hover-animaiton").not(
        ".ak-nav_list .text-hover-animaiton, .ht-footer-panel .text-hover-animaiton"
      );
      if ($textAnimationElements.length > 0) {
        $textAnimationElements.each((index, element) => {
          const $element = $(element);
          const isBlackText = $element.hasClass("black");
          const isWhiteText = $element.hasClass("white");
          const splitType = "words chars";

          const textColorClass = isBlackText
            ? "menu-text black"
            : isWhiteText
            ? "menu-text white"
            : "menu-text";

          new SplitText(element, {
            type: splitType,
            wordsClass: textColorClass,
          });
        });
      }
    }
  }

  /*--------------------------------------------------------------
    9. Pagination 
 --------------------------------------------------------------*/
  if ($.exists(".pagination-wrapper")) {
    var $items = $(".pagination-wrapper .col");
    var numItems = $items.length;
    var perPage = 6;

    $items.slice(perPage).hide();
    $("#pagination-container").pagination({
      items: numItems,
      itemsOnPage: perPage,
      prevText: "&laquo;",
      nextText: "&raquo;",
      onPageClick: function (pageNumber) {
        var showFrom = perPage * (pageNumber - 1);
        var showTo = showFrom + perPage;
        $items.hide().slice(showFrom, showTo).show();
      },
    });
  }

  /*--------------------------------------------------------------
    10. Company Tab
 --------------------------------------------------------------*/
  if ($.exists(".company-tab")) {
    var $activeTab = $(".active-tab");
    var $contentList = $(".tabs-content .list");
    var $tabsList = $(".tabs li");
    var activeIndex = $activeTab.index();
    $contentList.eq(activeIndex).show();

    $(".tabs").on("click", "li", function (e) {
      var $currentTab = $(e.currentTarget);
      var index = $currentTab.index();

      $tabsList.removeClass("active-tab");
      $currentTab.addClass("active-tab");

      $contentList.hide().eq(index).show();
    });
  }

  /*--------------------------------------------------------------
    11. Accordion
 --------------------------------------------------------------*/
  if ($.exists(".ak-accordion-title")) {
    $(".ak-accordion-title").click(function () {
      $(this).toggleClass("active");
      var $accordionTab = $(this).next(".ak-accordion-tab");
      $accordionTab.slideToggle();
      $accordionTab
        .parent()
        .siblings()
        .find(".ak-accordion-tab")
        .slideUp()
        .prev()
        .removeClass("active");
    });
  }

  /*--------------------------------------------------------------
    12. Sticky Content
 --------------------------------------------------------------*/
  if ($.exists(".sticky-content")) {
    if ($(".sticky-content").length) {
      const $window = $(window);
      const $sidebar = $(".sidebar");
      const sidebarHeight = $sidebar.innerHeight();
      const $scrollEndPoint = $(".scroll-end-point");
      if (!$sidebar.length || !$scrollEndPoint.length) return;
      const footerOffsetTop = $scrollEndPoint.offset().top;
      const sidebarOffset = $sidebar.offset();
      const footerThreshold = footerOffsetTop - sidebarHeight;
      let isScrolling = false;
      function handleScroll() {
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(() => {
            const scrollTop = $window.scrollTop();

            if (scrollTop > sidebarOffset.top) {
              $sidebar.addClass("fixed");
            } else {
              $sidebar.removeClass("fixed");
            }

            if (scrollTop + sidebarHeight > footerOffsetTop) {
              const distanceToBottom = -(
                scrollTop +
                sidebarHeight -
                footerOffsetTop
              );
              $sidebar.css({ top: distanceToBottom });
            } else {
              $sidebar.css({ top: 0 });
            }

            isScrolling = false;
          });
        }
      }

      $window.scroll(handleScroll);
    }
  }

  if ($.exists(".sticky-content.style-two")) {
    if ($(".sticky-content.style-two").length) {
      const $window = $(window);
      const $sidebar = $(".sidebar.style-two");
      const sidebarHeight = $sidebar.innerHeight();
      const footerOffsetTop = $(".scroll-end-point.style-two").offset().top;
      const sidebarOffset = $sidebar.offset();
      const footerThreshold = footerOffsetTop - sidebarHeight;
      let isScrolling = false;
      function handleScroll() {
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(() => {
            const scrollTop = $window.scrollTop();

            if (scrollTop > sidebarOffset.top) {
              $sidebar.addClass("fixed");
            } else {
              $sidebar.removeClass("fixed");
            }

            if (scrollTop + sidebarHeight > footerOffsetTop) {
              const distanceToBottom = -(
                scrollTop +
                sidebarHeight -
                footerOffsetTop
              );
              $sidebar.css({ top: distanceToBottom });
            } else {
              $sidebar.css({ top: 0 });
            }

            isScrolling = false;
          });
        }
      }

      $window.scroll(handleScroll);
    }
  }

  /*--------------------------------------------------------------
     13. Comming Soon Counter
--------------------------------------------------------------*/
  if ($.exists("#comming-section")) {
    commingSoon();

    function commingSoon() {
      const targetDate = new Date("2024-08-31T00:00:00").getTime();

      function updateCountdown() {
        const currentDate = new Date().getTime();
        const timeRemaining = targetDate - currentDate;

        if (timeRemaining <= 0) {
          document.getElementById("countdown").textContent =
            "The event is here!";
          clearInterval(interval);
          return 0;
        } else {
          const months = Math.floor(
            timeRemaining / (1000 * 60 * 60 * 24 * 30.44)
          );
          const days = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24 * 30.44)) /
              (1000 * 60 * 60 * 24)
          );
          const hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

          document.getElementById("months").textContent = `${months}`;
          document.getElementById("days").textContent = `${days}`;
          document.getElementById("hours").textContent = `${hours}`;
          document.getElementById("minutes").textContent = `${minutes}`;
          document.getElementById("secound").textContent = `${seconds}`;
        }
      }

      const interval = setInterval(updateCountdown, 1000);

      // Initial call to set the countdown value
      updateCountdown();
    }
  }

  /*--------------------------------------------------------------
    14. Light Gallery
--------------------------------------------------------------*/
  if ($.exists("#static-thumbnails")) {
    const galleryDiv = document.getElementById("static-thumbnails");
    lightGallery(galleryDiv, {
      selector: ".item a",
      addClass: "lg-custom-thumbnails",
      animateThumb: true,
      zoomFromOrigin: true,
      allowMediaOverlap: true,
      toggleThumb: true,
    });
  }

  /*--------------------------------------------------------------
    15. Counter
--------------------------------------------------------------*/
  if ($.exists(".auto-counter-section")) {
    var a = 0;
    $(window).scroll(function () {
      var oTop = $(".ak-funfact-number").offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $(".counter").each(function () {
          var $this = $(this),
            countTo = $this.attr("data-number");
          $({
            countNum: $this.text(),
          }).animate(
            {
              countNum: countTo,
            },

            {
              duration: 1500,
              easing: "swing",
              step: function () {
                $this.text(Math.ceil(this.countNum).toLocaleString("en"));
              },
              complete: function () {
                $this.text(Math.ceil(this.countNum).toLocaleString("en"));
              },
            }
          );
        });
        a = 1;
      }
    });
  }
  /*--------------------------------------------------------------
    16. Contact Form
--------------------------------------------------------------*/
  if ($.exists("#contact-form")) {
    $("#ak-alert").hide();
    $("#contact-form #submit").on("click", function () {
      var name = $("#name").val();
      var subject = $("#subject").val();
      var topic = $("#topic").val();
      var email = $("#email").val();
      var msg = $("#msg").val();
      var regex =
        /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (!regex.test(email)) {
        $("#ak-alert")
          .fadeIn()
          .html(
            '<div class="alert rounded-0 alert-danger"><strong>Warning!</strong> Please Enter Valid Email.</div>'
          );
        return false;
      }

      name = $.trim(name);
      subject = $.trim(subject);
      topic = $.trim(topic);
      email = $.trim(email);
      msg = $.trim(msg);

      if (name != "" && email != "" && msg != "") {
        var values = {
          name: name,
          subject: subject,
          topic: topic,
          email: email,
          msg: msg,
        };

        $.ajax({
          type: "POST",
          url: "assets/php/mail.php",
          data: values,
          success: function () {
            $("#name").val("");
            $("#subject").val("");
            $("#topic").val("");
            $("#email").val("");
            $("#msg").val("");

            $("#ak-alert")
              .fadeIn()
              .html(
                '<div class="alert rounded-0 alert-success"><strong>Success!</strong> Email has been sent successfully.</div>'
              );
            setTimeout(function () {
              $("#ak-alert").fadeOut("slow");
            }, 4000);
          },
          error: function (xhr, status, error) {
            $("#ak-alert")
              .fadeIn()
              .html(
                '<div class="alert rounded-0 alert-danger"><strong>Email not send!</strong> ' +
                  error +
                  "</div>"
              );
          },
        });
      } else {
        $("#ak-alert")
          .fadeIn()
          .html(
            '<div class="alert rounded-0 alert-danger"><strong>Warning!</strong> All fields are required.</div>'
          );
      }
      return false;
    });
  }

  /*--------------------------------------------------------------
    17. Appointment Form
--------------------------------------------------------------*/
  if ($.exists("#appointment-form")) {
    $("#ak-alert").hide();
    $("#appointment-form #submit").on("click", function (e) {
      e.preventDefault();
      var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var vehicle = $("#vehicle").val();
      var time = $("#time").val();
      var date = $("#date").val();
      var msg = $("#msg").val();
      var regex =
        /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (!regex.test(email)) {
        $("#ak-alert")
          .fadeIn()
          .html(
            '<div class="alert rounded-0 alert-danger"><strong>Warning!</strong> Please Enter Valid Email.</div>'
          );
        return false;
      }

      name = $.trim(name);
      vehicle = $.trim(vehicle);
      phone = $.trim(phone);
      email = $.trim(email);
      time = $.trim(time);
      date = $.trim(date);
      msg = $.trim(msg);

      if (name != "" && email != "" && msg != "" && time != "" && date != "") {
        var values = {
          name: name,
          vehicle: vehicle,
          phone: phone,
          email: email,
          time: time,
          date: date,
          msg: msg,
        };

        $.ajax({
          type: "POST",
          url: "assets/php/appointment.php",
          data: values,
          success: function () {
            $("#name").val("");
            $("#vehicle").val("");
            $("#phone").val("");
            $("#email").val("");
            $("#msg").val("");
            $("#time").val("");
            $("#date").val("");

            $("#ak-alert")
              .fadeIn()
              .html(
                '<div class="alert rounded-0 alert-success"><strong>Success!</strong> Email has been sent successfully.</div>'
              );
            setTimeout(function () {
              $("#ak-alert").fadeOut("slow");
            }, 4000);
          },
          error: function (xhr, status, error) {
            $("#ak-alert")
              .fadeIn()
              .html(
                '<div class="alert rounded-0 alert-danger"><strong>Email not send!</strong> ' +
                  error +
                  "</div>"
              );
          },
        });
      } else {
        $("#ak-alert")
          .fadeIn()
          .html(
            '<div class="alert rounded-0 alert-danger"><strong>Warning!</strong> All fields are required.</div>'
          );
      }
      return false;
    });
  }

  /*--------------------------------------------------------------
    18. Footer Fmail Form
--------------------------------------------------------------*/
  if ($.exists("#footer-email")) {
    $("#ak-alert-footer").hide();
    $("#footer-email #footerSubmit").on("click", function (e) {
      e.preventDefault();
      var footerEmail = $("#footerEmail").val();
      var regex =
        /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (!regex.test(footerEmail)) {
        $("#ak-alert-footer")
          .fadeIn()
          .html(
            '<p class="text-danger"><strong>Warning!</strong> Please Enter Valid Email.</p>'
          );
        return false;
      }
      footerEmail = $.trim(footerEmail);

      if (footerEmail != "") {
        var values = {
          footerEmail: footerEmail,
        };

        $.ajax({
          type: "POST",
          url: "assets/php/footeremail.php",
          data: values,
          success: function () {
            $("#footerEmail").val("");
            $("#ak-alert-footer")
              .fadeIn()
              .html(
                '<p class="text-success"><strong>Success!</strong> Sent successfully.</p>'
              );
            setTimeout(function () {
              $("#ak-alert-footer").fadeOut("slow");
            }, 4000);
          },
          error: function (xhr, status, error) {
            $("#ak-alert-footer")
              .fadeIn()
              .html(
                '<p class="text-danger"><strong>Email not send!</strong> </p>'
              );
          },
        });
      } else {
        $("#ak-alert-footer")
          .fadeIn()
          .html(
            '<p class="text-danger"><strong>Warning!</strong> All fields are required.</p>'
          );
      }
      return false;
    });
  }
  //end the scripts
})(jQuery);

/* Hot Tropix shared conversion and accessibility enhancements */
(function () {
  "use strict";

  const body = document.body;
  const isHome = body.classList.contains("home-page");
  if (!isHome && document.querySelector(".common-page-title")) {
    body.classList.add("service-page");
  }

  if (isHome) {
    const portfolioSpacer = document.getElementById("Portfolio");
    const portfolioSection = portfolioSpacer && portfolioSpacer.nextElementSibling;
    const footer = document.querySelector("footer");
    if (portfolioSpacer && portfolioSection && footer) footer.before(portfolioSpacer, portfolioSection);
  }

  document.querySelectorAll('.ak-site_branding img[alt="..."]').forEach(img => img.alt = "Hot Tropix Auto Spa");
  document.querySelectorAll('img[src$="phone.svg"][alt="..."]').forEach(img => img.alt = "");
  document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
    if (!link.getAttribute("aria-label")) link.setAttribute("aria-label", "Hot Tropix Auto Spa on Instagram");
  });

  if (!document.querySelector(".ht-skip-link")) {
    const skip = document.createElement("a");
    skip.className = "ht-skip-link";
    skip.href = isHome ? "#Services" : "#main-content";
    skip.textContent = "Skip to main content";
    body.prepend(skip);
  }

  const mainTarget = document.querySelector(".sticky-content") || document.querySelector("#Services");
  if (mainTarget && !mainTarget.id) mainTarget.id = "main-content";

  if (!document.querySelector(".ht-mobile-callbar")) {
    const callbar = document.createElement("a");
    callbar.className = "ht-mobile-callbar";
    callbar.href = "tel:+16145821971";
    callbar.dataset.ctaLocation = "mobile_sticky";
    callbar.setAttribute("aria-label", "Call Hot Tropix Auto Spa at 614-582-1971");
    callbar.innerHTML = '<img src="assets/img/phone.svg" alt=""><span><small>Call for an estimate</small><strong>(614) 582-1971</strong></span>';
    body.append(callbar);
  }

  if (window.hotTropixForwardingNumber && window.hotTropixApplyGoogleForwardingNumber) {
    window.hotTropixApplyGoogleForwardingNumber(
      window.hotTropixForwardingNumber.formattedNumber,
      window.hotTropixForwardingNumber.mobileNumber
    );
  }

  const serviceImages = {
    "vehicle-wraps.html": "../img/gallery/featured-1280.webp",
    "vehicle-graphics.html": "../img/gallery/ford-mobile-service-van-wrap-1280.webp",
    "vehicle-lettering.html": "../img/gallery/accurate-hvac-van-lettering-1280.webp",
    "ppf.html": "../img/gallery/ppf-3-1280.webp",
    "ceramic-coating.html": "../img/gallery/featured-1280.webp",
    "vehicle-detailing.html": "../img/gallery/graphics-9-1280.webp",
    "signage.html": "../img/gallery/graphics-17-1280.webp",
    "pinstriping.html": "../img/gallery/graphics-16-1280.webp"
  };
  const serviceWork = {
    "vehicle-wraps.html": ["featured.jpeg", "wraps-kevins-car-repair.jpg", "wow-windowboxes-truck-wrap.jpg"],
    "vehicle-graphics.html": ["ford-mobile-service-van-wrap.jpg", "coughlin-cars-shuttle-wrap.jpg", "graphics-14.jpg"],
    "vehicle-lettering.html": ["accurate-hvac-van-lettering.jpg", "clear-water-pools-box-truck.jpg", "lettering-5.jpeg"],
    "ppf.html": ["ppf-1.jpg", "ppf-3.jpg", "ppf-5.jpg"],
    "ceramic-coating.html": ["featured.jpeg", "graphics-9.jpg"],
    "vehicle-detailing.html": ["featured.jpeg", "graphics-9.jpg"],
    "signage.html": ["graphics-17.jpg", "clear-water-pools-box-truck.jpg", "wraps-3.jpeg"],
    "pinstriping.html": ["graphics-16.jpg", "graphics-15.jpg", "graphics-10.jpg"]
  };

  if (body.classList.contains("service-page")) {
    const file = location.pathname.split("/").pop();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: "service_view", service: file.replace(/\.html$/, "")});
    const titleWrap = document.querySelector(".common-page-title");
    const titleContainer = titleWrap && titleWrap.closest(".container");
    const seoHeading = document.querySelector(".sticky-content h1.visually-hidden");
    const visualHeading = titleWrap && titleWrap.querySelector(".page-title");
    if (seoHeading && visualHeading) {
      seoHeading.textContent = visualHeading.textContent.trim();
      seoHeading.className = "page-title";
      visualHeading.replaceWith(seoHeading);
    }
    if (titleContainer) {
      titleContainer.classList.add("ht-service-hero");
      if (serviceImages[file]) titleContainer.style.setProperty("--ht-service-image", `url('${serviceImages[file]}')`);
      const call = document.createElement("a");
      call.href = "tel:+16145821971";
      call.className = "common-btn ht-service-hero-call";
      call.dataset.ctaLocation = "service_hero";
      call.textContent = "Call (614) 582-1971";
      titleWrap.append(call);
    }

    const nav = document.querySelector(".next-prev-btn");
    const footer = document.querySelector("footer");
    if (nav && footer) {
      const related = document.createElement("nav");
      related.className = "container ht-related-services";
      related.setAttribute("aria-label", "Browse related services");
      related.innerHTML = "<p>Explore another service</p>";
      related.append(nav);
      footer.before(related);
    }

    const ctaContainer = document.querySelector(".cta")?.closest(".container");
    if (ctaContainer && serviceWork[file]) {
      const workSection = document.createElement("section");
      workSection.className = "container ht-service-work";
      workSection.setAttribute("aria-labelledby", "service-work-title");
      const cards = serviceWork[file].map((name, index) => {
        const stem = name.replace(/\.[^.]+$/, "");
        return `<figure><img src="assets/img/gallery/${name}" srcset="assets/img/gallery/${stem}-640.webp 640w, assets/img/gallery/${stem}-1280.webp 1280w" sizes="(max-width: 767px) calc(100vw - 48px), 33vw" loading="lazy" decoding="async" alt="${titleWrap?.querySelector('.page-title')?.textContent || 'Hot Tropix'} project example ${index + 1}"></figure>`;
      }).join("");
      workSection.innerHTML = `<p class="ht-section-kicker">Recent work</p><h2 id="service-work-title">See the service in action</h2><div class="ht-service-work-grid">${cards}</div>`;
      ctaContainer.before(workSection);

      const warmServiceWork = function () {
        workSection.querySelectorAll("img").forEach(img => {
          img.loading = "eager";
          img.fetchPriority = "low";
        });
      };
      if ("IntersectionObserver" in window) {
        const workObserver = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            warmServiceWork();
            workObserver.disconnect();
          }
        }, {rootMargin: "1400px 0px"});
        workObserver.observe(workSection);
      } else {
        warmServiceWork();
      }
    }
  }

  const gallery = document.getElementById("htGallery");
  if (gallery) {
    const moreButton = document.querySelector(".ht-gallery-more");
    const countLabel = document.querySelector(".ht-gallery-count");
    const allItems = Array.from(gallery.querySelectorAll(".ht-gallery-item"));
    const initialCount = matchMedia("(max-width: 575px)").matches ? 6 : 12;
    let expanded = false;

    function optimizedGallerySource(item) {
      const image = item.querySelector("img");
      const candidates = (image?.getAttribute("srcset") || "").split(",").map(candidate => candidate.trim()).filter(Boolean);
      return candidates.length ? candidates[candidates.length - 1].split(/\s+/)[0] : image?.getAttribute("src");
    }

    function warmGalleryItem(item) {
      const image = item.querySelector("img");
      if (!image) return;
      image.loading = "eager";
      image.fetchPriority = "low";
    }

    // Lightbox views do not need the 3–5 MB camera originals. The 1280px
    // WebP variants are sharp on screen and open much faster on mobile.
    allItems.forEach(item => {
      const optimizedSource = optimizedGallerySource(item);
      if (optimizedSource) item.setAttribute("href", optimizedSource);
    });

    function applyGalleryLimit() {
      const activeFilter = document.querySelector(".ht-filter.is-active")?.dataset.filter || "all";
      const matching = allItems.filter(item => activeFilter === "all" || (item.dataset.category || "").split(/\s+/).includes(activeFilter));
      const visibleItems = matching.slice(0, expanded ? matching.length : initialCount);
      allItems.forEach(item => item.classList.add("is-deferred"));
      visibleItems.forEach(item => {
        item.classList.remove("is-deferred");
        warmGalleryItem(item);
      });
      if (moreButton) {
        const hasMore = matching.length > initialCount;
        moreButton.hidden = !hasMore;
        moreButton.textContent = expanded ? "Show Less Work" : "Show More Work";
        moreButton.setAttribute("aria-expanded", expanded ? "true" : "false");
      }
      if (countLabel) countLabel.textContent = `Showing ${Math.min(matching.length, expanded ? matching.length : initialCount)} of ${matching.length} projects`;
    }

    document.querySelectorAll(".ht-filter").forEach(button => button.addEventListener("click", function () {
      expanded = false;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event: "gallery_filter", filter: button.dataset.filter || "all"});
      requestAnimationFrame(applyGalleryLimit);
    }));
    if (moreButton) moreButton.addEventListener("click", function () {
      expanded = !expanded;
      applyGalleryLimit();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event: "gallery_expand", expanded});
    });
    applyGalleryLimit();
  }

  if (window.hotTropixForwardingNumber && window.hotTropixApplyGoogleForwardingNumber) {
    window.hotTropixApplyGoogleForwardingNumber(
      window.hotTropixForwardingNumber.formattedNumber,
      window.hotTropixForwardingNumber.mobileNumber
    );
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest("a");
    if (!link) return;
    if (link.href.startsWith("tel:")) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event: "phone_click", page: location.pathname, cta_location: link.dataset.ctaLocation || "content"});
    }
    if (link.href.includes("maps.apple.com")) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event: "directions_click", page: location.pathname});
    }
  });

  function settleHash() {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView({block: "start"});
  }
  window.addEventListener("load", function () {
    settleHash();
    setTimeout(settleHash, 750);
  });
})();
