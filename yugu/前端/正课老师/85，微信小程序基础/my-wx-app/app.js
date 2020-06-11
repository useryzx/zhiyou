//app.js

// App函数，小程序全局应用对象(app)注册函数，参数是一个对象，对象中进行小程序生命周期控制等设置。
// 调用之后会生成一个全局app对象，可以在任何页面或组件中使用getApp()函数获取。
App({

  onLaunch: function () {
    console.log("小程序已启动");

  },

  globalData: {
    userInfo: null
  }

})