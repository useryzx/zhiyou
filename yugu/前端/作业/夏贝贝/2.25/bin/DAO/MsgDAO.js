var mongoose = require('./Connection.js');
var msgSchema = new mongoose.Schema({
    stuName:String,
    stuAge:Number,
    stuSex:String,
    stuMajor:String,
    stuHobby:Array
})
var Msg = mongoose.model('msg',msgSchema);
module.exports = Msg;