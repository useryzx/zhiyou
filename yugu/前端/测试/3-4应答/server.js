// 拿取express
var express = require('express');
// 导入中间件，支持post
var bodyParser = require('body-parser');
// 获取服务器对象
var app = express();
// 配置服务器静态文件夹www
app.use(express.static('www'));
// 无需扩展
app.use(bodyParser.urlencoded({ extended: false }));
// 引入ejs模板模块
app.set('view engine', 'ejs');
// 使用md5加密
var md5 = require('md5');
// 导入session
var session = require('express-session');
app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true
}))
// 获取用户，学生和班级对象
var User = require('./bin/DAO/UserDAO.js');
var Student = require('./bin/DAO/StudenDAO.js');
var Class = require('./bin/DAO/ClassDAO');

// 首页接口
// 由于首页登陆前后页面不同，可以用主页接口，返回ejs模版中实现
var flag;
app.get('/', function (req, res) {
    // 判断session来辨别有没有登陆
    if (!req.session.user) {
        flag = false;
    }
    else {
        flag = true;
    }
    // 查询条件
    var term = {};
    if (req.query.studentName) {
        // 正则化
        term.studentName = RegExp(req.query.studentName)
    }
    // 定义页码
    var num = req.query.num ? req.query.num*1 : 0;
    // 查询到所有数据的数量
    Student.find().countDocuments().exec(function (err, count) {
        if (!err) {
            // 关联表查询，获取到学生的班级
            Student.find(term).populate('studentClass').skip(num * 10).limit(10).exec(function (err, data) {
                if (!err) {
                    res.render("main.ejs", {
                        data,
                        num,
                        flag,
                        // 记录总页码
                        total: Math.ceil(count / 10)
                    });
                }
            });
        }
    });
})

// 注册接口
app.post("/api/register", function (req, res) {
    // res.end('*************');
    // 用户密码进行加密
    req.body.userPsw = md5(req.body.userPsw);
    // 查找账号是否已经注册
    User.findOne({ userName: req.body.userName })
        .exec(function (err, data) {
            if (data) {
                res.send('账号已注册');
            }
            else {
                new User(req.body).save(function (err) {
                    if (!err) {
                        // 注册成功跳转进登陆界面
                        // res.redirect('/login.html');
                        res.render('temp.ejs',{
                            msg:'注册成功',
                            link:'/login.html'
                        })
                    }
                });
            }
        })
})
// 登陆接口
app.post("/api/login", function (req, res) {
    console.log('登陆接口访问正常');
    req.body.userPsw = md5(req.body.userPsw);
    User.findOne(req.body).exec(function (err, data) {
        if (data) {
            // 账号密码正确时
            // 保存user
            req.session.user = data;
            // 查找学生返回到主页模板
            // res.redirect('/');
            res.render('temp.ejs',{
                msg:'登陆成功',
                link:'/'
            })
        }
        else {
            // res.send('账号或密码错误')
            res.render('temp.ejs',{
                msg:'账号或密码错误',
                link:'/login.html'
            })
        }
    })
})
// 用户退出接口
app.get("/api/exit", function (req, res) {
    delete req.session.user;
    res.render('temp.ejs',{
        msg:'退出成功',
        link:'/'
    })
})

// 添加班级接口
app.post("/api/class/add", function (req, res) {
    console.log('班级添加接口正常');
    // 先判断班级是否添加
    Class.findOne({ className: req.body.className }).exec(function (err, data) {
        if (data) {
            res.send('班级已存在')
        }
        else {
            new Class({
                className: req.body.className,
                classRoom: req.body.classRoom,
                classTeacher: req.body.classTeacher
            }).save(function (err, data) {
                if (!err) {
                    console.log('班级添加成功');
                    // res.redirect('/api/student/manage')
                    res.render('temp.ejs',{
                        msg:'班级添加成功',
                        link:'/api/student/manage'
                    })
                    
                }
                else {
                    console.log('班级添加失败' + err);
                    res.render('temp.ejs',{
                        msg:'班级添加失败',
                        link:'/class.html'
                    })
                }
            })
        }
    })

})
// 学生添加跳转管理接口
app.get('/api/student/manage', function (req, res) {
    console.log('学生添加跳转管理接口正常');
    Class.find().exec(function (err, data) {
        res.render('student.ejs', { data })
    })

})
// 学生添加接口
app.post("/api/student/add", function (req, res) {
    console.log('学生添加接口正常');
    Student.findOne({ studentName: req.body.studentName }).exec(function (err, data) {
        if (data) {
            res.send('学生已注册');
        }
        else {
            new Student({
                studentName: req.body.studentName,
                studentAge: req.body.studentAge,
                studentSex: req.body.studentSex,
                studentClass: req.body.studentClass
            }).save(function (err) {
                if (!err) {
                    // res.redirect('/')
                    res.render('temp.ejs',{
                        msg:'学生添加成功',
                        link:'/'
                    })
                }
            })
        }
    })
})
// 学生信息访问更新接口
app.get("/api/student/update", function (req, res) {
    console.log('学生信息更新访问接口正常');
    Student.findOne({
        _id: req.query._id
    }).populate('studentClass').exec(function (err, data) {
        if (!err) {
            // a记录查询到的当前的学员，再查到所有的班级信息，返回进ejs中
            var a = data;
            Class.find().exec(function (err, data) {
                res.render("update.ejs", { a, data })
            })
        }
    })
})
// 学生信息更新存储接口
app.post("/api/student/resave", function (req, res) {
    Student.updateOne({ _id: req.body._id }, {
        $set: {
            studentName: req.body.studentName,
            studentAge: req.body.studentAge,
            studentSex: req.body.studentSex,
            studentClass: req.body.studentClass
        }
    }).exec(function(err){
        if(!err){
            console.log('学生信息更新成功');
            // res.redirect('/')
            res.render('temp.ejs',{
                msg:'学生信息更新成功',
                link:'/'
            })
        }
    })
})
// 学生删除接口
app.post("/api/student/delete", function (req, res) {
    console.log('学生删除接口正常');
    Student.deleteOne({_id:req.body._id}).exec(function(err){
        if(!err){
            console.log('学生信息删除成功');
            // res.redirect("/");
            res.render('temp.ejs',{
                msg:'学生信息删除成功',
                link:'/'
            })
        }
    })
})


// 启动服务器
app.listen(3000, function (err) {
    if (!err) {
        console.log('学籍管理系统服务器启动');
    }
})