
// isLogin              bool        是否登录
// userInfo             object      用户信息
// currentSong          object      当前正在播放的歌曲信息
// currentSongLyric     array       当前歌曲的歌词数组
// currentSongUrl       string      当前歌曲的url
// progress             number      当前音乐的播放进度
// duration             number      当前音乐总时长
// currentTime          number      当前音乐播放的位置
// isPlaying            bool        是否正在播放音乐
// currentLyricIndex    number      当前显示的歌词的索引
// currentPlaylist      array       当前正在播放的歌单
// currentPlaylistIndex number      当前歌单的播放索引
// playMode             string      播放模式,loop,random,single
// randomPlaylist      array        随机播放的歌单
// randomPlaylistIndex number       随机歌单的播放索引

// let a =
// {
//     duration:[cb,cb,cb],
//     currentTime:[],
//     playMode:[],
//     isLogin:[indexcb],
//     userInfo:[indexcb]
// }


function makeGlobalData(){
    let cbMap = {};
    // let cbs = [];
    return {
        isPlaying:false,
        playMode:"loop",

        setData(obj){
            for(let k in obj){
                // console.log(k);
                let v = obj[k];
                this[k] = v;
                
            }
            let tempCbArr = [];
            for(let k in obj){
                if(cbMap[k]){
                    cbMap[k].forEach(el=>{
                        // el();
                        if(tempCbArr.indexOf(el)<0){
                            tempCbArr.push(el);
                        }
                    });
                }
            }
            tempCbArr.forEach(el=>{
                el();
            })
    
            // 通知页面数据发生变化了
            // cbs.forEach(el=>{
            //     el();
            // });
        },
    
    
        // 用于注册数据变化的通知
        onDataUpdate(cb,keyArr){
            keyArr.forEach(el=>{
                if(!cbMap[el]){
                    cbMap[el] = [];
                }
                cbMap[el].push(cb);
            });
            // cbs.push(cb);
        },

        // 取消监听
        offDataUpdate(cb){
            // let index = cbs.indexOf(cb);
            // if(index>=0){
            //     cbs.splice(index,1);
            // }
            for(let k in cbMap){
                let index = cbMap[k].indexOf(cb);
                if(index>=0){
                    cbMap[k].splice(index,1);
                }
            }
            
        }
    
    }
}

const globalData = makeGlobalData();
// const player = wx.getBackgroundAudioManager();



export default globalData;