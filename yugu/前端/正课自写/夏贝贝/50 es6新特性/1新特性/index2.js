// es6类的声明方法
function People({name,age}){
    this.name=name
    this.age = age
}
People.prototype.speak = function(){
    console.log('我叫'+this.name);
    
}

let p =new People({name:'夏被',age:29})
p.speak();

function Student({studentId}){
    People.call(this,arguments[0])
    this.studentId = studentId
}

Student.prototype = Object.create(People.prototype)
People.prototype.study = function(){
    console.log('学习');
}
let stu = new Student({name:'yugu',age:10})
stu.speak()
stu.study()