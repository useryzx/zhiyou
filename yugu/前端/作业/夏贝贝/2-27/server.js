// editBy:yuguaa
var express = require("express");
var Stu = require("./bin/DAO/StuDAO.js");
var ejs = require("ejs");
var app = express();
app.set("view engine", ejs);
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static("www"));
//学生信息添加接口
app.post("/api/stu/add", function (req, res) {
    if (req.body.stuHobby) {
        req.body.stuHobby = [req.body.stuHobby]
    } else {
        req.body.stuHobby = []
    }

    var stu = new Stu(req.body);
    stu.save(function (err) {
        if (!err) {
            res.render("temp.ejs", {
                title: "添加成功",
                links: [{
                        text: "继续添加",
                        link: "/add.html"
                    },
                    {
                        text: "查看学生列表",
                        link: "/api/stu/list"
                    }
                ]
            });
        }
    });
});
//学生列表接口
app.get("/api/stu/list", function (req, res) {
    var condition = {};
    if (req.query.stuName) {
        condition.stuName = RegExp(req.query.stuName)
    }
    if (req.query.stuSex) {
        condition.stuSex = req.query.stuSex
    }

    var page = req.query.page ? req.query.page : 0;
    page = page * 1;
    Stu.find().countDocuments().exec(function (err, count) {
        if (!err) {
            Stu.find(condition).skip(page * 5).limit(5).exec(function (err, data) {
                if (!err) {
                    res.render("Stu.ejs", {
                        data,
                        page,
                        total: Math.ceil(count / 5)
                    });
                }
            });
        }
    });
});
//删除接口
app.get("/api/stu/remove", function (req, res) {
    Stu.deleteOne({
        _id: req.query._id
    }).exec(function (err) {
        if (!err) {
            res.render("temp.ejs", {
                title: "删除成功",
                links: [{
                    text: "查看学生列表",
                    link: "/api/stu/list"
                }]
            });
        }
    })
})
//编辑接口
app.get("/api/stu/update", function (req, res) {
    Stu.findOne({
        _id: req.query._id
    }).exec(function (err, data) {
        if (!err) {
            res.render("update.ejs", data)
        }
    })
})
//提交修改的学员信息
app.post("/api/stu/updateOne", function (req, res) {
    if (req.body.stuHobby) {
        req.body.stuHobby = [req.body.stuHobby]
    } else {
        req.body.stuHobby = []
    }

    Stu.updateOne({
        _id: req.body._id
    }, {
        $set: {
            stuName: req.body.stuName,
            stuAge: req.body.stuAge,
            stuMajor: req.body.stuMajor,
            stuHobby: req.body.stuHobby
        }
    }).exec(function (err) {
        if (!err) {
            res.render("temp.ejs", {
                title: "编辑成功",
                links: [{
                    text: "查看学生列表",
                    link: "/api/stu/list"
                }]
            });
        }
    })

})
app.listen(3000, function () {
    console.log("yuguaa........服务器已启动.......");

});