function f1(){
    console.log("f1函数");
}

function f2(){
    console.log("f2函数");
}

function f3(){
    console.log("f3函数");
}


// es6模块化，可以导出多项，格式为
//  export {o1,o2,o3,....}
// 这种格式很像对象字面量，但并不是导出了一个对象。
// 导出多项时可以使用as给某一项重命名
export {f1,f2 as fn2,f3};