/*
    es:ecma script  es6代表第六个版本
    在js发明之初，仅仅是作为一个浏览器的脚本语言来使用，本身又有很多不合理的地方，不严谨之处，所以随着js语言越来越流行这些问题被无限的放大，ecma在接手js之后，持续更新了7个版本，目的就是为了修饰js中存在的各种不足。
    使用最广泛的是es5版本  但是es5也有很多不严谨的地方，对应的es6出现之后保留了之前版本的特性，添加新特性让js的编写更简单，更灵活
*/

// 1.添加了块级作用域变量声明方式 let
// if (5>3) {
//     // var 的变量是函数级作用域变量，这个变量所在的作用域是整个函数体 （全局变量）
//     var a=10;
// }
// console.log(a);

// let声明的变量是块级作用域变量  作用域仅在当前的代码块中{代码}
if (5 > 3) {
    let a = 10;
}
// a is not defined
// console.log(a);

// for (let index = 0; index <10; index++) {
//     console.log(index);
// }
// console.log('外部'+index);

// --------------------------------------
// 2.增加了常量的声明方式const
// 常量：声明之后只能被赋值一次
const g = 9.8;
// g = 10;
console.log(g);

// ---------------------------------------
// 3.增加了字符串模板的写法
let name='zhang';
let age=22;
// let str='我叫'+name+'./n今年'+age+'岁';
// console.log(str);
// 使用反撇号``声明字符串插值模板，在字符串插值模板中
// 可以使用${}插入一个变量得到值，可以直接输入回车和双引号等特殊符号
let str1=`我叫'${name}',今年'${age}'岁`;
console.log(str1);

// --------------------------------------
// 4.新的对象字面量语法
let p1={
    // 属性名和属性值所在的变量一样可以直接赋值
    name:name,
    age:age,
    speak:function(){
        console.log(123);
    }
}
let p2={
    name:name,
    age:age,
    speak:function(){
        console.log(123);
    }
}
p2.speak();

// ------------------------------------------
// 5.对象和数组的解构赋值
let obj={
    time:'2020年3月19日14:34:45',
    address:'郑州市经开',
    people:'张佳仪'
}
// let time=obj.time
// let address=obj.address
// let people=obj.people
// 对象的解构赋值，可以将对象中的属性赋值给若干个变量                         
let {people,time,address}=obj;
console.log(people);
// 解构数组
let arr=['西梅','乌梅','树莓'];
// let a=arr[0];
// 解构
let [x,w,s]=arr;
// 函数参数进行结构函数  当函数参数是一个对象时，可以直接在形参列表中进行解构，并且可以设置某个参数的默认值
// function f1({a,b=10,c,d}){
//     // let {a,b,c,d}=obj
//     console.log(a);
//     console.log(b);
//     console.log(c);
//     console.log(d);
// }
// f1({
//     d:4,
//     a:1,
//     b:5
// })


// ------------------------------------------
//6. for...of循环
let arr2=[1,3,5,7,9];
// for...of循环可以遍历一个数组中的所有值
for (let el of arr2) {
    console.log(el);
}
// 遍历字符串
for (let va of "arr2") {
    console.log(va);
}
