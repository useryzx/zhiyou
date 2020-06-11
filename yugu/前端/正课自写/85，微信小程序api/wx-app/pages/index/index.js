//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgArr:[]
  },
  //事件处理函数
  selImg(){
    wx.chooseImage({
      complete: (res) => {
        console.log(res);
        this.setData({
          imgArr:res.tempFilePaths
        })
      },
      fail:err=>{
        console.log(err);
      }
    })
  },
  scanCode(){
    wx.scanCode({
      complete: (res) => {
        console.log(res);
        
      },
    })
  }
})
