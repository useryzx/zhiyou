var express = require('express');
var app = express();
// var fs = require('fs')
// app.use(express.static('www'))
app.use(staticPath('www'))
function staticPath(fileName) {
    return function staticPathIn(req, res, next) {
        var fs = require('fs')
        var flag = fs.existsSync(fileName);
        if (flag) {
            if (req.method == 'GET') {
                // 路径访问
                // 判断是否是路径方式访问
                if (req.originalUrl == '/') {
                    fs.readFile(fileName + '/index.html', function (err, data) {
                        res.send(data.toString());
                    })
                }
                // 接口访问
                else {
                    var test = /(\.html)||(\.js)||(\.py)||(\.json)/i;
                    var flag = test.test(req.originalUrl);
                    var baseurl = test.exec(req.originalUrl);
                    // 路径访问
                    if (flag) {
                        fs.readFile(fileName + baseurl.input, function (err, data) {
                            res.send(data.toString());
                        })
                    }
                    // 接口访问
                    else {
                        next();
                    }
                }
            }
            // 其他请求访问，找接口
            else {
                next();
            }
        }
    }
}
app.use(bodyParser)
function bodyParser(req, res, next) {
    if (req.method == 'post' || req.method == 'POST') {
        // console.log(req.headers);
        if (req.headers['content-type'] == 'application/x-www-form-urlencoded') {
            var data = Buffer.alloc(0);
            req.on('data', function (d) {
                data += d;
            })
            req.on('end', function () {
                var obj = {};
                // console.log(data);
                var params = data.split('&')
                params.forEach(function (el) {
                    var vn = el.split('=')[0];
                    var vv = el.split('=')[1];
                    obj[vn] = vv;
                })
                req.body = obj;
                next();
            })
        }
        else {
            next();
        }
    }
    else {
        next();
    }

}
app.post('/api/name', function (req, res) {
    res.send('这是自己封装的bodyparser测试' + req.body.name)
})
app.listen(3000, function () {
    console.log('running');

})