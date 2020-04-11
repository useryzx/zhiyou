var mongoose =require('mongoose');
mongoose.connect('mongodb://127.0.0.1/blog',
{useNewUrlParser:true});
// 获取连接对象
var db =mongoose.connection;
db.once('open',function(){
    console.log('连接成功');
});
db.once('error',function(){
    console.log('数据库连接失败');
});
// 模块化
module.exports =db;