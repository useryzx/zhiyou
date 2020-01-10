var states = [
    
    {
        '$zIndex': 2,
        width: 130,
        height: 170,
        top: 61,
        left: 0,
        $opacity: 0.6
    }
    ,
    {
        '$zIndex': 3,
        width: 170,
        height: 218,
        top: 37,
        left: 110,
        $opacity: 0.7
    }
    ,
    {
        '$zIndex': 4,
        width: 224,
        height: 288,
        top: 0,
        left: 262,
        $opacity: 0.7
    }
    ,
    {
        '$zIndex': 3,
        width: 170,
        height: 218,
        top: 37,
        left: 468,
        $opacity: 0.7
    }
    ,
    {
        '$zIndex': 2,
        width: 130,
        height: 170,
        top: 61,
        left: 620,
        $opacity: 0.6
    }
    
];
function show(){
    console.log(states);
    states.forEach(function(item,index){
        $("li").eq(index).css("z-index",item["$zIndex"]).children().css("opacity",item["$opacity"]).parent().animate(item,500);
    })
}
show();
$(".next").click(function(){
    states.unshift(states.pop());
    show();
})
$(".prev").click(function(){
    states.push(states.shift());
    show();
})