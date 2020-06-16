


// 当js运行在Worker中时，需要注册监听message事件，当worker收到消息，message时间就会触发
addEventListener("message",function(e){
    // console.log(e.data);

    // 当js运行在Worker中时,全局域中有一个postMessage函数，用于向主线程发送消息
    postMessage(calc());
});


function calc(){
    let sum = 0;
    for(let i = 0;i<100000;i++){
        for(let j = 0;j<10000;j++){
            sum += i*j;
        }
    }
    return sum;
}