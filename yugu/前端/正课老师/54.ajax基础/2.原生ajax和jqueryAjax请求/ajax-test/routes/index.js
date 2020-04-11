var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/get', function(req, res) {
    console.log(req.query);
    // ajax接口，返回的数据普遍都采取json格式
    let obj={
        name:"吴迪",
        total:100
    }
    // json数据可以直接返回也可以格式化转化成json字符串
    // res.send(JSON.stringify(obj));
    res.json(obj)
});
module.exports = router;

router.post('/api/post', function(req, res) {
  console.log(req.body);
  setTimeout(()=>{
    res.json({err:0,msg:'good'});
  },3000);
});
module.exports = router;
