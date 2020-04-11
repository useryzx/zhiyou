var express = require('express');
var router = express.Router();
const Student = require('../bin/DAO/stuDAO')
/* GET home page. */
router.get('/index', function (req, res) {
  // 访问首页接口，查询到所有的学生数据
  // 分页标记
  console.log(req.query);
  console.log('访问index')
  let page = req.query.page ? req.query.page * 1 : 1;
  let pages = [page];
  let left = page;
  let right = page;
  // 每页条数
  let num = 5;
  // 模糊查询
  let condition = {};
  // 姓名
  if (req.query.name) {
    condition.name = RegExp(req.query.name);
  }
  // 年龄
  if (req.query.age) {
    condition.age = RegExp(req.query.age);
  }
  // 性别
  if (req.query.sex) {
    condition.sex = RegExp(req.query.sex);
  }
  // 手机
  if (req.query.tel) {
    condition.tel = RegExp(req.query.tel);
  }
  console.log('------------------------------------')
  Student.countDocuments().exec(function (err, count) {
    console.log(count+'条总数据');
    if (!err) {
      // 定义总页码
      let pageTotal = Math.ceil(count / num);
      while (left > 1 || right < pageTotal && pages.length < pageTotal) {
        if (left > 1) {
          pages.unshift(--left);
        }
        if (right < pageTotal) {
          pages.push(++right)
        }
      }

      Student.find(condition).skip((page - 1 )* num).limit(num).then(data => {
        console.log('条件查询正常');
        res.json({
          err: 0,
          msg: '查询成功',
          data,
          pageTotal,
          pages,
          condition:req.query
        })
      }).catch(err => {
        console.log(err);
      })
    }
    else{
      console.log(err);
    }

  })
});
// 添加新的学生接口
router.post('/api/stuAdd', function (req, res) {
  console.log(req.body);
  console.log('添加学生接口');
  Student.findOne(req.body).then(data => {
    if (data) {
      res.json({
        err: 1,
        msg: '学生已存在'
      })
    }
    else {
      new Student(req.body).save().then(() => {
        res.json({
          err: 0,
          msg: '添加成功'
        })
      }).catch(err => {
        console.log(err);
        res.json({
          err: 2,
          msg: '学生存储出错'
        })
      })
    }
  })
})
// 删除学生接口
router.get('/api/delete/:deleteInput', function (req, res) {
  Student.deleteOne({ _id: req.params.deleteInput }).then(() => {
    res.json({
      err: 0,
      msg: '删除成功'
    })
  })
})
// 编辑接口
router.post('/api/edit', function (req, res) {
  console.log(req.body);
  Student.updateOne({ _id: req.body._id }, { $set: req.body })
    .then(() => {
      res.json({
        err: 0,
        msg: '修改成功'
      })
    }).catch(err => {
      console.log(err);
      res.json({
        err: 1,
        msg: '修改失败'
      })
    })
})
module.exports = router;
