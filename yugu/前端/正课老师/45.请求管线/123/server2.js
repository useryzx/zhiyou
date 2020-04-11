var express=require('express');
var app=express();
function utf8(req,res,next){
    // 设置响应头
    res.set('Content-Type','text/html;charset=utf-8');
    console.log('设置了编码');
    next();
}
function first(req,res,next){
    console.log('这是第一个经过请求处理函数');
    next();
}
function second(req,res,next){
    console.log('这是第二个经过请求处理函数');
    next();
}
function third(req,res,next){
    console.log('这是第三个经过请求处理函数');
    next();
}
// app.get('/',utf8,first,second,third,function(req,res){
//     res.send('这是最后一个请求处理函数')
// })
// 可以把处理的参数放到数组中
var arr=[utf8,first,second,third,function(req,res){
     res.send('这是最后一个请求处理函数')
        }]
app.get('/',arr);
// params:query相似
// params接口上面要求的参数必须要追寻url传递进来
app.get('/hi/:age',[utf8,first,second,third],function(req,res){
    // 思考：如何为name和age赋值
    var name=req.query.name;
    var age=req.params.age;
    // 字符串拼接``字符读取到变量之后会自动获取变量的值
    res.send(`你好${name},${age},很高兴认识你`)
})
app.listen(3000,function(){        
    console.log('running.....');   
})