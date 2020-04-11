var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
// 实例化服务器对象
var app = express();
// 设置静态资源文件夹
app.use(express.static('www'));
// 设置post请求数据解析编码
app.use(bodyParser.urlencoded({
    extended: false
}));
// 添加接口
app.post('/student/add', function (req, res) {
    console.log(req.body);
    // 接收
    var stuInfo = req.body;
    // 存数据的路径(把所有的专业都放到students文件夹下)
    var classPath = 'students/' + stuInfo.class;
    var stuPath = classPath + '/' + stuInfo.stuName + '.txt';
    // 判断student文件夹是否存在
    var isCun = fs.existsSync('students');
    if (!isCun) {
        // 如果不存在就创建文件夹
        fs.mkdir('students', function (err) {
            if (err) {
                console.log('stu文件夹创建失败');
            } else {
                // 判断班级文件夹是否存在
                var isClass = fs.existsSync(classPath);
                if (!isClass) {
                    // 如果不存在就创建文件夹
                    fs.mkdir(classPath, function (err) {
                        if (err) {
                            console.log(err);
                        }

                    })
                }
            }

        })
    } else {
        // 判断班级文件夹是否存在
        var isClass = fs.existsSync(classPath);
        if (!isClass) {
            // 如果不存在就创建文件夹
            fs.mkdir(classPath, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }
    }
    console.log("文件夹应该是创建成功了");
    // 添加学生  文件名就是学生名称 students/class/stuName.txt
    var isStu = fs.existsSync(stuPath);
    if (isStu) {
        // 表示学生之前已经添加过了
        return res.json({
            error: 1,
            msg: '该学生的信息已经录入,请重新输入'
        });
    }
    // 学生是之前没有录入过得  appendFile在路径文件下继续追加数据
    setTimeout(function(){
        fs.appendFile(stuPath, JSON.stringify(stuInfo), function (err) {
            if (err) {
                return res.json({
                    error: 1,
                    msg: '系统错误'
                });
            }
            return res.json({
                error: 0,
                msg: '学生信息录入成功'
            });
        });
    },500)

});
// 获取首页信息的接口
app.get('/students/getData', function (req, res) {
    // 找到数据处理并返回
    var isCun = fs.existsSync('students');
    if (!isCun) {
        return res.json({
            error: 1,
            msg: '没有学生信息，请添加学生'
        });
    }
    // 读文件夹数据
    fs.readdir('students', function (err, dirs) {
        if (err) {
            return res.json({
                error: 1,
                msg: '系统错误'
            });
        }
        // 准备标记是否成功的布尔变量
        var isReal =true;
        // 装class下面的对象
        var arr =[];
        dirs.forEach(function(dir,ins){
            // 会把students下面的class文件夹都找出来
            // 先拼接文件夹路径
            var classPath ='students/'+dir;
            // 进一步的读取
            fs.readdir(classPath,function(err,files){
                if (err) {
                    // 读取因为文件较多所以类似于'for循环'需要返回出来
                    return isReal =false;
                }
                // 表示文件真正出现了  file
                files.forEach(function(file,fileIns){
                    // 多个txt文本文件
                    var filePath =classPath+'/'+file;
                    // console.log(filePath);
                    fs.readFile(filePath,function(err,data){
                        if (err) {
                            return isReal =false;
                        }
                        // 把读出来的数据装到数组中
                        arr.push(JSON.parse(data));
                        // fileIns代表每个文件的下标  files代表文件所在的数组
                        if (fileIns ==files.length -1 
                            &&ins ==dirs.length -1) {
                                res.json({
                                    error:0,
                                    msg:'读取学生信息成功',
                                    data:arr
                                })
                        }
                    });
                });
            });
        })
    })

});

// 删除接口
app.get('/student/delete',function(req,res){
   
    var stuPath ='students/'+req.query.class+'/'+
    req.query.stuName+'.txt';
    var isCun =fs.existsSync(stuPath);
    if(!isCun)
    {
        return res.json({
            error:1,
            msg:'文件不存在'
        });
    }
     // 删除文件
     fs.unlink(stuPath,function(err){
        if (err) {
            return res.json({
                error:1,
                msg:'删除错误'
            });
        }
        res.json({
            error:0,
            msg:'删除成功'

        })
    })
});
// 修改的接口

app.listen(3000, function (req, res) {
    console.log('running...');
});