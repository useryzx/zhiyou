var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get("/searchWord",function(req,res){
  console.log(req.query);
  let words = [req.query.keyWord+"first",req.query.keyWord+"second",req.query.keyWord+"third"]
  res.json(JSON.stringify(words))
})
module.exports = router;
