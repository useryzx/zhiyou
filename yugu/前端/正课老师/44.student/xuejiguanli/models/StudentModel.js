var mongoose =require('mongoose');
// 写数据的时候最好是先把要提交的数据准备好，这样就可以照着
// 提交的数据来写数据库表
var stuSchema =new mongoose.Schema({
    stuName:String,
    age:Number,
    isMale:Boolean,
    // 表关联
    banji:{
        type:mongoose.Schema.Types.ObjectId,
        // reference:参考
        ref:'banji'
    },
    createTime:{
        type:Date,
        default:new Date()
    }
});
module.exports =mongoose.model('newStudent',stuSchema);