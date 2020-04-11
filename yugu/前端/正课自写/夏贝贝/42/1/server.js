var express = require('express');
var app = express();
app.use(express.static('www'));
var cookie = require('cookie');
app.get('/api',function(req,res){
    
    // res.set('Set-cookie','name=yugu,age=25')
    // res.send(req.headers.cookie)
    res.cookie('name','yugu',{
        maxAge:88886400
    })
    res.cookie('age','20')
    var cookieObj = cookie.parse(req.headers.cookie)
    res.send(cookieObj.name)
})
app.listen(3000,function(err){
    if(!err){
        console.log('+-+-+-+-+-+-');
    }
})