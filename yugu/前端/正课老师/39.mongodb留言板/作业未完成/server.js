var express=require("express");
var mongoose=require("mongoose");
var fs=require("fs");
mongoose.connect('mongodb://127.0.0.1:27017/mongoTest', {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log("数据库出错:" + err);
    }
    else {
        console.log("数据库连接成功");
    }
});
var rule = new mongoose.Schema({
    username: String,
    psw: Number
});
var Msg = mongoose.model('msg', rule);
var app=express();
app.use(express.static("www"))
app.get("/zhuce",function (req,res) {
    if (req.query.username == "" || req.query.psw == "") {
        res.send("用户名或密码不能为空");
    }else{
        var name=req.query.username;
        Msg.find({username:name},function(err,data){
            if(!err){
              if(data==''){
                var inter=new Msg({
                    username:name,
                    psw:req.query.psw
                }).save();
                fs.readFile('./www/login.html',function(err,data){
                    if(!err){
                        res.end(data);
                    }
                })
              }
              else{
                  res.send('用户已经存在，请重新输入')
              }
            }
        });
    }
})
app.get('/login',function(req,res){
    if (req.query.username == "" || req.query.psw == "") {
        res.send("用户名或密码不能为空");
    }else{
        var name=req.query.username;
        Msg.find({username:name},function(err,data){
            if(!err){
                if(data==''){
                    return res.json({
                        err:1,
                        MSG:'账号不存在请去注册'
                    })
                }
                else{
                    if(req.query.psw!=data[0].psw){
                        return res.json({
                            err:1,
                            MSG:'密码错误，请重新输入'
                        })
                    }
                    else{
                        return res.json({
                            err:0,
                            MSG:'登陆成功'
                        })
                    }
                }
            }
        })

    }
})
app.listen(3000,function (err) {
    if (!err) {
        console.log("running...");
    }
})