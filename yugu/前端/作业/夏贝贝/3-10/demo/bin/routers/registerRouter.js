// 注册的路由
var express =require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router =express.Router();
// 数据库创建表
var AccountModel =require('../models/account');
// 注册的接口
// router.get('/api/loado',function(req,res){
//     console.log('***');
//     res.redirect('/register.html')
// })
router.post('/api/register',function(req,res,next){
    // 判断用户是否存在
    console.log('注册');
    AccountModel.findOne({name:req.body.name}).
    exec(function(err,data){
        if (data) {
            // 有用户
            res.send('<h1>用户已存在</h1>');
        }
        else{
            var account =new AccountModel(req.body);
            account.save(function(err){
                if (!err) {
                    res.send('注册成功')
                }
            });
        }
        
    })
});
module.exports =router;