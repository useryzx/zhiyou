const express = require('express');
const router = express.Router();

const filters = require("../filters/filters.js");
const utils = require("../utils/utils.js");
const middleware = require("../middleware/middleware.js");
const Category = require("../DAO/Category.js");

router.use(filters.isLogin);
router.use(middleware.withUserInfo);
router.use(filters.checkAuthority("category"));


// 添加新分类
router.post(
    "/add",
    filters.checkParams(["name","introduce"]),
    function(req,res){
        const c = {...req.body};
        c.available = true;
        new Category(c)
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
    }
);


// 查询所有分类
router.get("/list",function(req,res){
    Category.find()
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

// 修改分类信息
router.post("/update",filters.checkParams(["_id"]));
router.post("/update",function(req,res){
    const search = utils.takeSearch(req.body,["name","introduce","available"]);
    Category.updateOne({_id:req.body._id},{$set:search})
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


// 根据ID查询某个分类
router.get("/query",filters.checkParams(["_id"]));
router.get("/query",function(req,res){
    Category.findOne({_id:req.query._id})
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


module.exports = router;
