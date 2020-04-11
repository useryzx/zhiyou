var express = require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router = express.Router();
var StuModel = require('../models/StudentModel');
var BanjiModel = require('../models/BanjiModel');
// 
router.get('/student/update/:banji/:stuName', function (req, res) {
    // 拿出来班级和学生名字
    var stuName = req.params.stuName;
    var banji = req.params.banji;
    // 查询出完整的学生信息
    StuModel.findOne({
            banji: banji,
            stuName: stuName
        })
        .exec(function (err, student) {
            if (!err) {
                if (!student) {
                    // 出现错误的时候加上return是为了断开此次请求
                    return res.render('error', {
                        title: '页面错误'
                    })
                }

                BanjiModel.find().exec(function (err, classList) {
                    if (!err) {
    
                        // 去更新界面
                        res.render('update', {
                            title: '修改页面',
                            student: student,
                            list: classList
                        });
                    }
                })

            }
        })

});
// 修改
router.post('/student/update/:banji/:stuName', function (req, res) {
    var stuName = req.params.stuName;
    var banji = req.params.banji;
    console.log("????"+banji);
   
    // 更新
    StuModel.updateOne({stuName:stuName,banji:banji}, {
        $set:req.body
    })
    .exec(function(err){
        if (!err) {
            res.json({
                error:0,
                msg:'修改成功'
            });
        }
        else
        {
            res.json({
                error:1,
                msg:'修改失败'
            });
        }
    });
})
module.exports = router;