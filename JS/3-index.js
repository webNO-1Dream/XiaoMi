/**
 * Created by web-01 on 2017/10/12.
 */
/**
 *功能模块①：
 *位置:页面顶部，广告位
 *功能：获取系统当前星期，根据星期数，选择加载不同的广告图片，或不显示广告
 *具体：
 *    1.自动获取当前系统星期
 *    2.用switch选择加载页面顶部广告图
 **/
(()=>{
  var date=new Date();
  var week=parseInt(date.getDay());
  var topAD=$("#top-ad");
  if(week>0&&week<5) {
      // topAD.css("background-image",
      //     `url("../res/img/index/topAD/topAD-${week}.jpg")`
      // );
      topAD.css({
        "background-image":
          `url("../res/img/index/topAD/topAD-${week}.jpg")`,
        "width": "100%",
        "height": "120px",
        "background-repeat": "no-repeat",
        "background-position":" center 0"
      }
      );
  }
})();
/**
 *功能模块②：
 *位置:页面头部，右侧购物车列表
 *功能：绑定鼠标移入事件
 *具体：
 *    1.默认隐藏
 *    2.鼠标移入过渡显示
 *    3.移出隐藏
 **/
(()=>{
  $(".header-cart").hover(
      function () {
        var that=$(this);
        $(this).children(".cart-ul").addClass("cart-show");
        setTimeout(function () {
          that.children(".cart-ul").children("li").show();
        },100)
      },
      function () {
        var that=$(this);
        $(this).children(".cart-ul").removeClass("cart-show");
        setTimeout(function () {
          that.children(".cart-ul").children("li").hide();
        },100)
      }
  )
})();
/**
 *功能模块③：
 *位置:页面导航 nav
 *功能：鼠标移入列表项li才触发事件，移出列表ul时再触发事件
 *具体：
 *    1.当鼠标移入列表项'li'时，显示展示板块
 *    2.当鼠标移出列表'ul'时，隐藏展示板块
 **/
(()=>{
//1.当鼠标移入列表项'li'时，显示展示板块
  //使用on在父元素ul中托管事件监听
  $(".nav-product")
      .on("mouseover",".show-nav-product:lt(8)",function(){
        //使用匿名函数替代箭头函数，可使用this找到下标,否则index为-1
        //console.log($(this).index());//下标从1开始
        //console.log($(this).is("li"));//true
        //只要触发任意一个li,即让该ul指定范围中所有li的展示板块显示
        if(!$(".nav-product-hidden").hasClass("nav-product-show")){
          $(".nav-product-hidden").addClass("nav-product-show");
        }
        //只让当前li的展示板块显现(z-index设为30),就给其他兄弟li的z-index设为0
        $(this).children(".nav-product-hidden")
            .css("z-index",30);
        $(this).siblings().children(".nav-product-hidden")
            .css("z-index",0);
      });
//2.当鼠标移出指定列表项范围时，隐藏展示板块
  $(".show-nav-product:lt(8)").mouseleave(()=>{
    $(".nav-product-hidden").removeClass("nav-product-show");
  });
})();
/**
 *功能模块④：
 *位置:主体部分,左上方列表项
 *功能：鼠标移入列表项li才触发事件，移出列表ul时再触发事件
 *具体：
 *    1.当鼠标移入列表项'li'时，显示展示板块
 *    2.当鼠标移出列表'ul'时，隐藏展示板块
 **/
(()=>{
  //1.初始化li:隐藏展示板块(如果：该元素的display不为none的话)
  // $("#ul-banner .ul-top .product-li .ul-hidden").hide();
  //2.当鼠标移入列表项'li'时，显示展示板块
  $("#ul-banner .ul-top").on("mouseover",".product-li",
    function () {
      $(this).children(".ul-hidden").show();
    });
  //3.当鼠标移出列表项'li'时，隐藏展示板块
  $("#ul-banner .ul-top").on("mouseleave",".product-li",
    function () {
      $(this).children(".ul-hidden").hide();
    });
})();
/**
 *功能模块⑤：
 *位置:主体部分,循环轮播图
 *功能：无鼠标事件时，自动启动定时器，“循环”展示商品图；
 *     有鼠标事件时，清空定时器
 *具体：
 *  1.当鼠标移入轮播图时，清空定时器，移出时启动定时器
 *  2.当鼠标点击方向按钮，清空定时器，并启动一次定时器，向前或后一张图移动
 *  3.点击导航圆点时移动到对应轮播图
 **/
(()=>{
  //提前声明变量，并初始化赋值，便于日后修改和维护
  let bannerWidth="1226px",//将轮播区域宽度存储进声明的变量中
      moveWidth=parseInt(bannerWidth),//一次移动的宽度为轮播区域宽度
      dir=-1,//移动方向，默认-1向后轮播，即，轮播图向左移动
      N=0,//移动单位距离的数量，初始为0
      timer1=null,//定时器名称
      TRANS=300,//一次性定时器作用时间:300ms
      INTERVAL=3000,//
      //提前获取并存储元素，可简化后面代码（省略$）
      bannerImgs=$("#banners-img"),//获取轮播图片列表元素
      bannerInds=$(".indicators");//获取导航圆点列表元素
      // console.log("测试数据1:"+bannerImgs,bannerInds);
  function moveAuto() {
    //每调用一次该函数，就移动一次轮播图列表
    //每调用一次，N自增
    N++;
    //存储向左移动距离，注意：使用jquery 无需拼接单位！
    var left =dir*moveWidth*N;
    // console.log("测试数据2:"+left);
    bannerImgs.css({
        "left":left,
        // "transition":"all ." + TRANS / 100 + "s linear"
    });
    //找到导航圆点的连接元素'a'，清除其class名
    bannerInds.children("li").children(".ind")
        .removeClass("hover");
    //判断：如果调用次数N等于导航圆点的长度，执行下列代码
    if (N == bannerImgs.children(".banner-index").length-1) {
    // console.log("测试数据3:"
      // +bannerImgs.children(".banner-index").length - 1);
      //为第一个导航圆点添加 hover 的class
      bannerInds.children("li:first-child")
          .children(".ind").addClass("hover");
      //条件满足，启动一次性定时器，让轮播图列表瞬间移动到起始位置
      setTimeout(() => {
        //改变移动方向
        dir=1;
        //清除移动效果，实现'瞬间'移动（事实上仍需时间，需进一步优化处理）
        // bannerImgs.css({
        //    "transition":0
        // });
        N = 0;
        //位置重置后，再次启动一次性定时器，恢复正常移动效果
         setTimeout(() => {
           dir=-1;
           // bannerImgs.css("transition","all ." + TRANS / 100 + "s linear");
         }, 1);
      }, TRANS/100);
    }    else{//否则：给对应导航圆点添加hover效果
      // console.log("测试数据4：这是第"+(N+1)+"个导航圆点"
      //     +bannerInds.children("li").eq(N));
      bannerInds.children("li").eq(N)
          .children(".ind").addClass("hover");
    }
  }
  //启动定时器，每个时间段内调用一次移动函数
  //时间段注意要加上函数内一次性定时器所用时间
  timer1=setInterval(moveAuto,INTERVAL+TRANS/100);
  //return new Promise(resolve=>resolve(moveAuto));
  //鼠标移入和移出时的事件函数
  // 使用hover方法，可自动识别并执行移入和移出时要执行的事件处理函数
  $("#banners-img").hover(
      //第一个函数对应鼠标移入时触发的事件
      ()=>{
        //鼠标移入时，停止并清空定时器，使页面停止轮播
        clearInterval(timer1);
        timer1=null;
    },
      //第二个函数对应鼠标移出时触发的事件
      ()=>{
        //鼠标移出时，重启定时器，使页面继续轮播
        timer1=setInterval(moveAuto,INTERVAL+TRANS/100);
    }
  );
  //鼠标每次点击方向按钮时，做相应移动
  $(".btn-pre").click(function (e) {
    //首先阻止点击的默认行为，防止连续点击（即一次点击行为执行过程中，又一次收到点击）
    e.preventDefault();
    //每当点击按钮时，都要先清除定时器
    clearInterval(timer1);
    timer1=null;
    //判断:如果当前图片为第一张，移动到倒数第二张图
    if(N==0){
      //N=0对应下标为0，对应第一张轮播图
      //将N重新赋值为4，当调用移动函数时，自增为5，对应第六张轮播图
      N=4;
      //调用移动函数，使其瞬间移动到指定位置
      moveAuto();
      //移动后，重新启动定时器
      timer1=setInterval(moveAuto,INTERVAL+TRANS/100);
    }else{
      //N不为0，即点击按钮时，不是第一张图，就使其自减2
      //因为，调用移动函数时，N会自增，故，实际上只移动到前一张图片
      N-=2;
      //调用移动函数，使其瞬间移动到指定位置
      moveAuto();
      //移动后，重新启动定时器
      timer1=setInterval(moveAuto,INTERVAL+TRANS/100);
    }
  });
  $(".btn-next").click(function (e) {
    //首先阻止点击的默认行为，防止连续点击（即一次点击行为执行过程中，又一次收到点击）
    e.preventDefault();
    //每当点击按钮时，都要先清除定时器
    clearInterval(timer1);
    timer1=null;
    //判断:如果当前图片为第一张，移动到倒数第二张图
    if(N==5){
      //N=5对应下标为6，对应第最后一张轮播图（实为倒数第二张）
      //将N重新赋值为-1，当调用移动函数时，自增为0，对应第1张轮播图
      N=-1;
      //调用移动函数，使其瞬间移动到指定位置
      moveAuto();
      //移动后，重新启动定时器
      timer1=setInterval(moveAuto,INTERVAL+TRANS/100);
    }else{
      //N不为5，即点击按钮时，不是最后一张图，就使其自增
      //因为，调用移动函数时，N会自增，故，此处N无需自增
      //调用移动函数，使其瞬间移动到指定位置
      moveAuto();
      //移动后，重新启动定时器
      timer1=setInterval(moveAuto,INTERVAL+TRANS/100);
    }
  });
  //点击导航按钮时触发事件
  $(".indicators").on("click","li",(function (e) {
    //首先阻止默认行为
    e.preventDefault();
    //清空定时器
    clearInterval(timer1);
    timer1=null;
    //获取当前点击的导航圆点的位置，并使轮播图移动到相应位置
    N=$(this).index()-1;
    moveAuto();
    timer1=setInterval(moveAuto,INTERVAL+TRANS/100);
  }))
})();
/**
 *功能模块⑥：
 *位置:主体部分,左右轮播图
 *功能：无鼠标点击事件时，自动启动定时器，“左右摇摆”展示商品图；
 *     鼠标点击时,实现跳转
 *具体：
 *  1.鼠标移入,移出,按下等都不影响轮播
 *  2.仅当鼠标点击后,即鼠标按下再抬起后触发事件,实现跳转
 *  3.轮播移动后,当前位置方向按钮表现禁止样式,颜色灰淡,可移动方向的按钮颜色稍亮
 **/
(()=>{
  // 将反复用到的元素，提前获取并保存
  let ulSway=$("#banner-sway .ul-sway"),//获取轮播列表元素
      liSway=$("#banner-sway .ul-sway .li-sway"),//获取轮播列表项
      fLi=$(".f-li"),//获取方向按钮父元素列表
      dirLi=$("#super-product .f-li .dir-li"),//获取方向按钮
      //将用到的变量提前声明
      ulWidth=ulSway.css("width"),
      swayWith=parseInt(ulWidth)/2,
      left=0,
      S=0,
      timer2=null;
  //定义来回移动函数
  function swayMove() {
    //监控方向按钮，通过判断，控制按钮是否禁用
    // 判断：如果移动距离大于0，则向后按钮禁用
    //如果移动到初始位置，则向前按钮禁用
    //使禁用的按钮移除指定class，未被禁用的按钮添加指定class
    if(S==0){
      $(".dir-li:first-child").children("button")
          .attr("disabled",false)
          .addClass("change-color");
      $(".dir-li:last-child").children("button")
          .attr("disabled",true)
          .removeClass("change-color");
    }else{
      $(".dir-li:first-child").children("button")
          .attr("disabled",true)
          .removeClass("change-color");
      $(".dir-li:last-child").children("button")
          .attr("disabled",false)
          .addClass("change-color");
    }
    //让S自增
    S++;
    //判断：如果S自增到2，就让其自减2，置零，控制其值为0或1
    if(S>1){
      S-=2;
    }
    //每次调用该函数，都要根据S的变化给left重新赋值
    left=-S*swayWith;
    ulSway.css({
      "left":left,
      "transition":"all .5s linear"
    });
  }
  //启动定时器，调用左右移动函数
  timer2=setInterval(swayMove,5000+500);
  //给列表项绑定鼠标单击事件处理函数
  ulSway.on("click",liSway,()=>{
    alert("正在跳转到指定商品详情页 · · ·");
  });
  //给标题部分右侧方向按钮绑定单击事件
  fLi.on("click",dirLi,function(e){
    //阻止默认行为
    e.preventDefault();
    //清空定时器
    clearInterval(timer2);
    timer2=null;
    //无论点击哪个按钮，都调用来回移动函数,S会在调用后自增
    swayMove();
    //调用后重启定时器
    timer2=setInterval(swayMove,5000+500);
  })
})();
/**
 *功能模块⑦：
 *位置:主体部分,电梯楼层
 *功能：鼠标移入标题部分列表项时，在右下方列表中加载对应产品链接图
 *具体：
 *  1.监控ul-title列表，为其子元素.li-title绑定鼠标事件
 *    鼠标移入列表项，为当前li添加show-line的class，同时移除其兄弟元素的该class
 *  2.鼠标移入列表项，为对应下标的图片列表ul（.ul-right）添加f-show-ul的class，
 *    同时移除其兄弟元素ul的该class
 *  3.监听.ul-right列表，为其子元素.li-title绑定鼠标移入移出事件
 *    移入鼠标，用户评论板块显示，移出隐藏
 **/
(()=>{
  //将用到的变量，和要获取的元素，提前声明并保存
  let F=0,
      ulTitle=$("#section-floor .ul-title"),//各楼层标题部分列表
      liTitle=$("#section-floor .ul-title .li-title"),//标题列表项
      ulRight=$("#section-floor .floor-right .ul-right");//各楼层图片列表
  //监控各楼层的标题部分ul-title列表
  ulTitle.on("mouseover",".li-title",function () {
    //每次触发事件时，都将当前点击的列表项下标赋值给变量F
    F=$(this).index();
    // console.log(F);
    //为当前liTitle添加show-line的class,同时移除其兄弟元素的该class
    $(this).addClass("show-line")
        .siblings().removeClass("show-line");
    //找到当前点击的列表项的最外层容器.section-title，
    // 它与包含ul-right的外层容器.floor-main为兄弟关系
    $(this).parents(".section-title").siblings(".floor-main")
        .find(".ul-right").eq(F).addClass("f-show-ul")
        .siblings().removeClass("f-show-ul");
  });
  //给ulRight中的列表项.li-right绑定事件
  ulRight.on("mouseover",".li-right",function () {
    $(this).children(".article-hide").addClass("article-show");
  });
  ulRight.on("mouseout",".li-right",function () {
    $(this).children(".article-hide").removeClass("article-show");
  });
})();
/**
 *功能模块⑧：
 *位置:主体电梯楼层部分,手动左右轮播图
 *功能：无鼠标点击事件时，默认位置展示商品；
 *     鼠标点击时,实现对应移动，同时将不可移动方向的按钮禁用
 *具体：
 *  1.鼠标移入,移出不影响轮播
 *  2.仅当鼠标点击后触发事件,实现对应移动
 *  3.无法移动的方向的按钮表现禁止样式,颜色灰淡,可移动方向的按钮颜色稍亮
 **/
(()=>{
  // 将反复用到的元素，提前获取并保存
  let manualSway=$("#f6 .manual-sway"),//获取轮播列表元素
      manualLi=$("#f6 .manual-sway manual-li"),//获取轮播列表项
      f6Li=$("#f6 .f6-li"),//获取方向按钮列表项的父元素列表ul
      f6Dir=$("#f6 .f6-dir"),//获取方向按钮button的父元素li
      //将用到的变量提前声明
      manualWidth=manualSway.css("width"),
      moveWidth=parseInt(manualSway.css("width"))/3,
      sway=0,
      M=0;
  //定义来回移动函数
  function manualMove(width) {
    //每次调用，判断符合条件，在规定范围内对列表进行移动
    manualSway.css({
      "left":width,
      "transition":"all 0.3s linear"});
    //判断：如果大于2，就赋值为2;小于0，就赋值为0，控制其值为0,1，2
    if(M>2){
      M=2;
    }else if(M<0) {
      M = 0;
    }
    //监控方向按钮，通过判断，控制按钮是否禁用
    // 判断：如果移动距离大于0，则向后按钮禁用
    //如果移动到初始位置，则向前按钮禁用
    //使禁用的按钮移除指定class，未被禁用的按钮添加指定class
    //说明：以下/*xxxx*/中注释的代码可不执行，但加上更严密
     if(M==0){
       //M=0,禁用左按钮，并移除颜色变化的class（change-color）
       $(".f6-dir:first-child").children("button")
       .attr("disabled",true)
       .removeClass("change-color");
       /*//同时，将右按钮解除禁用，加上.change-color的class
       $(".f6-dir:last-child").children("button")
       .attr("disabled",false)
       .addClass("change-color");*/
     }
     else if(M==1){
       //如果M=1，说明左右方向均可移动，将左右按钮的禁用，加上颜色变化
       $(".f6-dir").children("button")
       .attr("disabled",false)
       .addClass("change-color");
     }
     else if(M==2){
       /*//如果M=2，将左按钮解除禁用，并移除颜色变化的class
       $(".f6-dir:first-child").children("button")
       .attr("disabled",false)
       .addClass("change-color");*/
       //同时将右按钮的禁用，并移除颜色变化的class
       $(".f6-dir:last-child").children("button")
       .attr("disabled",true)
       .removeClass("change-color");
     }
    }
  //给标题部分左方向按钮的父元素li绑定单击事件
  f6Li.on("click"," .f6-dir:first-child",function () {
    if(M<=1){M=0;}
    if(M>=2){M=1;}
    //console.log($(this),M);
    //每次调用该函数，都要根据M的变化给sway重新赋值
    sway=-M*moveWidth;
    //console.log(sway);
    manualMove(sway);
    //每点击一次调用函数后，将M自减
    M--;
  });
  //给标题部分右方向按钮的父元素li绑定单击事件
  f6Li.on("click",".f6-dir:last-child",function () {
    if(M<=1){M=1;}
    if(M>2){M=2;}
    //console.log($(this),M);
    //每次调用该函数，都要根据M的变化给sway重新赋值
    sway=-M*moveWidth;
    //console.log(sway);
    manualMove(sway);
    //每点击一次调用函数后，将M自增
    M++;
  });
  //给列表项绑定鼠标单击事件处理函数
  manualSway.on("click",f6Li,()=>{
    alert("正在跳转到指定商品详情页 · · ·");
  });
})();
/**
 *功能模块⑨：
 *位置:主体电梯楼层部分,八楼内容板块,四个手动轮播
 *功能：无鼠标点击事件时，默认位置展示商品；
 *     鼠标点击时按钮或导航圆点,实现对应移动
 *具体：
 *  1.鼠标移入显示翻页按钮,鼠标移出则隐藏
 *  2.当鼠标点击翻页按钮或导航圆点后触发事件,实现对应移动
 *  3.当前显示图片对应的导航圆点颜色,光标等样式改变(为其添加:.ind-show的class)
 *  4.显示第一张图时,左方向按钮禁用,显示最后一张图片时,右方向按钮禁用
 **/
(()=>{
  //提前声明和获取要用到的变量和元素
  let bannerLi=$(".f8-banner-li"),//获取要手动轮播的外层容器
      swayItem=$(".sway-item"),//获取可移动列表的父容器
      btnPre=$(".f8-btn-pre"),//获取左方向按钮
      btnNext=$(".f8-btn-next"),//获取右方向按钮
      inds=$(".f8-inds"),//获取导航圆点列表容器
      ind=$(".f8-inds>li"),//获取导航圆点父容器列表项li
      left=0,//轮播移动距离变量
      I=0,//记录导航圆点个数的变量
      N=0;//位置记录变量
  //1.鼠标移入轮播列表显示翻页按钮,移出则隐藏
  bannerLi.hover(
     //鼠标移入时触发的事件函数
     function(){
       //1.使该列表的翻页按钮显示
       $(this).children("button").show();
       //2.获取该列表项中导航圆点的个数,并保存进变量I中
       I=$(this).children(".f8-inds").children("li").length;
       //console.log(I);
     },
     //鼠标移出时触发的事件处理函数
     function(){
       //移出时隐藏该列表的翻页按钮
       $(this).children("button").hide();
     }
  );
  // 2.当鼠标点击翻页按钮或导航圆点后触发事件,实现对应移动
    //因为,四个轮播的隐藏列表项不都相同,
    // 因此,每次点击按钮或导航圆点后,都要立即获取当前图片的下标,存入N中
  //2.1:监控按钮点击事件
    btnPre.click(function () {
      //1.获取N的值(为导航圆点变大的父元素li在其父元素ul中的下标)
      N=$(this).siblings(".f8-inds").children("li")
        .children(".ind-show").parent("li").index();
      $(this).siblings(".f8-inds").children("li")
        .children(".f8-ind").eq(N).removeClass("ind-show")
        .parent("li").prev("li").children(".f8-ind")
        .addClass("ind-show");
      //每次点击后N自减
      N--;
      // 2.限制N的范围为0-(I-1)
      //如果点击时显示的是第一张或第二张图片,就禁用此按钮，否则，解除禁用
      if(N<1){
        N=0;
        $(this).attr("disabled",true);
      }else{
        $(this).attr("disabled",false);
      }
      //3.让轮播列表项在以上基础下进行移动
      left=-N*296;
      $(this).siblings(".sway-item").children(".sway-item-ul")
        .css("left",left);
      //4.解除右按钮的禁用
      $(this).siblings(".f8-btn-next").attr("disabled",false);
    });
    btnNext.click(function () {
      N=$(this).siblings(".f8-inds").children("li")
        .children(".ind-show").parent("li").index();
      $(this).siblings(".f8-inds").children("li")
        .children(".f8-ind").eq(N).removeClass("ind-show")
        .parent("li").next("li").children(".f8-ind").addClass("ind-show");
      // 1.每次点击该向前按钮就让N自增
      N++;
      // 2.限制N的范围为0-(I-1)
      //如果点击时显示的是最后一张(第I张)就让N=I-1
      if(N>=I-1){
        N=I-1;
        $(this).attr("disabled",true);
      }else{
        $(this).attr("disabled",false);
      }
      //3让轮播列表项在以上基础下进行移动
      left=-N*296;
      $(this).siblings(".sway-item").children(".sway-item-ul")
        .css("left",left);
      //4.解除左按钮的禁用
      $(this).siblings(".f8-btn-pre").attr("disabled",false);
    });
    ind.click(function () {
      $(this).children(".f8-ind").addClass("ind-show");
      $(this).siblings("li").children(".f8-ind")
        .removeClass("ind-show");
      N=$(this).index();
      left=-N*296;
      $(this).parent(".f8-inds").siblings(".sway-item")
        .children(".sway-item-ul").css("left",left);
      if(N==0){
        $(this).parent()
          .siblings(".f8-btn-pre").attr("disabled",true)
          .siblings(".f8-btn-next").attr("disabled",false);
      }
      else if(N==I-1){
        $(this).parent()
          .siblings(".f8-btn-pre").attr("disabled",false)
          .siblings(".f8-btn-next").attr("disabled",true);
      }else{
        $(this).parent()
          .siblings("button").attr("disabled",false);
      }
    });
})();
/**
 *功能模块⑩：
 *位置:主体电梯楼层部分,九楼内容板块,四个视频
 *功能：无鼠标点击事件时，默认位置展示商品；
 *     鼠标点击时调出视频隐藏区域
 *具体：
 *  1.点击视频,显示视频隐藏区域
 *  2.记录当前点击视频列表项的下标
 *  3.将相应下标的要播放的视频的容器添加video-show的class
 *  4.为本楼层标题部分的'查看更多视频'链接绑定鼠标移入移出事件
 **/
(()=>{
  // 为本楼层标题部分的'查看更多视频'链接绑定鼠标移入移出事件
  $("#f9 .look-more>a").hover(
    function () {
      $(this).children("i").css({
        background:"#ff6700",
        transition: "all .4s"
      });
    },
    function () {
      $(this).children("i").css({
        background:"#b0b0b0",
        transition: "all .4s"
      });
    }
  )
//点击视频,显示视频隐藏区域
  $(".video-ul").on("click",".video-li",function (e) {
    e.preventDefault();
    //获取当前点击列表项的下标index
    var v=$(this).index();
    //为视频区对应下标的视频父元素添加指定class("video-show")
    $("#video-hide").children(".video-area").eq(v)
      .addClass("video-show").siblings().removeClass("video-show");
    //显示隐藏视频区域
    $("#video-hide").show();
    //重新加载视频
    //通过DOM进操作
    var Media = document.getElementsByClassName("media")[v];
    Media.load();
    //监控视频,如果播放完毕就显示播放按钮
    Media.onended = function() {
      //elem.style通常不用做读取css属性值,仅用作修改css属性值: 独有，优先级最高
      this.nextElementSibling.style.display="block";
    };
    //将播放按钮显示
    $(".btn-play").show();
  })
})();
/**
 *功能模块⑪：
 *位置:body视频隐藏区域
 *功能：无鼠标点击最后一层楼视频列表项时，默认隐藏该区域
 *     鼠标点击时调出视频隐藏区域
 *具体：
 *  1.点击视频,显示视频隐藏区域
 *  2.加载视频区域,默认不播放,显示海报(实为自定义图片决对定位覆盖)
 *  3.默认不显示播放控件,自定义播放按钮定位于海报图片之上
 *  4.点击播放按钮,隐藏海报和播放按钮,同时开始播放视频
 *  5.为视频标签绑定鼠标事件,播放时,当鼠标在视频区移动时,显示播放控件
 **/
(()=>{
  //原生JS
 /* //最外层元素div
  var videoSize = document.querySelector(".video-size");
  //按钮
  var btnPlay = document.querySelector(".btn-play");
  //视频
  var video= document.querySelector(".video-size>video");
  //点击按钮(原生js)
  videoSize.onclick = function(e){
    e.preventDefault();
    //判断当前视频如果暂停状态,播放视频并隐藏按钮
    if(this.firstElementChild.paused){
      this.firstElementChild.play();
    }else{
      //5:如果当前视频如果播放状态，暂停视频并显示按钮
      this.firstElementChild.pause();
    }
  }*/
// 用jQuery+DOM
  let videoSize=$(".video-size");
  videoSize.click(function () {
    //点击时判断
    //如果页面有播放按钮,则点击后隐藏,同时播放视频
    if($(this).children(".btn-play").css("display")=="block") {
      $(this).children(".btn-play").css("display","none");
      $(this).children("video").trigger("play");
    }
    //如果点击时没有播放按钮,则将其显示并暂停视频
    else if($(this).children(".btn-play").css("display")=="none"){
      $(this).children(".btn-play").css("display","block");
      $(this).children("video").trigger("pause");
    }
  });
    //为videoSize绑定鼠标事件
    var timer;
    videoSize.on("mousemove","video",function () {
        var that = $(this);
        clearTimeout(timer);
        that.attr("controls", true);
        timer =setTimeout(() => {
          that.attr("controls", false);
        }, 3000)
    });
    videoSize.on("mouseout","video",function () {
        var that = $(this);
        clearTimeout(timer);
        that.attr("controls", true);
        timer =setTimeout(() => {
          that.attr("controls", false);
        }, 1000)
    });

  $(".video-close").hover(
    function () {
      $(this).css({
        background:"#ff6700",
        color:"#fff"
      })
    },
    function () {
      $(this).css({
        background:"none",
        color:"#757575"
      })
    }
  );
  // 为标题部分关闭按钮绑定点击事件(关闭视频并隐藏视频区域)
  $(".video-hd").on("click",".video-close",function (e) {
    //阻止默认跳转
    e.preventDefault();
    //暂停视频
    $(this).parent().siblings().children("video")
      .trigger("pause");
    $(this).parent().siblings().children("video")
    //隐藏视频区域
    $("#video-hide").hide();
  })
})();
/**
 *功能模块⑫：
 *位置:body
 *功能：阻止无效超链接的默认跳转
 *     指定有效超链接都在新的窗口中打开
 **/
(()=>{
  //为所有的“<a href="#"></a>”超链接阻止默认跳转,其他，指定跳转都打开新窗口
  $("a").click(
      function (e) {
        if($(this).attr("href")=="#"){
          e.preventDefault();
        }else{
          $(this).attr("target","_blank");
        }
      }
  )
})();