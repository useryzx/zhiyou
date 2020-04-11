// 注册的路由
var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
router.get('/user/login', function (req, res) {
    res.render('login', {
        title: '登录界面 '
    });
});
router.post('/user/login', function (req, res) {
    UserModel.findOne({ username: req.body.username }).exec(function (err, user) {
        console.log(user);
        if (!user) {
            res.json({
                error: 1,
                msg: '用户不存在'
            })
        } else {
            if (req.body.password == user.password) {
                // 设置cookie数据
                res.cookie('username', req.body.username);
                return res.json({
                    error: 0,
                    msg: '登录成功'
                });
            } else {
                res.json({
                    error: 1,
                    msg: '密码错误请重新输入'
                });
            }
        }
    });
});
module.exports = router;