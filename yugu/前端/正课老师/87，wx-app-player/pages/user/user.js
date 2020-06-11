// pages/user/user.js

import http from "../../utils/http.js";
import api from "../../api.js"

const app = getApp();

Page({

    data: {
        isLogin:app.globalData.isLogin,
        userInfo:app.globalData.userInfo
    },

    onReady: function () {
        this.refreshData();
        app.globalData.onDataUpdate(this.refreshData,[
            "isLogin",
            "userInfo"
        ]);

        
    },
    onShow: function () {
        
    },
    onUnload(){
        app.globalData.offDataUpdate(this.refreshData);
    },

    refreshData(){
        this.setData({
            isLogin:app.globalData.isLogin,
            userInfo:app.globalData.userInfo
        });
    },

    loginSubmit(e){
        console.log(e.detail);
        if(!e.detail.value.account||!e.detail.value.psw){
            wx.showToast({
                title: '账号密码不能为空',
                icon:"none"
            });
            return;
        }

        let url = api[e.detail.value.loginType];
        http(url,{
            method:"POST",
            data:{
                password:e.detail.value.psw,
                phone:e.detail.value.account,
                email:e.detail.value.account
            }
        })
        .then(res=>{
            console.log(res);
            wx.setStorageSync('cookie', res.header["Set-Cookie"]);
            if(res.statusCode==200){
                app.globalData.setData({
                    isLogin:true,
                    userInfo:res.data.profile
                });
            }
            
        });

        

    }
    
})