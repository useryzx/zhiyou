/*
es:ecma script es6代表第六个版本
在js创造之初，仅仅作为一个浏览器的脚本语言使用，本身又有许多不合理的地方
随着js越来越流行，这些问题被无限放大，ecma接收js之后。持续更新了7个版本，目的就是为了修饰js中的各种不足

使用最广泛的es5，但是es5还有很多不严谨的地方，对应es6出现之后保留了之前的版本特性，提那家新特性让js的编写更简单，更灵活
*/

// 1.添加了块级作用域声明方式
// if(5>3){
//     // var 的变量是韩书记作用域的变量，这个变量所在的作用域是全局作用域
//     var a = 10;
// }
// console.log(a);
// if(5>3){
//     // let声明的变量是块级作用域变量，作用域仅在当前的代码块中｛代码块｝
//     let b = 9;
// }
// console.log(b);

// for (let index = 0; index < 10; index++) {
//     console.log(index);

// }
// console.log('wai'+index);



// 2.增加了常量的声明方式const
// 常量：声明之后只能被赋值一次
// const g = 9;
// g = 10;
// console.log(g);


// 3.增加了字符串模板写法
let name = 'xia'
let age = 29
// let str = '我叫：'+name+'，\n今年'+age+'岁'
// let str1 = `我叫${name}，\n
// 今年${age}`
// console.log(str);
// console.log(str1);



// 4.新的对象字面量语法
let p1 = {
    name:name,
    age:age,
    speak:function(){
        console.log(123);
    }
}

let p2 = {
    name,
    age,
    speak:function(){
        console.log(123);
    }
}
p2.speak()
console.log(p1.name);


// 5.对象和数组的解构赋值
let obj={
    time:'2020年',
    adress:'郑州',
    people:'夏被'
}
// let time = obj.time;
// let adress = obj.adress;
// let people = obj.people;
let{people,time,adress} = obj;
console.log(time,people);
let arr = ['没戏','还没戏','依旧没戏']
// let a = arr[0]
let [m,h,y]=arr;
console.log(m,y);
// 函数参数进行解构赋值
// 当函数的参数是一个对象
function f1({a,b = 10,c,d}){
    console.log(a,b,c,d);
}
f1({
    d:4,
    a:1,
    c:5,
    b:13
})

// 6 for...of循环
let arr2 = [1,3,5,7,9]
for(let el of arr2){
    console.log(el);
}

for(let el of 'arr2'){
    console.log(el);
}