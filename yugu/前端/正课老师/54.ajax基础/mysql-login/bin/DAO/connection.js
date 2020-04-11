const mysql =require('mysql2');

// 连接
const conn =mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    database:'mysql_login',
    password:'123456'
});
module.exports =conn;