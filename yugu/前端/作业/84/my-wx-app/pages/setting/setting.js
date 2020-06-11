// pages/setting/setting.js
Page({

    data: {
        firendList: {},
    },

    // created
    onLoad() {
        console.log("设置页面加载完毕");
    },

    // mounted
    onReady() {
        console.log(this);
        let _this = this;
        // 准备好后发送请求拿到好友数据进行渲染
            wx.request({
                // anywhere开启访问
            url: `http://192.168.123.161:8000/data/friendList.json`,
            success(res){
                // console.log(res.data[0].friends);
                // 在线在前，字体aqua，vip背景渐变
                let arr = [];
                let f = res.data[0].friends;
                // 按照vip排序
                f.forEach(e => {
                    if(e.vip){
                        arr.push(e)
                    }
                });
                f.forEach(e => {
                    if(!e.vip){
                        arr.push(e)
                    }
                });
                let m = [];
                arr.forEach(e => {
                    if(e.online){
                        m.push(e)
                    }
                });
                arr.forEach(e => {
                    if(!e.online){
                        m.push(e)
                    }
                });
                // console.log(m);
                
                _this.setData({
                    firendList:m
                })
            }
        })
    },
    // 点击进入聊天
    itemTapped(e){
        let data = JSON.stringify(e.currentTarget.dataset.name);
        console.log(data);
        
        console.log(e.currentTarget.dataset.name);
        wx.navigateTo({
          url: `/pages/friend/friend?data=${data}`,
        })
    },
    // activated
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