// es6类的声明方法
function People({name,age}){
    this.name=name,
    this.age=age
}
// 声明方法
People.prototype.speak=function(){
    console.log("我叫:"+this.name);
}
// 第一步必须要用构造函数创建出来对象
let p1=new People({name:'张',age:22});
p1.speak();

function Student({studentId}){
    // 继承(属性)
    People.call(this,arguments[0]);
    this.studentId=studentId
}
// 继承people的方法
Student.prototype=Object.create(People.prototype);
Student.prototype.study=function(){
    console.log("学习");
}
let s=new Student({name:'张',age:22,studentId:12});
s.speak();
s.study();