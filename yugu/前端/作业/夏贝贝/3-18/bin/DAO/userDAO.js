var mongoose = require('./connection')
var userSchema = new mongoose.Schema({
    username:String,
    psw:String,
    avatar:String
})
var userModel = mongoose.model('user',userSchema)
module.exports = userModel;