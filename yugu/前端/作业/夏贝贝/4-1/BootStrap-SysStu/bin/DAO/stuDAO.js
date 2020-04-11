const mongoose = require('./Connection');
let schema = new mongoose.Schema({
    name:String,
    age:String,
    sex:String,
    tel:String
})
module.exports= mongoose.model('students',schema);