var express = require('express')
var app = express()
app.use(express.static('www'))
var uploadRouter = require('./bin/Routers/uploadRouter')
app.use('/api',uploadRouter)
app.listen(3000,function(){
    console.log('server go +_+');
})