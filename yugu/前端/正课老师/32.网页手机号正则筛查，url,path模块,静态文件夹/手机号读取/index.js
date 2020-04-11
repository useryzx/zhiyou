// 导入文件模块
var fs =require("fs");
fs.readFile("./phone.htm",function(err,data){
    if (err) {
        console.log("出错了:"+err); 
    } else {
        // 读出来对应的内容
        var htmlStr =data.toString();
        // var str ="str15538127788"
        // 必须严格按照这一种格式才行
        // var phoneReg =/1[3578]\d{9}/g;
        // 装手机号的临时数组
        var tempArr;
        // exec =[] 
        // while(tempArr= phoneReg.exec(htmlStr))
        // {
        //     console.log("数据:"+tempArr);
            
        // }
    //   拿到不连续的手机号  151  正则条件中出现/需要用\修饰/
     var reg2 =/<span>(1[3578]\d)<\/span><span class="number-match">(\d{4})<\/span><span>(\d{4})<\/span>/g;
    //  console.log(reg2);
    //  准备一个将来要写入到本地的数据集合
    var total =[];
     while(tempArr = reg2.exec(htmlStr))
     {
         total.push(tempArr[1]+tempArr[2]+tempArr[3]);
        //  写入本地
        console.log(total.length);
        // 拼接上去一个换行
        var resultStr =total.join("\n");
         fs.writeFile("./tel.txt",resultStr,function(err){
             console.log("完毕");
         }); 
     }  

    }
});