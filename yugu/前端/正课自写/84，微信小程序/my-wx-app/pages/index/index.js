//index.js
//获取应用实例
const app = getApp()
// Page函数，页面配置函数，配置某个页面的数据，方法，生命周期钩子函数等。
Page({
  // data,页面中的数据对象
  data: {
    txt: 'hello world',
    num: 99,
    show:true,
    list:[
      {name:'小米手机',price:999,onSell:true},
      {name:'iPad',price:4999,onSell:true},
      {name:'iPhone11',price:3999,onSell:false},
    ]
  },
  //事件处理函数
  // 绑定事件的函数会接收到事件对象参数
  addBtnTapped(e){
    console.log('+点击了');
    // console.log(e);
    // 在页面的方法中this是页面对象
    // console.log(this);
    // 页面修改数据，必须使用setData方法，否则页面上的数据不会刷新，和react类似，但和react不同的是，setData是同步的
    this.setData({
      num:this.data.num+1
    })
  },
  minusBtnTapped(){
    this.setData({
      num:this.data.num-1
    })
  },
  showChange(e){
    // console.log(e);
    this.setData({
      show:e.detail.value
    })
  },
  itemTapped(e){
    // console.log(e);
    let g= e.currentTarget.dataset.good;
    // console.log(g);
  },
  onLoad(){
    console.log('首页加载完毕');
    
  },
  gotoFind(){
    wx.switchTab({
      url: 'pages/logs/logs',
    });
  }
})