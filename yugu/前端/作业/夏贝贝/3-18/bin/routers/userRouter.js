var express = require('express')
var router = express.Router();
var User = require('../DAO/userDAO')
// 点击注册
router.get('/register',function(req,res){
    res.render('register',{
        title:'注册'
    })
})
// 注册接口
router.post('/register', function (req, res) {
    req.body.avatar = '/avatars/timg.jpg';
    User.findOne({ username: req.body.username }).exec(function (err, data) {
        if (data) {
            res.send('用户名已注册')
        }
        else {
            console.log(req.body);
            new User(req.body).save(function () {
                res.render('login',{
                    title:'登陆',
                    a:req.body
                })
            })
        }
    })
})
// 登陆接口
router.get('/login',function(req,res){
    res.render('login',{
        title:'登陆',
        a:{
            username:'',
            psw:''
        }
    })
})

// 登陆账号
router.post('/login', function (req, res) {
    req.body.avatar = '/avatars/timg.jpg';
    User.findOne({ username: req.body.username, psw: req.body.psw }).exec(function (err, data) {
        if (data) {
            req.session.user = data;
            res.redirect('/')
        }
        else {
            res.send('用户名或密码错误')
        }
    })
})
// 账号退出接口
router.get('/exit',function(req,res){
    delete req.session.user;
    res.redirect('/')
})
// 上传头像
var multer = require('multer')
// var upload = multer({
//     dest: './www/avatars'
// })
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./www/avatars')
    },
    filename:function(reqq,file,cb){
        cb(null,file.originalname)
    }
})
var upload = multer({
    storage:storage
})
var fs = require('fs')
router.post("/upload-avatar", upload.single('avatar'), function (req, res) {
    console.log(req.file);
    var fileName = req.file.filename;
    // var fileType = req.file.originalname.split('.')[1]
    // fs.rename('./www/avatars/'+fileName,'./www/avatars/'+fileName+"."+fileType,function(err){
    //     if(!err){
    //         console.log('重命名成功');
    //     }
    // })
    // var fileUrl = 'avatars/' + fileName +'.'+ fileType;
    var fileUrl = 'avatars/' + fileName;
    console.log(fileUrl);
    User.findOne({ _id: req.session.user._id }).exec(function (err, data) {
        data.avatar = fileUrl;
        data.save(function () {
            req.session.user.avatar = fileUrl;
            res.redirect('/')
        })
    })
})
module.exports = router;
