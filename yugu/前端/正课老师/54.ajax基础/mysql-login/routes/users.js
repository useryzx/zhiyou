var express = require('express');
var router = express.Router();

const userDAO =require("../bin/DAO/userDAO");

/* 注册. */
router.post('/regist', function(req, res, next) {
  userDAO.userRegist(req.body)
  .then(()=>{
    res.send('注册成功');
  })
  .catch(err=>{
    res.send('注册失败');
  });
});

router.post('/login', function(req, res) {
  userDAO.userLogin(req.body)
  .then(data=>{
     if (data.length<=0) {
         res.send('用户或密码错误');
     }
     else
     {
       req.session.user =data[0];
       res.redirect("/");
     }
  })
  .catch(err=>{
    res.send(err);
  });
});


module.exports = router;
