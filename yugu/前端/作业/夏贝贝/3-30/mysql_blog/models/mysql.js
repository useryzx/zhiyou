// 连接数据库
const mysql = require('mysql2')
const Connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'blog',
    // edit by yugu
    password:'root'
})
// 模块化数据库对象

module.exports = Connection;