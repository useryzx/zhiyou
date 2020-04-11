// 该文件专门用来创建表文件
// 获取数据库对象
var mongoose=require("./Connection.js");
var MsgSchema=new mongoose.Schema({
    ip:String,
    time:String,
    msg:String
});
var Msg=mongoose.model("msg",MsgSchema);
module.exports=Msg;