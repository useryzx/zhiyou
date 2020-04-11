// 注册的路由
var express =require('express');
// router是迷你的app.只用来处理服务端的路由(浏览端发来的请求)
var router =express.Router();
var BanjiModel =require('../models/BanjiModel');
// 返回页面
router.get('/banji/add',function(req,res){
    res.render('banjiadd',{
        title:'班级添加页面'
    });
});
// 班级添加
router.post('/banji/add',function(req,res){
    // 添加班级和注册账号一样需要对班级名称排重
    var className =req.body.className;
    // 判断当前班级是否存在
    BanjiModel.findOne({className:className})
    .exec(function(err,data){
        if (!err) {
            if (data) {
                return res.json({
                    error:1,
                    msg:'班级已存在,请重新输入'
                });
            }
            // 创建班级对象
            var banji =new BanjiModel(req.body);
            banji.save(function(err){
                if (!err) {
                     res.json({
                        error:0,
                        msg:'班级创建成功,请添加学生'
                    });
                }
            });
        }
    });
})
module.exports =router;