// 拿到模块化对象
var util =require("./bin/util.js");
var express =require("express");
var fs =require("fs");
var ejs =require("ejs");
// 获得服务器对象
var app =express();
// 为服务器配置模板文件夹 set相当于为服务器添加功能
app.set("view engine","ejs");
// app.use();配置中间件，有一定过渡的效果后面会详细讲到
// 基础接口，当用户访问的时候可以把ejs模板映射上去
// 导入支持post请求的功能模块
var bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
var msgArr;
// 当服务器启动保存用户留言的数据会初始化成功
fs.readFile("./msg.json",function(err,data){
    if (err) {
        msgArr =[];
    } else {
        // 反序列化
        msgArr =JSON.parse(data);
    }
})
// 当发送成功的时候回调触发会再次激活该接口
app.get("/",function(req,res){
    res.render("msg.ejs",{msgArr});
});
// 提交信息的接口  post
app.post("/api/msg/commit",function(req,res){
    // 提交能提交过来ip 和内容,时间(需要服务器生成)
    // req对象返回的ip属性不是纯粹的ip
    // console.log();::1
    // 使用localhost会触发回路ip 拿不到
    var ipReg =/(\d{1,3}\.){3}\d{1,3}/;
    //req.ip正则后可以理解为是一个json类型的对象
    var ip =ipReg.exec(req.ip)[0];
    // 时间>>>>开发中像获取时间这种功能都可以封装成模块，方便实用
    var time =util.getTimeString();
    // 考虑到要从本地去获取数据所以把所有的信息封装成对象会比较好处理
    var msgObj ={
        // es6之后如果属性和属性值的变量相同，可以只写一个
        ip,
        time,
        msg:req.body.msg
    }
    msgArr.push(msgObj);
    // 序列化
    var jsonData =JSON.stringify(msgArr);
    // 写入
    fs.writeFile("./msg.json",jsonData,function(err,data){
        if (err) {
            console.log(err);
            
        } else {
            // 回调刷新当前网址
            res.redirect("/");
        }
    });
});
app.listen(3000,function(){
    console.log("running...");
    
});