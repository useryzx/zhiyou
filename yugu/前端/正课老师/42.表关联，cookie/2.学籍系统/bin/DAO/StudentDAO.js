var mongoose =require('./Connection.js');
var studentSchema =new mongoose.Schema({
    name:String,
    // 每一辆车都要关联上对应的people
    // 集合，在表结构中，除了使用数字，字符串，数组...
    // 也可以声明object(一般声明object都是用作关联外部表使用)
    grade:{
        // type当前对象的类型
        // mongoose.Schema.Types.ObjectId 表示关联的是主键
        type:mongoose.Schema.Types.ObjectId,
        // ref>>>关联到哪一张表
        ref:'grade'
        // 每出现一个car对象，那么该对象身上会有一个p属性，
        // 该属性填写People表对象的id,会根据填入的id自动
        // 把people表中的对象拿出来赋值给car对象
    }
});
module.exports =mongoose.model('student',studentSchema);