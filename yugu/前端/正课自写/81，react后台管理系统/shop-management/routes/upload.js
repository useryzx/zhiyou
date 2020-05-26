const express = require('express');
const router = express.Router();

const uploadHandler = require("../middleware/uploadHandler.js");
const filters = require("../filters/filters.js");

router.use(filters.isLogin);

// 上传单个文件
router.post("/single",uploadHandler.single,function(req,res){
    res.json({
        err:0,
        msg:"上传成功",
        fileUrl:`/images/${req.file.filename}`
    })
});

// 一次上传多个文件
router.post("/multiple",uploadHandler.multiple,function(req,res){
    res.json({
        err:0,
        msg:"上传成功",
        fileUrl:req.files.map(el=>{
            return `/images/${el.filename}`
        })
    })
});


module.exports = router;
