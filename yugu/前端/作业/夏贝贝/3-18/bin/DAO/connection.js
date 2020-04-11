var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/test',{useNewUrlParser:true},function(err){
    console.log('yugu connect+_++_++_+');
    
})
module.exports = mongoose;
