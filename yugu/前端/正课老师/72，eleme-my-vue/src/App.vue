<template>
    <div id="app">

        <keep-alive>
            <router-view id="r-view"/>
        </keep-alive>
        

        <van-tabbar 
            v-model="activeIndex" 
            :border="true" 
            id="tabbar"
        >

            <van-tabbar-item to="/">
                <span>首页</span>
                <template #icon="props">
                    <img :src="props.active ? homeIconH : homeIcon" />
                </template>
            </van-tabbar-item>

            <van-tabbar-item to="/find">
                <span>发现</span>
                <template #icon="props">
                    <img :src="props.active ? findIconH : findIcon" />
                </template>
            </van-tabbar-item>

            <van-tabbar-item to="/order">
                <span>订单</span>
                <template #icon="props">
                    <img :src="props.active ? orderIconH : orderIcon" />
                </template>
            </van-tabbar-item>

            <van-tabbar-item to="/user">
                <span>我的</span>
                <template #icon="props">
                    <img :src="props.active ? userIconH : userIcon" />
                </template>
            </van-tabbar-item>

        
            
        </van-tabbar>
          


    </div>
</template>

<script>

import homeIcon from "./assets/home.png";
import homeIconH from "./assets/home-h.png";
import findIcon from "./assets/find.png";
import findIconH from "./assets/find-h.png";
import orderIcon from "./assets/order.png";
import orderIconH from "./assets/order-h.png";
import userIcon from "./assets/user.png";
import userIconH from "./assets/user-h.png";

export default {
    data(){
        return {
            homeIcon,
            homeIconH,
            findIcon,
            findIconH,
            orderIcon,
            orderIconH,
            userIcon,
            userIconH,

            activeIndex:3
        }
    },

    mounted() {
        this.$router.afterEach((to, from) => {
            this.checkActiveIndex(to);
        });

        this.checkActiveIndex(this.$route);
    },

    methods: {
        checkActiveIndex(to){
            if(to.path=="/") this.activeIndex = 0;
            if(to.path=="/find") this.activeIndex = 1;
            if(to.path=="/order") this.activeIndex = 2;
            if(to.path=="/user") this.activeIndex = 3;
        }
    },
}
</script>

<style scoped>
    #tabbar{
        border-top: solid 1px #999999;
    }


    #r-view{
        height: 100vh;
        padding-bottom: 50px;
        box-sizing: border-box;
        
        overflow-x: scroll;
    }
</style>