// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { 
//     title: '主页',
//     user:req.session.user});
// });

// 导入用户模块
var User = require('../models/user');
var Post = require('../models/post');
// 导入加密模块包 
// 通常用一个十六进制的字符 用来进行加密
var crypto = require('crypto');

// 因为很多功能都需要检测是否登陆，可以封装成一个检测的方法
function checkLogin(req, res, next) {
  if (!req.session.user) {
    // 导入一个新的刷新组件 回调登陆界面
    // 这个插件一般和redirect一起使用
    // ，保证在渲染下一个页面的时候数据可用 
    req.flash('error', '未登录!');
    // 上面的数据会被flash直接带入到回调页面中
    res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    // 导入一个新的刷新组件 回调登陆界面
    // 这个插件一般和redirect一起使用
    // ，保证在渲染下一个页面的时候数据可用 
    req.flash('error', '已登录!');
    // 上面的数据会被flash直接带入到回调页面中
    res.redirect('/back'); //会返回之前的页面(原理是拿之前
    // 浏览器中之前访问过的页面列表)
  }
  next();
}
// 相当于现在模块化了一个方法，那么代表app具有了该方法
module.exports = function (app) {
  // 这种写法的原理就在与app实际上就是app.js里面配置的路由对象
  app.get('/', function (req, res) {
    console.log('主页进来了');
    res.render('index', {
      title: '主页',
      user: req.session.user,
      // 有数据就返回 没数据就是空
      // 从req.flash对象上根据键取值
      success: req.flash('success').toString(),
      error: req.flash('error').toString()

    });
  });

  // 注册模块[带你复习请求管线和中间件]
  app.get('/reg', checkNotLogin);//如果是第一次没有session
  app.get('/reg', function (req, res) {
    console.log('注册进来了');
    res.render('reg', {
      title: '注册',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    })
  });
  // 因为注册界面的form表单在提交时候没有action所以会对当前页面
  // 重新调用，而此时调用的时候方式会变成post
  app.post('/reg', checkNotLogin);
  app.post('/reg', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var password_re = req.body['password-repeat'];
    if (password_re != password) {
      // 可以让redirect在回调网页的同时保持数据的同步刷新 
      req.flash('error', '两次输入的密码不一致');
      return res.redirect('/reg');//重新加载注册
    }
    // 加密:生成一个md5对象
    var md5 = crypto.createHash('md5');
    // digest('hex')把当前数据按照hex值的样式加密描述
    password = md5.update(req.body.password).digest('hex');
    // 存数据库 User就是一个简单的构造函数
    var newUser = new User({
      name: name,
      password: password,
      email: req.body.email
    });

    // 查询用户名存在不存在
    User.get(newUser.name, function (err, user) {
      if (err) {
        // 因为方法是自己封装的  所以即使出错了也知道出错
        // 的代码具体的位置以及出错的原因
        req.flash('error', err)
        return res.redirect('/');
      }
      if (user) {
        req.flash('error', '用户名已存在')
        return res.redirect('/reg');
      }
      // 新用户
      newUser.save(function (err, user) {
        if (err) {
          req.flash('error', err)
          return res.redirect('/reg');
        }
        // 用户信息存入session
        console.log('123');
        req.flash('success', '注册成功')
        return res.redirect('/');
      });
    })
  });
  // 登陆的接口
  app.get('/login',checkNotLogin)
  app.get('/login',function(req,res){
    res.render('login',{
      title:'登陆',
      user:req.session.user,
      success:req.flash('success').toString(),
      error:req.flash('error').toString()
    })
  })
  app.post('/login',checkNotLogin)
  app.post('/login',function(req,res){
    var md5 = crypto.createHash('md5');
    // digest('hex')把当前数据按照hex值的样式加密描述
    var password = md5.update(req.body.password).digest('hex');
    User.get(req.body.name,function(err,user){
      if(!user){
        req.flash('error','用户名不存在')
        return res.redirect('/login')
      }
      if(user.password!=password){
        req.flash('error','密码错误')
        return res.redirect('/login')
      }
      req.session.user = user
      req.flash('success','登陆成功')
        return res.redirect('/')
    })
  })
  // 发帖
  app.get('/post',checkLogin)
  app.get('/post',function(req,res){
    res.render('post',{
      title:'发布',
      user:req.session.user,
      success:req.flash('success').toString(),
      error:req.flash('error').toString()
    })
  })
  // 发帖子的接口
  app.post('/post',checkLogin)
  app.post('/post',function(req,res){
    // 拿到发帖用户
    let currentUser = req.session.user;
    // 拿到标签列表
    let tags = [req.body.tag1,req.body.tag1,req.body.tag1];
    let post = new Post(currentUser.name,req.body.title,tags,req.body.post)
    post.save(function(err){
      if(err){
        req.flash('error',err)
        return res.redirect('/')
      }
      req.flash('success','发布成功')
        res.redirect('/')
    })
  })
};

