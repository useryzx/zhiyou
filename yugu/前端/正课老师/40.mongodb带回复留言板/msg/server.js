var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
// 链接数据库
var MsgObj = require('./bin/DAO/MsgDAO.js');
var utils = require('./bin/utils.js');
// 首页接口
app.get('/', function (req, res) {
    console.log('???');
    // 查询数据
    MsgObj.find().exec(function (err, data) {
        // 当前的时间和数据库时间做比较
        var now = new Date().getTime();
        //  反序列化成有一个对象
        data = JSON.parse(JSON.stringify(data));
        // 遍历
        data.forEach(function (el) {
            // 获取时间差
            var difference = now - el.time;
            difference /= 1000;
            if (difference <= 60) {
                el.time = '刚刚'
            } else
            if (difference <= 3600) {
                el.time = Math.floor(difference / 60) + '分钟之前'
            } else if (difference <= 86400) {
                el.time = Math.floor(difference / 3600) + '小时之前'
            }
            else
            {
                // 超过多少小时的
                var creatTime =new Date(el.time);
                el.time =utils.getTimeStr(el.time);
            }


        });
        if (!err) {
            res.render('Msg.ejs',{data});
        }
    })
});
app.post("/api/msg/commit", function (req, res) {
    if (!req.body.msg) {
        return;
    }
    // 准备时间和ip
    var now = new Date();
    var time = now.getTime();
    var ip = utils.getIpFormStr(req.ip);
    var m = new MsgObj({
        ip,
        time,
        msg: req.body.msg,
        // 回复
        reply: []
    }).save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
// 回帖
app.post("/api/msg/reply",function(req,res){
    //  准备回帖对象
    var replyObj ={
        ip:utils.getIpFormStr(req.ip),
        time:utils.getTimeStr(new Date()),
        content:req.body.content
    }
    // 回帖需要先找到帖主
    MsgObj.findOne({_id:req.body.id})
    .exec(function(err,data){
       if (!err) {
           data.reply.push(replyObj);
        //    先push完成才能save
        data.save(function(){
            res.redirect('/');
        })
       }
    })
})
app.listen(3000, function (err) {
    console.log('running....');

});