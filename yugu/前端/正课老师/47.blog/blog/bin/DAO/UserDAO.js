var mongoose =require('./Connection');
var userSchema =new mongoose.Schema({
    username:String,
    psw:String
})
module.exports =mongoose.model('user',userSchema);