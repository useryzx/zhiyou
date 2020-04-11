var express =require("express");
var router =express.Router();
var User =require("../DAO/userDAO.js");
// 注册接口
router.post("/register",function(req,res){
    // 默认图
    req.body.avatar ="/avatars/timg.jpg";
      User.findOne({username:req.body.username})
      .exec(function(err,data){
          if (data) {
              res.send("用户名已占用");
          } else {
              var u =new User(req.body);
              u.save(function(){
                  res.redirect("/");
              });
          }
      });
});
// 登录接口
router.post("/login",function(req,res){
    User.findOne({username:req.body.username,psw:req.body.psw})
    .exec(function(err,data){
        if (data) {
        //   存
           req.session.user =data;
           res.redirect("/");
        } else {
           res.send("用户名或密码错误");
        }
    });
});
// 上传头像的接口
// 基于express 用于请求数据处理的中间件，基于busboy构建 用途是高效处理文件上传，原理是在req对象中添加一个body对象和一个file或files对象，body还是负责以前的文本字段，而file则负责对象中包含的表单传上来的文件
var multer =require("multer");
// 建议做大文件上传或者是多个文件上传的时候采用
// 因为可以高度自定义
var storage =multer.diskStorage({
    // 设置上传文件路径的，文件夹如果不存在则会自动创建
    destination:function(req,file,cb){
        // cb是一个回调
        cb(null,'./www/avatars');
    },
    // 给文件夹重命名的
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
var upload =multer({
    storage:storage
})
// 配置静态路径(将来也可以配置硬盘路径同时制定文件夹名字和文件名字)
// var upload=multer({
//     // 不包含图片后缀而且是编码过的名字
//     dest:"./www/avatars"
// });
var fs =require("fs");
var path=require('path');
// single函数代表只上传一整图片，如果用到多张把single切换成arry
router.post("/upload-avatar",upload.single("avatar"),
function(req,res){
    
    // 拿文件的名称
    var fileName =req.file.filename;
    // 拼接url
    var fileUrl ="avatars/"+fileName;
    
    // 因为一个头像对应一个账号
    User.findOne({_id:req.session.user._id})
    .exec(function(err,data)
    {
       // 删....
       data.avatar =fileUrl; 
       data.save(function(){
        //    当保存成功的时候缓存里面也缓存一份
           req.session.user.avatar =fileUrl;
           res.redirect("/");
       })
    });
    
});
module.exports =router;