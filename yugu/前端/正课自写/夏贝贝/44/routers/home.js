var express = require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router = express.Router();
var StuModel = require('../models/StudentModel');
//为router挂载一个对于当前路径处理过程的方法(接口)
router.get('/', function (req, res) {
    // 处理分页的逻辑 默认是1
    var page = parseInt(req.query.page) || 1;

    // 设置当前页码page
    var left = page;
    var right = page;
    var num = 10;

    var pages = [page];
    // 查询信息条数
    StuModel.count(function (err, count) {
        if (!err) {
            //    获取总页码数量
            var pageTotal = Math.ceil(count / num);
            //   确保left和right的值在正常范围 // 假设页码数量显示5个
            while (left > 1 || right < (pageTotal) && pages.length < 5) {
                if (left > 1) {
                    // 向左回滚数据
                    pages.unshift(-- left)
                }
                // 向右获取新数据
                if (right < pageTotal) {
                    pages.push(++right);
                }
            }
            //   获取学生信息并根据创建事件进行排序查询
            // 把最先创建的学生放到最上面
            // skip跳过m条数据 limit限制显示数据的数量
            // 获取第n页解析来的m条数据
            StuModel.find().sort({
                    createTime: -1
                }).populate('banji', 'className teacher')
                .skip((page - 1) * num).limit(num).exec(function (err, students) {
                     if (!err) {
                        res.render('index', {
                            title: '学生信息管理系统--首页',
                            students:students,
                            pages:pages,
                            // 最后一页
                            pageTotal:pageTotal
                        });
                     }
                })
        }
    });
   
});
// 删除
router.get('/student/delete/:banji/:stuName',function(req,res){
    // 这种接口路径属于动态路径banji和stuName都不是固定的值
    StuModel.deleteOne({stuName:req.params.stuName})
    .exec(function(err){
        if (!err) {
            res.json({
               error:0,
               msg:'删除成功'
           });
       }
       else
       {
        res.json({
            error:1,
            msg:'删除失败'
        });
       }
    })
    
})
// 退出
router.get('/user/logout',function(req,res){
    // 删除cookie
    res.clearCookie('username');
    // 清除session
    req.session.user =null;
    // 重定向服务器 刷新服务器设置到浏览端路径跳转
    res.redirect('/');
});
// 以为server文件需要用到你的
module.exports = router;