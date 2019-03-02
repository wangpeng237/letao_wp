$(function(){
    $('#loginBtn').click(function(){
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();

        if(username === ''){
            mui.toast('请输入用户名');
            return;
        }

        if(username === ''){
            mui.toast('请输入密码');
            return;
        }

        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            dataType: 'json',
            success: function(res){
                console.log(res);
                if(res.error == 403){
                    mui.toast('用户名或密码错误');
                }

                if(res.success){
                    if(location.search.indexOf('retURL') != -1){
                        var retURL = location.search.replace('?retURL=', '');

                        location.href = retURL; 
                    }else{
                        location.href = 'user.html';
                    }

                }
            }
        })
    })
})