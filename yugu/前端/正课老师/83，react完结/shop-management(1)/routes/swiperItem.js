const express = require('express');
const router = express.Router();

const filters = require("../filters/filters.js");
const utils = require("../utils/utils.js");
const config = require("../config.js");
const middleware = require("../middleware/middleware.js");
const SwiperItem = require("../DAO/SwiperItem.js");

router.use(filters.isLogin);
router.use(middleware.withUserInfo);
router.use(filters.checkAuthority("swiper"));


// 获取轮播图列表
router.get("/list",function(req,res){
    SwiperItem.find()
    .then(data=>{
        res.json({
            err:0,
            msg:"获取成功",
            data:data
        })
    })
    .catch(err=>{
        throw err;
    })
});


// 添加轮播图
router.post("/add",filters.checkParams(["img","url"]));
router.post("/add",function(req,res){

    SwiperItem.countDocuments()
    .then(data=>{
        if(data<config.page.swiperItemNum){
            return new SwiperItem(req.body).save();
        }else{
            return Promise.reject(1);
        }
    })
    .then(data=>{
        res.json({
            err:0,
            msg:"添加成功",
            data:data
        })
    })
    .catch(err=>{
        if(err==1){
            res.json({
                err:20,
                msg:"轮播图已满"
            })
        }else{
            throw err;
        }
    })
});

// 删除轮播图
router.post("/delete",filters.checkParams(["_id"]));
router.post("/delete",function(req,res){
    SwiperItem.findByIdAndRemove(req.body._id)
    // SwiperItem.deleteOne({_id:req.body._id})
    .then(data=>{
        let fname = data.img.split("/");
        fname = fname[fname.length-1];
        utils.deleteUploadFile(fname);

        res.json({
            err:0,
            msg:"删除成功",
        });
    })
    .catch(err=>{
        throw err;
    })
});



module.exports = router;
