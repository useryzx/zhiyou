// path模块:主要是用来设置路径的
// ./代表当前目录  ../表示上层目录
// __dirname:表示当前文件所在的绝对路径
/*
  绝对路径:有完整的路径，以盘符开头，完整的表示出文件所在的位置
  相对路径:不完整的路径，只记录路径结尾部分,忽略层级关系
  例如:/nodejs/nodejs.exe
*/ 
console.log(__dirname);
// 专门用来处理文件路径的,nodejs自带的模块
var path =require("path");
var p1 ="abc/123";
var p2 ="qwe/456";
// path模块提供两处路径合并一个的能力
var p3 =path.join(p1,p2);
// console.log(p3);
var p4 ="./abc/发如雪.mp3";
// 把文件的相对路径转成绝对路径
console.log(path.resolve(p4));
// 获得当前文件的扩展名
console.log(path.extname(p4));
// 这个课件是在教大家使用path的功能来填补路径以方便日后写
// 服务器在处理文件的时候更加的高效，
// 获得当前文件的文件名
console.log(path.basename(p4));







