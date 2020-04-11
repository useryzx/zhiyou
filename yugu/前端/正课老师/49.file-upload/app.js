var express =require('express');
var app =express();
app.use(express.static('www'));
// 引入上传的路由
var uploadRouter =require('./bin/routers/uploadRouter');
app.use('/api',uploadRouter);
app.listen(3000,function(){
    console.log('running...');
    
});