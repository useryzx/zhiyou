var settings =require('../settings'),
// 获得当前数据库对象
// 使用mongodb没有使用mongoose简单，因为后者是对前者的封装
    Db =require('mongodb').Db,
    // 获得当前数据库的连接对象
    Connection =require('mongodb').Connection,
    // 获得当前数据库的服务器
    Server =require('mongodb').Server;
// 模块化  //db的对象 [mongoose.connect对改写法的封装]
module.exports =new Db(settings.db,
    new Server(settings.host,settings.prot),
    {safe:true});