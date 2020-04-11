var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/get', function(req, res) {
  console.log(req.query);
  // ajax接口普遍采用json格式
  let obj = {
    name:'朝闻天下',
    total:100
  }
  // json数据可以直接返回也可以格式化程json字符串
  res.json(obj)
});


router.post('/api/post',function(req,res){
  console.log(req.body);
  setTimeout(()=>{
    res.json({err:0,msg:'good'})
  },4000)
})

module.exports = router;
