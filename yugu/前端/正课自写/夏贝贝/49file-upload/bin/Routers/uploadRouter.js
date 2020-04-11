var express = require('express')
var router = express.Router();

var multer = require('multer')
var upload = multer({
    dest:'./upload-file',
    limits:{
        fileSize:500*1024*1024//500MB
    },
    fileFilter:function(req,file,cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true)

        }
        else{
            cb({message:'文件类型错误'},false)
        }
    }
})
router.post("/upload",upload.single('ff'),function(req,res){
    console.log(req.file);
    console.log(req.body);
    res.send('文件已接收')
})
router.use(function(err,req,res,next){
    res.send(err.message)
})
module.exports= router;