
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 代表引入路由文件
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// 配置post请求[默认不给配置]
var bodyParser =require('body-parser');

// 支持会话的模块
var session =require('express-session');
// 将会话保存到mongodb中取[当session有数据时，会自动匹配mongo
// 数据库当结构匹配成功则会自动刷新数据]
var MongoStore =require('connect-mongo')(session);
// 导入一个用来刷新的模块
var flash =require('connect-flash');
var app = express();
// 回调的时候可以一并刷新数据
app.use(flash());
// 数据库文件信息描述
var settings =require('./settings');
// 对应的项目应该都有属于自身的配置文件
// 配置session
app.use(session({
     secret:settings.cookieSecret,
    //  设置session的值
    key:settings.db,
    cookie:{maxAge:1000*60*60*24},
    // 最重要的步骤:将session的信息存储到数据库中去
    stroe:new MongoStore({
      url:'mongodb://localhost/blog'
    }),
    resave:false,
    saveUninitialized:true
}));

// view engine setup [模板引擎]
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 加载日志中间件
app.use(logger('dev'));
// 加载解析json的中间件
app.use(express.json());
// 加载解析urlencoded中间件
app.use(express.urlencoded({ extended: false }));
// 加载解析cookie的中间件
app.use(cookieParser());
// 设置public为静态资源文件夹,如果网站的地址是siginin.html,
// 那么就是public/siginin.html （之前写过）
app.use(express.static(path.join(__dirname, 'public')));

// 将app引入路由，这样只需要在index.js中配置就可以了
// app.use('/',indexRouter);
// 因为index.js里面模块化出来的是一个带参数的方法
indexRouter(app);
// app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(app.get('port'),function(){
   console.log('running...'+app.get('port'));
})
module.exports = app;
