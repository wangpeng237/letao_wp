$(function () {
    var currentPage = 1;
    var pageSize = 3;
    var picArr = [];

    render();

    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                var htmlStr = template('productTl', res);
                $('tbody').html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil(res.total / pageSize),//总页数
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
        $('#productModal').modal('show');

        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (res) {
                var htmlStr = template('productl2', res);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        $('.dropdownText').text(txt);
        var id = $(this).data('id');
        $('[name="brandId"]').val(id);

        $("#form").data('bootstrapValidator').updateStatus('brandId', 'VALID',)
    })


    $("#fileId").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            var res = data.result
            var src = res.picAddr;

            picArr.unshift(res);

            if (picArr.length > 3) {
                picArr.pop();
                $('#imgBox img:last-of-type').remove();
            }

            if(picArr.length == 3){
                $("#form").data('bootstrapValidator').updateStatus('picStatus', 'VALID',)
            }

            $('#imgBox').prepend('<img style="height: 100px;" src="' + src + '" alt="">');
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

            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    },
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品名称'
                    },
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品描述'
                    },
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 xx-xx'
                    }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品原价'
                    },
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品价格'
                    },
                }
            },
            picStatus: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传3张图片'
                    },
                }
            },
        }

    });

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        var picStr = $('#form').serialize();

        picStr += '&picArr=' + JSON.stringify(picArr);

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: picStr,
            dataType: 'json',
            success: function(res){
                if(res.success){
                    $('#productModal').modal('hide');

                    currentPage = 1;
                    render();

                    $("#form").data('bootstrapValidator').resetForm(true);

                    $('.dropdownText').text('请选择一级分类');

                    $('#imgBox img').remove();

                    picArr = [];
                }
            }
        })
    });
})