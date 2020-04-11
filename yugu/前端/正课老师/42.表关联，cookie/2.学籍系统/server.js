var express =require('express');
var app =express();
// 配置静态文件夹
app.use(express.static('www'));
app.set('view engine','ejs');
var bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
// 构建数据库
var Grade =require('./bin/DAO/GradeDAO.js');
var Student =require('./bin/DAO/StudentDAO.js');
// 班级管理接口
app.get('/grade',function(req,res){
    // 查询
    Grade.find().exec(function(err,data){
        res.render('grade.ejs',{data});
    });
});
// 添加学生
app.post("/api/grade/add",function(req,res){
    // 准备对象
    new Grade({
        name:req.body.name,
        major:req.body.major,
        room:req.body.room,
        teacher:req.body.teacher,
    }).save(function(err,data){
        if (!err) {
        //    /回调
        res.redirect('/grade'); 
        }
    });
});
// 学生管理
app.get('/student/add',function(req,res){
    // 查找到现有班级
    Grade.find().exec(function(err,data){
        res.render('student.ejs',{data});
    });
})
// 添加学生
app.post("/api/student/add",function(req,res){
    new Student(req.body).save(function(err){
        if (!err) {
            res.redirect('/student-list'); 
        }
    });
});
// 学生列表
app.get("/student-list",function(req,res){
    // populate查询结果某一列替换成该列id所关联的表对象
   Student.find().populate('grade').exec(function(err,data){
        res.render('student-list.ejs',{data});
   })
});
app.listen(8080,function(){
    console.log('启动...');
});