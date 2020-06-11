// pages/play/play.js

import globalData from "../../globalData.js";
import playCTRL from "../../playerCTRL.js";

Page({
    data: {
        currentSong:null,
        currentSongLyric:null,
        showLyric:false,
        progress:0,
        duration:0,
        currentTime:0,
        isPlaying:true,
        currentLyricIndex:0,
        playMode:null,

        // 是否正在拖拽进度滑杆
        isDraging:false
    },

    onReady: function () {
        globalData.onDataUpdate(this.refreshData,[
            "currentSong",
            "currentSongLyric",
            "progress",
            "duration",
            "currentTime",
            "isPlaying",
            "currentLyricIndex",
            "playMode"
        ]);
        this.refreshData();

    },

    onUnload: function () {
        globalData.offDataUpdate(this.refreshData);
        console.log("play页面释放了");
    },

    refreshData(){
        // console.log(globalData.currentSong);
        this.setData({
            currentSong:globalData.currentSong,
            currentSongLyric:globalData.currentSongLyric,
            isPlaying:globalData.isPlaying,
            duration:globalData.duration,
            currentTime:globalData.currentTime,
            playMode:globalData.playMode
        });
        if(!this.data.isDraging){
            this.setData({
                progress:globalData.progress,
            });
        }
        if(globalData.currentLyricIndex!=this.data.currentLyricIndex){
            this.setData({
                currentLyricIndex:globalData.currentLyricIndex
            });
        }
    },

    toggleShowLyric(){
        this.setData({
            showLyric:!this.data.showLyric
        })
    },

    onProgressChange(e){
        let ct = this.data.duration*e.detail.value;
        playCTRL.seek(ct);
        this.setData({
            isDraging:false
        });
    },

    onProgressChanging(){
        this.setData({
            isDraging:true
        });
    },

    pauseBtnTapped(){
        playCTRL.pause();
    },
    playBtnTapped(){
        playCTRL.play();
    },

    modeBtnTapped(e){
        globalData.setData({
            playMode:e.currentTarget.dataset.mode
        });
        if(e.currentTarget.dataset.mode=="random"){
            playCTRL.resetRandomList();
        }
    },

    prevBtnTapped(){
        playCTRL.onPrev();
    },

    nextBtnTapped(){
        playCTRL.onNext();
    },


})