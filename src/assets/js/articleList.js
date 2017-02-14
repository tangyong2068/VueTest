$(function(){
  $(".yby-table").each(function(){
    var height=$(this).height();
    var relheight=height+25;
    $(this).prev(".yby-mainborder").css("height",relheight+"px");
    $(this).parent(".yby-box").css("height",relheight+"px");
  });
});
