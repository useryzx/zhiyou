const mongodb = require('./db');
// 创建构造函数
function Post(name, title, tags, post) {
    this.name = name;
    this.title = title;
    this.tags = tags;
    this.post = post;
}
module.exports = Post;
Post.prototype.save = function (callback) {
    let date = new Date();
    // 设置各种时间格式方便拓展
    let time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + '-' + (date.getMonth() + 1),
        day: date.getFullYear() + '-' + (date.getMonth() + 1)
            + '-' + (date.getDate()),
        minute: date.getFullYear() + '-' + (date.getMonth() + 1)
            + '-' + (date.getDate()) + ' ' + (date.getHours()<10?'0'+date.getHours():date.getHours())+ ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    let post = {
        name:this.name,
        time:time,
        title:this.title,
        tags:this.tags,
        post:this.post,
        comments:[],
        pv:0
    }
    // 存储过程
    mongodb.open(function(err,db){
        if(err){
            mongodb.close();
            return callback(err)
        }
        // 读取文档中的集合并写入
        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err)
            }
            collection.insert(post,{safe:true},function(err){
                mongodb.close()
                if(err){
                    return callback(err)
                }
                callback(null)
            })
        })
    })
}