var mongoose =require('./Connection.js');
var msgSchema =new mongoose.Schema({
    name:String,
    age:String,
    sex:String,
    major:String,
    hobby:Array
});
var student =mongoose.model('student',msgSchema);
module.exports=student;