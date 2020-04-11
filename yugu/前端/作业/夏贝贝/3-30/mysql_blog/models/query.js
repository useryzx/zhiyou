// 将数据库的增删改查封装成功能
// 创建好数据库以后的对象
const Connection = require('./mysql')
// 创建数据库以前的对象
var createDatabase = require('./createMysql')
const query = {};
module.exports = query;

// 制表,初始化
// 通过sql字段进行增删改查的判断
query.start = function (callback) {
    // 创建数据库
    let sql = 'CREATE DATABASE IF NOT EXISTS blog'
    createDatabase.promise().query(sql).then(function (data) {
        console.log(data[0]);
        console.log('数据库创建成功');
    }).catch(function (err) {
        // Connection.close()
        console.log('初始化错误');
        return callback(err)
    })

    // 创建user表
    sql = 'CREATE TABLE IF NOT EXISTS User(id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(40) NOT NULL UNIQUE,password VARCHAR(40) NOT NULL)';
    Connection.promise().query(sql).then(function (data) {
        console.log(data[0]);
        console.log('user表初始化成功');
        // Connection.close()
    }).catch(function (err) {
        console.log(err);
        console.log('user表初始化错误');
        // Connection.close()
        return callback(err)
    })
}

// 注册存储账号
query.save = function (name, password, callback) {
    let sql = `INSERT INTO User(name,password) VALUES(${name},${password})`
    Connection.promise().query(sql).then(function (data) {
        console.log('注册成功');
        // Connection.close()
        return callback(null, data[0])
    }).catch(function (err) {
        console.log(err);
        console.log('注册失败');
        // Connection.close()
        return callback(err)
    })
}

// 搜索功能
query.search = function (name, callback) {
    let sql = `SELECT * FROM User WHERE name=${name}`;
    Connection.promise().query(sql).then(function (data) {
        console.log('搜索成功');
        console.log(data[0]);
        // Connection.close()
        return callback(null, data[0])
    }).catch(function (err) {
        console.log(err);
        console.log('搜索失败');
        // Connection.close()
        return callback(err)
    })
}
// 登陆
query.login = function (name, password, callback) {
    let sql = `SELECT * FROM User WHERE name=${name} AND password=${password}`;
    Connection.promise().query(sql).then(function (data) {
        console.log('搜索成功');
        console.log(data[0]);
        // Connection.close()
        return callback(null, data[0])
    }).catch(function (err) {
        console.log(err);
        console.log('搜索失败');
        // Connection.close()
        return callback(err)
    })

}