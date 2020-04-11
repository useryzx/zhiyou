var express = require("express");
var fs = require("fs");
// 准备一套json数据
var bookData = {
    // 数组
    books: [
        //   放对象
        {
            name: "三体",
            price: 120,
            author: "刘慈欣",
            sellout: true
        }, {
            name: "梦里花落知多少",
            price: 88,
            author: "郭敬明",
            sellout: false
        },
        {
            name: "红楼梦",
            price: 188,
            author: "曹雪芹",
            sellout: "true"
        }
    ]
}
// 获取服务器对象
var app = express();
// 获取模板对象
var ejs = require("ejs");
// view代表ejs模板要放到views文件夹下
// engine代表引擎  ejs模板名称
app.set("view engine",ejs);



// 请打开一个接口,该接口返回一个html界面,这个界面里面的数据是
// 上面bookData里面的内容(返回的数据以table表的形式出现)
app.get("/", function (req, res) {
    // 把json数据转成str进行返回
    var htmlStr = "";
    htmlStr += "<table>";
    for (var i = 0; i < bookData.books.length; i++) {
        htmlStr += "<tr>";
        // 拿出书本的对象
        var b = bookData.books[i];
        htmlStr += "<td>" + b.name + "</td>";
        htmlStr += "<td>" + b.price + "</td>";
        htmlStr += "<td>" + b.author + "</td>";
        // 根据书本的余量来规定该本书有没有货
        htmlStr += "<td>" + (b.sellout ? "true" : "false") + "</td>";
        htmlStr += "</tr>"
    }
    htmlStr += "</table>";
    res.send(htmlStr);
});

// 剧本:
app.get("/books",function(req,res){
    // 把数据发送给模板
    // 绝对路径的读取
    fs.readFile("./books.ejs",function(err,data){
        if (err) {
            console.log("err:"+err);
        }else{
            // ejs模板的数据
            var tplDataStr =data.toString();
            // render方法是将一个模板和一套数据结合渲染成
            //一个html页面并返回页面对象
            var html =ejs.render(tplDataStr,bookData);
            res.send(html);
        }
    });
});
app.get("/books2",function(req,res){
    // 开发中真正用到ejs的时候按照如下步骤去使用:
    // 1.先为app配置ejs服务
    // 2.构建ejs模板文件并保证文件没有错误(语法有错一般都会提示)
    // 使用res.render方法
    // ejs的render方法为什么res可以使用?
    // 因为在上面app.set设置了ejs服务作为服务器的功能之一
    //response属于服务器的响应对象，所以直接可以使用该服务
    // 一定要把ejs放到views文件夹内,确保传入模板的数据格式为
    // json arr>{arr}  对象>>arr>>{arr} 
    res.render("books.ejs",bookData);
});
app.listen(3000,function(){
    console.log("启动...");
    
});