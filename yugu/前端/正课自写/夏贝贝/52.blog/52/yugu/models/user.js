// 该文件负责构建user表
// 1.引入数据库连接
var mongodb = require('./db');
// 把对用户操作的数据库行为作为模块写出来
function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}
module.exports = User;
// 保存用户的注册信息'对mongodb保存的重现'
User.prototype.save = function (callback) {
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };
    //  通过open方法打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        // 读取users集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 将用户的数据插入到users集合中去
            //1.插入的数据  2.数据是否加密  3.插入的回调
            collection.insert(user, { safe: true }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                // 成功返回注册的用户名
                // 第一个参数代表错误信息 第二个参数代表返回的数据
                callback(null, user[0]);
            })
        })
    })
}
// 查询数据库中有没有这条数据
// 每插入一条数据都应该先查询 满足条件的时候再去插入
User.get = function (name, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        // 读取user集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 查询
            collection.findOne({ name: name }, function (err, user) {
                // 在这里关闭并不影响数据的传递 因为数据已经拿到过了
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                // 返回用户信息
                callback(null, user);

            })
        });
    });
}
/*
  程序员水平高低怎么区分?
  1.最直接体现是项目需求能不能实现?
  2.能实现的情况下看代码风格
    2.2:照本宣科的代码适合外包但不适合产品
    2.3:懂得对自己写的代码进行封装的程序员可以适应更残酷的环境
    2.4:懂得拆分系统api之后重新组装起来的程序员适合大型企业。
*/