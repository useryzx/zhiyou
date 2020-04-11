// 导出的数据可以是任意类型，导出的数据是什么类型，导入的时候
// 就是对应的类型
var num =10;
var str ="str";
var arr =[1,2,3];
var obj ={
    name:"xiabei",
    age:30
}
/*
module.exports只能导出一套数据，如果文件里面有多个数据
可以把这些数据封装成为一个大的对象，
es6之后如果属性和属性值所属的变量相同直接写属性名称就可以了
*/ 
// var obj2 ={
//     num,
//     str,
//     arr,
//     obj
// }
var js2Str =require("./2.js");


module.exports ={num,str,arr,obj,js2Str}