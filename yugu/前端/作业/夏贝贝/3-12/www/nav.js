$('li').each(function(index,el){
    //console.log(index);
   // console.log(el);
    $(this).click(function(){
        $('li').eq(index).addClass('show').siblings().removeClass('show')

    })
    
    
})