var express =require("express");
var md5 =require("md5");
// session是基于cookie技术的一种服务器存储技术，可以为每个服务器创建一个存储对象，用于存储用户的信息
// cookie(服务端>>>客户端存储)
// session(服务端去存储)
var session =require('express-session');
var app =express( ) ;
var bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("www"));
// express-session模块 可以自动把http请求转为session对象  该对象的保留在req.session
app.use(session({
    // 是否描述
    secret:"qwer",
    // 是否要重写[内部的数据]
    resave:false,
    // 数据初始化
    saveUninitialized:true
}));
var User=require("./bin/DAO/UserDAO.js");
// 注册
app.post("/api/register",function (req,res) {
    req.body.psw=md5(req.body.psw);
    User.findOne({userName:req.body.userName}).exec(function (err,data) {
        if (data) {
            res.send("账号已注册")
        } else {
            new User(req.body).save(function (err) {
                if (!err) {
                    res.redirect("/Login.html")
                }
            })
        }
    })
});
app.post('/api/login',function(req,res){
    req.body.psw=md5(req.body.psw);
    User.findOne({userName:req.body.userName}).exec(function (err,data) {
        if (data) {
            // 存储数据
            // 因为为req配置了session服务，所以session是一个对象
            // 使用session之后相当于req再给res发数据得时候多了一种方式（简单）
            // req:请求对象  session:配置得用来存储数据的对象
            // user:自定义属性
            req.session.user=data;
            res.send('登陆成功，第三方接口打开')
        } else {
            res.send('账号或密码错误')
        }
    })
})
app.get('/api/afterLogin',function(req,res){
    if (req.session.user) {
        res.send('欢迎'+req.session.userName+'来到用户中心')
    }
    else{
        res.send('请去登录')
    }
})
// 退出
app.get('/api/loginOut',function(req,res){
    if (req.session.user) {
        delete req.session.user
        res.send('退出成功')
    }
    else{
        res.send('请先登录') 
    }
})
app.listen(3000,function () {
    console.log("running...");
})
