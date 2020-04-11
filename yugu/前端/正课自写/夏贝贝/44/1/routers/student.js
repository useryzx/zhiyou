var express = require('express');
var router = express.Router();
var StudentModel = require('../models/StudentModel')
var ClassModel = require('../models/ClassModel')
router.get('/student/add',function(req,res){
    ClassModel.find().exec(function(err,data){
        res.render('student',{
            data,
            title:'添加学生'
        })
    })
    
})
router.post('/student/add',function(req,res){
    StudentModel.findOne({studentName:req.body.studentName}).exec(function(err,data){
        if(data){
            return res.json({
                error:1,
                msg:'学生已存在'
            })
        }
        var stu = new StudentModel(req.body);
        stu.save(function(err){
            if(!err){
                return res.json({
                    error:0,
                    msg:'学生添加成功'
                })
            }
        })
    })
})
module.exports = router;