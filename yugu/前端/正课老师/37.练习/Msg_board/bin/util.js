// 这是专门用来设置时间的模块化文件
function getTimeString(){
    var now =new Date();
    var month =now.getMonth()+1;
    var date =now.getDate();
    var hours =now.getHours();
    hours =hours<10?"0"+hours:hours;
    var minute =now.getMinutes();
    minute =minute<10?"0"+minute:minute;
    return month+"月"+date+"日"+hours+":"+minute;
}

// 模块化 多个函数的时候可以模块出来多个功能
module.exports ={getTimeString}