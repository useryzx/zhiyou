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
var Comment = require('../models/comment');
// 导入加密模块包 
// 通常用一个十六进制的字符 用来进行加密
var crypto = require('crypto');

// 上传文件的配置
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({
  storage: storage
})

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
    // 查询数据库里面的帖子详情(req.query.p就是将来分页的查询)
    var page = parseInt(req.query.p) || 1;
    Post.getTen(null, page, function (err, posts, total) {
      if (err) {
        // 查询出来出错只不过代表数据库有问题了
        // 不能影响首页模板的加载
        posts = [];
      }
      console.log('条数:'+total);
      
      res.render('index', {
        title: '主页',
        user: req.session.user,
        posts: posts,
        page: page,
        // 第一页
        isFirstPage:(page -1) ==0,
        // 最后一页
        isLastPage:((page-1)*10+posts.length) ==total,
        // 查询数据库 把帖子返回
        // 有数据就返回 没数据就是空
        // 从req.flash对象上根据键取值
        success: req.flash('success').toString(),
        error: req.flash('error').toString()

      });
    });

  });

  // 注册模块[带你复习请求管线和中间件]
  app.get('/reg', checkNotLogin); //如果是第一次没有session
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
      return res.redirect('/reg'); //重新加载注册
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
      newUser.save(function (err) {
        if (err) {
          req.flash('error', err)
          return res.redirect('/reg');
        }
        // req.session.user =newUser;
        req.flash('success', '注册成功')
        return res.redirect('/');
      });
    })
  });

  // 登录的接口
  app.get('/login', checkNotLogin);
  app.get('/login', function (req, res) {
    res.render('login', {
      title: '登录',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.post('/login', checkNotLogin);
  app.post('/login', function (req, res) {
    // 先加密密码
    var md5 = crypto.createHash('md5');
    // digest('hex')把当前数据按照hex值的样式加密描述
    var password = md5.update(req.body.password).digest('hex');
    // 检测用户是否存在
    User.get(req.body.name, function (err, user) {
      if (!user) {
        req.flash('error', '用户名不存在');
        return res.redirect('/login');
      }
      // 检测密码是否一致
      if (user.password != password) {
        req.flash('error', '密码错误');
        return res.redirect('/login');
      }
      // 可以登录的user
      req.session.user = user;
      req.flash('success', '登录成功');
      res.redirect('/');
    })
  });

  // 发布帖子(发帖之间检测有没有登录)
  app.get('/post', checkLogin);
  app.get('/post', function (req, res) {
    res.render('post', {
      title: '发表',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    })
  });
  // 发布帖子的接口
  app.post('/post', checkLogin);
  app.post('/post', function (req, res) {
    // 拿到当前发帖的用户
    var currentUser = req.session.user;
    // 获取到标签列表
    var tags = [req.body.tag1, req.body.tag3, req.body.tag2];
    // 准备发帖的数据库对象(类似于注册的对象)
    var post = new Post(currentUser.name, req.body.title, tags, req.body.post);
    post.save(function (err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      req.flash('success', '发布成功');
      res.redirect('/');
    })
  });
  // 推出接口
  app.get('/logout', checkLogin);
  app.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/');
  });

  // 上传
  app.get('/upload', checkLogin);
  app.get('/upload', function (req, res) {
    res.render('upload', {
      title: '发表',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    })
  });
  app.post('/upload', checkLogin);
  // 上传 需要多出来一个upload对象的函数 最多5个
  app.post('/upload', upload.array('field1', 5), function (req, res) {
    req.flash('success', '文件上传成功'),
      res.redirect('/');
  })

  // 存档
  app.get('/archive', function (req, res) {
    // 存档的核心是拿出现有的数据然后读取有用的部分
    Post.getArchive(function (err, posts) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      // 加载存档的模板
      res.render('archive', {
        title: '存档',
        posts: posts,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
      })
    })
  })

  // 标签
  app.get('/tags', function (req, res) {
    //  获取标签数据的方法
    Post.getTags(function (err, posts) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      // 加载存档的模板
      res.render('tags', {
        title: '标签',
        posts: posts,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
      })
    })
  })

  // 拥有特定标签的页面
  app.get('/tags/:tag', function (req, res) {
    console.log(req.params.tag);
    // 单一的帖子查询和用户名查询功能相似
    Post.getTag(req.params.tag, function (err, posts) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }

      // 加载存档的模板
      res.render('tag', {
        title: 'TAG:' + req.params.tag,
        posts: posts,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
      })
    })
  })

  // 文章详情的接口
  // 但凡是这种类型的接口需要在调用接口的时候按照
  // 接口对应的键直接传入值,都在req.params对象中
  app.get('/u/:name/:day/:title', function (req, res) {
    Post.getOne(req.params.name, req.params.day, req.params.title, function (err, post) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      // 加载存档的模板
      res.render('article', {
        title: req.params.title,
        post: post,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
      })
    })
  })

  // 留言
  app.post('/u/:name/:day/:title', function (req, res) {
    // 先准备时间
    var date = new Date(),
      time = date.getFullYear() + '-' + (date.getMonth() + 1) +
      '-' + (date.getDate()) + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    // 准备回帖
    var comment = {
      name: req.body.name,
      email: req.body.email,
      time: time,
      content: req.body.content
    }
    // 回帖[先要把当前帖子的作者  名字 时间传递进去找到该贴]
    var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
    newComment.save(function (err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      req.flash('success', '留言成功');
      // 回到上一页
      res.redirect('back');
    })
  });
  // 编辑文章
  app.get('/edit/:name/:day/:title', checkLogin);
  app.get('/edit/:name/:day/:title', function (req, res) {
    // 拿到用户
    var currentUser = req.session.user;
    Post.edit(currentUser.name, req.params.day,
      req.params.title,
      function (err, post) {
        if (err) {
          req.flash('error', err);
          return res.redirect('back');
        }
        res.render('edit', {
          title: '编辑',
          post: post,
          user: req.session.user,
          success: req.flash('success').toString(),
          error: req.flash('error').toString(),
        })
      });
  });

  app.post('/edit/:name/:day/:title', checkLogin);
  app.post('/edit/:name/:day/:title', function (req, res) {
    var currentUser = req.session.user;
    // 因为post请求里面只有title和post内容
    Post.update(currentUser.name, req.params.day,
      req.params.title, req.body.post,
      function (err, post) {
        // 准备成功时候调用的url网页
        // 把字符串编码成url对象[调用前面的编辑接口]
        var url = encodeURI('/u/' + req.params.name + '/' +
          req.params.day + '/' + req.params.title);

        if (err) {
          req.flash('error', err);
          return res.redirect(url); //出错返回当前的文章
        }
        req.flash('success', '修改成功!');
        res.redirect(url);
      });
  });

  // 删除
  app.get('/remove/:name/:day/:title', checkLogin);
  app.get('/remove/:name/:day/:title', function (req, res) {
    var currentUser = req.session.user;
    Post.remove(currentUser.name, req.params.day,
      req.params.title,
      function (err) {
        // 准备成功时候调用的url网页
        // 把字符串编码成url对象[调用前面的编辑接口]
        if (err) {
          req.flash('error', err);
          return res.redirect(url); //出错返回当前的文章
        }
        req.flash('success', '删除成功!');
        res.redirect('/');
      });
  });
  // 用户文章接口
  app.get('/u/:name', function (req, res) {
    // var
    page = parseInt(req.query.p) || 1;
    User.get(req.params.name, function (err, user) {
      if (!user) {
        req.flash('error', '用户不存在!');
        return res.redirect('/');
      }
      // 查询并返回该用户第page页的10篇文章
      Post.getTen(user.name, page, function (err, posts, total) {
        if (err) {
          req.flash('error', '用户不存在!');
          return res.redirect('/');
        }
        res.render('user', {
          title: user.name,
          posts: posts,
          page: page,
          user: req.session.user,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        })
      });
    });
  })

  // 跳转搜索界面
  app.get('/search', function (req, res) {
    console.log(req.query.keyword);

    Post.search(req.query.keyword, function (err, posts) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('search', {
        title: 'SEARCH' + req.query.keyword,
        posts: posts,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      })
    })
  })


};