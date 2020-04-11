// js回调函数多层嵌套问题的终极解决方案：async,await函数
const fs=require('fs');
// 传统的读文件方式
// fs.readFile('./1.txt',function(err,data){
//     if (err) {
//         console.log(err)
//     }
//     else{
//         console.log(data.toString());
        
//     }
// })

// 同步读取
// let data=fs.readFileSync("./1.txt");
// console.log(data.toString());

// promise函数>>>异步读取
// function myReadFile(filePath){
//     return new Promise(function (resolve,reject){
//         fs.readFile(filePath,function(err,data){
//             if (err) {
//                 reject(err)
//             }else{
//                 resolve(data);
//             }
//         })
//     })
// }
// myReadFile("./1.txt").then(data=>{
//     console.log(data.toString());
// })

// 在函数之前可以添加async描述 表示该函数是异步函数
async function main(){
    // 在异步函数内部，可以使用await进行函数调用
    // await调用的函数返回值必须是一个promise
    // 一个返回promise得函数，如果进行了await调用，那么得到的不再是这个promise而是这个promise.then()时，所传递的数据
    let data=await myReadFile("./1.txt")
    /*
        async和await仅仅是promise的语法糖
        表面上看的是同步执行，其实本质上还是异步执行的
        await调用的时候相当于把折行代码之后的所有代码都转移到了返回promise的.then函数中
    */
    console.log(data.toString());
    console.log(456);
}
main();
console.log(123);
