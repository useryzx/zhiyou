// 创建班级表架构
var mongoose = require('./Connection.js')
var classSchema=new mongoose.Schema({
    className:String,
    classRoom:String,
    classTeacher:String
})
module.exports = mongoose.model('class',classSchema)