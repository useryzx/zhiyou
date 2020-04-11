let fs = require('fs')
function showData(path) {
    // let fs = require('fs')
    let p = new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
        
    })
    return p;
}
// 链式调用
// showData('./1.txt').then(function (data) {

// }).catch(function (err) {

// })
showData('./1.txt').then(data => {
    if (data.toString() == 'yes') {
        return showData('./2.txt')
    }
    else {
        return Promise.reject({ msg: 123 })
    }
}).then(function (data) {
    console.log(data.toString());
}).catch(function (err) {
    console.log(err);
})
