var express=require("express");
var app=express();
// 设置ejs引擎
app.set('view engine','ejs');
// post请求
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
// 数据库也要跑起来
// 因为项目结构比较清晰每个文件有每个文件的用途，所以在这里面只要导入的时候路径不出错，那么文件里面的功能都会正常执行
var Msg=require("./bin/DAO/MsgDAO.js");
var util=require("./bin/utils.js")
// 首页接口
app.get('/',function(req,res){
    // 查数据
    Msg.find().exec(function(err,data){
        if (err) {
            console.log(err);
        }
        else{
            res.render('Msg.ejs',{data});
        }
    })
});
app.post("/api/msg/commit",function (req,res) {
    if (!req.body.msg) {
        return;
    }
    // ip time 留言
    var time=util.getTimeStr();
    var ip=util.getIpFormStr(req.ip);
    // 准备对象
    var m=new Msg({
        ip,
        time,
        msg:req.body.msg
    }).save(function (err) {
        if (!err) {
            // 回调
            res.redirect("/")
        }
    })
})
app.listen(8080,function (err) {
    console.log("running...");
})