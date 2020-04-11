// post请求服务器
var express = require("express");
var app = express();
// post请求需要导入专用模块
var bodyParser = require("body-parser");
// 为服务器配置post请求服务
// bodyParser.urlencoded(options) 解析UTF-8的编码的数据。
// 返回一个处理urlencoded数据的中间件。
// 为post请求配置支持utf-8的编码，同时不需要在编码上进行拓展
app.use(bodyParser.urlencoded({
    extended: false
}));
// use:相当于在服务器上添加的新功能
app.use(express.static("www"));
app.listen(8080, function () {
    console.log("running..");
});
// get和post区别
// 接口
app.post("/api/phoneCommit", function (req, res) {
    /*
        对于get请求数据从req.query拿
        对于POST请求  因为post请求会把数据放到请求体内所以从req.body拿
    */
    var telReg = /^1[35789]\d{9}$/;
    if (!telReg.test(req.body.phoneNumber)) {
        res.send("手机号有问题");
    } else {
        res.send("手机号已查收");
    }
});