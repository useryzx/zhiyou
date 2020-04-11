// 导入文件模块
var fs =require("fs");
var http =require("http");
var app =http.createServer(function(req,res){
    // http报文的头文件
    res.setHeader("Content-type","text/html;charset=utf-8");
    fs.readFile("./2.跑马灯效果.html",function(err,data){
        if (!err) {
            res.end(data);
        }
    });
});
app.listen(3000,function(err){
    if (!err) {
       console.log("running...");
       
    }
});