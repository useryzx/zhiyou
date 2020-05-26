const mongoose = require("./connect.js");

const schema = new mongoose.Schema({
    name:String,
    introduce:String,
    available:Boolean
})

const model = mongoose.model("category",schema);

module.exports = model;