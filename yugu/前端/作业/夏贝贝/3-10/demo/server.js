var express = require('express')
// 服务器对象
var app = express();
// 配置
var mongoose = require('mongoose');
var db = require('./bin/models/db');
// 服务器添加cookie解析能力
var cookie = require('cookie-parser');
app.use(cookie());
// post请求设置
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
var session = require('express-session');
// 将session数据通过connect-mongo模块//yugulogo//储存到mongodb数据库中
var mongo = require('connect-mongo')(session);
app.use(session({
    secret: 'demo',
    resave: true,
    saveUninitialized: true,
    store: new mongo({
        url: 'mongodb://127.0.0.1/demo'
    })
}))
// 引入账户查找模块
var AccountModel = require('./bin/models/account');
// 自定义中间件，进行yugulogo账户判断
// 访问默认页的时候，未登录跳转登陆页面，已登录返回首页
var path = require('path');
var fs = require('fs');
var url = require('url');
function static(staticPath) {
    console.log(staticPath);
    function f(req, res, next) {
        console.log(111111111111111);
        
        // 1.url转成url对象
        var urlObj = url.parse(req.url);
        // 把url中的路径和静态文件夹进行拼接
        // 把文件夹和文件拼接到一起 path url对象的路径名称
        var filePath = path.join(staticPath, urlObj.pathname);
        // 读取文件[根据路径读取文件，带一个读取的回调函数]
        fs.lstat(filePath, function (err, s) {
        console.log(2222222);

            if (!s) {
                //   文件不存在
                console.log('121');
                next();
            }
            else {
                console.log(123321);
                //   检测当前路径读出来的内容是不是文件夹
                // 的内容
                // 判断当前文件是否包含文件夹
                // www\
                if (s.isDirectory()) {
                    if(req.session.user){
                        filePath = path.join(filePath, 'index.html');
                    }
                    else{
                        filePath = path.join(filePath, 'login.html');
                    }
                    // 读出来数据
                    fs.readFile(filePath, function (err, data) {
                        res.end(data.toString());
                    });
                }
                else{
                    fs.readFile('./'+filePath,function(err,data){
                        console.log(data);
                        res.end(data.toString())
                    })
                }
            }
        });
    }
    return f;
}
// use需要一个中间件函数[参数格式req,res,next]
app.use(static('www'));
// app.use(express.static('www'))

// 注册的鱼骨路由
app.use(require('./bin/routers/registerRouter'))
// 登陆的鱼骨路由
app.use(require('./bin/routers/loginRouter'))
app.listen(3000,function(){
    console.log('*-*-*-*-*-*-yugu*-*-*-*-*-*-');
    
})