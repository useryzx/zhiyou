var express = require('express');
var app = express();
app.use(function (req, res, next) {
    console.log('1');
    next();
    console.log('2');

})
// app.get('/api/login', function (req, res) {
//     res.send('请求管线')
// })
function isLogin(req, res, next) {
    var str='12312312';
    console.log('4');

    if (str) {
        console.log('已经登陆');
        next();
        
    }

    else {
        console.log('已经登录1');
        res.send('请先登录3')
    }
}
// app.get('/api/login',isLogin)
app.get('/api/login',isLogin,function(req,res){
    res.send('api2')
})
app.use(function(req,res){
    res.send(404,'<h1>访问的页面有问题</h1>')
    
})
app.listen(3000, function () {
    console.log('running');
})