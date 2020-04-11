// httpRequest.js
/*&
http模块也是nodejs自带的模块之一,用于创建http服务
该协议规定了请求方和响应方在交互的时候应该遵循的规则

请求报文:请求行 请求头 空行 请求正文
响应报文:状态行,响应头,空行,响应正文
*/ 
var http =require("http");

// 架设服务器 server服务  client:客户端(浏览器)
// createServer 创建一个基于http协议的服务器 
// request:请求：里面包含有此次请求的内容
// response:响应:里面包含有此次响应的内容
// 该服务架设好之后app启动之后会监听服务器有没有收到请求，收到
// 请求之后可以在此次监听的函数里面为请求者准备返回的数据
var app =http.createServer(function(req,res){
    // statusCode:状态码
    console.log("我是服务器我收到了请求:"+res.statusCode);
    // 指定返回数据才是构建服务器的核心
    /*
     准备数据返回给客户端，end方法，用于向响应体内插入数据
     把数据返回给客户端，并结束此次请求
     默认返回是html格式 可以直接返回现成的网页，也可以嵌入标签
    */
//    配置响应头  让其支持中文
     res.setHeader("Content-type","text/html;charset=utf-8");
    res.end("<h1>欢迎来到我的直播间,刷刷礼物，增进感情!!!</h1>");
});

// 部署：服务器启动，把所有的接口打开，客户端可以访问
// listen监听  服务器一定要确保一直启动 
// 第一个参数8080是端口号:计算机中每一个应用程序计算机都分配的
// 有一个编号，相当于序号，方便计算机查找
// 第二个参数的是一个回调,成功之后会返回
app.listen(8080,function(err){
    if (err) {
        console.log("启动失败"+err);
        
    } else {
        console.log("running...");
    }
});

/*
   1.架设服务器
   一定要明白nodejs是为了支撑服务器端而存在的
   2.部署成功
   3.访问服务器获得对应的内容 
   ctrl+c关闭服务器

*/ 
