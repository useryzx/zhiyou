var express = require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router = express.Router();
var BanjiModel = require('../models/BanjiModel')
var StuModel = require('../models/StudentModel')
router.get('/search',function(req,res){
    console.log('*-*-*-*-*-*');
    console.log(req.query.search);
    
    var stuName = req.query.search;
    console.log(stuName);
    
    StuModel.findOne({stuName:stuName}).exec(function(err,data){
        if(!err){
            if(!data){
                return res.json({
                    error:1,
                    msg:'查询信息不存在111'
                })
            }
            res.json({
                error:0,
                msg:'查询成功',
                student:data
            })
        }
    })
})
router.get('/search/:stuName',function(req,res){
    StuModel.findOne({stuName:req.params.stuName}).populate('banji').exec(function(err,data){
        if(!err){
            if(!data){
                return res.render('error',{
                    title:'学生信息不存在222'
                })
                
            }
            res.render('student',{
                title:'学生信息展示',
                students:data
            })
        }
    })
})
module.exports = router