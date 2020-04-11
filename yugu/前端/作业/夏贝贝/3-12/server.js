var express = require('express');
var bodyParser =require('body-parser');
var mongoose =require('mongoose');
var cookie =require('cookie-parser');
var session =require('express-session');
var mongoStore =require('connect-mongo')(session);
var app = express();
app.set('view engine','ejs');
app.use(express.static('www'));
app.use(cookie());
// yugu
app.use(session({
    secret:'stu60',
    resave:true,
    store:new mongoStore({
        url:'mongodb://127.0.0.1/blog'
    })
}));
app.use(bodyParser.urlencoded({extended:false}))
var UserModel =require('./models/UserModel');
app.use(function(req,res,next){
    // console.log(req.cookies.username);
    var username =req.cookies.username;
    console.log(username);
    if (username) {
        UserModel.findOne({username:username})
        .exec(function(err,user){
            if (!err) {
                req.session.user =user;
                res.locals.user =req.session.user;
                next();
            }
        })
    }
    else
    {
        res.locals.user =req.session.user;
        next();
    }
});
var db =require('./models/db');
var MsgModel = require('./models/MsgModel')
var utils = require('./models/utils')
//首页路由
app.use(require('./routers/home'))
//注册
app.use(require('./routers/register'))
//登录
app.use(require('./routers/label'))
app.use(require('./routers/login'))
//发帖
app.use(require('./routers/blog'))
//服务器启动
app.listen(3000,function(err){
    if(!err){
        console.log('*-*-*-*-*-*-鱼骨running*-*-*-*-*-');
        
    }

})