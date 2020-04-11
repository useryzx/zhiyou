var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
app.use(session({
    secret: 'test',
    resave: true,
    saveUninitialized: true
}))
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(express.static('www'))
// 首页接口
app.use(require('./bin/routers/pageRouter'))
app.use(require('./bin/routers/msgRouter'))
var userRouter = require('./bin/routers/userRouter')
app.use('/user', userRouter);

app.listen(3000, function () {
    console.log('yugu=-=-=-=-=');
})