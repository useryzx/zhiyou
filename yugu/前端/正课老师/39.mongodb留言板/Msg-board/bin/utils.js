function getTimeStr() {
    var now=new Date();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hours=now.getHours();
    var minutes=now.getMinutes();
    hours=hours<10?"0"+hours:hours;
    minutes=minutes<10?"0"+minutes:minutes;
    return month+"月"+date+"日"+hours+":"+minutes;
}
// ip需要从req里面获取
function getIpFormStr(str) {
    var ipReg=/(\d{1,3}\.){3}\d{1,3}/;
    var ip=ipReg.exec(str);
    return ip[0];
}
module.exports={getTimeStr,getIpFormStr}