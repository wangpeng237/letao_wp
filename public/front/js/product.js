$(function () {
    var productId = getSearch('productId');

    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: productId
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);

            var htmlStr = template('productTl', res);

            $('.mui-scroll').html(htmlStr);

            // 手动初始化轮播图
            // 获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 手动初始化 数字框
            mui('.mui-numbox').numbox();
        }
    })


    // 给尺码添加选中功能
    $('.lt_main').on("click", ".lt_size span", function () {
        // 给自己加上 current 类, 移除其他元素的 current类
        $(this).addClass("current").siblings().removeClass("current");
    });

    //加入购物车
    $('#addCart').click(function(){
        var size = $('.lt_size span.current').text();
        if(!size){
            mui.toast('请选择尺码');
            return;
        }

        var num = $('.mui-numbox-input').val();

        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: {
                productId: productId,
                num: num,
                size: size
            },
            dataType: 'json',
            success: function(res){
                console.log(res);
                if(res.error === 400 ){
                    location.href = 'login.html?retURL=' + location.href;
                    return;
                }

                if(res.success){
                    mui.confirm('加入成功', '温馨提示', ['去购物车', '继续浏览'], function(e){
                        if(e.index == 0){
                            location.href = 'cart.html';
                        }
                    })
                }
                
            }
        })
    })
})