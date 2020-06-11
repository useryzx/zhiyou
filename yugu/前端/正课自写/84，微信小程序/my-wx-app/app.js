//app.js

//App函数，小程序全局应用对象（APP）函数，参数是一个对象，对象中进行小程序生命周期控制等设置
App({
  onLaunch: function () {
  console.log('小程序已启动');
  },
  globalData: {
    userInfo: null
  }
})