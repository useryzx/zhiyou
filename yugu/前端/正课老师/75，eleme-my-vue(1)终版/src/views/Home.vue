<template>
    <div @scroll="onScroll">
        <router-link to="/home/address">
            <h1 v-if="addState==0" id="add-bar">正在获取您的位置</h1>
            <h1 v-if="addState==1" id="add-bar">请选择您的位置</h1>
            <h1 v-if="addState==2" id="add-bar">{{addInfo.name}}</h1>
        </router-link>

        <div id="search-box">
            <div id="search-bar">
                <van-icon name="search"/>
                <span>搜索饿了么商家、商品名称</span>
                
            </div>
        </div>

        <EntryBox :entryList="entryList"></EntryBox>

        <div id="recommend-title">推荐商家</div>

        <div id="sort-bar">
            <div class="sort-bar-item">综合排序</div>
            <div class="sort-bar-item">距离最近</div>
            <div class="sort-bar-item">销量最高</div>
            <div class="sort-bar-item">筛选<van-icon name="filter-o" /></div>
        </div>

        <RestList :restList="restList"></RestList>

        
    </div>
</template>


<script>

import {mapActions,mapMutations,mapState} from "vuex";

import EntryBox from "@/components/EntryBox.vue";
import RestList from "@/components/RestList.vue";


export default {
    components:{
        EntryBox,
        RestList
    },
    
    data(){
        return {
            // 0正在获取，1获取失败，2获取成功
            addState:0,
            entryList:[],
            isLoadingRest:false
        }
    },
    activated() {
        if(!localStorage.getItem("userId")){
            // this.isLogin = false;
            this.setIsLogin(false);
        }else{
            this.queryIsLogin();
        }

        this.queryEntryList();
    },

    mounted() {
        this.getPosition();
        this.queryRestList();
    },


    computed: {
        ...mapState([
            "isLogin",
            "userInfo",
            "addInfo",
            "restList"
        ])
    },

    methods: {
        ...mapActions(["queryIsLogin","queryPositionNameByCoord","queryRestList"]),
        ...mapMutations(["setIsLogin","setAddInfo","setMaskIndex"]),
        // 获取地理位置
        getPosition(){
            let addInfo = JSON.parse(localStorage.getItem("addInfo"));
            // let addInfo = null;
            if(addInfo){
                this.setAddInfo(addInfo);
                this.addState = 2;
            }else{
                navigator.geolocation.getCurrentPosition(pos=>{
                    let lat = pos.coords.latitude;
                    let lng = pos.coords.longitude;
                    console.log(pos)

                    this.queryPositionNameByCoord({
                        latitude:lat,
                        longitude:lng
                    })
                    .then(res=>{
                        this.addState = 2;
                    })

                    
                },err=>{
                    console.log(err);
                    this.addState = 1;
                    this.$router.push("/home/address");
                },{
                    timeout:5000
                });
            }
        },

        // 请求分类列表
        queryEntryList(){
            this.http.get("/elepro/restapi/shopping/v2/entries",{
                params:{
                    latitude:this.addInfo.lat,
                    longitude:this.addInfo.lng,
                    terminal:"h5",
                    templates:["main_template","favourable_template","svip_template"]
                }
            })
            .then(res=>{
                console.log(res);
                this.entryList = res.data[1].entries;

            })
        },

        onScroll(){
            this.setMaskIndex(-1);
            let st = this.$el.scrollTop;
            let sh = this.$el.scrollHeight;
            let ch = this.$el.clientHeight;
            if(st>=sh-ch-50){
                if(this.isLoadingRest){
                    return;
                }
                this.isLoadingRest = true;
                this.queryRestList()
                .then(()=>{
                    this.isLoadingRest = false;
                })
                .catch(err=>{
                    this.isLoadingRest = false;
                })
            }
        }
    },
}



// for(let i = 0;i<24;i++){
//     this.entryList.push(i);
// }

// // [[0..9],[10..19],[20..23]]
// let arr = [];
// let temp = [];
// this.entryList.forEach(el => {
//     temp.push(el);
//     if(temp.length>=10){
//         arr.push(temp);
//         temp = [];
//     }
// });
// if(temp.length>0){
//     arr.push(temp);
// }


// 移动端页面适配之rem解决方案
// let width = window.innerWidth;
// document.documentElement.style.fontSize = width/375+"px";
// window.onresize = function(){
//     width = window.innerWidth;
//     document.documentElement.style.fontSize = width/375+"px";
// }
// // 设备方向改变事件
// window.onorientationchange = function(){
//     width = window.innerWidth;
//     document.documentElement.style.fontSize = width/375+"px";
// }


</script>


<style scoped>
    #add-bar{
        margin: 0;
        background-color: aquamarine;
    }


    #search-box{
        background: linear-gradient(90deg,#0af,#0085ff);
        padding: 8px 16px;

        position: sticky;
        left: 0;
        top: 0;
        z-index: 10;
    }

    #search-bar{
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        font-size: 14px;
        color: #cccccc;
    }

    #recommend-title{
        text-align: center;
    }

    #recommend-title::before{
        display: inline-block;
        content: "";
        height: 2px;
        width: 20px;
        background-color: #666;
        position: relative;
        top: -5px;
        left: -10px;
    }

    #recommend-title::after{
        display: inline-block;
        content: "";
        height: 2px;
        width: 20px;
        background-color: #666;
        position: relative;
        top: -5px;
        left: 10px;
    }

    #sort-bar{
        display: flex;
        justify-content: space-around;
        margin: 10px 0;

        position: sticky;
        left: 0;
        top: 56px;
        background-color: white;
        z-index: 10;
    }

    .sort-bar-item{
        padding: 10px 10px;
        font-size: 14px;
    }

</style>