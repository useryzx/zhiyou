// es6模块化使用
// import xxx from "yyy"导入一个模块
// xxx是模块导入的一个模块的名字，可以和导出时不同，yyy是模块的路径。这种方式是导入模块默认项
import add from "./a.js"

let c = add(3,5);
console.log(c);

// 如果导入的模块是导出多项的，那么要使用import{f1,f2...} from "xxxx"的格式，导入时可以选择性的只导入某几项，必须要加｛｝，而且导入项的名字必须和导出项一致
import {f1,f2} from "./b.js";
// 导入多项时必须按照导出的名字进行导入，但是导入之后可以使用as进行重命名
// import{f1 as fn1} from "./b.js"
f1();
f2();

// import fc from "./c.js";
// import {fc1,fc2,fc3} from "./c.js";
// console.log(fc);
// fc1()
// 对于既有多项导出也有默认导出项的模块，可以选择默认导入，也可以使用选择性导入
import fco from "./c.js";
console.log(fco);

