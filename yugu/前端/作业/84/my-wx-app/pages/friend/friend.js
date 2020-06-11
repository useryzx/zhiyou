// pages/friend/friend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friend: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    let f = JSON.parse(this.options.data);
    this.setData({
      friend: Object.assign({}, f)
    })
    wx.setNavigationBarTitle({
      title: f.name,
    });
    let color = f.vip ? '#ffffff' : '#000000';
    let bgc = f.online ? '#00ff00' : '#cccccc';
    console.log(color);
    console.log(bgc);

    wx.setNavigationBarColor({
      frontColor: color,
      backgroundColor: bgc,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})