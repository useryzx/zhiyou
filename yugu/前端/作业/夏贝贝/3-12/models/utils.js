function getTimeStr(timeObj){
    var now =new Date();
    // 
    var month =now.getMonth(timeObj?timeObj:"")+1;
    var date =now.getDate(timeObj?timeObj:"");
    var hours =now.getHours(timeObj?timeObj:"");
    var minutes =now.getMinutes(timeObj?timeObj:"");
    hours =hours<10?"0"+hours:hours;
    minutes =minutes<10?"0"+minutes:minutes;
    return month+'月'+date+'日'+hours+':'+minutes;
}
module.exports =getTimeStr