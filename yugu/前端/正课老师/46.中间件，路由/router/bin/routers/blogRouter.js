var express=require('express');
var app=express();
var router=express.Router();
router.get('/api/blog',function(req,res){
    res.send('准备发博客啦')
});
module.exports=router;