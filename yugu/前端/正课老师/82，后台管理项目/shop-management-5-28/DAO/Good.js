const mongoose = require("./connect.js");

const schema = new mongoose.Schema({
    name:String,        //商品名称
    price:Number,       //价格
    number:Number,      //库存数量
    spec:[mongoose.Schema.Types.Mixed],         //规格，每个规格包含名称，价格，数量
    isOnSell:Boolean,   //是否在售
    createTime:Date,    //创建时间
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },                  //创建账号
    image:String,       //商品图片
    images:[String],    //商品轮播图图片
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },                  //商品类别

    introduce:String    //商品介绍，html文本
})

const model = mongoose.model("good",schema);

module.exports = model;