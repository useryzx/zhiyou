const mongoose = require("./connect.js");

const schema = new mongoose.Schema({
    img:String,
    url:String
})

const model = mongoose.model("swiper-item",schema);

module.exports = model;