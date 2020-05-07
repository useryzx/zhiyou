<template>
    <div>
        <router-link to="/home/address">
            <h1 v-if="addState==0" id="add-bar">正在获取您的位置</h1>
            <h1 v-if="addState==1" id="add-bar">请选择您的位置</h1>
            <h1 v-if="addState==2" id="add-bar">{{addInfo.name}}</h1>
        </router-link>


        <div id="entry-box">
            <div v-for="e in entryList">
                <img :src="imgFilter(e.image_hash)">
                <p>{{e.name}}</p>
            </div>
        </div>
        
    </div>
</template>


<script>

import {mapActions,mapMutations,mapState} from "vuex";

import imgFilter from "@/util/imgFilter.js";

export default {
    
    data(){
        return {
            // 0正在获取，1获取失败，2获取成功
            addState:0,

            entryList:[]
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
    },




    computed: {
        ...mapState(["isLogin","userInfo","addInfo"])
    },

    methods: {
        ...mapActions(["queryIsLogin","queryPositionNameByCoord"]),
        ...mapMutations(["setIsLogin","setAddInfo"]),
        imgFilter,
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
</script>


<style scoped>
    #add-bar{
        margin: 0;
        background-color: aquamarine;
    }
</style>