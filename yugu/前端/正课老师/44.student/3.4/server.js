var express = require("express");
var md5 = require("md5");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("www"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set("view engine", "ejs");
app.use(session({
    secret: "qwer",
    resave: false,
    saveUninitialized: true
}))
// 数据库
var User = require('./bin/DAO/UserDAO.js');
var Class = require('./bin/DAO/ClassDAO.js');
var Student = require('./bin/DAO/StudentDAO.js');
// 首页接口
app.get("/", function (req, res) {
    var condition = {};
    if (req.query.name) {
        condition.name = RegExp(req.query.name);
    }
    var page = req.query.page ? req.query.page : 0;
    page = page * 1;
    Student.find().countDocuments().exec(function (err, count) {
        Student.find(condition).populate("class").skip(page * 10).limit(10).exec(function (err, data) {
            if (!err) {
                // 渲染模板
                res.render("index.ejs", { data, page, total: Math.ceil(count / 10) });
            }
        })
    })
});
// 注册接口
app.post("/api/register", function (req, res) {
    req.body.psw = md5(req.body.psw);
    User.findOne({
        username: req.body.username
    }).exec(function (err, data) {
        if (data) {
            res.send("账号已注册")
        } else {
            new User(req.body).save(function (err) {
                if (!err) {
                    res.redirect("/");
                }
            })
        }
    })
});
// 登录接口
app.post('/api/login', function (req, res) {
    req.body.psw = md5(req.body.psw);
    User.findOne(req.body).exec(function (err, data) {
        if (data) {
            req.session.user = data;
            res.render('temp.ejs',{
                msg:'登陆成功',
                link:'/'
            })
        }
        else {
            res.render('temp.ejs',{
                msg:'账号或密码错误',
                link:'/login.html'
            })
        }
    })
})
// 添加班级接口
app.post("/api/class", function (req, res) {
    Class.findOne({
        classname: req.body.classname
    }).exec(function (err, data) {
        if (data) {
            res.json({
                error: 0,
                msg: "班级已添加过了"
            })
        } else {
            new Class(req.body).save(function (err) {
                if (!err) {
                    res.render('student.ejs',{
                        msg:'添加成功',
                        link:'/index'
                    })
                } else {
                    res.json({
                        error: 0,
                        msg: "班级添加失败"
                    })
                }
            })

        }
    })
});
// 添加学生接口
app.get("/api/student", function (req, res) {
    Class.find().exec(function (err, data) {
        if (!err) {
            res.render("student.ejs", {
                data
            })
        }
    })
});
// 提交信息
app.get("/api/add", function (req, res) {
    Student.findOne({
        name: req.query.name
    }).exec(function (err, data) {
        if (data) {
            res.json({
                error: 0,
                msg: "学生信息已存在"
            })
        } else {
            new Student({
                name: req.query.name,
                age: req.query.age,
                sex: req.query.sex,
                class:req.query.class
            }).save(function (err) {
                if (!err) {
                    res.redirect("/")
                } else {
                    res.json({
                        error: 0,
                        msg: "添加失败"
                    })
                }
            })
        }
    })
})
// 编辑
app.get("/api/stu/edit", function (req, res) {
    Student.findOne({_id: req.query._id}).populate('class').exec(function (err, data) {
        if (!err) {
            var stu = data;
            Class.find().exec(function (err, data) {
                res.render("update.ejs", { stu, data })
            })
        }
    })
});
app.post("/api/edit", function (req, res) {
    Student.updateOne({ _id: req.body._id }, {
        $set: {
            name: req.body.name,
            age: req.body.age,
            sex: req.body.sex,
            class: req.body.class
        }
    }).exec(function(err){
        if(!err){
            res.render('temp.ejs',{
                msg:'学生信息更新成功',
                link:'/'
            })
        }
    })
});
// 删除
app.get("/api/stu/remove", function (req, res) {
    Student.deleteOne({
        _id: req.query._id
    }).exec(function (err) {
        if (!err) {
            res.redirect("/")
        }
    })
})
// 退出
app.get("/api/out", function (req, res) {
    if (req.session.user) {
        delete req.session.user
        res.redirect("/")
    }
})
app.listen(8080, function () {
    console.log("running...");
})