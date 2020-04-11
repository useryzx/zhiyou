var mongoose =require('./Connection.js');
// 制表
var peopleSchema =new mongoose.Schema({
  name:String,
  age:String
});
module.exports =mongoose.model('people',peopleSchema)