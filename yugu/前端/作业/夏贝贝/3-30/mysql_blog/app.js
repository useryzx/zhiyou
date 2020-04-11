var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var query = require('./models/query')
query.start(function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log('数据库启动');
    
  }
})
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// 配置post请求[默认不给配置]
var bodyParser =require('body-parser');
// 支持会话的模块
// edit by yugu
var session =require('express-session');
// 回调可以刷新数据
var flash = require('connect-flash')
var app = express();
app.use(flash())
// 配置session
app.use(session({
  secret:'blog',
  resave:true,
  saveUninitialized:true
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
indexRouter(app);
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
