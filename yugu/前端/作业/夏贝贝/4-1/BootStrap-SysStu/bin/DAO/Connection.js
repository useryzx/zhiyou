const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ajax_stuManage',
{useNewUrlParser:true}).then(()=>{
    console.log('ajax_stuManage数据库连接正常');
    
}).catch(err=>{
    console.log(err);
    console.log('ajax_stuManage数据库连接失败');
})
module.exports = mongoose;