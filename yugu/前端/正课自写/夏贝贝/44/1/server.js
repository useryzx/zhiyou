var express = require("express")
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var cookie = require('cookie-parser')
var db = require('./models/db.js')
var app = express();
app.set('view engine', 'ejs')
app.use(express.static('www'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookie())
var UserModel = require('./models/UserModel')
var mongoStore = require('connect-mongo')(session)
app.use(session({
    secret: 'stu60',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        url: 'mongodb://127.0.0.1/web60'
    })
}))

app.use(function (req, res, next) {
    var username = req.cookies.username;
    if (username) {
        UserModel.findOne({ username: username }).exec(function (err, user) {
            if (!err) {
                req.session.user = user;
                res.locals.user = req.session.user;
                next();
            }
        })
    }
    else {
        res.locals.user = req.session.user;
        next();
    }

})
app.use(require('./routers/home'));
app.use(require('./routers/register'));
app.use(require('./routers/login'));
app.use(require('./routers/exit'));

// 添加班级
app.use(require('./routers/class'));
// 添加学生
app.use(require('./routers/student'));





app.listen(3000, function (err) {
    if (!err) {
        console.log('*-*-*-*-*-*-*-*-*');
    }
})