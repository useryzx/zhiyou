var express = require("express");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}))
var Student = require("./bin/MsgDAO.js");
app.use(express.static("www"));
// 添加学员的接口
app.post("/api/stu/add", function (req, res) {
    // 构建数据库对象
    // hobby:不管添加的同学有没有选择爱好，对于数据来说这是一个数组对象
    if (req.body.hobby) {
        req.body.hobby = [req.body.hobby];
    } else {
        req.body.hobby = [];
    }
    // 因为form表单的name和数据库对象的键一样，所以可以直接创建
    var s = new Student(req.body);
    s.save(function (err) {
        if (!err) {
            // 跳转>>可以跳ejs只需要改tip就可以了
            res.render("temp.ejs", {
                tip: "添加成功",
                links: [{
                        name: "继续添加",
                        link: "/add.html"
                    },
                    {
                        name: "查看学生列表",
                        link: "/stu-list"
                    }
                ]
            })
        }
    })
});
// 获取学员列表接口
app.get("/stu-list", function (req, res) {
    // 1.可以根据条件查
    // 2.查出来全部，但是首页只显示十条
    var condition = {};
    if (req.query.name) {
        condition.name =RegExp(req.query.name);
    }
    if (req.query.sex) {
        condition.sex =req.query.sex;
    }
    // 使用变量来标记当前的页数
    var page =req.query.page?req.query.page:0;
    // 数字
    page =page*1;
    console.log(page);
    // countDocuments()查询当前集合的文档数
    Student.find().countDocuments().exec(function (err, count) {
        // 把所有的数据都返回了，但是第一次只需要前十条
        Student.find(condition).skip(page*10).limit(10).exec(function (err, data) {
            if (!err) {
                // 渲染模板
                res.render("stu-list.ejs", {
                    data,
                    page, 
                    // 到最后一页的时候  就不能显示下一页了
                    // total:总页数
                    total: Math.ceil(count / 10)
                });
            }
        })
    })
});
// 编辑接口
app.get("/api/stu/edit", function (req, res) {
    // 根据传递进来的id查找到数据，显示出来
    Student.findOne({ _id: req.query.id }, function (err, data) {
        if (!err) {
            res.render("edit.ejs", data)
        }
    })
})
// 更新接口
app.post("/api/stu/editSubmit", function (req, res) {
    if (req.body.hobby) {
        // 数据库里面的array和js中的[]有一定的区别   可以理解为初始化
        req.body.hobby = [req.body.hobby];
    }
    else {
        req.body.hobby = [];
    }
    // 更新：三个参数  1.要查找的对象，2.更新的数据 3.回调
    Student.updateOne({ _id: req.body._id }, {
        $set: {
            name: req.body.name,
            age: req.body.age,
            major: req.body.major,
            hobby: req.body.hobby,
        }
    }, function (err) {
        if (!err) {
            res.render("temp.ejs", {
                tip: "编辑成功",
                links: [{
                    name: "回到首页",
                    link: "/"
                }, {
                    name: "查看学员列表",
                    link: "/stu-list"
                }
                ]
            });
        }
    });
})
// 删除接口
app.get("/api/stu/remove", function (req, res) {
    Student.deleteOne({ _id: req.query.id }, function () {
        res.render("temp.ejs", {
            tip: "删除成功",
            links: [{
                name: "回到首页",
                link: "/"
            }, {
                name: "查看学员列表",
                link: "/stu-list"
            }
            ]
        });
    });
});
app.listen(3000, function (err) {
    console.log('running....');

});