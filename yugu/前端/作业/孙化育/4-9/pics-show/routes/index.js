var express = require('express');
var router = express.Router();
// 导入文件上传的模块
const multer = require('multer');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// 文件上传的接口
router.post("/api/upload",multer({dest:"public/pics"}).array('pictures',9),function(req,res){
    res.send({err:0,msg:'存储成功'})
})
module.exports = router;
