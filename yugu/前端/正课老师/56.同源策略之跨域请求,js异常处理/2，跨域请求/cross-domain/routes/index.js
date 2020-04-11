var express = require('express');
var router = express.Router();

const http = require("http");


router.get("/api/test", function (req,res) {
    res.json({
        err:0,
        msg:"ok"
    });
});

// 实现跨域请求的第一种方式：CORS方案
// 浏览器对于跨域ajax请求，并不会直接禁止，而是会发出本次请求，在收到请求的响应头时查看是否包含Access-Control-Allow-Origin，从而判断本次请求是否允许跨域，如果不包含本字段或者本字段的值中不包含当前页面的域名则表示不允许，如果本字段的值包含当前页面地址或者值为*则表示允许跨域访问。
// 如果本次请求不允许跨域访问，浏览器会直接放弃本次请求，按照请求失败处理。如果允许跨域访问则按照请求成功处理。
// cors跨域可以使用get也可以使用post
router.get("/api/cors", function (req,res) {
    console.log("cors接口被调用了");
    res.set("Access-Control-Allow-Origin","*");
    res.json({
        err:0,
        msg:"cors-ok"
    });
});


// 跨域请求的第二种方案：
// JSONP(JSON padding)。浏览器只禁止ajax的跨域请求，所以可以创建一个script标签，把script标签的src设置为请求接口的地址，并准备好一个函数，将函数名作为本次请求的参数发给服务器，服务器收到请求之后，使用参数中的函数名拼接出一段js代码，将需要返回的数据作为参数拼接在函数调用中，然后将这段js代码返回给前端。
// 前端浏览器在收到这段代码之后会立刻执行，调用准备好的函数，函数中的参数就是本次请求的数据。
router.get("/api/jsonp",function(req,res){
    let obj = {
        err:0,
        msg:"ok"
    }
    
    // res.set("Content-Type","application/javascript");
    // // res.send(`console.log("这是一段js代码");`);
    // res.send(`
    //     ${req.query.callback}(${JSON.stringify(obj)});
    // `);

    res.jsonp(obj);
});


// 跨域请求的第三种方式：使用代理服务器
// 当页面需要向非同源服务器发送请求时，可以先将请求发送到自身来源的服务器，自己的服务器对请求向目标服务器进行转发，当得到请求数据之后再将数据返回给页面。
// 在express中可以使用http-proxy-middleware中间件进行代理配置
// router.post("/api/proxy",function(req,res){
    
//     let preq = http.request("http://v.juhe.cn/toutiao/index",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/x-www-form-urlencoded"
//         }
//     },pres=>{
//         let data = Buffer.alloc(0);
//         pres.on("data",d=>{
//             data = data+d;
//         });
//         pres.on("end",()=>{
//             // console.log(data.toString());
//             res.json(JSON.parse(data));
//         })
//     });
//     let params = `key=${req.body.key}&type=${req.body.type}`;
//     // console.log(params);

//     preq.write(params);
//     preq.end();
    
// })


module.exports = router;

