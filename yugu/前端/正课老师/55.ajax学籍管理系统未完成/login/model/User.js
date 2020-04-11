var mongoose=require('./Connect.js');
var userSchema=new mongoose.Schema({
    name:String,
    psw:String
});
var user=mongoose.model('user',userSchema);
module.exports=user;