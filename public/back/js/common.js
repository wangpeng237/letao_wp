$(function(){
    $(document).ajaxStart(function(){
        NProgress.start();
    })


    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        }, 500)
    })
});


$(function(){
    $('.clickA').on('click', function(){
        $(this).next().stop().slideToggle();
    })


    $('.menu').on('click', function(){
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_main .title').toggleClass('hidemenu');
        $('.lt_aside').toggleClass('hidemenu');
    })
    
    // 显示模态框
    $('.logout').on('click', function(){
        $('#myModal').modal('show');
    })


    //退出登录
    $('.modal-footer .btn-primary').on('click', function(){
        $.ajax({
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function(res){
                if(res.success){
                    location.href = "login.html";
                }
            }
        })
    })
});