/**
 * Created by Administrator on 2019/4/2.
 */

(function(){
    $.fn.slide = function( options ){

        $(this).each(function(ins, element){
            // 执行函数赋值
            show( element, options );
        })
        // 创建函数时，声明变量(函数参数本质 就是变量)
        function show(ele, opt){

            var settings = {
                direction:'left',  // 轮播图方向
                speed:500
            }
            // 合并对象
            $.extend( settings, opt );
            console.log( settings )

            var $ul = $(ele).find('.list');
            var $prev = $(ele).find('.prev');
            var $next = $(ele).find('.next');

            var length = $ul.children().length;
            var li_width = $ul.children().width()
            var li_height = $ul.children().height();


            if( settings.direction === 'left' ){
                $ul.css({
                    width:li_width * length
                })
                var juli = li_width;
            }else {
                $ul.css({
                    height:li_height * length
                })
                var juli = li_height
            }

            // animate({left:-li_width})
            // css({left:0})
            var dir1 = {}, dir2 = {};
            dir1[settings.direction] = -juli;
            dir2[settings.direction] = 0;


            $next.click(function(){
                $ul.animate( dir1 , 500, function(){
                    $(this).children().first().appendTo($ul);
                    $(this).css( dir2 )

                })

            })

            $prev.click(function(){
                $ul.css( dir1 ).children().last().prependTo($ul);
                $ul.animate(dir2, 500)
            })


        }

        return $(this);

    }
})();


