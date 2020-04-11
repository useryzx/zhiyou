/*
nodeJS是谷歌研发的让js能在服务端进行开发的一种技术
程序员可以用nodejs来写后台，提供了文件系统，网络系统
等操作，拓展性也比较强。
*/
console.log("hello nodeJS");
// nodejs文件并不依赖于浏览器，浏览器的一切api都不能使用
// 例如:alert  document  window
// alert("能弹吗？");

// nodejs当中的全局对象并不是window  
// 而是一个global对象
function f1(){
    console.log("我是谁:"+this);
}
f1();
console.log(global);

// 在终端上面打印出来9*9乘法口诀表
for(var i =1;i<10;i++){
    var a ="";
    for(var j =1;j<=i;j++)
    {
       a+=j +"*"+i+"="+i*j+"\t";
    }
    // 每一次i走一遍之后  下一次log的时候自动换行 
    console.log(a);
    
}