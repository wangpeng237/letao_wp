$(function(){
    $.ajax({
        url: '/user/queryUserMessage',
        dataType: 'json',
        success: function(res){
            if(res.error == 400){
                location.href = 'login.html';
                return;
            }

            var htmlStr = template('userTl', res);
            $('#userInfo').html(htmlStr);
        }
    })

    $('#logout').click(function(){
        $.ajax({
            url: '/user/logout',
            dataType: 'json',
            success: function(res){
                if(res.success){
                    location.href = 'login.html';
                }
            }
        })
    })
})