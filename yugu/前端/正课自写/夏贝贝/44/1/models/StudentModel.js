// 学生信息架构
var mongoose = require('mongoose')
var studentSchema = new mongoose.Schema({
    studentName:String,
    studentAge:String,
    studentSex:String,
    studentClass:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'class'
    }
})
module.exports = mongoose.model('student',studentSchema)