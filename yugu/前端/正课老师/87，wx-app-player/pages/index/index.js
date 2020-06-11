//index.js
//获取应用实例
// const app = getApp();

import http from "../../utils/http.js";
import api from "../../api.js";
import globalData from "../../globalData.js";

Page({
    data: {
        isLogin:false,
        userInfo:{},
        myPlayList:[],
        favPlayList:[]
    },

    onReady() {
        globalData.onDataUpdate(this.refreshData,["isLogin","userInfo"]);
        this.refreshData();

        if(this.data.isLogin){
            this.fetchData();
        }
        
    },

    onUnload: function () {
        globalData.offDataUpdate(this.refreshData);
        
    },

    refreshData(){
        // console.log(globalData.currentSong);
        let flag = !this.data.isLogin&&globalData.isLogin;
        
        this.setData({
            isLogin:globalData.isLogin,
            userInfo:globalData.userInfo
        });

        if(flag){
            this.fetchData();
        }
    },

    fetchData(){
        http(api.UserPlayList,{
            data:{uid:this.data.userInfo.userId}
        })
        .then(res=>{
            console.log(res);
            let a1 = [],a2 = [];
            res.data.playlist.forEach(el=>{
                if(el.creator.userId==this.data.userInfo.userId){
                    a1.push(el);
                }else{
                    a2.push(el);
                }
            });
            this.setData({
                myPlayList:a1,
                favPlayList:a2
            });
        })
        
    }
})
