var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// 数据库的连接部分
mongoose.connect('mongodb://127.0.0.1:27017/stuInfo', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('数据库连接失败' + err);
    }
    else {
        console.log('数据库连接成功');
    }
})
var stuSchema = new mongoose.Schema({
    name: String,
    psw: String
});
var Stu = mongoose.model('student', stuSchema);

// 服务器的配置部分
var app = express();
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: false }));

// 添加服务器的接口
app.post('/student/signUp', function (req, res) {
    console.log(req.body);
    var stuInfo = req.body;
    // 拿到学生信息存储进数据库
    // 先判断数据库中是否存在，存在则是已经注册
    Stu.find({ name: stuInfo.stuName }, function (err, data) {
        if (err) {
            console.log('查询错误' + err);

        }
        else {
            console.log('查询结果' + data);
            if (data == '') {
                console.log('此学生未录入，可以录入数据库');
                var stu = new Stu({
                    name: stuInfo.stuName,
                    psw: stuInfo.psw
                }).save();
                res.send({
                    error: 0,
                    msg: '注册成功'
                })
            }
            else {
                console.log('此学生已录入');
                res.send({
                    error: 1,
                    msg: '此学生已注册'
                })
            }
        }
    })
})
// 登录接口
app.post('/student/logIn', function (req, res) {
    console.log(req.body);
    var stuInfo = req.body;
    // 拿到学生信息存储进数据库
    // 先判断数据库中是否存在，存在则是已经注册
    Stu.find({ name: stuInfo.stuName }, function (err, data) {
        if (err) {
            console.log('查询错误' + err);
        }
        else {
            console.log('查询结果' + data);
            if (data == '') {
                console.log('此学生不存在，请注册');
                res.send({
                    error: 2,
                    msg: '用户不存在'
                })
            }
            else {
                console.log('此学生已录入');
                // 查询到的是列表对象，要用索引取出要用的对象
                if (stuInfo.psw = data[0].psw) {
                    console.log('登陆成功');
                    res.send({
                        error: 0,
                        msg: '登陆成功'
                    })
                }
                else {
                    console.log('账号或密码错误');
                    res.send({
                        error: 1,
                        msg: '账号或密码错误'
                    })
                }
            }
        }
    })
})
app.listen(3000, function () {
    console.log('running');
})