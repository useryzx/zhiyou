var mongoose =require('./Connection.js');
// 制表
var gradeSchema =new mongoose.Schema({
  name:String,
  major:String,
  room:String,
  teacher:String
});
module.exports =mongoose.model('grade',gradeSchema)