// js回调函数，多层嵌套问题的终极解决方案 async和await函数
const fs =require('fs')
// fs.readFile('1.txt',function(err,data){
//     if(err){
//         console.log(err);
        
//     }
//     else{
//         console.log(data.toString());
        
//     }
// })
// let data = fs.readFileSync('1.txt');
// console.log(data.toString());
function myReadFile(filePath){
    return new Promise(function(resolve,reject){
        fs.readFile(filePath,function(err,data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}
// myReadFile('1.txt').then(data=>{
//     console.log(data.toString());
//     console.log(2);
    
// })

async function main(){
    let data = await myReadFile('./1.txt');
    console.log(data.toString());
    console.log(2);
    
}
main()
console.log(1);
