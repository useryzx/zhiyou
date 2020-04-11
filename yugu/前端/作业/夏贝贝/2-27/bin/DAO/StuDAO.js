var mongoose=require("./Connections.js");
var stuSchema=new mongoose.Schema({
    stuName:String,
    stuAge:String,
    stuSex:String,
    stuMajor:String,
    stuHobby:Array
});
var Stu=mongoose.model("stu",stuSchema);
module.exports=Stu;
