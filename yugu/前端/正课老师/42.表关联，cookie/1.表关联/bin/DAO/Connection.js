var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/PeopleTest',
{useNewUrlParser:true
},function(err){
    if (!err) {
        console.log('数据库连接成功'); 
    }
});
module.exports =mongoose;