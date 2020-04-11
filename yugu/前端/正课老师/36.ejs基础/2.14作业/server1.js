var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("www"));
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000, function (err) {
    console.log("running...");

});
app.post('/users/inform',function(req,res){
    var obj =req.body;
    var fileName =obj.username +'.txt';
    var isCun =fs.existsSync('users');
    if (!isCun) {
        fs.mkdir("users",function(err){
            if (err) {
                return res.json({
                    error:1,
                    message:"学生文件夹创建失败"
                });
            } 
        });
    }
    var isFile =fs.existsSync("users/"+fileName);
    if (isFile) {
        return res.json({
            error:1,
            msg:"学生已注册，请重新输入"
        });
    }
    fs.appendFile("users/"+fileName,JSON.stringify(obj),function(err){
        if (err) {
            return res.json({
                error:1,
                msg:"注册失败"
            });
        }
        res.json({
            error:0,
            msg:"注册成功，请查看信息"
        });
    });

});
