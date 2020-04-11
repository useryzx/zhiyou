// 注册的路由
var express =require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router =express.Router();
// 数据库创建表
var UserModel =require('../models/UserModel');
// 注册页面路径跳转
router.get('/user/zhuce',function(req,res){
    res.render('register',{
        title:'注册'
    });
});
// 注册的接口
router.post('/user/register',function(req,res){
    // 判断用户是否存在
    UserModel.findOne({username:req.body.username}).
    exec(function(err,data){
        if (data) {
            // 有用户
            return res.json({
                error:1,
                msg:'用户已注册,请重新输入'
            });
        }
        var user =new UserModel(req.body);
        user.save(function(err){
            if (!err) {
                return res.json({
                    error:0,
                    msg:'用户注册成功'
                }); 
            }
        });
    })
});
module.exports =router;