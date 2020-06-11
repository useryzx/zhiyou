// pages/recommend/recommend.js
import http from "../../utils/http.js";
import api from "../../api.js";
import playCTRL from "../../playerCTRL.js";
Page({
    data: {
        sheetList:[],
        songsList:[]
    },
    
    onReady: function () {
        this.fetchData();
    },

    fetchData(){
        let p1 = http(api.recommendSheet,{
            data:{
                limit:10
            }
        });
        let p2 = http(api.recommendSongs);

        Promise.all([p1,p2])
        .then(ress=>{
            this.setData({
                sheetList:ress[0].data.result,
                songsList:ress[1].data.recommend
            });

            wx.stopPullDownRefresh();
        });

        
    },

    onShow: function () {

    },

    songsItemTapped(e){
        // console.log(e.currentTarget);
        let s = e.currentTarget.dataset.song;
        console.log(s);
        playCTRL.playSingleSong(s.id);
    },

    onPullDownRefresh(){
        this.fetchData();
    }
})