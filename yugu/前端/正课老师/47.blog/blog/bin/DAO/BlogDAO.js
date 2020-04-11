var mongoose =require('./Connection');
var blogSchema =new mongoose.Schema({
    title:String,
    tag:String,
    content:String,
    time:Number,
    // 作者
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    readCount:Number,
    reply:Array
})
module.exports =mongoose.model('blog',blogSchema);