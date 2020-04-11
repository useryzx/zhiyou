var mongoose = require('./connection.js');
var cookieSchema = new mongoose.Schema({
    name:String,
    psw:String
})
module.exports = mongoose.model('cookie',cookieSchema);