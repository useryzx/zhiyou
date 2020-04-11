// /*
// promise:异步的任务对象
// 异步：不阻塞主线程的分线程操作
// 同步：在主线程中进行操作
// */
// let fs = require('fs')
// // fs.readFile('./1.txt', function (err, data) {
// //     let str1 = data.toString();
// //     fs.readFile('./2.txt', function (err, data) {
// //         let str2 = data.toString();
// //         console.log(str1 + str2);
// //     })
// // })

// // resolve:
// // reject:
// // 只需要把之前的任务放进函数中，交给了promise对象来管理（封装成一个异步的对象）
// // 一个刚刚创建的promise对象处于待定状态（pending），不耗内存
// // resolve:
// // reject:两个 都是 回调函数
// let p1 = new Promise(function(resolve,reject){
//     fs.readFile('./1.txt',function(err,data){
//         if(err){
//             // 调用reject之后，promise对象就会变成失败状态，传的参数是错误的原因
//             reject(err)
//         }
//         else{
//             // 当异步成功时，调用resolve，传递数据
//             resolve(data)
//         }
//     })
// })
// // promise对象的.then方法，用于为promise对戏那个添加处理函数
// // 1.如果promise处于待定状态，那么处理函数会在promise对象进行成功状态的时候执行
// // 2.如果promise对象处于成功状态，那么处理函数会立即执行
// // p1.then(function(data){
// //     console.log('****'+data.toString());
    
// // },function(err){
// //     console.log('then------err---------'+err);
// // })
// // p1.catch(function(err){
// //     console.log('catch----------'+err);
// // })
// let p2 = new Promise(function(resolve,reject){
//     fs.readFile('./2.txt',function(err,data){
//         if(err){
//             // 调用reject之后，promise对象就会变成失败状态，传的参数是错误的原因
//             reject(err)
//         }
//         else{
//             // 当异步成功时，调用resolve，传递数据
//             resolve(data)
//         }
//     })
// })
// // 用于将多个promise对象合并成一个promise，当参与合并的多个promise都进入成功状态时，会调用then
// let p3 = Promise.all([p1,p2])
// p3.then(function(data){
//     let str = ''
//     data.forEach(element => {
//         // 合并的promise参数得到的是一个数组。数组中存放着每个promise返回成功的数据
//         str+=element.toString()
//     });
//     console.log(str);
// })
// 异步任务函数可以直接封装并返回当前的promise对象
// 该方法只负责传递进去文件名，可以返回当前promise对象，在外部直接拿到当前传递进去的文件内容
function showData(path){
    let fs = require('fs')
    let p = new Promise(function(resolve,reject){
        fs.readFile(path,function(err,data){
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
    return p.then(function(data){
        console.log(data.toString());
    })
}
let fileName = '1.txt'
showData(fileName)