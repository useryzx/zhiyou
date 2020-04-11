var express = require('express');
var router = express.Router();
const userDao = require('../bin/DAO/userDao')
/* GET users listing. */
// 注册
router.post('/user/register', function(req, res, next) {
  userDao.userRegist(req.body).then(()=>{
    res.send('注册成功')
  }).catch(err=>{
    console.log(err);
    res.send('注册失败')
  })
});

router.post('/user/login', function(req, res) {
  userDao.userLogin(req.body).then((data)=>{
    if(data.length<=0){
      res.send('账号或密码错误')
    }
    else{
      req.session.user=data[0];
      res.redirect('/',)
    }
   
  }).catch(err=>{
    console.log(err);
    res.send('登陆失败')
  })
});
module.exports = router;
