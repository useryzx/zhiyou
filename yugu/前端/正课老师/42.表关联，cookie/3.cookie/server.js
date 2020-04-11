var express =require('express');
var app =express();
app.use(express.static('www'));
// 导入cookie包
// cookie模块，可以将一个cookie字符串转换成一个cookie对象,
// 也可以将一个cookie对象反义成一串cookie字符,类似以JSON
// cookie可以让服务器往客户端进行数据缓存
var cookie =require('cookie');
app.get('/api',function(req,res){
    // res.send(req.query);
    // set方法用来设置响应内容，Set-cookie设置响应头，设置了
    // cookie之后可以让浏览器帮助服务端存储一定的数据，当
    // 浏览器收到cookie之后下一次启动服务器的时候会自动把cookie
    // 附带到本次的请求头中，cookie的内容只能是字符串，如果想
    // 存储多个键值对的话，会比较麻烦，而且要按照cookie的标准格式
    // 去进行存储
    // res.set('Set-cookie','name=xia,age=30'); 响应对象设置的
    // 从请求对象上面拿到的
    // res.send(req.headers.cookie);
    // cookie方法用于设置响应头，第一个代表的是cookie的名字
    // 名字重复代表更新cookie,第二个是cookie的值，第三个参数
    // 是cookie需要配置的对象,可以配置有效期，或者路径...
    res.cookie('name','bei',{
        // 有效期 毫秒
          maxAge:86400
    });
    // 也可以不设置第三个参数
    res.cookie('age','29');
    // console.log(req.headers.cookie);
    // 确保服务端已经发送给浏览器之后才能再次从接口中抓取出来
    // res.send(req.headers.cookie);
    // 可以使用cookie对象提供的方法把字符串转成对象使用
    var cookieObj =cookie.parse(req.headers.cookie);
    res.send(cookieObj.name);
    

});
app.listen(3000,function(){
    console.log('running...');
});