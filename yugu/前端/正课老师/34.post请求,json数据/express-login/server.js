var express = require("express");
var fs = require("fs");
var app = express();
// 设置静态文件夹
app.use(express.static("www"));
// 注册接口
app.get("/register", function (req, res) {
    if (req.query.username == "" || req.query.psw == "") {
        res.send("用户名或密码不能为空");
    } else {
        var user = req.query.username;
        fs.readFile("./www/users.txt", function (err, data) {
            if (err) {
                // 第一次
                fs.writeFile("./www/users.txt", user, function (err) {
                    if (!err) {
                        //   跳转登录界面
                        fs.readFile("./www/login.html", function (err, data) {
                            if (!err) {
                                res.end(data);
                            }
                        });
                    }
                });
            } else {
                //   把之前注册的账号拿出来，并且放入新的账号
                var oldUser = data.toString();
                // 拼接出来新的账号和老的账号的结合
                // (一会这个地方要用数组去遍历因为oldUser不止一个)
                // "1,2,3,4"
                var dataArr = oldUser.split(",");
                // 不存在  要存
                if (dataArr.indexOf(user) == -1) {
                    var newStr = oldUser + "," + user;
                    fs.writeFile("./www/users.txt", newStr, function (err) {
                        if (!err) {
                            fs.readFile("./www/login.html", function (err, data) {
                                if (!err) {
                                    res.end(data);
                                }
                            });
                        }
                    })
                } else {
                    res.send("该账号存在");

                }
            }
        });
    }

});

//登录接口
app.get("/login", function (req, res) {
    if (req.query.username == "" || req.query.psw == "") {
        res.send("用户名或密码不能为空");
    } else {
        // 读文件看看账号注册过没
        fs.readFile("./www/users.txt", function (err, data) {
            if (data) {
                var users = data.toString();
                var userArr = users.split(",");
                if (userArr.indexOf(req.query.username) == -1) {
                    res.send("请先去注册");
                } else {
                    res.send("登录成功")
                }
            }
        });
    }
});
app.listen(3000, function () {
    console.log("启动...");
});