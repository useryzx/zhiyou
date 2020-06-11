//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad(){
    console.log('发现加载完毕');
  },
  onUnload(){
    console.log('没了？');
    
  }
})
