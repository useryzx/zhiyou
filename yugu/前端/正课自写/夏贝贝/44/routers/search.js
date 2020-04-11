var express = require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router = express.Router();
var StuModel = require('../models/StudentModel');
router.get('/search',function(req,res){
    
    var stuName =req.query.content;
    
    
    StuModel.findOne({stuName:stuName})
    .exec(function(err,data){
         if (!err) {
             if (!data) {
                 return res.json({
                     error:1,
                     msg:'查询学生的信息不存在，请重新输入'
                 });
             }
             res.json({
                 error:0,
                 msg:'查询成功',
                 stu:data
             });
         }
    })
});
router.get('/search/:stuName',function(req,res){
    console.log('stuName:'+req.params.stuName);
    StuModel.findOne({stuName:req.params.stuName})
    .populate('banji').exec(function(err,data){
         if (!err) {
             if (!data) {
                return res.render('error',{
                    title:'学生信息不存在'
                })
             }
             res.render('student',{
                 title:'学生信息展示',
                 student:data
             });
         }
    });
});
module.exports =router;