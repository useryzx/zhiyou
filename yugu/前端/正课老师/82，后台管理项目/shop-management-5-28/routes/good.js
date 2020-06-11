const express = require('express');
const router = express.Router();

const filters = require("../filters/filters.js");
const utils = require("../utils/utils.js");
const config = require("../config.js");
const middleware = require("../middleware/middleware.js");
const Good = require("../DAO/Good.js");


router.use(filters.isLogin);
router.use(middleware.withUserInfo);
router.use(filters.checkAuthority("good"));


// 添加新商品
router.post("/add",filters.checkParams(["name","price","number","image","introduce"]));
router.post("/add",function(req,res){
    const g = {...req.body};
    g.isOnSell = true;
    g.createTime = new Date();
    g.creator = req.session.userId;
    new Good(g)
    .save()
    .then(data=>{
        res.json({
            err:0,
            msg:"添加成功",
            data:data
        })
    })
    .catch(err=>{
        throw err;
    })
});

// 查询商品
router.post("/search",function(req,res){
    const search = utils.takeSearch(req.body,["name","category","creator","isOnSell"]);
    const offset = req.body.offset||0;
    const size = req.body.size||config.server.pageSize;
    const sortCondition = {}
    if(req.body.sortBy){
        sortCondition[req.body.sortBy] = req.body.sortType||1;
    }
    Promise.all([
        Good.find(search).skip(offset).limit(size).sort(sortCondition).populate("category").populate("creator",{psw:0}).exec(),
        Good.countDocuments(search)
    ])
    .then(dataArr=>{
        res.json({
            err:0,
            msg:"获取成功",
            data:dataArr[0],
            currentPage:Math.ceil(offset/size),
            totalPage:Math.ceil(dataArr[1]/size)
        })
    })
    .catch(err=>{
        throw err;
    })
});

// 修改商品信息
router.post("/update",filters.checkParams(["_id"]));
router.post("/update",function(req,res){
    const search = utils.takeSearch(req.body,["name","isOnSell","price","spec","category","introduce"]);
    Good.updateOne({_id:req.body._id},{$set:search})
    .then(data=>{
        res.json({
            err:0,
            msg:"修改成功",
        })
    })
    .catch(err=>{
        throw err;
    })
});

// 修改商品图片
router.post("/set-image",filters.checkParams(["_id","url"]));
router.post("/set-image",function(req,res){
    Good.findOne({_id:req.body._id})
    .then(data=>{
        let fname = data.image.split("/");
        fname = fname[fname.length-1];
        utils.deleteUploadFile(fname);
        data.image = req.body.url;
        return data.save();
    })
    .then(d=>{
        res.json({
            err:0,
            msg:"修改完毕"
        });
    })
    .catch(err=>{
        throw err;
    })
});

// 删除商品轮播图片
router.post("/delete-swiper-image",filters.checkParams(["_id","url"]));
router.post("/delete-swiper-image",function(req,res){
    Good.findOne({_id:req.body._id})
    .then(data=>{
        let fname = req.body.url.split("/");
        fname = fname[fname.length-1];
        utils.deleteUploadFile(fname);
        if(data.images.length>0){
            data.images.splice(data.images.indexOf(req.body.url))
            return data.save();
        }else{
            return Promise.reject(1);
        }
    })
    .then(d=>{
        res.json({
            err:0,
            msg:"删除完毕"
        });
    })
    .catch(err=>{
        if(err==1){
            res.json({
                err:0,
                msg:"轮播图图片至少要有一张"
            });
        }else{
            throw err;
        }
        
    })
});

// 添加商品轮播图片
router.post("/add-swiper-image",filters.checkParams(["_id","url"]));
router.post("/add-swiper-image",function(req,res){
    Good.findOne({_id:req.body._id})
    .then(data=>{
        data.images.push(req.body.url);
        return data.save();
    })
    .then(d=>{
        res.json({
            err:0,
            msg:"删除完毕"
        });
    })
    .catch(err=>{
        throw err;
    })
});


module.exports = router;
