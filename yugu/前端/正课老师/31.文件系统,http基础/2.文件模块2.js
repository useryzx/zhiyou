// 导入模块
var fs =require("fs");
// 写入文件
// fs.writeFile("./123.txt","文件管理",function(err){
//     if (err) {
//         console.log(err);
        
//     } else {
//         console.log("文件写入成功");  
//     }
// });
// 读取
// fs.readFile("./123.txt",function(err,data){
//     if (err) {
//         console.log(err);
        
//     } else {
//         console.log(data.toString());
//     }
// });
// 制作文件夹  makeDirectory
// 第一个参数代表文件夹路径以及文件夹名称 如果文件夹不存在则创建
// fs.mkdir("./abc",function(err){
//     if (err) {
//         console.log("失败");
        
//     } else {
//         console.log("文件夹创建成功");
        
//     }
// });
// 复制文件 (1.要复制的文件 2.复制到哪的文件位置)
// fs.copyFile("./123.txt","./abc/456.txt",function(err){
//     if (err) {
//         console.log("文件复制失败");
        
//     } else {
//         console.log("文件复制成功");
        
//     }
// });
// 删除
fs.unlink("./abc/456.txt",function(err){
    if (err) {
        console.log("删除文件失败");
        
    } else {
        console.log("删除文件成功");
        
    }
}); 
// 将来每一个功能都是独立存在的(比如每个功能是一个按钮绑定的)