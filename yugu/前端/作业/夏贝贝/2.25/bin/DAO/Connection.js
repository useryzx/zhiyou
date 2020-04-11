var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wordsBoard',{useNewUrlParser:true},function(err){
if(!err){
    console.log('数据库链接成功');
}
});
module.exports = mongoose;