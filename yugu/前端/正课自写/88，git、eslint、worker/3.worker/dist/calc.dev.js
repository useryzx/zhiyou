"use strict";

// 当js运行在worker中时需要监听message事件
// addEventListener('message',function(e){
//   console.log(123);
//   postMessage(e.data);
// })
onmessage = function onmessage(e) {
  console.log(123); // 当js运行在worker中时，全局域中会有一个postMessage函数，用于向主线程发送消息

  postMessage(e.data);
};

function calc() {
  var sum = 0;

  for (var i = 0; i < 100000; i++) {
    for (var j = 0; j < 10000; j++) {
      sum += i * j;
    }
  }

  return sum;
}