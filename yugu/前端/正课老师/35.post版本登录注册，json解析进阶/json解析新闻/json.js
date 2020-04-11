var fs = require("fs");
// iconv
var incov = require("iconv-lite")
fs.readFile("./data.txt", function (err, data) {
    // 转换成二进制
    var buffer = new Buffer(data, "binary");
    // 解码
    var str = incov.decode(buffer, "GBK");
    var obj = JSON.parse(str);
    // 获取到时数据尤其是文本之类的数据因为进行了数据传输，所以会出现编码问题，可以使用系统提供的类，来对数据进行统一化的编码
    for (var key in obj.data) {
        // key 代表的是对象的属性
        // key是对象上面所有的属性 02.data[key]:根据键取值
        // 对象上面有多个属性(每个属性下面又有多条信息)
        // console.log(obj.data[key].length);
        for (var i = 0; i < obj.data[key].length; i++) {
            console.log(obj.data[key][i].title);
        }
    }
})