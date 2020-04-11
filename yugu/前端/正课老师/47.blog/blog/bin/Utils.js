// 工具类
// 该方法用途是传递进来一个时间戳返回一个针对于该时间戳的描述
function getTimeStr(timeStamp)
{
    //   拿到当前时间
    var now =new Date();
    // 用当前时间-发博客的时间，得到差值
    var difference =now.getTime()-timeStamp*1;
    // 由毫秒换算成秒才对
    difference/=1000;
    if (difference<=120) {
        return '刚刚';
    }
    if (difference<=3600) {
        return Math.floor(difference/60)+'分钟之前';
    }
    if (difference<=43200) {
        return Math.floor(difference/3600)+'小时之前';
    }
    // 不属于上面这三种情况表明帖子间隔比较长 返回年月日
    var commitTime =new Date(timeStamp);
    var month =commitTime.getMonth()+1;
    var date =commitTime.getDate();
    var hour =commitTime.getHours();
    var minute =commitTime.getMinutes();
    hour =hour<10?'0'+hour:hour;
    minute =minute<10?'0'+minute:minute;
    return month+'月'+date+'日'+hour+':'+minute;
}
module.exports ={getTimeStr}