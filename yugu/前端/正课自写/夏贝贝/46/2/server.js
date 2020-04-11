var express = require('express');
var app = express();
var router = express.Router();
router.get('/api1',function(req,res){
    res.send('api1')
})
var router2 = express.Router();
router2.get('/register',function(req,res){
    res.send('带前缀的接口')
})

app.use('/user',router2)
app.use(router)

var blogRouter = require('./bin/routers/blogRouter')
app.use('/blog',blogRouter)
app.listen(3000,function(){
    console.log('running');
    
})