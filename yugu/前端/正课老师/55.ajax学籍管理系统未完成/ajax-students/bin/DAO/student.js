const mongoose =require("./connection");
const schema =new mongoose.Schema({
    name:String,
    age:Number,
    tel:String,
    sex:String,
});
module.exports =mongoose.model("students",schema);