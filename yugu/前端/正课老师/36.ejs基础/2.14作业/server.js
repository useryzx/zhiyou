// fish做法
var fs = require('fs');
fs.readFile('./fish.txt', function (err, data) {
    var strArr = JSON.parse(data);
    // console.log(strArr);
    var isFish = fs.existsSync('fish');
    if (!isFish) {
        fs.mkdir('fish', function (err) {
            if (!err) {
                console.log('创建成功');
            }
        })
    }
    else {
        strArr.result.data.forEach(function (el) {
            var fishId = el.id + '.txt';
            var isFile = fs.existsSync('./fish/' + fishId);
            if (!isFile) {
                fs.appendFile('./fish/' + fishId, el.title + '\n' +el.tags+ '\n' +el.imtro+ '\n' +el.ingredients+ '\n' +el.burden,function(err){
                    console.log('写入成功');
                })
            }
        });
    }
})

// 新闻title
fs.readFile('./网易新闻.txt', function (err, data) {
    if (!err) {
        var strArr = JSON.parse(data);
        // console.log(strArr);
        var newStr;
        strArr.result.forEach(function (el) {
            newStr += (el.title + '\n');
        });
        fs.writeFile('./title.txt', newStr, function (err) {
            console.log('写入成功');
        })
    }


})