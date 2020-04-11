var mongoose =require('./Connection.js');
var userSchema =new mongoose.Schema({
      userName:String,
      psw:String
});
module.exports =mongoose.model('user',userSchema);