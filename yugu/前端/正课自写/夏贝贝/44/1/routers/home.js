var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    res.render('index.ejs',{
        title:'学生信息管理系统--首页'
    })
})
module.exports = router;