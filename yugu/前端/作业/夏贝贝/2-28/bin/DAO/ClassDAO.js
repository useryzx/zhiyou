var mongoose = require('./Connection.js')
var classSchema=new mongoose.Schema({
    className:String,
    classMajor:String,
    classNum:String,
    classTeacher:String
})
module.exports = mongoose.model('class',classSchema)