// 引入mongodb的第三方模块
var mongoose=require("mongoose");
// 连接数据库，只要是操作数据库的软件第一步都需要先连接数据库成功
// 1.代表链接地址 后面mongoTest表示数据库名称  没有会创建
// 2.代表url编码
// 3.代表回调函数
mongoose.connect("mongodb://127.0.0.1:27017/mongoTest",{
    useNewUrlParser:true
},function(err){
    if (err) {
        console.log("数据库出错了:"+err);
    } else {
        console.log("数据库连接成功");
    }
});

// 需要创建表
// Schema数据库对象下的建表函数 传入对象 相当于db.creatColl...
var peopleSchema=new mongoose.Schema({
    // 建表的时候要指定表内建的类型都是大写的
    name:String,
    age:Number
});
// 根据表结构的描述,告诉服务器对象使用model(模型)方法构建一个表，并把表的对象返回(people) 其中model方法的第一个参数表名  第二个参数代表的是这张表的结构
var People=mongoose.model("people",peopleSchema);
// 插入一条数据
// nodejs的数据库对象好处就是当表对象出现之后，增删改查可以直接对象，方法去调用
// 注意：这里的people构造函数就是上面数据库返回的对象所提供的，所以说对象内容的属性和值要严格按照数据库的结构去填写
var p1=new People({
    name:"孙悟空",
    age:999
})
// 保存数据  save方法是数据库提供的保存方法
// 开发过程中实际上都是使用代码进行增删改查，开发人员为了节省时间使用compass类似的数据库图形工具查看数据

// p1.save(function(err){
//     if (err) {
//         console.log("存储错误"+err);
//     }
//     else{
//         console.log("存储成功");
//     }
// });
var p2=new People({
    name:'白晶晶',
    age:123
}).save();

// 查询：nodejs当中的查询必须要服务器下次启动的时候才可以查询到
// 表的查询和sql语句查询一样,只不过查询的结果交给了回调
// People.find({},function(err,data){
//     // {}代表一个对象 也就是一条数据
//     if (err) {
//         console.log("查询出错");   
//     } else {
//         console.log(data);      
//     }
// });

// 条件查询：把白晶晶查出来
// 条件一定要是当前这个表里面有的key才可以
// People.find({name:"白晶晶"},function(err,data){
//     // {}代表一个对象 也就是一条数据
//     if (err) {
//         console.log("查询出错");   
//     } else {
//         console.log("???:"+data);      
//     }
// });

// 升序
// People.find(function(err,data){
//         if (err) {
//         console.log("查询出错");   
//     } else {
//         console.log("???:"+data);      
//     }
//     // 升序(小在前)  不管是升序还是降序都需要先查出来结果再去排序
// }).sort({age:-1});

// 先查询再排序(单独筛选条件)
// People.find({},{age:1}.sort({age:-1}));

// 查询表中所有数据的条数
// 精准的查询方式
// People.count(function(err,count){
//     if (!err) {
//         console.log("当前表中的数据:"+count);   
//     }
// })

// 最常用的查询方式
// 先查询 然后使用exec函数筛查符合条件的
// People.find({name:"孙悟空"},{age:999}).exec(function(err,data){
//     console.log(data);
// });

// 删
// People.remove({age:123},function(err){
//     if (!err) {
//         console.log("删除成功");      
//     }
// });

// 改(更新)
People.update({age:999},{age:1},{multi:true},function(err){
    if (err) {
        console.log("错误");
    }
    else{
        console.log("成功");
    }
});
// 查一下
People.find({},{age:1}).sort({age:-1}).exec(function(err,data){
    console.log(data);
})

