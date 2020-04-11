// 基础服务器配置
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
var cookie = require('cookie');
var Cookie = require('./bin/DAO/cookieDAO.js');

// 注册接口
app.post("/api/register", function (req, res) {
    if (req.body.psw != req.body.psw2) {
        res.render('temp.ejs', {
            msg: '输入密码不同'
        })
    }
    else if (req.body.psw == '' || req.body.psw2 == '' || req.body.name == '') {
        res.render('temp.ejs', {
            msg: '账号或密码不能为空'
        })
    }
    else {
        Cookie.find({ name: req.body.name }).exec(function (err, data) {
            if (data == null || data == '') {
                console.log('账号不存在，存储');
                new Cookie({
                    name: req.body.name,
                    psw: req.body.psw
                }).save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.redirect('http://127.0.0.1:3000/signUp.html')
                    }
                })
            }
            else {
                console.log('账号已存在');
                res.render('temp.ejs', {
                    msg: '账号已存在，请去登陆'
                })
            }
        })
    }
})

// 登陆接口
app.post('/api/sign', function (req, res) {
    if (req.body.psw == '' || req.body.name == '') {
        res.render('temp.ejs', {
            msg: '账号或密码不能为空'
        })
    }
    else {
        Cookie.find({ name: req.body.name }).exec(function (err, data) {
            if (data == null || data == '') {
                res.render('temp.ejs', {
                    msg: '账号不存在，请注册'
                })
            }
            else {
                if (data[0].psw != req.body.psw) {
                    res.render('temp.ejs', {
                        msg: '密码错误'
                    })
                }
                else {
                    res.cookie('name', data[0].name);
                    res.cookie('psw', data[0].psw);
                    res.render('temp.ejs', {
                        msg: '登陆成功'
                    })
                }
            }
        })
    }
})
// 个人中心接口
app.get('/api/self', function (req, res) {
    if (req.headers.cookie == undefined) {
        res.render('temp.ejs', {
            msg: '请登录'
        })
    }
    else {
        res.redirect('http://127.0.0.1:3000/self.html');
    }
})

app.listen(3000, function (err) {
    if (!err) {
        console.log('--------yugu-------服务器启动--------');
    }
})
