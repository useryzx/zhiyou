var mongoose = require('./Connection.js')
var studentSchema = new mongoose.Schema({
    studentName:String,
    studentClass:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'class'
    }
})
module.exports = mongoose.model('student',studentSchema)