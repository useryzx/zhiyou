// 该文件负责数据库连接
// 当引入的十多个文件时可以var之后使用,隔开变量
// var a=10,b=20
var settings =require('../settings'),
// 获得当前数据库对象
    Db =require('mongodb').Db,
    // 获得当前数据库的连接对象
    Connection =require('mongodb').Connection,
    // 获得当前数据库的服务器
    Server =require('mongodb').Server;
// 模块化
module.exports =new Db(settings.db,
    new Server(settings.host,settings.prot),
    {safe:true});