/*
promise:异步的任务对象
异步：不阻塞主线程的分线程操作
同步：在主线程中进行操作
*/ 
// fs
let  fs =require('fs');
// 把1和2文件中的内容读出来显示到log中
// 假如文件特别大，那么在读取过程中耗费的、
// 事件就会比较长,后面的其他事件需要等待 
// fs.readFile('./1.txt',function (err,data) { 
//     let str1 =data.toString();
//     fs.readFile('./2.txt',function (err,data) {
//         let str2 =data.toString();
//         console.log(str1+str2);
//       });
//  })
//创建promise对象   构造函数有两个参数
// resolve和reject,只需要把之前的任务放到函数中
// 交给了promise 对象来管理(封装成一个异步的对象)
// 一个刚刚创建出来的promise对象，处于待定(pending)状态
// resolve和reject都是回调函数 
// promise可以封装一个异步任务对象【把代码放到promise方法中】
let p1 =new Promise(function (resolve,reject) { 
     fs.readFile('./1.txt',function (err,data) {
        if (err) {
            // 调用reject之后，promise对象就会变成失败状态
            // 传的参数是错误的原因
            reject(err);
        }
        else{
            // 当异步任务成功时，调用resolve,>>传递数据
            resolve(data);
        }
    });
 });
// promise对象的.then方法，用于为promise对象添加处理函数
// 1.如果promise处于待定状态,那么处理函数会在promise
// 对象进入成功状态的时候执行
// 2.如果promise对象当前处于成功状态，那么处理函数会立刻执行
//  p1.then(function (data) {
//     // 如果成功状态的resolve传递了数据，那么会接收到
//     console.log(data.toString());
// });

// // 1.如果promise处于待定状态,那么处理函数会在promise
// // 对象进入失败状态的时候执行
// // 2.如果promise对象当前已经处于失败状态，那么处理函数会立刻执行
// p1.catch(function (err) {
//     console.log(err);
// });


//-----多个任务的时候promise对象如何管理
// let p2 =new Promise(function (resolve,reject) { 
//     fs.readFile('./2.txt',function (err,data) {
//        if (err) {
//            reject(err);
//        }
//        else{
//            // 当异步任务成功时，调用resolve,>>传递数据
//            resolve(data);
//        }
//    });
// });
// 用于把多个promise合并成一个总的promise,当参与合并的多个
// promise都进入到成功状态时，会调用then方法
// let p3 =Promise.all([p1,p2]);
// p3.then(function (data) {
//     // 合并的promise参数得到的是一个数组。数组中存放着每个
//     // promise返回的成功数据
//     let str ="";
    // for(let i=0;i<data.length;i++){
    //     str +=data[i].toString();
    // }
    // console.log(str);
// })

// 异步任务函数可以直接封装并返回当前的promise对象
// 该方法我只负责传递进去文件名，可以返回promise对象让我在外部
// n拿到当前传递进去的文件内容
function myReadFile(filePath){
   return new Promise(function (resolve,reject) {
       fs.readFile(filePath,function (err,data) {
           if (err) {
               reject(reject);
           } else {
               resolve(data);
           }
         })
     })
}
// myReadFile('./1.txt').then(data=>{
//     console.log(data.toString());
// })

let p4 =myReadFile('./1.txt');
let p5 =myReadFile('./2.txt');
Promise.all([p4,p5])
.then(data=>{
    //  console.log(data.toString());
})