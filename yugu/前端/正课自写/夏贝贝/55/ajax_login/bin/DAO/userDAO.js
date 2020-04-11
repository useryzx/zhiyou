const mongoose = require('./Connection')
console.log('模版');
const schema = new mongoose.Schema({
    account:String,
    psw:String
})
module.exports=mongoose.model('users',schema)