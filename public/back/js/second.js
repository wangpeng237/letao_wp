$(function () {
    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (res) {

                var htmlStr = template('secondTl', res);
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

    $('#addbtn').on('click', function () {
        $('#firstModal').modal('show');

        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (res) {
                var htmlStr = template('secondTl2', res);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })


    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();

        $('.dropdownText').text(txt);

        var id = $(this).data('id')

        $('[name="categoryId"]').val(id);

        $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })


    $("#fileId").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            var src = data.result.picAddr;

            $('#imgBox img').attr('src', src);

            $('[name="brandLogo"]').val(src);

            $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');

        }
    });

    //使用表单校验插件
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {

            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类名称'
                    },
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择图片'
                    },
                }
            },
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    },
                }
            },
        }

    });


    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function(res){
                $('#firstModal').modal('hide');
                currentPage = 1;
                render();

                $("#form").data('bootstrapValidator').validator.resetForm(true);

                $('.dropdownText').text('请选择一级分类');
                $('.imgBox img').attr('src', "./images/none.png");
            }
        })
    });
})