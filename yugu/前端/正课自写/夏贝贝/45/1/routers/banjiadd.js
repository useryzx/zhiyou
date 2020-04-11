var express =require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router =express.Router();
var BanjiModel = require('../models/BanjiModel')
router.get('/banji/add',function(req,res){
    res.render("banjiadd",{
        title:'班级添加页面'
    })
})
router.post('/banji/add',function(req,res){
    console.log('*****************');
    
    var className = req.body.className;
    BanjiModel.findOne({className:className}).exec(function(err,data){
        if(!err){
            if(data){
                return res.json({
                    error:1,
                    msg:'班级已存在，请重新输入'
                })
            }
            var banji  =  new BanjiModel(req.body);
            banji.save(function(err){
                if(!err){
                    res.json({
                        error:0,
                        msg:'班级已添加，请添加学生'
                    })
                }
            })
        }
    })
})
module.exports = router;