//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imageArray:[],
        hasUserScope:false,
        userInfo:null
    },

    onLoad(){
        wx.getSetting({
            complete: (res) => {
                // console.log(res);
                if(res.authSetting["scope.userInfo"]){
                    this.setData({hasUserScope:true});
                    wx.getUserInfo({
                        complete: (res) => {
                            console.log(res);
                            this.setData({
                                userInfo:res.userInfo
                            });
                        },
                    })
                }else{
                    this.setData({hasUserScope:false});
                }
            },
        })
    },

    startRecord(){
        wx.authorize({
            scope: 'scope.record',
            success(){
                console.log("开始录音");
            },
            fail(err){
                console.log(err);
                wx.showModal({
                    title:"必须开启录音授权才能进行录音",
                    success:res=>{
                        if(res.confirm){
                            wx.openSetting({
                                complete: (res) => {
                                    console.log(res);
                                    if(res.authSetting["scope.record"]){
                                        console.log("开始录音");
                                    }
                                },
                            })
                        }
                    }
                })
            }
        });
    },

    selectImage(){
        wx.chooseImage({
            complete: (res) => {
                console.log(res);
                this.setData({
                    imageArray:res.tempFilePaths
                })
            },
            fail:err=>{
                console.log(err);
            }
        });
    },

    onShareAppMessage(res){
        console.log(res)
    },


    getUserInfo(res){
        console.log(res);
        this.setData({
            userInfo:res.detail.userInfo
        })
    },

    scanCode(){
        wx.scanCode({
            complete: (res) => {
                console.log(res);
            },
        });
    }

})
