// 矩形 x y  width  height
function Rect(x,y,width,height)
{
    this.div =document.createElement('div');
    this.div.style.position ='absolute';
    //left top >>>传递的值是中心点
    this.div.style.left =x+'px';
    this.div.style.top =y+'px';
    this.div.style.height =height +'px';
    this.div.style.width =width +'px';
    this.div.style.border ='solid 1px black';
    this.draw =function(){
        document.body.appendChild(this.div);
    }

    var div =this.div;//copy
    this.beginLoop =function(){
        var currentTag =0;
        setInterval(function() {
            currentTag +=9;
            // this.div在定时器里会把this释放掉
            div.style.transform ='rotate('+currentTag+'deg)';
        }, 100);
    }
    this.stopLoop =function(){
        
    }

}
