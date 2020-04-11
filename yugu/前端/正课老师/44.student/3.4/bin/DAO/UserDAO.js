var mongoose =require('./Connection.js');
var UserSchema =new mongoose.Schema({
    username:String,
    psw:String,
    psw2:String,
    email:String
});
module.exports=mongoose.model('User',UserSchema);
