var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/cookieLogin',{useNewUrlParser:true},function(err){
    if (!err) {
        console.log('db...');
    }
});
module.exports =mongoose;