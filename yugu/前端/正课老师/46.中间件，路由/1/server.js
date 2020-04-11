var express = require('express');
var app=express();
/*
data--object>>>req.body>>>req.body.name..
在express服务中，经常会用到一些针对于全部请求的处理函数，例如：body-parser，static，session...这些请求处理函数都是请求需要用到的功能(请求进行初步处理，再去传递给真正的业务逻辑接口进行加工),凡是能满足这种他姓的请求处理函数都叫做中间件
*/
//仿制body-parser进行post请求
function bodyParser(req,res,next){
    // 当用户发过来post请求的时候我们需要把数据处理出来，然后传递给真正的业务逻辑接口使用
    // 1.先判断此次请求的方式[这个函数在请求管线中，原则上来说所有的请求都会激活该函数]
    if (req.method=='POST') {
        console.log(req.headers);
        // 确保是form表单提交的数据
        if (req.headers['content-type']==
        'application/x-www-form-urlencoded') 
        {
            // 初始化一个装数据的容器(buffer)
            // 0代表初始化内存
            var data=Buffer.alloc(0);
            // on这个方法是持续性读取数据使用的
            // 因为数据不可能一次进入而是作为数据流持续性的发送
            req.on('data',function(d){
                // 数据会持续不断的发送给d(类似于迅雷下载)
                data+=d;
            });
            // on方法结束代表数据下载完毕，否则不会出on方法
            req.on('end',function(){
                // 此刻表示数据已经读取完毕了
                // 转换成将来可以使用的数据，没转换之前是buffer类型，不可用
                var obj={};
                // 每个键值对之间使用了&进行了分割
                var params=data.split('&');
                // 分离出来键值
                params.forEach(function(el) {
                    // name=xiabei
                    var vn=el.split('=')[0];//键
                    var vv=el.split('=')[1];//值
                    // 把data里面的数据分隔开之后按照键值的形式赋值给了obj
                    obj[vn]=vv;
                });
                // 把准备好的obj赋值给req.body
                req.body=obj;
                next();
            })
        }
        else{
            // 不是form表单的提交
            next();
        }
    }
    else{
        // 因为这个函数是处理post请求的，所以get可以让其直接找自己的逻辑接口
        next();
    }
}
// 在请求管线中添加方法，注意：这个bodyParser是我们自己写的函数
app.use(bodyParser);
// 先暂时用一下静态文件夹功能(方便调试接口)
// 调用这个方法实现静态文件夹的功能
//仿制express静态文件夹功能：用户只需要输入接口，不需要输入路径，可以读出来默认的启动页
var path=require('path');
var fs=require('fs');
var url=require('url');
function static(staticPath){
    function f(req,res,next){
        // 1.转成url对象
        var urlObj=url.parse(req.url);
        // 把url中的路径和静态文件夹进行拼接
        // 把文件夹和文件拼接到一起 path url对象的路径名称
        var filePath=path.join(staticPath,urlObj.pathname);
        // 根据路径读取文件，带一个读取的回调函数
        fs.lstat(filePath,function(err,s){
            if (!s) {
                // 文件不存在
                next();
            }
            else{
                // 检测一下当前路径读出来的内容是不是文件夹的内容
                // 判断当前文件是否包含文件夹
                // www/
                if (s.isDirectory()) {
                    filePath=path.join(filePath,'index.html')
                }
                // 读出来数据
                fs.readFile(filePath,function(err,data){
                    res.end(data.toString())
                })
            }
        })
    }
    return f;
}
// use需要一个中间件函数[参数格式必须是req,res,next]
app.use(static('www'));
// form表单提交的接口
app.post('/api/post',function(req,res){
    res.send('这是自己封装的bodyparser测试:'+req.body.name)
})
app.listen(3000,function(){
    console.log('running...');
})