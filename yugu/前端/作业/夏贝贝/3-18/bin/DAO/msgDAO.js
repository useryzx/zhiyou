var mongoose = require('./connection')
var msgSchema = new mongoose.Schema({
    topic: String,
    tag: Array,
    content: String,
    time: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    readCount: Number,
    reply: Array
})
var msgModel = mongoose.model('msg', msgSchema)
module.exports = msgModel;