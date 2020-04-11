var mongoose = require('mongoose');
// 写数据的时候最好是先把要提交的数据准备好，这样就可以照着
// 提交的数据来写数据库表
var accountSchema = new mongoose.Schema({
    name: String,
    psw: String,
    createTime: {
        type: Date,
        default: new Date()
    }
});
module.exports = mongoose.model('account', accountSchema);