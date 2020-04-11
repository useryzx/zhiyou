var express =require('express');
var bodyParser =require('body-parser');
var mongoose =require('mongoose');
var session =require('express-session');
// cookie:y用来解析nodejs当中的cookie,把cookie可以转换成对象
var cookie =require('cookie-parser');
// 引入数据库模块
var db =require('./models/db');
var app =express();
// 设置引擎
app.set('view engine','ejs');
app.use(express.static('www'));
// post请求
app.use(bodyParser.urlencoded({extended:false}))
// app.use相当于为服务器配置功能
// 服务器跑起来之后自动就带有解析cookie的功能
app.use(cookie());
// 将session数据通过connect-mongo模块储存到mongodb数据库中
var mongoStore =require('connect-mongo')(session);
// 设置session 加载session方法之后，会在req对象中自动挂载一个
// req.session对象
app.use(session({
    secret:'stu60',
    resave:true,
    saveUninitialized:true,
    // 告诉session数据库地址，方便其导入数据
    store:new mongoStore({
        url:'mongodb://127.0.0.1/web60'
    })
}));
// use方法相当于为服务器配置某种功能
// 当服务器启动过程中会把use里面配置的功能整合配置完毕
// 服务器启动，就可以直接使用use里面配置的服务了

var UserModel =require('./models/UserModel');

// 配置一个获取cookie的中间件(每一次发送请求相当于都会激活一次该功能)
app.use(function(req,res,next){
    // console.log(req.cookies.username);
    var username =req.cookies.username;
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
        console.log(req.locals);
        res.locals.user =req.session.user;
        next();
    }
});
// 首页
app.use(require('./routers/home'));
// 注册
app.use(require('./routers/register'));
// 登录
app.use(require('./routers/login'));
// 添加班级
app.use(require('./routers/banjiadd'));
// 添加学生
app.use(require('./routers/studentadd'));
// 更新学生
app.use(require('./routers/update'));
// 搜索
app.use(require('./routers/search'));


app.listen(3000,function(err){
    if (!err) {
        console.log('server run...');
        
    }
});