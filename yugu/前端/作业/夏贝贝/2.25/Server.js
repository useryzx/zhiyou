// 配置服务器
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('www'));
// 链接数据库和插件
var MsgObj = require('./bin/DAO/MsgDAO.js');
var utils = require('./bin/utils.js');

var pageNum = 0;
// 添加学生信息
app.post('/api/student/add', function (req, res) {
    var studentObj = req.body;
    MsgObj.findOne({ stuName: studentObj.stuName }).exec(function (err, data) {
        if (data == null) {
            // 查找不到，存储进去
            var stuInfo = new MsgObj({
                stuName: studentObj.stuName,
                stuAge: studentObj.stuAge,
                stuSex: studentObj.stuSex,
                stuMajor: studentObj.stuMajor,
                stuHobby: studentObj.stuHobby
            }).save(function (err) {
                if (!err) {
                    console.log('存储成功');
                    res.redirect('http://127.0.0.1:3000/setTimeout.html')
                }
            })
        }
        else {
            res.send({
                err: 1,
                msg: '学生已存在'
            })
        }
    })
})
// 学生列表信息
app.post('/api/stus', function (req, res) {
    MsgObj.find().exec(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            data[data.length] = pageNum;
            res.render('Msg.ejs', { data });
        }
    })
})
// 删除接口
app.post('/api/student/delete', function (req, res) {
    MsgObj.deleteOne({ _id: req.body.id }, function (err) {
        res.redirect('http://127.0.0.1:3000/delete.html');
    });
})
// 编辑接口
app.post('/api/student/change', function (req, res) {
    MsgObj.find({ _id: req.body.id }, function (err, data) {
        if (!err) {
            res.render('Change.ejs', { data });
        }
    })
})
// 更新接口
app.post('/api/student/update', function (req, res) {
    MsgObj.updateOne({ stuName: req.body.stuName }, { stuAge: req.body.stuAge }, function (err) {
        if (err) {
            console.log('更新错误' + err);

        }
        else {
            MsgObj.updateOne({ stuName: req.body.stuName }, { stuSex: req.body.stuSex }, function (err) {
                if (err) {
                    console.log('更新错误' + err);

                }
                else {
                    MsgObj.updateOne({ stuName: req.body.stuName }, { stuMajor: req.body.stuMajor }, function (err) {
                        if (err) {
                            console.log('更新错误' + err);

                        }
                        else {
                            MsgObj.updateOne({ stuName: req.body.stuName }, { stuHobby: req.body.stuHobby }, function (err) {
                                if (err) {
                                    console.log('更新错误' + err);

                                }
                                else {
                                    res.redirect('/')
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})
// 查询接口
app.post('/api/student/search', function (req, res) {
    console.log(req.body);
    // 姓名查询，模糊查询
    if (req.body.stuName != '' && req.body.stuSex == undefined) {
        var str = eval('/^' + req.body.stuName.substr(0, 1) + '.*/');
        console.log(str);
        MsgObj.find({ stuName: { $regex: str } }, function (err, data) {
            if (err) {
                console.log(err);
            }
            data[data.length] = pageNum;
            res.render('Msg.ejs', { data })
        })
    }
    // 性别查询
    else if (req.body.stuName == '' && req.body.stuSex != undefined) {
        console.log('?????');

        MsgObj.find({ stuSex: req.body.stuSex }, function (err, data) {
            if (err) {
                console.log(err);
            }
            data[data.length] = pageNum;
            res.render('Msg.ejs', { data })
        })
    }
    // 双条件查询
    else {
        var str = eval('/^' + req.body.stuName.substr(0, 1) + '.*/');
        console.log(str);
        MsgObj.find({ stuName: { $regex: str }, stuSex: req.body.stuSex }, function (err, data) {
            if (err) {
                console.log(err);
            }
            data[data.length] = pageNum;
            res.render('Msg.ejs', { data })
        })
    }
})
// 翻页接口
app.post('/api/student/page', function (req, res) {
    console.log(req.body);
    var pageNum = req.body.page * 1;
    MsgObj.find().skip(pageNum * 5).exec(function (err, data) {
        if (err) {
            console.log('页面查询错误' + err);
        }
        else {
            data[data.length] = pageNum;
            res.render('Msg.ejs', { data })
        }
    })

})

// 服务器跑起来 
app.listen(3000, function (err) {
    if (!err) {
        console.log('running.....');
    }
})