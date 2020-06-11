// components/play-btn/aply-btn.js

import globalData from "../../globalData.js";

Component({
    properties: {

    },

    
    data: {
        currentSong:null,
        isPlaying:true,
    },

    
    methods: {
        btnTapped(){
            wx.navigateTo({
                url: '/pages/play/play',
            });
        },
        refreshData(){
            // console.log(this);
            this.setData({
                currentSong:globalData.currentSong,
                isPlaying:globalData.isPlaying,
            });
            
        },
    },

    attached(){
        this.refreshData = this.refreshData.bind(this);
        globalData.onDataUpdate(this.refreshData,[
            "currentSong",
            "isPlaying"
        ]);
        this.refreshData();
    },

    detached(){
        globalData.offDataUpdate(this.refreshData);
    }
})
