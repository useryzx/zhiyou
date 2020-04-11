var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel')
router.get('/register',function(req,res){
    res.render('register',{title:'注册界面'})
})
// 注册的接口
router.post('/user/register',function(req,res){
  //  console.log(req.query);
    UserModel.findOne({username:req.body.username}).exec(function(err,data){
        if(!err){
            if(data){
                res.send('该账号已存在，请重新注册')

            }else{
                new UserModel(req.body).save(function(err){
                    if(!err){
                        res.render('login',{title:"注册成功"})

                    }
                })
               
            }
        }

    })
    
})
module.exports = router;