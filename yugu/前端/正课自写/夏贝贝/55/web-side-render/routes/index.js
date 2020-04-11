var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
let books = [
  { name: '三国演义', price: 120 },
  { name: '水浒传', price: 90 },
  { name: '西游记', price: 200 },
  { name: '红楼梦', price: 66 }
]
router.get('/api/books',function(req,res){
  res.json({err:0,books})
})
module.exports = router;
