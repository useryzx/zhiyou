var mongoose =require('mongoose');
var msgSchema =new mongoose.Schema({
    author:String,
    title:String,
    label:Array,
    time:String,
    msg:String,
    // 回复
    reply:Array,
    count:Number
});
module.exports =mongoose.model('msg',msgSchema);