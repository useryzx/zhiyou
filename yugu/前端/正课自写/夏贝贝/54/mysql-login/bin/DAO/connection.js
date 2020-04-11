const musql = require('mysql2')
const conn = musql.createConnection({
    host:'127.0.0.1',
    user:'root',
    database:'mysql_login',
    password:'root'
})
module.exports = conn;