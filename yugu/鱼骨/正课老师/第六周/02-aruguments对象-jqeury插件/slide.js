
// 匿名函数的自我调用
// 保护内部数据不被篡改，避免出现全局变量或全局函数，污染全局作用域
(function(){

    $.fn.autoSlide = function(){

        console.log( $(this) )
        // 通过each方法，循环遍历获取每个标签

        $(this).each(function(ins, element){
            // console.log( element );
            show( element );

        })
        function show( ele ){
            // ele 当前的div的标签
            console.log( ele );

            var $ul = $(ele).find('.list');
            var $prev = $(ele).find('.prev');
            var $next = $(ele).find('.next');

            var li_width = $ul.children().width();
            var length = $ul.children().length;
            $ul.css({
                width:li_width * length
            })

            $next.click(function(){
                $ul.animate({
                    left:-li_width
                }, 500, function(){
                    $(this).children().first().appendTo( $ul );
                    $(this).css({
                        left:0
                    })

                })

            })
            $prev.click(function(){
                $ul.css('left', -li_width ).children().last().prependTo( $ul );
                $ul.animate({
                    left:0
                }, 500)
            })
        }

        return $(this);
    }


})();

