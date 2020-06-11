// pages/second/second.js
Page({
    data: {
        aniData:null
    },

    onLoad: function (options) {

    },

    toastTapped(){
        wx.showToast({
            title: '加载完毕加载完毕',
            icon:"none"
        });

        console.log(wx.getMenuButtonBoundingClientRect());
    },

    sheetTapped(){
        wx.showActionSheet({
            itemList: ["拍照","从相册选择"],
            success(res){
                console.log(res);
            }
        });

    },

    startAnimation(){
        let ani = wx.createAnimation({});
        ani.rotate(360).step();
        this.setData({
            aniData:ani.export()
        });
        setTimeout(() => {
            console.log(123);
        }, 450);
    }
})