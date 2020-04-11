const mongoose = require("./connect.js");


const schema = new mongoose.Schema({
    username:String,
    psw:String,

});


const model = mongoose.model("users",schema);

module.exports = model;