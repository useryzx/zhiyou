var mongoose=require('./Connection.js');
var stuSchema=new mongoose.Schema({
    name:String,
    age:String,
    sex:String,
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'class'
    }
});
module.exports =mongoose.model('student',stuSchema);