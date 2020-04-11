var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel')
router.get('/user/login',function(req,res){
    res.render('login',{
        title:'登陆'
    })
})
router.post('/user/login',function(req,res){
    UserModel.findOne(req.body).exec(function(err,user){
        if(!user){
            return res.json({
                error:1,
                msg:'账号或密码错误'
            })
        }
        else{
            res.cookie('username',req.body.username);
            return res.json({
                error:0,
                msg:'登陆成功，请添加学生'
            })
        }
    })
})
module.exports = router;