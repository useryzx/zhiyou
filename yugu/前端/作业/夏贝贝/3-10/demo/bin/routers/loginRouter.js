// 注册的路由
var express =require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router =express.Router();
// 数据库创建表
var AccountModel =require('../models/account');
// 注册的接口

router.post('/api/login',function(req,res){
    // 判断用户是否存在
    AccountModel.findOne({name:req.body.name,psw:req.body.psw}).
    exec(function(err,data){
        console.log('登陆');
        
        if (data) {
            // 有用户
            req.session.user = data;
            res.send('<h1>登陆成功了</h1>')
        }
        else{
            req.session.user = data;
            res.send('<h1>账号或密码错误</h1>')
        }
    })
});
module.exports =router;