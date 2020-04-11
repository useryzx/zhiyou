var mongoose=require('./Connection.js');
var classSchema=new mongoose.Schema({
    classname:String,
    weizhi:String,
    teacher:String
});
module.exports =mongoose.model('class',classSchema);