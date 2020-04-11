var express = require('express');
var router = express.Router();

const User = require("../DAO/userDAO.js");


// 查询用户名是否可用
router.get("/available",function(req,res){

    User.findOne({username:req.query.username})
    .then(data=>{
        if(!data){
            res.json({
                err:0,
                msg:"用户名可用"
            })
        }else{
            res.json({
                err:2,
                msg:"此用户名已被占用"
            })
        }
    })

})


// 注册接口
router.post("/regist", function (req,res) {
    if(req.body.captcha.toLowerCase()!=req.session.cap.toLowerCase()){
        res.json({
            err:4,
            msg:"验证码错误"
        });
        return;
    }

    let usernameReg = /^\w{3,}$/;
    if(!usernameReg.test(req.body.username)){
        res.json({
            err:1,
            msg:"数据格式错误"
        });
        return;
    }

    User.findOne({username:req.query.username})
    .then(data=>{
        if(!data){
            let u = new User({
                username:req.body.username,
                psw:req.body.psw
            });
            return u.save();
        }else{
            res.json({
                err:2,
                msg:"此用户名已被占用"
            });
            return Promise.reject();
        }
    })
    .then(nu=>{
        res.json({
            err:0,
            msg:"注册成功"
        })
    });

    

})

module.exports = router;
