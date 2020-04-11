var express = require('express');
var router = express.Router();

/* GET home page. */

const svgCaptcha = require("svg-captcha");



// 图形验证码接口
router.get("/captcha", function (req,res) {
    // 生成一个验证码对象cap.data是图片数据，cap.text是验证码的文本
    let cap = svgCaptcha.createMathExpr({
        size:6,
        noise: 3,
        color:true,
        background:"#3377bb"
    });

    console.log(cap.text);
    req.session.cap = cap.text;

    res.type("svg");

    res.send(cap.data);
})




module.exports = router;
