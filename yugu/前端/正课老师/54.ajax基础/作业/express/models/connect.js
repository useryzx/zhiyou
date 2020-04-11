var mysql=require('mysql2');
var connection=mysql.createConnection({
    host:"localhost",
    // 用户名
    user:"root",
    // 数据库名称(可以是存在的也可以是不存在的)
    database:"mysql",
    // 数据库的密码
    password:"123456",
});
var sql ="CREATE TABLE IF NOT EXISTS user(name VARCHAR(32) PRIMARY KEY,psw INT)";
connection.query(sql,function (err) {
          if (err) {
              console.log(err);
          } else {
            console.log("表创建成功");
          }
  })
  module.exports=connection;
