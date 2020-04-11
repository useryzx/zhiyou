// 注册的路由
var express = require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router = express.Router();
var BanjiModel = require('../models/BanjiModel');
// 学生表
var StuModel = require('../models/StudentModel');
// 跳转学生添加的页面
router.get('/student/add', function (req, res) {
    // 查询一下班级有了就能跳转
    BanjiModel.find().exec(function (err, classList) {
        if (!err) {
            res.render('studentAdd', {
                title: '学生信息添加页面',
                list: classList
            });
        }
    })
});
// 添加学生借口
router.post('/student/add', function (req, res) {
    
    var stuname = req.body.stuName;
    var banji = req.body.banji;
    // 生成实例化对象
    var student = new StuModel(req.body);
    // 判断班级是否存在
    BanjiModel.findOne({
            '_id': banji
        })
        .exec(function (err, data) {
            if (!data) {
                return res.json({
                    error: 1,
                    msg: '班级不存在，请重新录入'
                });
            }
            //    判断学生是否存在()
            StuModel.findOne({
                    stuName: stuname,
                    banji: banji
                })
                .exec(function (err, stu) {
                  if (stu) {
                    return res.json({
                        error: 1,
                        msg: '学生已存在，请重新录入'
                    });
                  }
                  student.save(function(err){
                      if (!err) {
                        //   在当前的班级里增加一个学生
                            data.count +=1; 
                            data.save();
                            res.json({
                                error:0,
                                msg:'学生添加成功'
                            });
                      }
                  })

                });
        })
});
module.exports = router;