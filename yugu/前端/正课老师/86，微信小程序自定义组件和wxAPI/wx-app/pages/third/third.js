// pages/third/third.js
Page({

    data: {
        list:[]
    },

    onLoad: function (options) {
        this.refreshData();
    },

    refreshData(){
        // 微信小程序中的请求url必须使用绝对url，还必须是小程序设置的合法域名
        // wx.request请求不支持cookie，不会自动存储和发送cookie。
        wx.request({
            url: 'http://127.0.0.1:8000/data.json',
            // method:"POST",
            data:{},
            success:res=>{
                console.log(res);
                this.setData({
                    list:res.data.data
                })
            },
            fail:err=>{
                console.log(err);
            },
            complete:()=>{
                console.log("请求结束");
                wx.stopPullDownRefresh();
            }
        })
    },

    loadMore(){
        wx.request({
            url: 'http://127.0.0.1:8000/data.json',
            // method:"POST",
            data:{},
            success:res=>{
                console.log(res);
                this.setData({
                    list:[...this.data.list,...res.data.data]
                });
            }
        })
    },


    // 下拉刷新事件，当页面出发下拉刷新时调用
    onPullDownRefresh(){
        //console.log(123);
        this.refreshData();
    },

    // 上拉加载更多事件
    onReachBottom(){
        // console.log(123);
        this.loadMore();
    }

    
})