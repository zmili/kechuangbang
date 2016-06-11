'use strict';
$(function () {
    var navBtn = $('.js_nav_btn');
    navBtn.on('click', function () {
        var thisRight   = $('.index').css('right') == '0px' ? '10.6rem' : '0rem';
        var thisDisplay = $('.index').css('right') == '0px' ? 'block' : 'none';
        $('.index').animate({
            right: thisRight,
            display: thisDisplay
        });
    });
});
