var express = require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router = express.Router();
var BanjiModel = require('../models/BanjiModel')
var StuModel = require('../models/StudentModel')
router.get('/student/update/:banji/:stuName',function(req,res){
    var stuName  = req.params.stuName;
    var banji = req.params.banji;
    StuModel.findOne({banji:banji,stuName:stuName}).populate('banji').exec(function(err,student){
        if(!err){
            if(!student){
                return res.render('error',{
                    title:'错误界面'
                })
            }
            BanjiModel.find().exec(function (err, classList) {
                if (!err) {
                    res.render('update', {
                        title: '修改页面',
                        list: classList,
                        student:student
                    })
                }
            })
            
        }
    })
})
router.post('/student/update',function(req,res){
    console.log('****');
    console.log(req.body);
    
    var stuName = req.body.stuName
    var banji = req.body.banji
    
    StuModel.updateOne({stuName:stuName,banji:banji},req.body).exec(function(err){
        console.log('---------');
        
        if(!err){
            res.json({
                error:0,
                msg:'信息更新成功'
            })
        }
        else{
            res.json({
                error:1,
                msg:'信息更新失败'
            })
        }
    })
})
module.exports = router