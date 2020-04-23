function f1() {
    console.log("f1函数");

}
function f2() {
    console.log("f2函数");

}
function f3() {
    console.log("f3函数");

}
// es6模块化可以导出多项，格式为export{f1,f2}这种方式很像对象字面量，但并不是导出了一个对象
// export {f1, f2, f3}
// f3 as f3n重命名，导出多项时可以使用as给某一项重命名
export{f1,f2,f3 as f3n}