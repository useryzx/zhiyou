var http =require("http");
var fs =require("fs");
var path =require("path");
var url =require("url");
//1.部署服务器
// 2.添加接口
var app=http.createServer(function(req,res){
    // 把url转成一个url对象
    var urlObj =url.parse(req.url);
    // 路径  /
    // 用户访问我的服务器>>要把index.html文件返回给用户
    // ?/www/index.html    www/
    //因为www文件夹存在，路径我们也已经写成固定的了
    // 所以url请求里面不需要在localhost:8080/www/index.html
    // 静态文件夹功能
    var filePath =path.join("./www",urlObj.pathname);
    console.log(filePath);
    
    // 读取  必须要确保filePath能准确的指向index。html才不会报错
    fs.readFile(filePath,function(err,data){
        if (err) {
            // 设置响应头告诉请求者哪里出错
            res.writeHead(404,{
                // 对象属性  所以,要换成:  text/plain文本类型
                "Content-type":"text/plain;charset=utf-8"
            });
            res.end("地址出错了,请重新检查一下");
        } else {
            res.writeHead(200,{
                // 对象属性  所以,要换成:  text/plain文本类型
                "Content-type":"text/html;charset=utf-8"
            });
            res.end(data);
        }
    });
    
});
app.listen(8080,function(err){
    console.log("running");
    
});

// 搞清楚get和post的区别