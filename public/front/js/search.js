$(function(){
  // 将来下面三句话, 可以放在控制台执行, 进行假数据初始化
//   var arr = [ "耐克", "李宁", "新百伦", "耐克王", "阿迪王" ];
//   var jsonStr = JSON.stringify( arr );
//   localStorage.setItem( "search_list", jsonStr );

  render();

//   获取本地存储
  function getArr(){
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }
  
//   渲染页面
  function render(){
    var arr = getArr()

    var htmlStr = template('searchTl', {arr: arr});
    $('.lt_history').html(htmlStr);
  }

  //清空记录
  $('.btn-empty').on('click', function(){
    // localStorage.removeItem('search_list');

    // render();

    mui.confirm('您确认要清空历史记录吗', '温馨提示', ['取消', '确认'], function(e){
        if(e.index === 1){
             localStorage.removeItem('search_list');

             render();
        }
    })
  })

  //清除单个
  $('.lt_history').on('click', '.btn_delete', function(){
      var arr = getArr();

      var index = $(this).data('index');

      arr.splice(index, 1);

      localStorage.setItem('search_list', JSON.stringify(arr));

      render();
  })

  //添加
  $('.lt_input button').on('click', function(){
      var key = $('.lt_input input').val().trim();

      if(key === ''){
          mui.toast('请输入内容');
          return;
      }

      var arr = getArr();

      var index = arr.indexOf(key);

      if(index != -1){
          arr.splice(index, 1);
      }

      if(arr.length >= 10){
          arr.pop();
      }

      arr.unshift(key);

      localStorage.setItem('search_list', JSON.stringify(arr));

      render();

      $('.lt_input input').val('')
  })
  
})