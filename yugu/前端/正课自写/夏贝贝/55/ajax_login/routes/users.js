var express = require('express');
var router = express.Router();
// 导入数据库对象
const User = require('../bin/DAO/userDAO')
/* GET users listing. */
router.post('/regist', function(req, res) {
  console.log(req.body);
  
  User.findOne({account:req.body.account}).then(data=>{
    if(data){
      res.json({err:1,msg:'用户名已被占用'})
    }
    else{
      new User(req.body).save().then(()=>{
        res.json({err:0,msg:'注册成功'})
      })
    }
  })
});
 
router.post('/login', function(req, res) {
  console.log(req.body);
  User.findOne(req.body).then(data=>{
    if(data){
      res.json({err:0,msg:'登陆成功'})
    }
    else{
        res.json({err:2,msg:'账号或密码错误'})
    }
  })
});

module.exports = router;
