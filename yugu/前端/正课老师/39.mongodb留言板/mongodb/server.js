var mongoose = require('mongoose');
// 1.链接的是数据库的地址
mongoose.connect('mongodb://localhost/mongoDb1', {
    userNewUrlParser: true
}, function (err) {
    if (!err) {
        console.log("成功");
    }
});
// var db = mongoose.connection;
// 也是判断数据库是否连接成功
// db.once('open',function(err){
//     if (!err) {
//         console.log('连接成功');  
//     }
// })
// db.on('error',function(err){
//         console.log('error'+err);  
// })

// 2.构建表结构
var studentSchema=mongoose.Schema({
    stuName:String,
    age:Number,
    isMale:Boolean,
    banji:String
});

// 根据表结构建表
var StudentModel=mongoose.model('student',studentSchema);
// 生成实例化的表数据
var student=new StudentModel({
    stuName:'张佳仪',
    age:22,
    isMale:true,
    banji:'前端60期'
});
// 保存数据
// student.save(function(err){
//     if (!err) {
//         console.log("数据保存成功");
        
//     }
// })

// 查找>>无条件查找   exec根据条件查找
// StudentModel.find().exec(function(err,data){
//     console.log(data);   
// })

// 有条件查找
// StudentModel.find({isMale:true}).exec(function(err,data){
//     console.log(data);
// })

// 查找到符合条件的第一个  每个查询条件以{}隔开
// StudentModel.findOne({stuName:'张三'}).exec(function(err,data){
//     console.log(data);
// })

// 可以嵌套sql语句
// StudentModel.find({age:{$gt:18,$lt:30}}).exec(function(err,data){
//     console.log(data); 
// })

// 修改
// StudentModel.updateOne({stuName:'张三'},{isMale:false}).exec(function(err){
//     if (!err) {
//         console.log('修改成功');
//     }
// });

// 删除
// StudentModel.deleteOne({stuName:'张三'}).exec(function(err){
//     console.log('删除成功');
    
// })

// 获取数据的数量，及当前集合的数据长度
StudentModel.count(function(err,count){
    if (err) {
        console.log('??'+err);
    }
    else{
        console.log(count);
        
    }
})