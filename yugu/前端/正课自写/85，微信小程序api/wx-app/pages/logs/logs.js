//logs.js

Page({
  data: {
    store:99
  },
  storeChange(e){
    this.setData({
      store:e.detail
    })
  }
 
})
