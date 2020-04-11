var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/classMa',{useNewUrlParser:true},function(err){
    if(!err){
        console.log('yugu数据库连接成功');
        
    }
})
module.exports = mongoose;