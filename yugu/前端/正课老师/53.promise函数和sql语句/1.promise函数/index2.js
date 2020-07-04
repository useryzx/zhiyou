let fs = require('fs');

function myReadFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                reject(reject);
            } else {
                resolve(data);
            }
        })
    })
}
//  默认情况下一个promise.then或.catch之后，返回值还是一个promise
// 对象，所以可以进行链式调用
// myReadFile('./1.txt')
// .then(function (data) {

//   })
// .catch(function (err) {

// })
// 如果promise对象的.then方法中的处理函数没有返回值
// 那么then方法还是返回一个对象，如果then方法哟返回值
// 则返回处理函数的返回值
myReadFile('./1.txt')
    .then(data => {
        if (data.toString() == 'yes') {
            return myReadFile('./2.txt');
        } else {
            // 关闭
            return Promise.reject({
                msg: 123
            });
        }
    })
    .then(function (data) {
        console.log(data.toString());
    })
    .catch(function (err) {
        console.log(err);
    })