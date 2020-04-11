var express =require('express');
var cookie =require('cookie');
// md5是一种加密算法 能够把任意一段数据转换为32位的16进制数字
var md5 =require('md5');
var app =express();
app.use(express.static('www'));
var User =require('./bin/DAO/UserDAO.js');
// 注册接口
app.get("/api/register",function(req,res){
    // res.send(req.query);
    // 加密 md5是一种不可逆的加密
    req.query.psw =md5(req.query.psw);
    // 排重
    User.findOne({userName:req.query.userName}).
    exec(function(err,data){
         if (data) {
             res.send('该账号已注册');
         }
         else
         {
             new User(req.query).save(function(){
                 res.redirect('/Login.html');
             });
         }
    });
});
// 用来存数据的
var userInfo ={};
app.get("/api/login",function(req,res){
    // 先查找账号有没有注册过
    req.query.psw =md5(req.query.psw);
    User.findOne({userName:req.query.userName
        ,psw:req.query.psw}).
    exec(function(err,data){
         if (data) {
            //  存cookie 为第三方接口提供数据
            // 当一个用户登录成功，生成一个随机的字符串
            // 然后以这个字符串为属性名，
              var rndStr =makeRndStr();
            //   对象上面的键值对
              userInfo[rndStr] =data;
              res.cookie('userInfo',rndStr,{
                  maxAge:604800
              });
            //   会把所有的cookie都拿出来,但是我们其实需要
            // 的只是用户名
             res.send('登录成功,可以使用第三方接口');
            
         }
         else
         {
             res.send('用户名或密码错误');
         }
    });

});
// 生成随机字符串的方法，20位长度>>>目的是为了每个账号
// 有一个独一无二的cookie的属性名
function makeRndStr(){
    var source ='dhasdhjksfhdsjkfhd255656dsfdsfdsfwef15e1f56wef5ds16f56sd';
    var  str ='';
    for(var i=0;i<20;i++){
        var ind =Math.floor(Math.random()*source.length);
        var ch =source[ind];
        str+=ch;
    }
    return str;
}
// 生成登陆之后才能调用的接口
app.get('/api/afterLogin',function(req,res){
    // 拿cookie
    // 会把所有的cookie转成对象
    var cookieObj =cookie.parse(req.headers.cookie);
    // 根据cookie对象上面的键 取出来当时存的数据
    var user =userInfo[cookieObj.userInfo];
    if (user) {
        res.send('欢迎'+user.userName+'来到用户中心');
    } else {
        res.send('请先登录');
    }
});
app.get('/api/loginOut',function(req,res){
    var cookieObj =cookie.parse(req.headers.cookie);
    // 根据cookie对象上面的键 取出来当时存的数据
    var user =userInfo[cookieObj.userInfo];
    if (user) {
        // 删除
        delete userInfo[cookieObj.userInfo];
        res.cookie('userInfo','');
        res.send('退出成功');
    }
    else
    {
        res.send('请先登录');
    }
});
app.listen(3200,function(){
    console.log('running...');
    
})
