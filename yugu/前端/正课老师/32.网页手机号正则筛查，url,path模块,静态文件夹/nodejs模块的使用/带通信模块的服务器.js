var http =require("http");
var fs =require("fs");
var path =require("path");
var url =require("url");
// 架设服务器:用户访问服务器的时候可以从服务器上拿到
// 当前文件路径下面的www文件夹里面的一个叫做123.txt的文本
// 上述的文本和文件夹如果没有则创建，有的话则直接使用

var str ="./www";
var str2 ="123.txt";
// 构建服务器
var app =http.createServer(function(req,res){
    // 拼接文件路径
    var filePath =path.join(str,str2);
    res.setHeader("Content-type","text/html;charset=utf-8");
//    如果该路径下面没有这个文件，则创建并写入
    fs.readFile(filePath,function(err,data){
        if (err) {
            fs.writeFile(filePath,"大家对于课件的理解还需要加强",
            function(err){
                if (!err) {
                    res.end("文件已经出现了，可以查看");
                    // res.end(data);
                }
            });
            // 写
            
        } else {
            res.end(data);
        }
    });
});
app.listen(8080,function(err){
    console.log("running");
    
});
// 启动服务器