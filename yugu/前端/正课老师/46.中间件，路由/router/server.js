var express=require('express');
var app=express();
// 路由：把隶属于express的接口功能分发出去
var router=express.Router();
// 为路由添加接口
router.get('/api1',function(req,res){
    res.send('api1');
});
// 要把路由放到请求管线中
app.use(router);
// 指定路由的前缀
var router2=express.Router();
router2.get('/register',function(req,res){
    res.send('带前缀的接口')
});
// 带有前缀的路由好处是可以把相似的功能放到一个路由里面
app.use('/user',router2);
// 将路由单独写到js文件中，然后在服务器引入(最实用)
var blogRouter=require('./bin/routers/blogRouter');
// 项目里面都应该这样写
app.use('/blog',blogRouter);       
app.listen(3000,function(){
    console.log('running....');
});
/*
请求管线，中间件，路由集合到一块的练习
1.express 里面的接口都是路由实现的
2.使用中间件进行登录判断
    2.1访问默认页如果登录了就显示首页，如果没登录就跳转到登录(该功能由中间件来完成)
3.登录的时候要检测账号是否存在(缓存)
*/