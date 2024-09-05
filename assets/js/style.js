$(document).ready(function () {
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
        var scrollPosition = $(window).scrollTop();
        var gallerySection = $('.sec-gallery-company');
        var galleryTop = gallerySection.offset().top;
        var windowHeight = $(window).height();
        var sectionHeight = gallerySection.height();
        var galleryWrapper = $('.gallery-wrapper');
        var maxScroll = galleryWrapper.width() - $(window).width();
        console.log(scrollPosition)
        if (scrollPosition >= galleryTop - windowHeight && scrollPosition < galleryTop + sectionHeight) {
            var percentageScrolled = (scrollPosition - (galleryTop - windowHeight)) / (sectionHeight + windowHeight);
            var horizontalScroll = Math.min(maxScroll * percentageScrolled, maxScroll);

            galleryWrapper.css('transform', 'translateX(-' + horizontalScroll + 'px)');
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


    
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
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
    setTimeout(slideUpLoader, $video[0].duration * 1000); // Or set a custom time, e.g., 5000ms (5 seconds)

    function slideUpLoader() {
        $loader.addClass('slide-up'); // Add the slide-up class to the loader
        setTimeout(function () {
            $loader.hide(); // Hide the loader after the slide-up effect is done
            $content.fadeIn(500); // Fade in the main content
        }, 5000); // Wait for the slide-up transition to complete
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

});
