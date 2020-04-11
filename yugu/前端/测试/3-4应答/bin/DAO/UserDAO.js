// 用户架构
var mongoose = require('./Connection.js')
var userSchema=new mongoose.Schema({
    userName:String,
    userPsw:String,
    userEmail:String
})
module.exports = mongoose.model('user',userSchema);