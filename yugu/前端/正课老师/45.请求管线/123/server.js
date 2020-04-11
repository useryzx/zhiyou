/*
    express:服务器集成，在收到请求之后会把请求放到所谓的请求管线中，从管线口开始逐个去寻找能够匹配上的url路径和请求处理的函数，找到能够匹配的函数之后就处理本次请求，找不到则继续（浏览器访问网址一直在重定向查找）
*/ 
var express=require('express');
var app=express();
// app.use方法，在请求管线中添加一个匹配的条件
app.use(function(req,res,next){
    // 因为现在还没有匹配接口的函数，所以会卡到这里
    console.log('1');
    // 既然没有匹配上 就应该在管线中继续查找其他的函数
    // next代表下一个
    // 每一次请求都需要拿session里的数据的时候，就可以把代码写到此处
    next();//继续查找下一个函数[功能完毕 最后一句代码]
    console.log('2');
});
function isLogin(req,res,next){
    // 检测用户有没有登陆[首页展示]
    // 127.0.0.1/首页
    var str='已经登陆';
    if (str) {
        console.log('已经登陆');
        next();//下一项
    }else{
        console.log('请先登录');
        res.send('请先登录')
    }
};
// get,post请求能够在请求管线中添加一个请求处理的函数，这些添加的处理函数，必须要请求方法和url路径能够匹配上才会处理
// app.get('/api/login',isLogin)
// 第一个参数是接口地址，从第二个参数开始可以添加多个处理函数
app.get('/api/login',isLogin,function(req,res){
    res.send('api2');
})
app.use(function(req,res){
    res.send(404,'<h1>你访问的页面不存在</h1>')
})
// app.get('/api/login',function(req,res){
//     res.send('请求管线');
// });
app.listen(3000);
