var express = require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router = express.Router();
var BanjiModel = require('../models/BanjiModel')
var StuModel = require('../models/StudentModel')
router.get('/student/add', function (req, res) {
    BanjiModel.find().exec(function (err, classList) {
        if (!err) {
            res.render('studentAdd', {
                title: '学生信息添加页面',
                list: classList
            })
        }
    })
})
router.post('/student/add', function (req, res) {
    console.log('------------------------');
    var stuName = req.body.stuName;
    var banji = req.body.banji;
    var student = new StuModel(req.body);
    BanjiModel.findOne({ _id: banji }).exec(function (err, data) {
        if (!err) {
            if (!data) {
                return res.json({
                    error: 1,
                    msg: '班级不存在，请先添加班级'
                })
            }
            StuModel.findOne({ stuName: stuName, banji: banji }).exec(function (err, stu) {
                if (stu) {
                    return res.json({
                        error: 1,
                        msg: '学生已存在'
                    })
                }
                student.save(function (err) {
                    if (!err) {
                        data.count += 1;
                        data.save();
                        res.json({
                            error:0,
                            msg:'学生添加成功'
                        })
                    }
                })
            })
        }
    })
})
module.exports = router;