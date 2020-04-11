/*该js文件名称是自定义的,作为服务器端的js主程序入口存在,
默认的网站的首页名称是index.html，默认的网站的首页内容指向
的是index.html所在的文档
默认情况下,nodejs只能解析get发送过来的数据,如果要处理post请求
需要借助第三方的body-parser
对对象类型的数据进行存储操作的时候没有办法直接写入，需要对数据
进行序列化与反序列化
序列化:对象转成可以写入进去的字符串 JSON.stringify()
反序列化:字符串转换成对象 JSON.parser()*/ 
var express =require("express");
var fs =require("fs");
var app =express();
// post请求
var bodyParser =require("body-parser");
// 为app配置服务
app.use(express.static("www"));
app.use(bodyParser.urlencoded({extended:false}));
app.listen(3000,function(err){
    console.log("running...");
    
});
//写接口名称的时候同一个大的功能点的接口尽量放到一个接口文件夹下
// 接口中的user可以定义为功能文件夹
app.post("/user/zhuce",function(req,res){
    // 保存当前客户端提交过来的数据对象
    // 如果是get请求则是req.query
    var obj =req.body;
    // 将用户名作为文件夹名称，文件夹中存储的是属于该用户的信息
    var fileName =obj.username +'.txt';
    // 多个文件放到一个文件夹中,文件夹需要创建(不存在的时候才创建)
    // 检测当前文件是否存在返回一个布尔值
    var isCun =fs.existsSync('users');
  
    if (!isCun) {
        // 创建文件夹
        fs.mkdir("users",function(err){
              // 专门用来处理文件夹创建的时候会出现的错误
            if (err) {
                // 结束当前的请求并且告知请求者出错了
                //响应对象.json方法表示返回出来json格式的数据
                return res.json({
                    error:1,
                    message:"系统错误,用户文件夹创建失败"
                });
            } 
        });
    }
    // 判断用户是否注册过(实际上就是判断文件是否存在)
    var isFile =fs.existsSync("users/"+fileName);
    if (isFile) {
        // 用户存在
        return res.json({
            error:1,
            msg:"用户已注册，请重新输入"
        });
    }
    // 到这里就表示用户真实存在了
    // 在路径下进一步追加数据
    fs.appendFile("users/"+fileName,JSON.stringify(obj),function(err){
        if (err) {
            return res.json({
                error:1,
                msg:"注册失败"
            });
        }
        // 如果不反馈数据，可以直接用res.sendLogin
        // 这个界面的data
        res.json({
            error:0,
            msg:"注册成功，请去登录..."
        });
    });
});

app.post("/user/login",function(req,res){
    // 需要先拿到此次请求的对象
    var obj =req.body;
    // 根据请求的用户名拼接出来对应的路径
    var filePath ='users/'+obj.username+'.txt';
    var password =obj.psw;
    // 判断用户之前注册过没
    var isCun =fs.existsSync(filePath);
    if (!isCun) {
        return res.json({
            error:1,
            msg:"用户不存在，请去注册"
        });
    }
    // 表明账号存在，需要匹配密码
    fs.readFile(filePath,function(err,data){
        if(err)
        {
            return res.json({
                error:1,
                msg:"系统错误"
            }); 
        }
        // 将数据转成js对象
        data =JSON.parse(data);
        // 判断密码
        if (password !==data.psw) {
            return res.json({
                error:1,
                msg:"密码错误"
            }); 
        }
        res.json({
            error:0,
            msg:"登录成功"
        });
    });
});