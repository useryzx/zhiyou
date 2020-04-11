var express = require('express')
var md5 = require('md5')
var session = require('express-session')
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('www'))
app.use(session({
    secret:'qwer',
    resave:false,
    saveUninitialized:true
}))
var User = require('./bin/DAO/UserDAO.js')
app.post('/api/register',function(req,res){
    req.body.psw = md5(req.body.psw);
    User.findOne({userName:req.body.userName}).exec(function(err,data){
        if(data){
            res.send('账号已注册')
        }
        else{
            var u = new User(req.body).save(function(err){
                if(!err){
                    res.redirect('/login.html')
                }
            })
        }
    })
})
app.post('/api/login',function(req,res){
    req.body.psw = md5(req.body.psw);
    User.findOne({userName:req.body.userName,psw:req.body.psw}).exec(function(err,data){
        if(data){
            req.session.user = data;
            res.send('登陆成功，第三方接口打开')
        }
        else{
            res.send('账号或密码错误')
            
        }
    })
})
app.get('/api/afterLogin',function(req,res){
    if(req.session.user){
        res.send('欢迎：'+req.session.user.userName+'来到用户中心')
    }
    else{
        res.send('请先登陆')
    }
})
app.get('/api/loginOut',function(req,res){
    if(req.session.user){
        delete req.session.user
        res.send("退出成功")
    }
    else{
        res.send('请先登陆')
    }
})
app.listen(3000,function(){
    console.log('服务器已启动');
})
