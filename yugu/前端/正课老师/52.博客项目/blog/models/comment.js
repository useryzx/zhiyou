// 专门用来回帖的
var mongodb =require('./db');
// 把对用户操作的数据库行为作为模块写出来
function Comment(name,day,title,comment){
    this.name =name;
    this.day =day;
    this.title =title;
    this.comment =comment;
}
module.exports =Comment;
// 存储的方法
Comment.prototype.save =function(callback){
    var name =this.name,
    day =this.day,
    title =this.title,
    comment =this.comment;
    // 开数据库
    mongodb.open(function(err,db){
        if (err) {
            mongodb.close()
            return callback(err)
        }
        // 回复需要插入到留言的数据库中
        db.collection('posts',function(err,collection){
            if (err) {
                mongodb.close()
                return callback(err)
            }
            // 根据条件把留言追加到指定的文档里
            collection.update({
                'name':name,
                'time.day':day,
                'title':title,
            },{
                // $inc $push这些都是操作数据库的命令
                $push:{'comments':comment}
            },function(err){
                mongodb.close()
                if (err) {
                    return callback(err)
                }
                callback(null);
            })
        })
    })
}