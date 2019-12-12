var musicList = [
    "give me some sunshine",
    "PokerFace",
    "你在终点等我",
    "半壶纱",
    "夜空中最亮的星",
    "江南"
];

//渲染歌曲列表
var mul = document.getElementById("m-ul");
var lis = [];
for (var i = 0;i<musicList.length;i++){
    var li = document.createElement("li");
    li.textContent = musicList[i];
    lis.push(li);
    mul.appendChild(li);

    li.onclick = function(){
        lis[currentMusicIndex].classList.remove("playing");
        var index = lis.indexOf(this);
        currentMusicIndex = index;
        beginPlay();
    }
}

//记录当前正在播放的歌曲的索引
var currentMusicIndex = 0;


//获得播放器元素(audio)
var player = document.getElementById("player");


//获得 播放/暂停 按钮
var playBtn = document.getElementById("play");


//点击播放按钮
playBtn.onclick = function(){
    // console.dir(player);
    //如果当前处于暂停状态则播放
    if(player.paused){
        player.play();
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
    }else{
        //否则暂停
        player.pause();
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    }

}

//进度条元素
var proBar = document.getElementById("pro-bar");

var ct = document.getElementById("ct");

//播放器的播放进度更新事件。
player.ontimeupdate = function(){
    //使用当前播放时长除以歌曲总时长，得到播放进度
    var progress = player.currentTime/player.duration;
    //把播放进度显示在进度条上
    proBar.value = progress;

    ct.textContent = secondToMinute(player.currentTime);
}

//开始播放事件
player.onplaying = function(){
    var tt = document.getElementById("tt");
    tt.textContent = secondToMinute(player.duration);

    lis[currentMusicIndex].classList.add("playing");
}


//时间格式转换函数，把秒数转为分钟+秒数
function secondToMinute(d){
    //将事件（秒数）转为分钟和秒数
    var m = d/60;
    m = Math.floor(m);

    var s = d%60;
    s = Math.floor(s)
    // if(s<10){
    //     s = "0"+s;
    // }
    s = s<10?"0"+s:s;
    return m+":"+s;
}

//进度条的点击事件
proBar.onclick = function(e){
    //计算点击坐标点所代表的播放进度比例。
    var rate = e.offsetX/320;
    //根据总时间和播放比例计算出播放进度，并赋值给播放器
    player.currentTime = player.duration*rate;
}


//播放器歌曲播放结束事件
player.onended = function(){
    lis[currentMusicIndex].classList.remove("playing");
    playNext();
}

//播放下一首
function playNext(){
    currentMusicIndex++;
    if(currentMusicIndex>musicList.length-1){
        currentMusicIndex = 0;
    }
    beginPlay();
}

//播放上一首
function playPrev(){
    currentMusicIndex--;
    if(currentMusicIndex<0){
        currentMusicIndex = musicList.length-1;
    }
    beginPlay();
}

//上一首按钮点击事件
var prev = document.getElementById("prev");
prev.onclick = function(){
    lis[currentMusicIndex].classList.remove("playing");
    playPrev();
}

//下一首按钮点击事件
var next = document.getElementById("next");
next.onclick = function(){
    lis[currentMusicIndex].classList.remove("playing");
    playNext();
}


function beginPlay(){
    player.src = "music/"+musicList[currentMusicIndex]+".mp3";
    player.play();
    var cd = document.getElementById("cd");
    cd.style.backgroundImage = 'url("music/'+
    musicList[currentMusicIndex]+
    '.jpg")';
}

beginPlay();