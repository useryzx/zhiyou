// 学生的数据库表
// 这个只是负责建表  表结构
var mongoose =require('mongoose');
// 表
var stuSchema = new mongoose.Schema({
    stuName:String,
    age:Number,
    isMale:Boolean,
    banji:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'banji'
    },
    createTime:{
        type:Date,
        default:new Date()
    }
});
// 建表
var StudentModel =mongoose.model('newStudent',stuSchema);
module.exports =StudentModel;