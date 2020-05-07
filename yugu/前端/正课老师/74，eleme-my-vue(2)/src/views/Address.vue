<template>
    <div>
        <van-nav-bar
            title="标题"
            left-text=""
            left-arrow
            @click-left="onClickLeft"
            
        />

        <div id="selector-bar">
            <div id="city-title" @click="showCitySelector=true">{{addName?addName:'请选择：'}}</div>
            <input type="text" id="add-field" @input="addSearch" v-model="keyWord">
        </div>

        <div id="add-list">
            <div v-for="a in addList" class="add-item" @click="itemClick(a)">
                <div class="add-item-title">
                    <h4>{{a.name}}</h4>
                    <div>{{a.distance}}</div>
                </div>
                <div>{{a.address}}</div>
            </div>
        </div>



        <van-popup v-model="showCitySelector" id="city-pop">
            <van-area 
                title="请选择城市" 
                :area-list="areaList" 
                :columns-num="2"
                @confirm="selectCity"
                @cancel="showCitySelector=false"
            />
        </van-popup>


    </div>
</template>


<script>

import areaList from "@/data/area.js";
import {mapState,mapMutations} from "vuex"

export default {
    data(){
        return{
            showCitySelector:false,
            areaList,
            addName:"",
            lat:null,
            lng:null,
            keyWord:"",
            addList:[],
            isLoading:false
        }
    },
    activated() {
        this.showCitySelector = false;
        this.addName = "";
        this.keyWord = "";
        this.addList = [];

    },
    mounted() {
        
    },
    methods: {
        ...mapMutations(["setAddInfo"]),
        onClickLeft(){
            this.$router.back();
        },
        selectCity(e){
            // console.log(e[1].name);
            this.showCitySelector = false;
            this.addName = e[1].name;

            this.http.get("/baidupro/geocoder/v2/",{
                params:{
                    address:this.addName,
                    output:"json",
                    ak:"cGZDPnLSX2gFNtC8dOPTdr3qX8yRDyff"
                }
            })
            .then(res=>{
                console.log(res);
                this.lat = res.data.result.location.lat
                this.lng = res.data.result.location.lng
            });
        },

        // onScroll(e){
        //     let st = e.target.scrollTop;
        //     let sh = e.target.scrollHeight;
        //     let ch = e.target.clientHeight;
        //     if(st>sh-ch-50){
        //         this.addSearch();
        //     }
        // },

        // 搜索请求
        addSearch(){
            if(this.lat==null||this.lng==null||this.isLoading){
                return;
            }
            this.isLoading = true;
            this.http.get("/elepro/restapi/bgs/poi/search_poi_nearby_alipay",{
                params:{
                    keyword:this.keyWord,
                    offset:this.addList.length,
                    limit:20,
                    latitude:this.lat,
                    longitude:this.lng
                }
            })
            .then(res=>{
                // console.log(res);
                this.addList = res.data;
                // this.addList = this.addList.concat(res.data);
                // this.addList = [...this.addList,...res.data];
                this.isLoading = false;
            })
            .catch(err=>{
                this.isLoading = false;
            })
        },


        itemClick(add){
            console.log(add);
            this.setAddInfo({
                lat:add.latitude,
                lng:add.longitude,
                name:add.name,
                geohash:add.geohash
            });

            this.$router.back();

        }
    },
    computed: {
        ...mapState(["addInfo"])
    },
}
</script>


<style scoped>
    #selector-bar{
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #eeeeee;
    }

    #add-field{
        flex-grow: 1;
        margin-left: 10px;
    }
    #city-pop{
        width: 100vw;
    }

    .add-item{
        padding: 10px;
        border-bottom: solid 1px #dddddd;
    }

    .add-item-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>