// 获取数据库链接，通过数据库进行查询
var sql = require('../models/query')
/* GET home page. */
// router.get('/', function(req, res, next) {
  // edit by yugu
//   res.render('index', { title: 'Express' });
// });

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', {
      title: '首页',
      user: req.session.user,
      error:req.flash('error').toString(),
      success:req.flash('success').toString()
    })
  })
  // 跳转注册界面
  app.get('/api/register', function (req, res) {
    res.render('register', {
      title: '注册',
      user: req.session.user,
      error:req.flash('error').toString(),
      success:req.flash('success').toString()
    })
  })
  // 注册接口
  app.post('/api/register', function (req, res) {
    console.log('注册进来了');
    // 数据库中搜索账号是否存在
    sql.search(req.body.name, function (err, data) {
      // 搜索出错
      if (err) {
        req.flash('error', '搜索出错')
        return res.redirect('/api/register')
      }
      else {
        // 存在且账号不为空
        if (data[0]) {
          console.log(data[0]);
          req.flash('error', '账号已存在')
          return res.redirect('/api/register')
        }
        else {
          console.log(data);
          // 存储账号
          sql.save(req.body.name, req.body.password, function (err, data) {
            if (err) {
              req.flash('error', '账号储存出错')
              return res.redirect('/api/register')
            }
            else{
              req.flash('success', '账号注册成功')
              return res.redirect('/api/login')
            }
          })
        }
      }
    })
  })
  // 登陆跳转页面接口
  app.get('/api/login', function (req, res) {
    res.render('login', {
      title: '登陆',
      user: req.session.user,
      error:req.flash('error').toString(),
      success:req.flash('success').toString()
    })
  })
  // 登陆接口
  app.post('/api/login', function (req, res) {
    // 数据库中搜索账号是否存在
    sql.login(req.body.name,req.body.password,function (err, data) {
      // 搜索出错
      if (err) {
        req.flash('error', '搜索出错')
        return res.redirect('/api/register')
      }
      else {
        // 存在且账号不为空
        if (data) {
          req.session.user = req.body;
          req.flash('success','登陆成功');
          return res.redirect('/');
        }
        else {
          // 存储不存在
          req.flash('error', '账号不存在')
          return res.redirect('/api/register')
        }
      }
    })
  })
};
