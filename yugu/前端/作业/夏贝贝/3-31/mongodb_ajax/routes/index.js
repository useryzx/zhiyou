var express = require('express');
var router = express.Router();
const User = require('../models/user')
/* GET home page. */
router.get('/', function (req, res, next) {
  return res.json({
    title: '首页',
    user: req.session.user,
  });
});
// 注册
router.get('/api/regist', function (req, res) {
  return res.json({
    error: 0
  });
});
// 登陆
router.get('/api/login', function (req, res) {
  return res.json({
    error: 0
  });
});
// 注册
router.post('/api/regist', function (req, res) {
  console.log(req.body);
  let newUser = new User({
    name: req.body.name,
    password: req.body.password
  })
  console.log(newUser);
  User.get(newUser.name, function (err, user) {
    console.log(1);
    if (err) {
      return res.json({
        error: 1,
        msg: '注册查询出错'
      })
    }
    if (user) {
      console.log(2);
      return res.json({
        error: 2,
        msg: '账户已存在'
      })
    }
    newUser.save(function (err) {
      if (err) {
        console.log(3);
        return res.json({
          error: 3,
          msg: '账户存储出错'
        })
      }
      else {
        console.log(4);
        return res.json({
          error: 0
        })
      }
    })
  })
});

// 登陆
router.post('/api/login', function (req, res) {
  // digest('hex')把当前数据按照hex值的样式加密描述
  // 检测用户是否存在
  console.log('?????');
  
  User.get(req.body.name, function (err, user) {
    if (!user) {
      return res.json({
        error: 4,
        msg: '账户不存在'
      })
    }
    // 检测密码是否一致
    console.log('*************');
    if (user.password != req.body.password) {
    console.log('*************');

      return res.json({
        error: 5,
        msg: '密码错误'
      })
    }
    // 可以登录的user
    res.cookie('name', req.body.name)
    return res.json({
      error: 0,
    })
  })
})
module.exports = router;
