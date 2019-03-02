$(function () {

    var key = getSearch('key');

    $('.lt_input input').val(key);

    render();

    function render() {
        obj = {};
        obj.proName = $('.lt_input input').val();
        obj.page = 1;
        obj.pageSize = 100;

        var $current = $('.lt_sort a.current');

        if($current.length === 1){
            var sortName = $current.data('type');

            var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;

            obj[sortName] = sortValue;
        }

        $.ajax({
            url: '/product/queryProduct',
            data: obj,
            dataType: 'json',
            success: function (res) {
                var htmlStr = template('searchTl', res);
                $('.lt_product').html(htmlStr);
            }
        })
    }

    $('.lt_input button').click(function(){
        render();
    })

    $('.lt_sort a').click(function(){
        if($(this).hasClass('current')){
            $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        }else{
            $(this).addClass('current').siblings().removeClass('current');
        }
    })
})