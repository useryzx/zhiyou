// 圆形绘制Circle
// 圆心  半径
// 类:具有相同属性和行为特征的集合
function Circle(center,r){
   
    // 先绘制div
    this.div =document.createElement('div');
    this.div.style.position ='absolute';
    this.div.style.borderRadius ='50%';
    //left top >>>传递的值是中心点
    this.div.style.left =center.x -r+'px';
    this.div.style.top =center.y -r+'px';
    // 宽高
    this.div.style.width =r*2 +'px';
    this.div.style.height =r*2 +'px';
    this.div.style.border ='solid 1px black';
    // 显示方法
    this.draw =function(){
        document.body.appendChild(this.div);
    }
   
}