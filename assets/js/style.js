$(document).ready(function () {
    $(window).on('scroll', function () {
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
