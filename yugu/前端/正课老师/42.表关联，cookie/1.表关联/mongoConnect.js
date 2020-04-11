var People =require('./bin/DAO/PeopleDAO.js');
var Car =require('./bin/DAO/CarDAO.js');
// 关联:如果是car往People上关联，一定要确保People表中有可
// 关联的对象才可以
// var p1 =new People({
//     name:'许文强',
//     age:'66'
// }).save(function(err){
//     console.log('People成功');
// });

// 创建car
// var c1 =new Car({
//     name:'保时捷',
//     // 关联People的对象
//     p:'5e586f714e8a128aec1e803e'
// }).save(function(err){
//         console.log('car成功');
// });

// 查询car表中的对象，应该可以取出来每个对象关联的people对象
// populate是mongodb中的填充查询，类似于关系型数据库中的
// ‘连接查询’ 该函数的用途是引入另一个集合中的文档
// (填写关联的键名) 并将其填充到指定的文档路径中
Car.findOne().populate('p').exec(function(err,data){
    console.log(data); 
})