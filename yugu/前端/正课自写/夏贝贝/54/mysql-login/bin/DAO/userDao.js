const conn = require('./connection')
let sql = 'create table if not exists users(id int primary key auto_increment,account varchar(32) not null unique,psw varchar(32) not null)';
conn.query(sql);

function userRegist(user){
    let sql = `insert into users(account,psw) values(${user.account},${user.psw})`
    return new Promise(function(resolve,reject){
        conn.query(sql,function(err){
            if(err){
                reject(err);
            }
            else{
                resolve();
            }
        })
    })
}

function userLogin(user){
    let sql = `select * from users where account=? and psw=?`
    return new Promise(function(resolve,reject){
        conn.query(sql,[user.account,user.psw],function(err,data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}
module.exports = {userRegist,userLogin};