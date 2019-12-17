## html运行js代码

1. html标签负责界面展示

2. css负责界面展示的效果

3. js只负责逻辑与界面展示没有关系



面向对象:"万物皆对象"以对象的形式来构建整个代码块

面向过程:以实现效果为最终目的

javascript:脚本语言,轻量化,弱类型,基于原型的动态编程语言

##### js的基本构成部分:

​    1. ECMAScript:构建js的基本语法(逻辑，函数，事件..)

​    2. DOM(Document Object Model)文档对象模型:负责在和html进行沟通的时候如何访问和处理标签以及样式 

    3. BOM(Browser Object Model)浏览器对象模型:规定了js访问和处理浏览器对象的属性和方法



console对象 :浏览器的控制台对象

log是对象的方法 代表着可以在控制台输出

编程语言能直接"识别"的只有数字 ""代表字符串



## 变量和基础数据类型

```js
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
```

## 基本运算类型

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
</body>
<script>
    var name = "夏贝";
    var weight = 86.8;
    var age = 29;
    // true代表男生
    var sex = true;
    // 固定内容  + 代表的是拼接
    console.log("刚才一个叫做:" + name + "的老师，吐槽了联通的网");
    // 四个变量结合到一起打印一句话
    console.log("一个叫做:" + name + "的老师,今年:" +
        age + "岁,体重为:" + weight + "公斤，性别为:" + sex);
    var num = 1 + 2 + 3;
    // 如果右侧有运算，那么会先运算在赋值
    console.log(num);
    // 如果变量是数字类型那么四则运算都支持 + - * /
    var num2 = num + num;
    console.log(num2);
    var s1 = "a";
    var s2 = "b";
    var s3 = s1 + s2;
    // 如果在+的情况下字符串里面的内容都不是数字，
    // 那么会把两个字符串进行对应的拼接 NaN读取不出
    console.log(s3);
    var s4 = "3" + 5;
    // 当数字和字符串拼接相加时，先将数字转成字符串然后在拼接
    console.log(s4);
    // 当参与运算的两个值其中一个是字符串代码会将字符串转成数字
    // 然后进行减法运算
    var s5 = 5 - "3";
    s5 = "a" - 3;//前提是字符串内的内容必须要可以转成数字
    console.log(s5);
    var num1 = 3 * 5;
    var num2 = (num1 + 3) * 3;
    // 多个打印之间用,分割
    // 乘法运算中当有字符串参与的情况下，和减法遵循的规则一样
    num1 = "3" * "5";
    console.log(num1, num2);
    // 除法和乘法以及减法规则一样
    // 取余数  %  整除之后余下的数字叫做余数
    var num3 = 5 % 3;
    console.log(num3);
    //++代表自增1  --自减1
    var num4 = 3;
    //++写在变量前，表示先自增，然后参与表达式计算
    // ++写在变量后,表示变量先参加表达式计算，然后在自增
    var num5 = num4++;
    console.log(num4, num5);
    var num6 = 10;
    num6 += 5;
    // +=代表在自身原有基础之上加上新的值 num6 =num6+5
    console.log(num6);
    // -= *= /=逻辑一样 
    console.log("a" + 3);
</script>
</html>
```

## 布尔值运算

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
</body>
<script>
    var name = "夏贝";
    var weight = 86.8;
    var age = 29;
    // true代表男生
    var sex = true;
    // 固定内容  + 代表的是拼接
    console.log("刚才一个叫做:" + name + "的老师，吐槽了联通的网");
    // 四个变量结合到一起打印一句话
    console.log("一个叫做:" + name + "的老师,今年:" +
        age + "岁,体重为:" + weight + "公斤，性别为:" + sex);

    var num = 1 + 2 + 3;
    // 如果右侧有运算，那么会先运算在赋值
    console.log(num);
    // 如果变量是数字类型那么四则运算都支持 + - * /
    var num2 = num + num;
    console.log(num2);
    var s1 = "a";
    var s2 = "b";
    var s3 = s1 + s2;
    // 如果在+的情况下字符串里面的内容都不是数字，
    // 那么会把两个字符串进行对应的拼接 NaN读取不出
    console.log(s3);
    var s4 = "3" + 5;
    // 当数字和字符串拼接相加时，先将数字转成字符串然后在拼接
    console.log(s4);
    // 当参与运算的两个值其中一个是字符串代码会将字符串转成数字
    // 然后进行减法运算
    var s5 = 5 - "3";
    s5 = "a" - 3;//前提是字符串内的内容必须要可以转成数字
    console.log(s5);

    var num1 = 3 * 5;
    var num2 = (num1 + 3) * 3;
    // 多个打印之间用,分割
    // 乘法运算中当有字符串参与的情况下，和减法遵循的规则一样
    num1 = "3" * "5";
    console.log(num1, num2);
    // 除法和乘法以及减法规则一样

    // 取余数  %  整除之后余下的数字叫做余数
    var num3 = 5 % 3;
    console.log(num3);
    //++代表自增1  --自减1
    var num4 = 3;
    //++写在变量前，表示先自增，然后参与表达式计算
    // ++写在变量后,表示变量先参加表达式计算，然后在自增
    var num5 = num4++;
    console.log(num4, num5);

    var num6 = 10;
    num6 += 5;
    // +=代表在自身原有基础之上加上新的值 num6 =num6+5
    console.log(num6);
    // -= *= /=逻辑一样 
    console.log("a" + 3);
</script>
</html>
```

## 比较运算符

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
</body>
<script>
    /*
       >大于 <小于 <=小于等于 >=大于等于 ==等于 !=不等于
       两个变量进行比较，会得到一个布尔值的结果，不等式成立的时候
       值为true 不成立的时候为false
    */ 
   var a =5;
   var b =6;
   var f1 =a<b;
   console.log(f1);
   var f2 =a>=b;
   console.log(f2);
   var f3 =a!=b;
   console.log(f3);
   var f4 =a==b;
   console.log(f4);
/* 
   比较运算符会组成一个表达式,无论表达式有多长，系统在检测的时候
   都会把结果以布尔值的形式呈现
*/
</script>
</html>
```

## 类型转换

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>类型转换</title>
</head>
<body>
</body>
<script>
    var str ='字符串';
    // alert弹出框 会在界面上弹出一个窗口 带有确定按钮
    // typeof 检测当前变量的类型
    /*
    变量在存储容器中的数据时是可以进行改变的，数据类型也可以改变，
    类型不固定，这些不固定的类型叫做弱类型
    类似于java之类的属于强类型编程语言:变量在声明的时候是什么类型
    赋值的时候也只能赋值对应的类型
    */
    alert(typeof str);//string字符串
    str =15;
    alert(typeof str);//number 数字类型
    str =true;//boolean 布尔类型
    // 显式类型转换:通过为变量重新赋值来改变变量的数据类型
    alert(typeof str);

    // 隐式类型转换:当运算的时候变量为了适应某种规则自动进行的类型转变
    alert(1+'2'); //12 
    alert(typeof ( true + 'aa'));//string
    // null代表声明了变量但没有给变量赋值
    alert(null + 'aa');
    // 其他类型与字符串相加时，会被隐式转成字符串类型在相加
    alert(typeof ( null + 'aa'));//string

    alert(10 - false); // 当数字和布尔类型进行减
    //法运算的时候 false变为0 true变为1  null也变为0
</script>
</html>
```

