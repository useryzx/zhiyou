let mongodb = require('./db');
// 定义用户
function User(user) {
    this.name = user.name;
    this.password = user.password;
}
// 模块化

// 用户信息注册的保存
User.prototype.save = function (callback) {
    let user = {
        name: this.name,
        password: this.password
    }
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
            collection.insert(user, { safe: true }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            })
        })
    })
}
// 用户信息查询
User.get = function (name, callback) {
    mongodb.open(function (err, db) {
        console.log('查询1');
        if (err) {
            console.log('查询2');
            mongodb.close();
            return callback(err);
        }
        // 读取user集合
        db.collection('users', function (err, collection) {
            console.log('查询3');
            if (err) {
                console.log('查询4');
                mongodb.close();
                return callback(err);
            }
            // 查询
            collection.findOne({ name: name }, function (err, user) {
                console.log('查询5');
                // 在这里关闭并不影响数据的传递 因为数据已经拿到过了
                mongodb.close();
                if (err) {
                    console.log('查询6');
                    return callback(err);
                }
                // 返回用户信息
                console.log('查询7');
                console.log(user);
                callback(null, user);
            })
        });
    });
}
module.exports = User;