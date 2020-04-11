var express =require("express");
var router =express.Router();
// 首页接口
router.get("/",function(req,res){
      res.render("index.ejs",{
          user:req.session.user
      });
});
// 跳转头像界面
router.get("/upload",function(req,res){
    res.render("upload-avatar.ejs");
});
module.exports =router;