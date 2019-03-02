$(function(){
    var productId = getSearch('productId');

    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: productId
        },
        dataType: 'json',
        success: function(res){
            console.log(res);

            var htmlStr = template('productTl', res);

            $('.mui-scroll').html(htmlStr);

            // 手动初始化轮播图
            // 获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            
            // 手动初始化 数字框
            mui('.mui-numbox').numbox();
        }
    })
})