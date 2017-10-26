//模块一:完成用户登录
//1:为登录按钮绑定点击事件
  $("#btn1").click(function(e){
    e.preventDefault();
    var that=$(this);
    //1:获取用户输入用户名和密码
    var n = $("#uname").val();
    var p = $("#upwd").val();
    //4:发送ajax请求
    $.ajax({
      type:"GET",
      url:"../data/PHP/1-login.php",
      data:{uname:n,upwd:p},
      success:function(data){
        //alert(data.code+":"+data.msg);
        if(data.code>0){
          location.href = "3-index.html";
          // that.attr("href","3-index.html");
        }else{
          alert("用户账号或密码不确");
          location.href = "#";
          // that.attr("href","#");
        }
      },
      error:function(data){
        alert("用户账号或密码不确");
        // location.href = "#";
      }
    });
  });