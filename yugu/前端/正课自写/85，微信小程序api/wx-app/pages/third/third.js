// pages/third/third.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reflashData();
  },
  reflashData(){
    // 微信小程序中请求的url是绝对url，必须是小程序允许的url
    // wx.request请求不支持cookie，不会自动存储和发送cookie
    wx.request({
      url: 'http://192.168.123.161:8000/data/data.json',
      success:(res)=>{
        console.log(res.data.data);
        this.setData({
          list:res.data.data
        })
      },
      fail:err=>{
        console.log(err);
      },
      complete:()=>{
        wx.showToast({
          title: '刷新完成',
        });
        wx.stopPullDownRefresh();
      }
    })
  },
  loadMore(){
    // 微信小程序中请求的url是绝对url，必须是小程序允许的url
    // wx.request请求不支持cookie，不会自动存储和发送cookie
    wx.request({
      url: 'http://192.168.123.161:8000/data/data.json',
      success:(res)=>{
        console.log(res.data.data);
        this.setData({
          list:[...this.data.list,...res.data.data]
        })
      },
      fail:err=>{
        console.log(err);
      },
      complete:()=>{
        wx.showToast({
          title: '加载更多完成',
        })
      }
    })
  },
  // 下拉刷新事件，当页面下拉刷新时调用
  onPullDownRefresh(){
    this.reflashData();
  },
  // 上拉加载更多
  onReachBottom(){
    this.loadMore();
  }
})