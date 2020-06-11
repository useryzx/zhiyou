const rooturl = "https://www.sunhuayu.com:3001";

export default {
    loginStatus:rooturl + "/login/status",          //获取登录状态
    loginByTel:rooturl + "/login/cellphone",        //手机号登录
    loginByEmail:rooturl + "/login",                //邮箱登录
    recommendSheet:rooturl + "/personalized",       //每日推荐歌单
    recommendSongs:rooturl + "/recommend/songs",    //每日推荐歌曲
    songDetail:rooturl + "/song/detail",            //歌曲详情
    songUrl:rooturl + "/song/url",                  //歌曲url
    songLyric:rooturl + "/lyric",                   //歌曲歌词
    searchSongs:rooturl + "/search",                //搜索歌曲
    hotSearch:rooturl + "/search/hot",              //热搜
    UserPlayList:rooturl + "/user/playlist",        //获取用户歌单
    PlayListDetail:rooturl + "/playlist/detail",    //歌单详情
}