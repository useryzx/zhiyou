var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/web60',{useNewUrlParser:true});
var db = mongoose.connection;
db.once('open',function(err){
    console.log('链接成功');
})
db.once('error',function(){
    console.log('链接失败');
})
module.exports = db;