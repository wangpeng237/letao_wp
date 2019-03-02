$(function(){

    render();
    function render(){
        $.ajax({
            url: '/cart/queryCart',
            dataType: 'json',
            success: function(res){
                if(res.error == 400){
                    location.href = 'login.html?retURL' + location.href;
                    return;
                }
    
                var htmlStr = template('cartTl', {list: res});
    
                $('.mui-table-view').html(htmlStr);
            }
        })
    }


    $('.lt_main').on('click', '.btn_delete', function(){
        var id = $(this).data('id');

        $.ajax({
            url: '/cart/deleteCart',
            dataType: 'json',
            data:{
                id: [id]
            },
            success: function(res){
                render();
            }
        })
    })
})