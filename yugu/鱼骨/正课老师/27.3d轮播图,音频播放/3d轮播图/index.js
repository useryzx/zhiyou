// 样式数组 一个图片是一个对象(大小，位置信息)
var states =[
    {
        '$zIndex':1,
         width:120,
         height:150,
         top:71,
         left:134,
         $opacity:0.5
     }
     ,
     {
        '$zIndex':2,
         width:130,
         height:170,
         top:61,
         left:0,
         $opacity:0.6
     }
     ,
     {
        '$zIndex':3,
         width:170,
         height:218,
         top:37,
         left:110,
         $opacity:0.7
     }
     ,
     {
        '$zIndex':4,
         width:224,
         height:288,
         top:0,
         left:262,
         $opacity:0.7
     }
     ,
     {
        '$zIndex':3,
         width:170,
         height:218,
         top:37,
         left:468,
         $opacity:0.7
     }
     ,
     {
        '$zIndex':2,
         width:130,
         height:170,
         top:61,
         left:620,
         $opacity:0.6
     }
     ,
     {
        '$zIndex':1,
         width:120,
         height:150,
         top:71,
         left:496,
         $opacity:0.5
     }
];
function show() { 
    states.forEach(function(item,index){
        // children()元素的子元素
        //  $('li').eq(index)根据索引拿到li
        // $('li').eq(index).css('z-index',item['$zIndex']) 
        // 为每个li设置z-index
        //  $('li').eq(index).css('z-index',item['$zIndex'])
    //    .children() 找到每个li里面的img
       $('li').eq(index).css('z-index',item['$zIndex'])
       .children().css('opacity',item['$opacity']).su
    //    item :过渡动画 
       .parent().animate(item,500);
    });
 }
 show();
 $('.next').click(function(){
    //  在数组的开始位置添加下一个元素
    // states.pop() 最后一个元素会返回
     states.unshift(states.pop());
    //  将调换顺序的数组样式，重新赋值给li标签
     show();
 })
 $('.prev').click(function(){
    //  在数组的开始位置添加下一个元素
    // states.pop() 最后一个元素会返回
     states.push(states.shift());
    //  将调换顺序的数组样式，重新赋值给li标签
     show();
 })
