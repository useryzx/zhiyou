var express = require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router = express.Router();
var StuModel = require('../models/StudentModel')
//为router挂载一个对于当前路径处理过程的方法(接口)
router.get('/', function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var left = page;
    var right = page;
    var pages = [page];
    var num = 10;
    StuModel.count(function (err, count) {
        if (!err) {
        console.log('////////////////////////////');
            var pageTotal = Math.ceil(count / num);
            while (left > 1 || right < pageTotal && pages.length < 5) {
                if (left > 1) {
                    pages.unshift(--left)
                }
                if (right < pageTotal) {
                    pages.push(++right);
                }
            }
            StuModel.find().sort({ createTime: -1 }).populate('banji', 'className teacher').skip((page - 1) * num).limit(num).exec(function (err, students) {
                if (!err) {
                    // 需要
                    res.render('index', {
                        title: '学生信息管理系统--首页',
                        students:students,
                        pages:pages,
                        pageTotal:pageTotal
                    });
                }
            })
        }
    })
});
router.get('/student/delete/:banji/:stuName',function(req,res){
    console.log('/*/*/*/*');
    console.log(req.params);
    StuModel.deleteOne({stuName:req.params.stuName}).exec(function(err){
        if(!err){
            res.json({
                error:0,
                msg:'删除成功'
            })
        }
        else{
            res.json({
                error:1,
                msg:'删除失败'
            })
        }
    })
    
})
router.get('/user/logout',function(req,res){
    res.clearCookie('username');
    req.session.user=null;
    res.redirect("/")
})
// 以为server文件需要用到你的
module.exports = router;