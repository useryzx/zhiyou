var express = require('express');
var router = express.Router();

/* GET home page. */

let multer = require("multer");

let upload = multer({
    dest:"public/upload"
})


router.post("/upload",upload.single("avatar"), function (req,res) {
    console.log(req.file);
    // 将用户的头像信息写入数据库

    // 请求体中的普通文本字段会被解析为键值对存在req.body中。
    console.log(req.body);

    res.json({
        err:0,
        msg:"上传成功"
    });
});



module.exports = router;
