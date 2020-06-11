// pages/search/search.js
import http from "../../utils/http.js";
import api from "../../api.js";
import playCTRL from "../../playerCTRL.js";

Page({
    data: {
        keyword:"",
        result:[],
        hotSearch:[]
    },

    onReady: function () {

    },

    onShow(){
        this.queryHotSearch();
    },

    keywordInput(e){
        this.setData({
            keyword:e.detail.value
        });
        if(this.data.keyword){
            this.doSearch();
        }else{
            this.setData({
                result:[]
            });
        }
        
    },

    doSearch(){
        http(api.searchSongs,{
            data:{keywords:this.data.keyword}
        })
        .then(res=>{
            console.log(res.data);
            this.setData({
                result:res.data.result.songs
            })
        })
    },

    loadMore(){
        http(api.searchSongs,{
            data:{keywords:this.data.keyword}
        })
        .then(res=>{
            console.log(res.data);
            this.setData({
                result:[...this.data.result,...res.data.result.songs]
            })
        })
    },

    queryHotSearch(){
        http(api.hotSearch)
        .then(res=>{
            // console.log(res);
            this.setData({
                hotSearch:res.data.result.hots
            })
        })
    },

    itemTapped(e){
        console.log(e.currentTarget.dataset.id);
        playCTRL.playSingleSong(e.currentTarget.dataset.id);
    },

    searchItemTapped(e){
        let word = e.currentTarget.dataset.name;
        this.setData({
            keyword:word
        });
        this.doSearch();
    },

    clearBtnTapped(){
        this.setData({
            keyword:"",
            result:[]
        });
    },
    
    onReachBottom: function () {

    },
})