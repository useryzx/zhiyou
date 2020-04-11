// 班级的数据库表
// 这个只是负责建表  表结构
var mongoose =require('mongoose');
// 表
var banjiSchema = new mongoose.Schema({
    className:String,
    location:String,
    teacher:String,
    count:{
        type:Number,
        default:0
    },
    createTime:{
        type:Date,
        default:new Date()
    },
    updateTime:{
        type:Date,
        default:new Date()
    }
});
// 建表
var BanjiModel =mongoose.model('banji',banjiSchema);
module.exports =BanjiModel;