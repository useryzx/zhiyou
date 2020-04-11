// 线段:起点和终点
function Line(p1, p2) {
    //    p1 可以作为起点(left top)  p2作为终点(width)
    this.div = document.createElement('div');
    this.div.style.position ='absolute';
    //left top >>>传递的值是中心点
    this.div.style.left =p1.x+'px';
    this.div.style.top =p1.y+'px';
    this.div.style.border ='solid 1px black';
    this.div.style.height =0 +'px';
    // 宽度:p1到p2的某个轴的水平方向的距离
   this.div.style.width =p1.distanceToPoint(p2)+'px';
//    传入角度>>>弧度
   var angle =p1.atanToPoint(p2);
   this.div.style.transform ='rotate('+angle+'deg)';
//    旋转起始点
   this.div.style.transformOrigin ='0 0 0';

   this.draw =function(){
    document.body.appendChild(this.div);
}
}