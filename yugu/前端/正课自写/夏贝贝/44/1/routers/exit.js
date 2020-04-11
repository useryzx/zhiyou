var express = require('express');
var router = express.Router();
router.get('/user/exit',function(req,res){
    delete req.session.user;
    res.locals.user = req.session.user;
    res.render('index.ejs',{
        title:'学生信息管理系统--首页'
    })
})
module.exports = router;