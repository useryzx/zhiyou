var express = require('express')
var Msgobj = require('../DAO/msgDAO')
var util = require('../DAO/utils')
var router = express.Router();
router.get('/',function(req,res){
    // 查询到所有的帖子
    Msgobj.find().populate('author').exec(function(err,data){
        // 转成对象
        data = JSON.parse(JSON.stringify(data));
        //   遍历把对象里的数据拿出来
        data.forEach(function (el) {
            // 时间
            el.time = util.getTimeStr(el.time);
        });
        res.render('index.ejs',{
            title:'首页',
            user:req.session.user,
            data
        })
    })
    
})
router.get('/upload',function(req,res){
    res.render('upload-avatar')
})
module.exports = router;