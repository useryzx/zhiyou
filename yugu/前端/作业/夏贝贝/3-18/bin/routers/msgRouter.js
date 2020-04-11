var express = require('express')
var Msgobj = require('../DAO/msgDAO')
var util = require('../DAO/utils')
var router = express.Router();
// 发帖跳转
router.get("/msg-commit", function (req, res) {
    if (req.session.user) {
        res.render('msg-commit', {
            title: '发布'
            // user: req.session.user
        });
    }
});
// 发帖保存数据库并展示
router.post('/api/msg/commit', function (req, res) {
    if (req.session.user) {
        // 替换空格
        console.log(req.body.tag);
        // 去除空格 1 2 3
        var b = new Msgobj({
            // 快速读取body中的数据并对应上数据库的键
            // title:req.body.title,
            ...req.body,
            time: new Date(),
            author: req.session.user._id,
            readCount: 0,
            reply: []
        }).save(function (err) {
            if (!err) {
                res.redirect('/');
            } else {
                console.log(err);

            }
        });
    }
})
// 帖子详情页跳转
router.get('/msg/detail', function (req, res) {
    Msgobj.findOne({
        _id: req.query._id
    }).populate('author')
        .exec(function (err, data) {
            // 阅读数要增加 nodejs  vue  项目
            data.readCount++;
            data.save(function () {
                // 序列化之后直接可以使用的data对象
                data = JSON.parse(JSON.stringify(data));
                // 因为帖子界面也需要具体的事件所以在这里处理好
                data.time = util.getTimeStr(data.time);
                // 加载ejs模板
                res.render('msg-detail.ejs', {
                    title: '帖子详情',
                    user: req.session.user,
                    data
                });
            })
        });
})
module.exports = router;