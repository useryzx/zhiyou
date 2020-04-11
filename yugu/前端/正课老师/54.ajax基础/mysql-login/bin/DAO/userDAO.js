const conn =require('./connection');
// 创建表
let sql ='create table if not exists users (id int primary key auto_increment,account varchar(32) unique not null,psw varchar(32) not null)';
conn.query(sql);
// 提供方法 供给user.js进行注册
function userRegist (user) { 
    //   执行插入语句(因为用户名具有唯一性 所以不需要排重)
    let sql =`INSERT INTO users (account,psw) VALUES("${user.account}","${user.psw}")`;
    return new Promise(function (resolve,reject) {
        conn.query(sql,function (err) {  
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
      })
 }


 function userLogin (user) { 
    //   执行插入语句(因为用户名具有唯一性 所以不需要排重)
    let sql =`SELECT *FROM users WHERE account =? AND psw=?`;
    return new Promise(function (resolve,reject) {
        conn.query(sql,[user.account,user.psw],function (err,data) {  
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
      })
 }
module.exports ={userRegist,userLogin};