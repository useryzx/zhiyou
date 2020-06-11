// pages/second/second.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aniData:null,
  },

  showToast(){
    wx.showToast({
      title: '加载完毕',
    })
  },
  sheetTapped(){
    wx.showActionSheet({
      itemList:['拍照','分享'],
      success(res){
        console.log(res);
      }
    })
  },
  starAnimation(){
    let ani = wx.createAnimation();
    ani.rotate(360).translate(300,0).step();
    this.setData({
      aniData:ani.export()
    })
  }
})