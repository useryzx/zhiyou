var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    email:String,
})
var UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;