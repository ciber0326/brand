$(document).ready(function () {

  // Disable autoplay on mobile devices
  if (!/Mobi/.test(navigator.userAgent)) {
    document.querySelector('video').autoplay = true;
  } else {
    document.querySelector('video').removeAttribute('autoplay');
  }

  $('.has-dropdown').hover(
    function () {
      // On hover, slide down the dropdown
      $(this).find('.dropdown').stop(true, true).slideDown('fast');
    },
    function () {
      // On hover out, slide up the dropdown
      $(this).find('.dropdown').stop(true, true).slideUp('fast');
    }
  );

  $('.hamburger').on('click', function () {
    $(".sp-gloabal-menu").addClass("active")
  })
  $('.closeMenu').on('click', function () {
    $(".sp-gloabal-menu").removeClass("active")
  })





  // mouse cursor

  // UPDATE: I was able to get this working again... Enjoy!

  var cursor = document.querySelector('.cursor');
  var cursorinner = document.querySelector('.cursor2');
  var a = document.querySelectorAll('a');

  document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
  });

  document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';
  });

  document.addEventListener('mousedown', function () {
    cursor.classList.add('click');
    cursorinner.classList.add('cursorinnerhover')
  });

  document.addEventListener('mouseup', function () {
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
  });

  a.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })
  // mouse cursor

  var lastScrollTop = 0;
  var header = $("header");

  $(window).on('scroll', function () {
    if ($('.sec-gallery-company').length > 0) {
      var scrollPosition = $(window).scrollTop();
      var gallerySection = $('.sec-gallery-company');
      var galleryTop = gallerySection.offset().top;
      var windowHeight = $(window).height();
      var sectionHeight = gallerySection.height();
      var galleryWrapper = $('.gallery-wrapper');
      var maxScroll = galleryWrapper.width() - $(window).width();
      if (scrollPosition >= galleryTop - windowHeight && scrollPosition < galleryTop + sectionHeight) {
        var percentageScrolled = (scrollPosition - (galleryTop - windowHeight)) / (sectionHeight + windowHeight);
        var horizontalScroll = Math.min(maxScroll * percentageScrolled, maxScroll);

        galleryWrapper.css('transform', 'translateX(-' + horizontalScroll + 'px)');
      }

    }
    // header scroll

    var scrollTop = $(this).scrollTop();

    if (scrollTop > lastScrollTop) {
      // Scrolling down, hide the header
      gsap.to(header, { y: "-100%", duration: 0.5 });
    } else if (scrollTop < lastScrollTop) {
      // Scrolling up, show the header
      gsap.to(header, { y: "0%", duration: 0.5 });
    }

    lastScrollTop = scrollTop;

  });




  var swiper = new Swiper('.gallery-employee', {
    spaceBetween: 0,
    slidesPerView: 1,
    //centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 20000,
  });


  var $loader = $('#loader');
  var $content = $('#content');
  var $video = $('#loadingVideo');

  // Listen for the video to end or use a timeout for a fixed duration
  $video.on('ended', function () {
    slideUpLoader();
  });

  // Alternatively, use a timeout to show the content after a fixed duration
  setTimeout(slideUpLoader, $video[0].duration * 100); // Or set a custom time, e.g., 5000ms (5 seconds)

  function slideUpLoader() {
    $loader.addClass('slide-up'); // Add the slide-up class to the loader
    setTimeout(function () {
      $loader.hide(); // Hide the loader after the slide-up effect is done
      $content.fadeIn(500); // Fade in the main content
    }, 3000); // Wait for the slide-up transition to complete
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".service-lists .animate-on-scroll", {
    opacity: 0,
    y: 50,
    duration: 0.3,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".service-lists",
      start: "top 80%",  // Start the animation when the top of the service-lists is 80% down the viewport
      end: "bottom 20%", // End the animation when the bottom of the service-lists is 20% up the viewport
      toggleActions: "play none none reverse",  // Replays the animation on reverse scroll
      markers: false,  // Change to true to see the ScrollTrigger markers
    }
  });

  // Function to wrap each letter in a span, ignoring <br> tags
  function wrapLettersWithSpans(element) {
    $(element).contents().each(function () {
      if (this.nodeType === 3) { // Text node
        // Replace each letter with span, but ignore <br> tags
        $(this).replaceWith($(this).text().replace(/([^\s])/g, '<span class="letter">$1</span>'));
      } else if (this.nodeType === 1 && this.tagName === 'BR') {
        // Keep <br> tags as they are
        // No changes needed for <br> tags
      }
    });
  }

  // Apply letter wrapping for all elements with the fadeUp class
  $('.fadeUp').each(function () {
    wrapLettersWithSpans(this);
  });

  // GSAP animation for each letter

  // Animate each fadeUp element dynamically based on its data attributes
  $('.fadeUp').each(function () {
    let delay = $(this).data('delay') || 0;       // Get data-delay attribute, default to 0 if not set
    let duration = $(this).data('duration') || 0.6; // Get data-duration attribute, default to 0.6 if not set

    // Create animation for the current element
    gsap.timeline({
      scrollTrigger: {
        trigger: this,  // Element to trigger the scroll effect
        start: "top 80%",    // When 80% of the element is in the viewport
        once: true           // Ensures the animation only happens once
      }
    }).to($(this).find('.letter'), {
      y: 0,                // Move the letters up from the bottom
      opacity: 1,
      stagger: 0.05,        // Stagger the animation by 0.05 seconds for each letter
      duration: duration,   // Dynamic duration from data-duration attribute
      delay: delay,         // Dynamic delay from data-delay attribute
      ease: "power2.out"
    });
  });
  // Animate each fadeUpScr li element dynamically based on its data attributes
  $('.fadeUpScr').each(function () {
    let delay = $(this).data('delay') || 0;       // Get data-delay attribute, default to 0 if not set
    let duration = $(this).data('duration') || 0.6; // Get data-duration attribute, default to 0.6 if not set

    // Create animation for each li element
    gsap.timeline({
      scrollTrigger: {
        trigger: this,  // Element to trigger the scroll effect
        start: "top 80%",    // When 80% of the element is in the viewport
        once: true           // Ensures the animation only happens once
      }
    }).from(this, {
      y: 50,               // Move the li element up from 50px below
      opacity: 0,           // Fade in from 0 opacity
      duration: duration,   // Dynamic duration from data-duration attribute
      delay: delay,         // Dynamic delay from data-delay attribute
      ease: "power2.out"
    });
  });



  //////////////////////////related news

  var relatedSwiper = new Swiper(".horizontal_scroll_swiper", {
    slidesPerView: 2,
    // centeredSlides: true,
    spaceBetween: 14,
    // grabCursor: true,
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 1.2,
        spaceBetween: 14,
      },
      // when window width is >= 1024px
      920: {
        slidesPerView: 1.5,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    }
  });

  //   member swiper
  var memberSwiper = new Swiper(".member-swiper", {
    slidesPerView: 3,
    spaceBetween: 14,
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.navigation .href-more.next',
      prevEl: '.navigation .href-more.prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.1,
        spaceBetween: 10,
        centeredSlides: false,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 1.7,
        spaceBetween: 18,
      },
      // when window width is >= 1024px
      920: {
        slidesPerView: 2.2,
        spaceBetween: 22,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    }

  });

  //service page

  var serviceGallery = new Swiper('.sec-service-gallery', {
    spaceBetween: 0,
    slidesPerView: 1,
    //centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 20000,
    allowTouchMove: false,
  });



  var flatGallery = new Swiper('.sec-good-gallery', {
    spaceBetween: 20,
    loop: true,
    speed: 5000, // Speed remains constant for smooth scrolling
    allowTouchMove: false, // Disable manual swipe interaction

    // Autoplay setup for smooth horizontal movement
    autoplay: {
      delay: 0, // Immediate autoplay without delay
      disableOnInteraction: false, // Continue autoplay even on interaction
    },

    // Responsive breakpoints for different screen sizes
    breakpoints: {
      320: {
        slidesPerView: 1.2, // For small mobile screens
      },
      768: {
        slidesPerView: 2.2, // For tablets or small desktops
      },
      1024: {
        slidesPerView: 3.2, // For desktops and larger screens
      },
      1440: {
        slidesPerView: 4.2, // For wider screens
      },
    },
  });


  //service ec
  const sections = $('article.section-group section');
  const menuItems = $('ul.sticky li');

  // Click event for smooth scrolling to section
  menuItems.each(function (index) {
    $(this).on('click', function () {
      const targetSection = sections.eq(index);

      // Animate scrolling with GSAP
      gsap.to(window, {
        duration: 0.3,
        scrollTo: { y: targetSection.offset().top, autoKill: false },
        ease: 'power2.inOut'
      });

      // Update active class
      menuItems.removeClass('active');
      $(this).addClass('active');
    });
  });

  // Scroll event to update active state based on current section in view
  $(window).on('scroll', function () {
    sections.each(function (index) {
      const sectionTop = $(this).offset().top;
      const sectionHeight = $(this).outerHeight();
      const scrollPos = $(window).scrollTop();

      if (scrollPos >= sectionTop - 100 && scrollPos < sectionTop + sectionHeight - 100) {
        menuItems.removeClass('active');
        menuItems.eq(index).addClass('active');
      }
    });
  });



  if ($('.gallery-container').length > 0) {

    let panels = gsap.utils.toArray(".panel");

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".gallery-container",
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + document.querySelector(".gallery-container").offsetWidth
      }
    });
  }

  $('.faq-question')?.click(function () {
    var $faqItem = $(this).parent();
    var $answer = $faqItem.find('.faq-answer');

    // Check if the current item is already active
    if ($faqItem.hasClass('active')) {
      // Collapse the active item
      $answer.slideUp();
      $faqItem.removeClass('active');
    } else {
      // Expand the clicked item
      $answer.slideDown();
      $faqItem.addClass('active');

      // Collapse other open items
      $('.faq-item').not($faqItem).each(function () {
        $(this).removeClass('active');
        $(this).find('.faq-answer').slideUp();
      });
    }
  });
  $('.service-item').hover(function () {
    var $serviceItem = $(this);
    var $serviceBody = $serviceItem.find('.service-body');

    // Toggle between expanding and collapsing with CSS transition
    if ($serviceItem.hasClass('active')) {
      $serviceBody.css('height', '0'); // Collapse
      $serviceItem.removeClass('active');
    } else {
      var autoHeight = $serviceBody.prop('scrollHeight') + 'px'; // Get full height
      $serviceBody.css('height', autoHeight); // Expand
      $serviceItem.addClass('active');

      // Collapse other items
      $('.service-item').not($serviceItem).each(function () {
        $(this).find('.service-body').css('height', '0'); // Collapse others
        $(this).removeClass('active');
      });
    }
  });

  $('.to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'smooth');
  });
  // ///////////////////////////////////////  prevent safe ///////////////////////////////////////////////////////////

  // Prevent right-click context menu
  // document.addEventListener('contextmenu', function (e) {
  //   e.preventDefault();
  // });

  // // Prevent text selection and copying
  // document.addEventListener('selectstart', function (e) {
  //   e.preventDefault();
  // });

  // document.addEventListener('copy', function (e) {
  //   e.preventDefault();
  // });

  // // Prevent Ctrl + S (Save As), Ctrl + U (View Source), F12 (DevTools)
  // document.addEventListener('keydown', function (e) {
  //   if ((e.ctrlKey && e.key === 's') ||
  //     (e.ctrlKey && e.key === 'u') ||
  //     e.key === 'F12') {
  //     e.preventDefault();
  //   }
  // });

  // // Prevent opening DevTools using right-click > Inspect
  // document.addEventListener('keydown', function (e) {
  //   if (e.key === 'F12' ||
  //     (e.ctrlKey && e.shiftKey && e.key === 'I') ||
  //     (e.ctrlKey && e.shiftKey && e.key === 'C') ||
  //     (e.ctrlKey && e.shiftKey && e.key === 'J') ||
  //     (e.ctrlKey && e.key === 'U')) {
  //     e.preventDefault();
  //   }
  // });

  // // Prevent opening DevTools using right-click > Inspect (for older browsers)
  // document.onkeydown = function (e) {
  //   if (e.keyCode == 123) {
  //     return false;
  //   } else if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
  //     return false; // Prevent Ctrl+Shift+I
  //   } else if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
  //     return false; // Prevent Ctrl+Shift+J
  //   } else if (e.ctrlKey && e.keyCode == 85) {
  //     return false; // Prevent Ctrl+U
  //   }
  // };

  // ///////////////////////////////////////  end prevent safe ///////////////////////////////////////////////////////////
});
