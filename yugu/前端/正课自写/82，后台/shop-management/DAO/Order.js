const mongoose = require("./connect.js");

const schema = new mongoose.Schema({
    
    amount:Number,      //订单金额
    createTime:Date,    //订单创建时间
    state:Number,       //订单状态，0未付款。10已付款待发货。20已发货待收货。30已收货。40售后。50已取消。60售后完成

})

const model = mongoose.model("order",schema);

module.exports = model;