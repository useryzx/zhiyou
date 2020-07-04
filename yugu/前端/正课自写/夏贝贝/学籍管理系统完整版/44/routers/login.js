// 注册的路由
var express =require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router =express.Router();
// 数据库创建表
var UserModel =require('../models/UserModel');
// 跳转
router.get('/user/login',function(req,res){
    res.render('login',{
        title:'登录'
    });
});
router.post('/user/login',function(req,res){
    UserModel.findOne({username:req.body.username}).exec(function(err,user){
        if (!user) {
            return res.json({
                error:1,
                msg:'用户不存在'
            });
        }
        if (req.body.password ==user.password) {
            // 设置cookie数据
            res.cookie('username',req.body.username);
            return res.json({
                error:0,
                msg:'登录成功,请添加学生'
            });
        }
        return res.json({
            error:1,
            msg:'密码错误请重新输入'
        });
    });
});
module.exports =router;