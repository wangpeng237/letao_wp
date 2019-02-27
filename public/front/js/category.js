$(function(){
    $.ajax({
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function(res){
            var htmlStr = template('leftTl', res);
            $('.lt_main_left ul').html(htmlStr);

            render(res.rows[0].id)
        }
    })


    function render(id){
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(res){
                var htmlStr = template('rightTl', res);
                $('.lt_main_right ul').html(htmlStr);
            }
        })
    }

    $('.lt_main_left').on('click', 'a', function(){
        $('.lt_main_left a').removeClass('current');

        $(this).addClass('current');

        var id = $(this).data('id');
        render(id); 
    })
})