var express =require('express');
var router =express.Router();
// 引入multer模块
var multer =require('multer');
var upload =multer({
    // 设置上传文件所在的位置dest不具备创建文件夹的能力
    dest:'./upload-file',
    // 指定文件的大小
    limits:{
        // 设置单个文件大小  单位是Byte
        fileSize:500*1024
    },
    // 配置文件过滤 file代表此次传上来的图片
    fileFilter:function(req,file,cb){
        // mimetype代表的是文件的类型
        if (file.mimetype.startsWith('image')) {
            // cb是回调函数第一个参数是错误信息
            // 第二个参数是是否'继续’
            cb(null,true);
        }
        else
        {
            cb({message:'文件格式不对，只能是图片'},false)
        }
    }
});  
// 设置上传接口  ff代表form表单里面提交过来的文件
router.post('/upload',upload.single('ff'),
function(req,res){
    // multer将请求中的文件存储之后会把文件的信息
    // 包括文件存储时的文件名都放到file中
    // 如果设置的是upload.array()多个文件的话，则会放到files中
     console.log(req.file);
    //  除了将请求中的文件存储之外，multer还会把本次请求的的
    // 非文件字段解析成对象,存入req.body（可以理解为multer封装了post）
     console.log(req.body);
     res.send('文件已接收');
     
     
});
// 插入一个请求处理出错的处理函数,
// 异常处理 第一个是错误信息对象
// 原理是当请求出错的时候会执行该错误函数
router.use(function(err,req,res,next){
    res.send(err.message);
})
module.exports =router;