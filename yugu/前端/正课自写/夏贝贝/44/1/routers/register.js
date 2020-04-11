var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel')
router.get('/user/zhuce',function(req,res){
    res.render('register',{
        title:'注册'
    })
})
router.post('/user/register',function(req,res){
    UserModel.findOne({username:req.body.username}).exec(function(err,data){
        if(data){
            return res.json({
                error:1,
                msg:'用户已注册'
            })
        }
        var user = new UserModel(req.body);
        user.save(function(err){
            if(!err){
                return res.json({
                    error:0,
                    msg:'用户注册成功'
                })
            }
        })
    })
})
module.exports = router;