$(function() {
	// 滚动条距离顶部
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    // 滚动条高度
    function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    // 内容高度
    function getHeight() {
        return document.documentElement.clientHeight; 
    }
    //back top
    $('.back_top').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });
    $(document).scroll(function() {
        backTop();
    });
    function backTop() {
        if(getScrollTop() > 200 ) {
            $('.back_top').show();
        } else {
            $('.back_top').hide();
        }
    }
});
