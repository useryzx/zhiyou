// url模块
// url:统一资源定位符
/*
http协议，域名,参数:get和post请求的数据
*/

// url模块 也分为绝对路径和相对路径
// url的绝对路径以协议开头http://www.baidu.com
// url的相对路径不以协议开头，可以以域名或者ip开头
var url =require("url"); 
// http://www.nodejs.com/some/url/?接口出现 with表示要接收键值
var urlStr ="http://www.nodejs.com/some/url/?with=query&param=that#about";
// url模块可以把一个url路径转换成一个url对象
var userObj =url.parse(urlStr);
console.log(userObj);
