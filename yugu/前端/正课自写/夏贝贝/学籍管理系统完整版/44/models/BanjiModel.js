// 班级的数据库表
// 这个只是负责建表  表结构
var mongoose =require('mongoose');
var banjiSchema =new mongoose.Schema({
    className:String,
    location:String,
    teacher:String,
    // 班级人数
    count:{
        type:Number,
        default:0
    },
    // 创建时间(都是为了实现高度自定义查询所准备的)
    createTime:{
        type:Date,
        // default在数据库键里面的作用是当用户创建对象但
        // 没有为当前键赋值的时候会自动采用默认值
        default:new Date()
    },
    // 更新时间
    updateTime:{
        type:Date,
        default:new Date()
    }
});
var banjiModel =mongoose.model('banji',banjiSchema);
module.exports =banjiModel;