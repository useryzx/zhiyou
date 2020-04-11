var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended:false}))
app.listen(3000,function(err){
    if(!err){
        console.log('服务器已启动');

    }
})