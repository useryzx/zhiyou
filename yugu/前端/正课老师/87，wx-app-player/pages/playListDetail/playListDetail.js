// pages/playListDetail/playListDetail.js
import http from "../../utils/http.js";
import api from "../../api.js";
import globalData from "../../globalData.js";
import playCTRL from "../../playerCTRL.js";

Page({

    data: {
        playList:null,
        allSongs:[],
        loadedSongs:[],
        isCurrentPlaylist:false,

        currentPlaylist:null,
        currentPlaylistIndex:null,
        isPlaying:null
    },
    onLoad(options){
        this.queryPlayListDetail(options.id);

        globalData.onDataUpdate(this.refreshData,[
            "currentPlaylist",
            "currentPlaylistIndex",
            "isPlaying"
        ]);
        this.refreshData();
    },
    onUnload: function () {
        globalData.offDataUpdate(this.refreshData);
    },

    refreshData(){
        this.setData({
            currentPlaylist:globalData.currentPlaylist,
            currentPlaylistIndex:globalData.currentPlaylistIndex,
            isPlaying:globalData.isPlaying
        });
        if(this.data.currentPlaylist==this.data.allSongs){
            this.setData({
                isCurrentPlaylist:true
            })
        }
        
    },

    queryPlayListDetail(id){
        http(api.PlayListDetail,{
            data:{id}
        })
        .then(res=>{
            console.log(res);
            this.setData({
                playList:res.data.playlist,
                allSongs:res.data.playlist.trackIds,
                loadedSongs:res.data.playlist.tracks
            });
            // playCTRL.playSongOfPlaylist(this.data.loadedSongs);
            
        })
    },

    ctrlBtnTapped(e){
        if(
            e.currentTarget.dataset.index==this.data.currentPlaylistIndex&&
            this.data.currentPlaylist==this.data.allSongs
        ){
            playCTRL.play();
        }else{
            let index = e.currentTarget.dataset.index;
            playCTRL.playSongOfPlaylist(this.data.allSongs,index);
        }
        
    },

    pauseBtnTapped(){
        playCTRL.pause();
    },

    
    onReachBottom: function () {
        this.loadMore();
    },
    loadMore(){
        if(this.data.allSongs.length>this.data.loadedSongs.length){
            let length = this.data.allSongs.length-this.data.loadedSongs.length;
            if(length>20){
                length = 20;
            }
            console.log(this.data.loadedSongs.length);
            let part = this.data.allSongs.slice(this.data.loadedSongs.length,this.data.loadedSongs.length+length);
            let ids = part.map(el=>el.id).join(",");
            
            http(api.songDetail,{
                data:{ids}
            })
            .then(res=>{
                console.log(res);
                this.setData({
                    loadedSongs:[...this.data.loadedSongs,...res.data.songs]
                });
            })
        }
    }

})