var express = require('express')
var cookie = require('cookie')
var md5 = require('md5')
var app =express();
app.use(express.static('www'))

var User = require('./bin/DAO/UserDAO.js')
app.get('/api/register',function(req,res){
    req.query.psw = md5(req.query.psw);
    res.send(req.query.psw)
    User.findOne({userName:req.query.userName}).exec(function(err,data){
        if(data){
            res.send('该账号已注册')
        }
        else{
            new User(req.query).save(function(){
                res.redirect('./login.html')
            })
        }
    })
})
var userInfo = {}
app.get('/api/login',function(req,res){
    req.query.psw = md5(req.query.psw);
    User.findOne({userName:req.query.userName,psw:req.query.psw}).exec(function(err,data){
        if(data){
            var rndStr = makeStr();
            userInfo[rndStr] = data;
            res.cookie('userInfo',rndStr,{
                maxAge:604800
            });
            res.redirect('/api/afterLogin')
        }
        else{
            res.send('用户名或密码错误')
        }
    })
})
function makeStr(){
    var source = 'asdfasdf5454asdfasgd3qwefsadfasdfasdfasdfasdf5464dsaf789'
    var str = ''
    for(var i=0;i<20;i++){
        var ind = Math.floor(Math.random()*source.length);
        var ch = source[ind];
        str+=ch;
    }
    return str;
}
app.get('/api/afterLogin',function(req,res){
    var cookieObj = cookie.parse(req.headers.cookie)
    var user = userInfo[cookieObj.userInfo];
    if(user){
        res.send('欢迎'+user.userName+'来到用户中心')
    }
    else{
        res.send('请先登录')
    }
})

app.get('/api/loginOut',function(req,res){
    var cookieObj = cookie.parse(req.headers.cookie)
    var user = userInfo[cookieObj.userInfo];
    if(user){
        delete userInfo[cookieObj.userInfo]
        res.cookie('userInfo','');
        res.send('退出成功')
    }
    else{
        res.send('请先登录')
    }
})

app.listen(3000,function(){
    console.log('running...')
})