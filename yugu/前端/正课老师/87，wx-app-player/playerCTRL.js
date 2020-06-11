import http from "./utils/http.js";
import api from "./api.js";
import {artistsFilter,parseLyric,shuffle} from "./utils/util.js";
import globalData from "./globalData.js";

import {findLyricIndex} from "./utils/util.js";

const player = wx.getBackgroundAudioManager();

const playerCTRL = {
    playSingleSong(id){
        globalData.setData({
            currentPlaylist:null
        });
        this.playSongById(id);
    },

    // 根据id播放某个歌曲
    playSongById(id){

        let p1 = http(api.songDetail,{
            data:{ids:id}
        });
        let p2 = http(api.songUrl,{
            data:{id:id}
        });
        let p3 = http(api.songLyric,{
            data:{id:id}
        });

        Promise.all([p1,p2,p3])
        .then(ress=>{
            console.log(ress);
            if(!ress[1].data.data[0].url){
                wx.showModal({
                    title:"此歌曲无法播放"
                });
                return;
            }

            globalData.setData({
                currentSong:ress[0].data.songs[0],
                currentSongLyric:parseLyric(ress[2].data.lrc?ress[2].data.lrc.lyric:null),
                currentSongUrl:ress[1].data.data[0].url
            });
            
            player.src = ress[1].data.data[0].url;
            player.title = ress[0].data.songs[0].name;
            player.epname = ress[0].data.songs[0].al.name;
            player.singer = artistsFilter(ress[0].data.songs[0].ar);
            player.coverImgUrl = ress[0].data.songs[0].al.picUrl;

        })
        .catch(err=>{
            throw err;
        });
    },
    // 播放歌单
    playSongOfPlaylist(playList,songIndex=0){
        if(globalData.currentPlaylist!=playList){
            globalData.setData({
                currentPlaylist:playList,
            })
        }
        globalData.setData({
            currentPlaylistIndex:songIndex
        });

        this.playSongById(globalData.currentPlaylist[globalData.currentPlaylistIndex].id);
    },

    // 指定索引播放歌单中的歌曲
    playSongOfCurrentListWithIndex(songIndex){
        globalData.setData({
            currentPlaylistIndex:songIndex
        });

        this.playSongById(globalData.currentPlaylist[globalData.currentPlaylistIndex].id);
    },
    // 指定随机索引播放随机歌单中的歌曲
    playSongOfRandomListWithIndex(songIndex){
        globalData.setData({
            randomPlaylistIndex:songIndex
        });
        let song = globalData.randomPlaylist[globalData.randomPlaylistIndex];
        this.playSongById(song.id);
        let ind = globalData.currentPlaylist.findIndex(el=>{
            return el.id == song.id
        });
        globalData.setData({
            currentPlaylistIndex:ind
        });
    },

    // 切换上一首
    playPrev(){
        let index = globalData.currentPlaylistIndex - 1;
        if(index<0){
            index = globalData.currentPlaylist.length - 1;
        }
        this.playSongOfCurrentListWithIndex(index);
    },

    // 切换下一首
    playNext(){
        let index = globalData.currentPlaylistIndex + 1;
        if(index>=globalData.currentPlaylist.length){
            index = 0;
        }
        this.playSongOfCurrentListWithIndex(index);
    },

    // 随机切换上一首歌曲
    playRandomPrev(){
        let index = globalData.randomPlaylistIndex - 1;
        if(index<0){
            index = globalData.randomPlaylist.length - 1;
        }
        this.playSongOfRandomListWithIndex(index);
    },
    // 随机切换下一首歌曲
    playRandomNext(){
        let index = globalData.randomPlaylistIndex + 1;
        if(index>=globalData.randomPlaylist.length){
            index = 0;
            this.resetRandomList();
        }
        this.playSongOfRandomListWithIndex(index);
    },
    // 重置随机歌单列表
    resetRandomList(){
        if(!globalData.currentPlaylist){
            return;
        }
        globalData.setData({
            randomPlaylist:shuffle(globalData.currentPlaylist),
            randomPlaylistIndex:0
        })
    },

    // 触发下一首事件
    onNext(){
        if(!globalData.currentPlaylist){
            return;
        }
        switch (globalData.playMode) {
            case "loop":
                this.playNext();
                break;
            case "random":
                this.playRandomNext();
                break;
            case "single":
                this.replay();
                break;
        }
    },

    //触发上一首事件
    onPrev(){
        if(!globalData.currentPlaylist){
            return;
        }
        switch (globalData.playMode) {
            case "loop":
                this.playPrev();
                break;
            case "random":
                this.playRandomPrev();
                break;
            case "single":
                this.replay();
                break;
        }
    },

    replay(){
        player.src = globalData.currentSongUrl;
        player.title = globalData.currentSong.name;
        player.epname = globalData.currentSong.al.name;
        player.singer = artistsFilter(globalData.currentSong.ar);
        player.coverImgUrl = globalData.currentSong.al.picUrl;
    },


    // 设置播放位置
    seek(ct){
        player.seek(ct);
        globalData.setData({
            currentTime:ct
        });
    },
    pause(){
        player.pause();
    },
    play(){
        if(!player.src){
            this.replay();
        }else{
            player.play();
        }
        
    }
}

player.onTimeUpdate(()=>{
    // console.log(arguments);
    let currentLyricIndex = findLyricIndex(player.currentTime,globalData.currentSongLyric);
    // console.log(currentLyricIndex);
    globalData.setData({
        progress:player.currentTime/player.duration,
        duration:player.duration,
        currentTime:player.currentTime,
        currentLyricIndex
    });

});

player.onPause(()=>{
    globalData.setData({
        isPlaying:false,
    })
});

player.onEnded(()=>{
    globalData.setData({
        isPlaying:false,
    });
    playerCTRL.onNext();
});

player.onStop(()=>{
    globalData.setData({
        isPlaying:false,
    })
});

player.onPlay(()=>{
    globalData.setData({
        isPlaying:true,
    })
});

player.onNext(()=>{
    playerCTRL.onNext();
});

player.onPrev(()=>{
    playerCTRL.onPrev();
});


export default playerCTRL;