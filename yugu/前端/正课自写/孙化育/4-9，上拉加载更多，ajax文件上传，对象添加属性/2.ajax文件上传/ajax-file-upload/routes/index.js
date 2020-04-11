var express = require('express');
var router = express.Router();
const multer = require("multer");
let upload = multer({
  dest:'public/avatar'
})
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/upload',upload.single('avatar'),function(req,res){
  res.send({err:0})
})

module.exports = router;
