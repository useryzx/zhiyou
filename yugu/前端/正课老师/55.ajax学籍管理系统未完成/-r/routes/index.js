var express = require('express');
var router = express.Router();

/* GET home page. */
// 在服务端准备数据
let books=[
  {name:"三国演义",price:120},
  {name:"水浒传",price:110},
  {name:"西游记",price:150},
  {name:"红楼梦",price:180},
]
router.get("/api/books",function (req,res) {
  // ajax接口[将来单位里面的服务器]只需要返回数据
  // json接口不要直接返回数据，必须要返回对象形式，而且对象中要包含有错误码[自己写的时候一定要注意！！！]
  res.json({err:0,books})
})
module.exports = router;
