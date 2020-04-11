var express = require('express');
var router = express.Router();

const Student =require("../bin/DAO/student");
console.log(Student);

/* 添加学生 */
router.post("/stu/add",function (req,res) { 
    console.log(req.body);
    
      new Student(req.body)
      .save()
      .then(data=>{
          res.json({err:0,msg:"添加成功"});
      })
      .catch(err=>{
        res.json({err:10,msg:"服务器错误"});
    })
 });

//  每页显示五条
const countPage =5;
//  学生列表接口
router.get("/stu/list",function (req,res) {
    // 查询
    let condition ={};
    if (req.query.name) {
      // 转成正则的字符串数据库查询时不容易出错
      condition.name =new RegExp(req.query.name);
    }
    if (req.query.age) {
      // 转成正则的字符串数据库查询时不容易出错
      condition.age =req.query.age;
    }
    if (req.query.sex) {
      // 转成正则的字符串数据库查询时不容易出错
      condition.sex =req.query.sex;
    }
    if (req.query.tel) {
      // 转成正则的字符串数据库查询时不容易出错
      condition.tel =new RegExp(req.query.tel);
    }
    // 只返回了查询的五条,但是没有把所有的数据都查出来
    let p1 =Student.find(condition).countDocuments();
    let p2 =Student.find(condition).
    skip(countPage*req.query.page).limit(countPage);
    // p3就是整合之后的数据有带条件的有全部的
    let p3 =Promise.all([p1,p2]);
    p3.then(result=>{
      // result里面是两个对象  第一个是文档的长度 
      // 第二个是对象
      // 准备一个数据对象
      let data ={
          err:0,
          // 总页数
          totalPage:Math.ceil(result[0]/countPage),
          data:result[1]
      }
      res.json(data);
    })
    .catch(err=>{
      res.json({err:10,msg:"服务端错误"});
    })
    
});
// 删除
router.get("/stu/delete",function (req,res) { 
  Student.deleteOne({_id:req.query._id})
  .then(()=>{
    res.json({err:0,msg:"ok"});
  })
 })

//  编辑接口
module.exports = router;
