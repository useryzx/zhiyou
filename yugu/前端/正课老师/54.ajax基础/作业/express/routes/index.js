var express = require('express');
var router = express.Router();
var User = require('../models/connect');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '首页', user: req.session.user });
});
router.get('/regist', function (req, res) {
  res.render('register', {
    title: '注册界面'
  })
});
router.post('/regist', function (req, res) {
  let sql1 = "select * from user where name='" + req.body.name + "'";
  let sql = "INSERT INTO user (name,psw) VALUES ('" + req.body.name + "'," + req.body.psw + ")";
  User.query(sql1, function (err, data) {
    if (data == '') {
      User.query(sql, function (err) {
        if (!err) {
          res.redirect('/login');
        }
        else {
          res.render(err);
        }
      })
    }
    if(data!=''){
      res.send('用户存在')
    }
  })
});
router.get('/login', function (req, res) {
  res.render('login', {
    title: '登录界面'
  })
});
router.post('/login', function (req, res) {
  let sql = "select * from user where name='" + req.body.name + "'";
  User.query(sql,function(err,data){
    if(!err){
        if(req.body.name==data[0].name&&req.body.psw==data[0].psw){
          req.session.user=data[0];
          res.redirect('/');
        }
        else{
          res.send('账号或密码错误');
        }
    }
  })  
})
module.exports = router;
