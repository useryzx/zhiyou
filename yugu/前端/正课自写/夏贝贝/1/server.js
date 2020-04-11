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
app.use(session({
    secret:'stu60',
    resave:true,
    saveUninitialized:true,
    // 告诉session数据库地址，方便其导入数据
    store:new mongoStore({
        url:'mongodb://127.0.0.1/weibo'
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
                // 为session添加找到的对象
                req.session.user =user;
                // locals代表回调对象(用途是:凡是使用location
                // 作为回调的页面都可以访问user)
                res.locals.user =req.session.user;
                // 继续执行接口访问(作用是跳出当前的use)
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
//注册路由
app.use(require('./routers/register'))
//登录路由
app.use(require('./routers/login'))
//发帖路由
app.use(require('./routers/blog'))
//标签路由
app.use(require('./routers/label'))
//服务器启动
app.listen(3000,function(err){
    if(!err){
        console.log('running....');
        
    }

})