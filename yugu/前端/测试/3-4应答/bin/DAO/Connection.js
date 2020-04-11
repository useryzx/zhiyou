// 数据库链接
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/netTestFirst',{useNewUrlParser:true},function(err){
    if(!err){
        console.log('学籍管理系统数据库连接正常');
    }
})
// 模块化出来
module.exports = mongoose;