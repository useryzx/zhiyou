// json解析
var obj={
    name:"佳仪",
    age:22,
    hobby:["吃","喝","玩","乐"],
    speak:function(){
        console.log("正在讲解json知识点");
        
    }
}
// 把对象写入本地
var fs=require("fs");
// 对象是一个复杂的数据类型，假如把对象进行存储，直接存储进去数据是不正确的
// fs.writeFile("./obj.txt",obj,function(err){
//     if (err) {
//         console.log(err);       
//     }
// })

// 写入对象这种复杂的数据类型可以考虑使用json
// json：一种数据集合：内置对象，用途是把对象进行json格式的序列化操作
// stringify序列化方法，用途是把对象转换成字符串
var jsonStr=JSON.stringify(obj);
// fs.writeFile("./obj.txt",jsonStr,function(err){
//     if (err) {
//         console.log(err);       
//     }
// })
// 读取：反序列化过程，把字符串转换成对象
fs.readFile("./obj.txt",function(err,data){
    if (err) {
        console.log(err);
    } else {
        // 需要一个buffer数据对data进行初始化
        // var buf=new Buffer(data);
        // 反序列化
        // json解析的时候一定要清楚json数据的结构组成
        var obj2=JSON.parse(data.toString());
        console.log(obj2.name);     
    }
});
/*
    数据在写入磁盘或者网络传输时，使用的数据格式都是二进制，如果数据换成对象，没办法对当前对象进行编码
    序列化的出现解决了对象转成字符串可以进行编码的问题
    反序列化：把字符串变为原有的对象
    当对象进行序列化之后再去进行数据传输，就没有问题了，这就是json的原理

    json格式里面符号所代表的数据类型
    {}：代表对象  []:代表列表  属性名：属性值
*/



var obj ={
    name:"夏贝贝",
    age:30,
    hobby:["健身","游戏","写代码","看书"],
    speak:function(){
        console.log("正在讲解json知识点");    
    }
}
// 数组也是一个对象
var objArr =[];
for(var i=0;i<5;i++){
    objArr.push(obj);
}
// 把对象写入到本地
var fs =require("fs");
fs.readFile("./obj.txt",function(err,data){
    if (err) {
        console.log(err); 
    } else {
        //json解析的时候 一定要清楚json数据的结构组成
        // 数组对象
        var objArr2 =JSON.parse(data.toString());
        objArr2.forEach(function(el) {
            console.log(el.name);
        });
    }
});