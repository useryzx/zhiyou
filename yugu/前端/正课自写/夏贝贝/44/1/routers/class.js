var express = require('express');
var router = express.Router();
var ClassModel = require('../models/ClassModel')
router.get('/class/add',function(req,res){
    res.render('class',{
        title:'添加班级'
    })
})
router.post('/class/add',function(req,res){
    ClassModel.findOne({className:req.body.className}).exec(function(err,data){
        if(data){
            return res.json({
                error:1,
                msg:'班级已存在'
            })
        }
        var cla = new ClassModel(req.body);
        cla.save(function(err){
            if(!err){
                return res.json({
                    error:0,
                    msg:'班级添加成功'
                })
            }
        })
    })
})
module.exports = router;