// 这个只是负责建表  表结构
var mongoose =require('mongoose');
// 表
var userSchema =mongoose.Schema({
    username:String,
    password:String,
    email:String
});
// 建表
var UserModel =mongoose.model('user',userSchema);
module.exports =UserModel;