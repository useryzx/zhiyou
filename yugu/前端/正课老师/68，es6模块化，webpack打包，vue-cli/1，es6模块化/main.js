// es6模块化，使用
// import xxx from "yyy" 
// 的格式导入一个模块， xxx是模块导入之后的名字，可以和导出时不同，yyy是模块的路径。这种方式是导入模块默认项。
import add from "./a.js";

let c = add(3,5);

console.log(c);


// 如果导入的模块是导出多项的，那么要使用
// import {o1,o2,...} from "xxxx"
// 的格式进行导入，导入时可以选择性的只导入其中某几项。必须要加{}
// 而且导入项的名字必须和导出时的名字一致。
// 导入多项时必须按照导出的名字进行导入，但是导入之后可以使用as进行重命名。
import {f1 as fn1,fn2,f3} from "./b.js";

fn1();
fn2();


// 对于既有多项导出也有默认导出项的模块，可以选择默认导入也可以使用选择性导入。
import fco from "./c.js";
console.log(fco);

import {fc1} from "./c.js";
fc1();