var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cookieLib',{useNewUrlParser:true},function(err){
    if(!err){
        console.log('cookie数据库连接成功');
        console.log('editByYugu');
    }
})
module.exports = mongoose;