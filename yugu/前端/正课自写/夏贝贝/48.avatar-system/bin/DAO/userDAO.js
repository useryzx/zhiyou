var mongoose =require("./Connection.js");
var userSchema =new mongoose.Schema({
    username:String,
    psw:String,
    avatar:String  //头像
});
var model =mongoose.model("user",userSchema);
module.exports =model;