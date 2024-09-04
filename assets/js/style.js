$(document).ready(function () {
    $(window).on('scroll', function() {
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
        speed:20000,
    });
});
