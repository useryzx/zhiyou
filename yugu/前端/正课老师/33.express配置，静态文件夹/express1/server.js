// 使用express:基于 Node.js 平台，快速、开放
// 、极简的 Web 开发框架
var express =require("express");
// 创建服务器对象(使用http架设服务需要在creatServer
// 函数中写很多的逻辑 而express直接获取就可以)
var app =express();
// 为服务器设置静态文件夹() static是静态函数  里面填写文件夹名称
// 可以放html,js,css,jpg...
// 相比较http要指定静态文件夹去读取index.html文件
// 要写很多代码的情况下 express直接设置一下就可以了
app.use(express.static("www"));
// 启动服务器
app.listen(8080,function(){
    console.log("running...");
});
// express服务器主要就是写接口方便
// 使用http的话访问首页需要把首页url补全
// 使用express因为配置了静态文件夹 同时配置文件中
// 也设置了文件，只需要关注创建文件夹创建文件就可以了
// 省去了查找的代码

// 接口:服务器提供的一个服务被包裹在方法内，对外公开的一个链接

// get表明当前接口是get类型  需要以get请求的形式去访问
// get请求数据是直接追加到url后面的,以字符串的形式来代表地址
// 1.代表该接口的名称  >>服务器主机地址的下一层目录
//2.接口被调用时候的回调函数
app.get("/test",function(req,res){
    // req:请求对象  res:响应对象
    // req.query:代表查询此次请求的数据对象(get)
    // http://localhost:8080/test?username=ahuan
    // get请求以?来分割当前url地址 
    // ?左侧代表的是服务器地址以及接口
    // ?右侧代表的是此次请求的数据的键与值(键与值都是服务器规定)
    // http://localhost:8080/test?username=ahuan&psw=123
    // 每一个键与键之间使用&隔开
    // 可以根据键名打印出来此次请求的请求数据
    console.log(req.query.username);
    // send和end用途相似都是返回数据并结束此次请求
    res.send("这是大家写的第一个接口");
});
// 写一个get接口,接口名称为api 参数分别为phone手机号
// userId:学号 color:最喜欢的颜色
// res.send返回一个手机号为xx的学生，学号为xx,最喜欢的颜色为xx
app.get("/api",function(req,res){
    console.log(req.query.phone);
    console.log(req.query.userId);
    console.log(req.query.color);
    res.send("这是大家写的第2个接口");
});