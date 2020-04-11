//先导入支持mysql的模块
/*
为何使用mysq12而不是经典的mysq1库?主要基于以下原因: 

更高的性能!
支持PreparedStatement,多次查询性能更高，书写SQL 更简单;
自带Promise包装器，可以直接使用async/ await语法;
绝大部分api和mysq1库兼容，意味着mysql的文档和线上资料亦可
*/
let mysql=require('mysql2');
//1.创建和数据库的链接(准备连接对象)
let connection=mysql.createConnection({
    //地址[将来到公司这里可以换数据库服务器的地址]
    host:"localhost",
    //用户名
    user:"root",
    //数据库名称：可以存在可以不存在
    database:"node_mysql",
    //数据库的内容
    password:"123456"
});
//准备sql语句[mysql数据链接一般都是直接查询表存在不存在 如果不存在会给出准确的答案]
let sql="CREATE TABLE IF NOT EXISTS people(id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(32) NOT NULL UNIQUE,age INT)";
//mysql的操作可以理解为一句sql语句执行一个函数
// query 增删改查都支持
// connection.query(sql,function(err){
//     if (err) {
//         console.log(err);
//     }
//     else{
//         console.log('创建表成功');
//     }
// })

// mysql2支持promise查询
// 查询的时候可能会遇到多种多样的情况 最好是异步来处理
connection.promise().query(sql)
.then(function (param) {
    console.log("表初始化完毕");
})
.catch(function (err) {
    console.log(err);
})

// 插入数据
// sql="INSERT INTO people (name,age) VALUES ('张佳仪',30)"
// connection.promise().query(sql)
// // data就是插入成功后返回的数据
// .then(data=> {
//     console.log(data);
// })
// .catch(function(err){
//     console.log(err);
// });

sql="SELECT * FROM people";
// connection.promise().query(sql)
// // data就是插入成功后返回的数据
// .then(data=> {
//     console.log(data);
// })
// .catch(function(err){
//     console.log(err);
// });

// 同步的查询(简介好用)
connection.query(sql,function (err,data) {
    console.log(data);
})
