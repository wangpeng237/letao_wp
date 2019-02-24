$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;

    render();

    function render() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {

                var htmlStr = template('userTl', res);
                $('tbody').html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: res.page,//当前页
                    totalPages: Math.ceil(res.total / res.size),//总页数
                    // size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值

                        currentPage = page;
                        render();
                    }
                });
            }
        })

    }

    // $("#paginator").bootstrapPaginator({
    //     bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
    //     currentPage: currentPage,//当前页
    //     totalPages: pageSize,//总页数
    //     // size:"small",//设置控件的大小，mini, small, normal,large
    //     onPageClicked:function(event, originalEvent, type,page){
    //       //为按钮绑定点击事件 page:当前点击的按钮值
    //     }
    //   });

    $('tbody').on('click', '.btn', function () {
        $('#userModal').modal('show');

        currentId = $(this).parent().data('id');
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    })

    $('#userbtn').on('click', function () {
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    $('#userModal').modal('hide');
                    render();
                }
            }
        })
    })
})