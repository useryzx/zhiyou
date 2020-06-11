const express = require('express');
const router = express.Router();

const filters = require("../filters/filters.js");
const utils = require("../utils/utils.js");
const config = require("../config.js");
const middleware = require("../middleware/middleware.js");
const Order = require("../DAO/Order.js");

router.use(filters.isLogin);
router.use(middleware.withUserInfo);
router.use(filters.checkAuthority("order"));

// 订单查询
router.post("/search",function(req,res){
    const search = utils.takeSearch(req.body,["state"]);
    if(req.body.startTime||req.body.endTime){
        search.createTime = {}
    }
    if(req.body.startTime){
        search.createTime.$gte = new Date(req.body.startTime);
    }
    if(req.body.endTime){
        search.createTime.$lte = new Date(req.body.endTime);
    }
    
    const offset = req.body.offset||0;
    const size = req.body.size||config.server.pageSize;
    const sortCondition = {}
    if(req.body.sortBy){
        sortCondition[req.body.sortBy] = req.body.sortType;
    }
    Promise.all([
        Order.find(search).skip(offset).limit(size).sort(sortCondition).exec(),
        Order.countDocuments(search)
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

module.exports = router;
