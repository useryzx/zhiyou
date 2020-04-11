let mysql = require('mysql2');
// 1.需要创建数据库的连接（准备连接对象）
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "node_mysql",
    password: "root",
    charset:'utf8mb4'
})

let sql = "create table if not exists People(id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(32),age INT)";
connection.query(sql, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('表创建成功');
    }
})





// 增

sql = 'INSERT INTO People(name,age) VALUES("夏aaa贝",300)'
connection.promise().query(sql).then(function(data){
        console.log(data);
    }
).catch(function (err) {
    console.log(err);
})




// 查
sql = 'SELECT * FROM People';
connection.promise().query(sql).then(function(data){
    console.log(data);
}
).catch(function (err) {
console.log(err);
})
sql = 'SELECT * FROM People';

connection.query(sql,function(err,data){
    console.log('-----');
    console.log(data);
    console.log('-----');
})
sql = 'SELECT * FROM People where age=30';
connection.promise().query(sql).then(function(data){
    console.log('data');
}
).catch(function (err) {
console.log(err);
})
sql = 'SELECT * FROM People where name Like "%贝"';
connection.promise().query(sql).then(function(data){
    console.log(data);
}
).catch(function (err) {
console.log(err);
})
sql = 'SELECT * FROM People LIMIT 2,2';
connection.promise().query(sql).then(function(data){
    console.log(data);
}
).catch(function (err) {
console.log(err);
})
sql = 'SELECT MAX(age) FROM People';
connection.promise().query(sql).then(function(data){
    console.log(data);
}
).catch(function (err) {
console.log(err);
})




// 改
sql = 'UPDATE People SET name="yugu",age=25 where age=30';

connection.promise().query(sql).then(function(data){
    console.log(data);
}
).catch(function (err) {
console.log(err);
})




// 删除
sql = 'DELETE FROM People WHERE id=9';

connection.promise().query(sql).then(function(data){
    console.log(data);
}
).catch(function (err) {
console.log(err);
})
// sql语句在代码中只要写正确之后，都可以通过调用query方法进行对应的操作

