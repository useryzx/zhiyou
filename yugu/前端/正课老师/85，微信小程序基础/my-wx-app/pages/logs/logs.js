//logs.js
const util = require('../../utils/util.js');

const app = getApp();

Page({
    data: {
        friend:{
            name:"王文",
        }
    },
    onLoad(){
        console.log("日志页面加载完毕");
    },

    gotoChat(){
        
        app.globalData.friend = this.data.friend;

        wx.navigateTo({
          url: '/pages/chat/chat',
        });
    },
})