function fc1() {
    console.log("fc1函数");
}
function fc2() {
    console.log("fc2函数");
}
function fc3() {
    console.log("fc3函数");
}
let o = {
    fc1, fc2, fc3
}
// export default o;
// export{
//     fc1,fc2,fc3
// }
// 一个模块中可以导出多项的同时导出一个默认项
export {
    fc1,fc2,fc3,o as default
}