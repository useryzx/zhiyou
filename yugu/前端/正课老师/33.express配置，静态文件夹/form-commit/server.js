// 构建服务器，部署一个叫做api1的接口
var express =require("express");

var app =express();

app.use(express.static("www"));
// 启动服务器
app.listen(8080,function(){
    console.log("running...");
});
app.get("/form-commit",function(req,res){

    res.send("这是提交接口:"+req.query.commitCount);
});