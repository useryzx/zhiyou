var express = require('express');
var session = require('express-session');
var app = express();
app.use(express.static('www'));
app.use(express.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs');
//客户端为服务器设置缓存
app.use(session({
    secret: 'qwe',
    resave: false,
    saveUninitialized: true
}));
// 引入数据库文件
var User = require('./bin/DAO/UserDAO');
var Blog = require('./bin/DAO/BlogDAO');
var util = require('./bin/Utils');
app.listen(3200, function () {
    console.log('blogServer Run...');
});
// 首页接口渲染
app.get('/', function (req, res) {
    // 取出来博客里面的数据
    Blog.find().populate('author')
        .exec(function (err, data) {
            // 转成对象
            data = JSON.parse(JSON.stringify(data));
            //   遍历把对象里的数据拿出来
            data.forEach(function (el) {
                if (el.tag) {
                    // 把tag由string 分割成数组
                    el.tag = el.tag.split(' ');

                } else {
                    data.tag = [];
                }
                // 时间
                el.time = util.getTimeStr(el.time);

            });


            res.render('index.ejs', {
                location: 'home',
                user: req.session.user,
                data
            });
        })

});
// 注册
app.get('/regist', function (req, res) {
    res.render('regist.ejs', {
        // 为了让导航条显示已经到注册界面可以加一个定位的表示
        location: 'regist',
        user: req.session.user
    });
});
// 注册接口
app.post("/api/user/register", function (req, res) {
    // 用数据库进行用户名的排重
    User.findOne({
            username: req.body.username
        })
        .exec(function (err, data) {
            if (err) {
                //  读取数据库文件的时候出现错误（服务器错误）
                // 查询出错浏览器会显示当前的错误码
                res.status(500);
                res.send('');
            } else {
                if (data) {
                    res.send('用户已存在');
                } else {
                    new User(req.body).save(function (err) {
                        if (!err) {
                            res.render('login.ejs', {
                                tip: '请登录',
                                location: 'login',
                                user: req.session.user
                            });
                        }
                    });
                }
            }
        });
});
// 登录跳转的接口\
app.get('/login', function (req, res) {
    res.render('login.ejs', {
        // 为了让导航条显示已经到注册界面可以加一个定位的表示
        location: 'login',
        tip: '请登录',
        user: req.session.user
    });
});
// 登录接口
app.post("/api/user/login", function (req, res) {

    User.findOne({
            username: req.body.username,
            psw: req.body.psw
        })
        .exec(function (err, data) {
            if (data) {
                //  设置session
                req.session.user = data;
                // 回调首页
                res.redirect('/');
            } else {
                res.send('用户不存在或密码错误');
            }
        });
});
// 退出
app.get("/api/user/logout", function (req, res) {
    // 因为只有在登录成功之后这个user才有数据
    if (req.session.user) {
        delete req.session.user,
            res.redirect('/');
    }
})
// 发帖
app.get("/blog-commit", function (req, res) {
    if (req.session.user) {
        res.render('blog-commit.ejs', {
            location: 'blog-commit',
            user: req.session.user
        });
    }
});
app.post("/api/blog/commit", function (req, res) {
    // 检测用户
    if (req.session.user) {
        // 替换空格
        req.body.tag = req.body.tag.replace(/\s{2,}/g, " ");
        // 去除空格 1 2 3
        req.body.tag = req.body.tag.trim();
        var b = new Blog({
            // 快速读取body中的数据并对应上数据库的键
            // title:req.body.title,
            ...req.body,
            time: new Date(),
            author: req.session.user._id,
            readCount: 0,
            reply: []
        }).save(function (err) {
            if (!err) {
                res.redirect('/');
            } else {
                console.log(err);

            }
        });
    }
});
// 帖子详情
app.get('/blog/detail', function (req, res) {
    // 先根据当前帖子的id查找帖子
    Blog.findOne({
            _id: req.query._id
        }).populate('author')
        .exec(function (err, data) {
            // 阅读数要增加 nodejs  vue  项目
            data.readCount++;
            data.save(function () {
                // 序列化之后直接可以使用的data对象
                data = JSON.parse(JSON.stringify(data));
                // 因为帖子界面也需要具体的事件所以在这里处理好
                data.time = util.getTimeStr(data.time);
                // 加载ejs模板
                res.render('blog-detail.ejs', {
                    location: '',
                    user: req.session.user,
                    data
                });
            })
        });
})
// 回帖接口
app.post("/api/blog/reply", function (req, res) {
    // 检测有没有登录,登录之后用户就是username 没登录就是nickname
    var replyObj = {
        author: req.session.user ? req.session.user.username : req.body.nickname,
        content: req.body.reply
    }
    // 根据当前的id查找是否有该帖子
    Blog.findOne({
        _id: req.body.blogId
    }).exec(function (err, data) {
        if (data) {
            data.reply.push(replyObj);
            // 分开写
            data.save(function () {
                // 重新刷新详情页
                res.redirect("/blog/detail?_id=" + req.body.blogId);
            });
        }
    })
})
// 删除帖子
app.get('/api/blog/delete', function (req, res) {
    Blog.findOne({
        _id: req.query._id
    }).exec(function (err, data) {
        if (!data) {
            res.send('帖子不存在')
        } else {
            // 看是否是本人
            if (req.session.user._id == data.author) {
                Blog.deleteOne({
                    _id: req.query._id
                }, function () {
                    res.redirect('/');
                });
            }
        }
    })
});
// 标签页的接口
app.get('/tag', function (req, res) {

    // tag:1,id:0 只显示tag这一列的数据
    Blog.find({}, {
        tag: 1,
        _id: 0
    }).exec(function (err, data) {
        var tags = [];
        //  排除空格
        data.forEach(function (el) {
            var arr = el.tag.split(' ');
            arr.forEach(function (ele) {
                tags.push(ele)
            })
        });
        for(var i=0;i<tags.length;i++){
            for(var j=i+1;j<tags.length;j++){
                  if (tags[i]==tags[j]) {
                      tags.splice(j,1);
                      j--;
                  }
            }
        }
        // 加载模板
        res.render('tag.ejs', {
            location: 'tag',
            user: req.session.user,
            tags
        });
    });

})
// 单个标签的接口
app.get('/blog/list',function(req,res){
    // 查询的需要是一个对象包含有作者以及标签
    var condition ={};
    if (req.query.tag) {
        // 使用正则对象对当前的tag数据进行初始化
        condition.tag =new RegExp(req.query.tag);
    }
    Blog.find(condition).exec(function(err,data){
        // 转成对象
        data = JSON.parse(JSON.stringify(data));
        data.forEach(function(el){
            //  需要把时间设置格式
            el.time =util.getTimeStr(el.time);
            // 准备标签数组
            if (el.tag) {
                // 把tag由string 分割成数组
                el.tag = el.tag.split(' ');

            } else {
                data.tag = [];
            }
        });
        // 加载首页模板
        res.render('index.ejs',{
            location:'',
            user:req.session.user,
            data
        })
    })
})
app.get('/blog/author',function(req,res){
    var condition ={};
    if (req.query.author) {
        condition.author =req.query.author;
    }
    Blog.find(condition).exec(function(err,data){
        // 转成对象
        data = JSON.parse(JSON.stringify(data));
        // 加载首页模板
        res.render('index.ejs',{
            location:'',
            user:req.session.user,
            data
        })
    })
})