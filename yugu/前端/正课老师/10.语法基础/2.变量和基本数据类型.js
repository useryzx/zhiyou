console.log("单独的js文件");
//单行注释
/*
 多行注释
*/
//25 double   25年龄 25钱
// 变量:具体的数值不要直接写出来，而是交给一个变量来代替
// 用的时候用变量，程序读到变量时候会自动的读取变量所代表的值
var age =25; //var代表的声明  age变量名 建议起成用途
var money =25;//赋值 从右往左赋值 等号右边的值赋给等号左边的变量

// 同一个变量可以进行多次赋值
age =30;
console.log(age);
// 数字类型，代表一个具体的数字
var num =29.5;
// 字符串类型，代表一串字符
var name ="夏贝";
// ab"\c 字符串类型比较复杂 //c符合ascii编码转移所以在打印时候会
// 直接规避到\\
var str ="ab\"\\c";
console.log(str);
// 布尔类型 用于记录一个真假  true代表真 false代表假 默认是false
var flag =true;
// js当中的基本数据类型有三类:数字类型，字符串类型 布尔类型

// var 弱引用类型  类型取决于赋的值 25整数
/*
  java基本数据类型:byte char short int float double long longlong 
*/ 

