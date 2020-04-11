// 专门用来设置点
function Point(x,y){
    this.x =x;
    this.y =y;

     this.distanceToPoint =function(p){
        //  开平方
        return Math.sqrt((p.x-this.x)*(p.x-this.x) +
        (p.y-this.y)*(p.y-this.y));
     }
     this.atanToPoint =function(p){
           var dx =p.x -this.x;
           var dy =p.y -this.y;
        //    正切角度
           var angle =Math.atan(dy/dx);
           angle =angle/Math.PI*180;
           if (this.x >p.x) {
               angle+=180;
           }
           return angle
     }
}