const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/ajax_login',{useNewUrlParser:true}).then(()=>{
    console.log('数据库已连接');
}).catch(err=>{
    console.log('数据库未连接');
    console.log(err);
    
})
module.exports = mongoose;
