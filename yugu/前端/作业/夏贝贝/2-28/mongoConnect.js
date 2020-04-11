// 配置服务器
var express = require('express')
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('www'))
app.set('view engine', 'ejs')


// 引入班级学生模板
var Class = require('./bin/DAO/ClassDAO.js')
var Student = require('./bin/DAO/StudentDAO.js')
// 班级管理接口
app.get("/api/class", function (req, res) {
    Class.find().exec(function (err, data) {
        if (!err) {
            res.render('classAdd.ejs', { data })
        }
    })
})
// 班级添加接口
app.post('/api/class/add', function (req, res) {
    console.log(req.body);
    Class.find({ className: req.body.className }).exec(function (err, data) {
        if (data && data != '') {
            console.log('班级信息存在');
            return;
        }
        else {
            console.log('班级信息不存在');
            var cla = new Class({
                className: req.body.className,
                classMajor: req.body.classMajor,
                classNum: req.body.classNum,
                classTeacher: req.body.classTeacher
            }).save(function (err) {
                if (err) {
                    console.log('班级信息添加错误');

                }
                else {
                    console.log('班级信息添加成功');
                    Class.find().exec(function (err, data) {
                        if (!err) {
                            res.render('classAdd.ejs', { data })
                        }
                    })
                }
            })
        }
    })

})
// 学生管理接口
app.get("/api/student", function (req, res) {
    Class.find().exec(function (err, data) {
        if (!err) {
            res.render('studentAdd.ejs', { data })
        }
    })
})
// 学生添加接口
app.post('/api/student/add', function (req, res) {
    console.log(req.body.studentClass);
    Class.findOne({ className: req.body.studentClass }).exec(function (err, data) {
        var id = data._id;
        var stu = new Student({
            studentName: req.body.studentName,
            studentClass: id
        }).save(function (err) {
            if (err) {
                console.log('学生添加错误' + err);
            }
            else {
                console.log('学生添加成功');
                res.redirect('/api/student')
            }
        })
    })
})
// 学生列表
app.get("/api/stu-list", function (req, res) {
    Student.find().populate('studentClass').exec(function(err,data){
        console.log(data);
        res.render('stuList.ejs',{data})
    })
    
})

app.listen(3000, function (err) {
    if (!err) {
        console.log('鱼骨你的服务器跑了');
    }
})









// 关联：如果是car往people上关联，一定要确保People表中有可以关联的对象才行
// var p1 = new People({
//     name: '许文强',
//     age: '66'
// }).save(function(err) {
//         console.log('存储成功');
//     
// })

// var c1 = new Car({
//     name:'保时捷',
//     p:'5e586f8a1655151194f03432'
// }).save(function(err){
//     console.log('关联成功');

// })
// Car.findOne().populate('p').exec(function(err,data){
//     console.log(data);
// })

