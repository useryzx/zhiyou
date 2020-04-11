// 连接数据库
const mysql = require('mysql2')
const Connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root'
})
// 模块化数据库对象edit by yugu

module.exports = Connection;