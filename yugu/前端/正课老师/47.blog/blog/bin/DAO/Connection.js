// 数据库连接
var mongoose =require('mongoose');
mongoose.connect('mongodb://127.0.0.1/60-blog',{
    useNewUrlParser:true
},function(err){
    if (!err) {
        console.log('db run...');
        
    }
});
module.exports =mongoose;