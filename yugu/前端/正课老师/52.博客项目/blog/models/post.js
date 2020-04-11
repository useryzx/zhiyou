var mongodb = require('./db');
// markdown模块可以让对应的数据文本转变成html
var markdown = require('markdown').markdown;
// 创建构造函数
function Post(name, title, tags, post) {
    this.name = name;
    this.title = title;
    this.tags = tags;
    this.post = post;
}
module.exports = Post;
// 设置存储的方法
Post.prototype.save = function (callback) {
    var date = new Date();
    //    设置各种时间格式，方便后期的拓展
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + '-' + (date.getMonth() + 1),
        day: date.getFullYear() + '-' + (date.getMonth() + 1) +
            '-' + (date.getDate()),
        minute: date.getFullYear() + '-' + (date.getMonth() + 1) +
            '-' + (date.getDate()) + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    //   整理帖子需要的数据
    var post = {
        name: this.name,
        time: time,
        title: this.title,
        tags: this.tags,
        post: this.post,
        // 回帖
        comments: [],
        // 浏览数
        pv: 0
    }
    // 存储的过程
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        // 读取文档中集合并写入
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 插入帖子
            collection.insert(post, {
                safe: true
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null)
            })
        })
    })
}
// 查询的方法 考虑到要分页 所以直接写一个带分页的查询
Post.getTen = function (name, page, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        // 读取posts集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 准备一个查询的对象[将来查询功能往该对象添加
            // 属性就可以了]
            var query = {};
            if (name) {
                query.name =name;
            }
            // 因为mongoose是对mongodb的封装
            // 所以mongodb的数据库操作要稍微复杂一些
            collection.count(query, function (err, total) {
                collection.find(query, {
                    //  分页查询
                    skip: (page - 1) * 10,
                    limit: 10
                    // 按照时间排序
                }).sort({
                    time: -1
                    // 把查询的数据封装成数组的形式
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    // 把数据直接封装成html然后把html返回出去
                    // markdown
                    // docs可以理解为是一个装帖子的数组，里面每一篇帖子是一个对象集合
                    docs.forEach(function (doc) {
                       
                        // doc.post是原始数据  通过markdown.toHTML方法转成html
                        doc.post = markdown.toHTML(doc.post);
                        // markdown核心是会把文本生成对应的文档格式(md)
                        // toHTML的时候如果要加工的内容是段落纯文本的话可以理解为会
                        // 加上p标签包裹
                        console.log(doc.post);
                    });
                    // 1.错误信息  2.转成html之后的数据对象  3.条数
                    callback(null, docs, total);
                })
            })
        })
    })
}
// 返回所有文章存档的方法
Post.getArchive = function (callback) {
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        // 返回只包含name,time,title属性的文档
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.find({}, {
                'name': 1,
                'time': 1,
                'title': 1
            }).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs)
            })
        })
    })
}
// 获取所有标签的方法
Post.getTags = function (callback) {
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            // callback其实是index.js里的一个function
            // 调用其实就是重新激活来了index里面的方法
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            // distinct用来找出给定键的所有不同值
            collection.distinct('tags', function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            })
        })
    });
}
// 单一的帖子查询方法
Post.getTag = function (tag, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            // callback其实是index.js里的一个function
            // 调用其实就是重新激活来了index里面的方法
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();

                return callback(err);
            }
            //    查询tags数组中包含有当前tag的文档
            //  并返回name,title,title
            collection.find({
                'tags': tag
            }, {
                'name': 1,
                'time': 1,
                'title': 1
            }).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            })
        })
    });
}

// 获取一篇文章
Post.getOne = function (name, day, title, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 根据传递过来的内容进行搜索
            collection.findOne({
                'name': name,
                'time.day': day,
                'title': title
            }, function (err, doc) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }
                // 表示可以查到即将要进入(更改帖子的浏览量)
                if (doc) {
                    collection.update({
                        'name': name,
                        'time.day': day,
                        'title': title
                    }, {
                        // $inc代表查找到当前键在原有值上自增
                        $inc: {
                            'pv': 1
                        }
                    }, function (err) {
                        mongodb.close();
                        if (err) {
                            return callback(err);
                        }
                    });
                    // 解析成html(正文内容)
                    doc.post = markdown.toHTML(doc.post);
                    // doc代表当前的数据对象 comments文档集合
                    // 如果有回帖那么comments循环会进入
                    doc.comments.forEach(function (comment) {
                        comment.content = markdown.toHTML(comment.content);
                    });
                    // 返回整理好数据的文章
                    callback(null, doc);
                }
            });
        });
    })
}
// 编辑的方法
Post.edit = function (name, day, title, callback) {
    //  根据条件查询到文章 返回(markdown格式)
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        //   读取集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                'name': name,
                'time.day': day,
                'title': title
            }, function (err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                // 返回的就是一片文章的详细
                callback(null, doc);
            });
        });
    });
}
// 只要是关于帖子的操作都在该文件中
Post.update = function (name, day, title, post, callback) {
   
    //  根据条件查询到文章 返回(markdown格式)
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //   读取集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.update({
                'name': name,
                'time.day': day,
                'title': title
            }
            ,{
                $set:{post:post}
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                // 返回的就是一片文章的详细
                callback(null);
            });
        });
    });
}

// 删除
Post.remove = function (name, day, title, callback) {
   
    //  根据条件查询到文章 返回(markdown格式)
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //   读取集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.remove({
                'name': name,
                'time.day': day,
                'title': title
            }
            , function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                // 返回的就是一片文章的详细
                callback(null);
            });
        });
    });
}
// 搜索的方法
Post.search =function(keyword,callback){
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //   读取集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 正则搜索条件
            var pattern =new RegExp(keyword,'i');
            collection.find({
                'title':pattern
            },{
                'name':1,
                'time':1,
                'title':1,
            }).sort({
                time:-1
            }).toArray(function (err,docs) {
                 mongodb.close();
                 if (err) {
                    return callback(err);
                }
                callback(null,docs)
              })
        });  
    });
}