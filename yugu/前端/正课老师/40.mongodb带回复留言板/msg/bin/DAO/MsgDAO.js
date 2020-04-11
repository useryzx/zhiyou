var mongoose =require('./Connection.js');
var msgSchema =new mongoose.Schema({
    ip:String,
    time:String,
    msg:String,
    // 回复
    reply:Array
});
module.exports =mongoose.model('msg',msgSchema);