// 数据库连接就是一个单独的文件，同理表的创建也是单独的文件
var mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/msg-Mongo",{
    userNewUrlParser:true
},function (err) {
    if (!err) {
        console.log("数据库连接成功");
    }
})
module.exports=mongoose;
