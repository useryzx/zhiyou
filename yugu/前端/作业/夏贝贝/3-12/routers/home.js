var express = require('express');
var router = express.Router();
var MsgModel = require('../models/MsgModel');
var utils = require('../models/utils')
router.get('/', function (req, res) {
    MsgModel.find().exec(function (err, data) {
        //获取当前查看的秒数
        var now = new Date().getTime();
        data = JSON.parse(JSON.stringify(data));
        data.forEach(function (el) {
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
                else {
                    el.time = utils.getTimeStr(el.time);
                }


        });
        if (!err) {
            //console.log(data);
            res.render('index', { data })
        }
    })


})
router.post('/', function (req, res) {
    if (!req.body.msg) {
        return
    }
    var now = new Date();
    var time = now.getTime();
    var list = req.body.label.split(' ')
    var m = new MsgModel({
        author: req.body.author,
        title: req.body.title,
        label: list,
        time,
        msg: req.body.msg,
        reply: [],
        count: 0

    }).save(function (err) {
        if (err) {
            console.log(err);

        } else {
            res.redirect('/')
        }
    })
})
router.get('/loginOut', function (req, res) {
    delete req.session.user,
        res.clearCookie('username');
    res.redirect('/')
})
module.exports = router;