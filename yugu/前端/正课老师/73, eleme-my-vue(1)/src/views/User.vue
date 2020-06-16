<template>
    <div>
        <router-link to="/user/login" v-if="!isLogin">前往注册/登录</router-link>

        <div v-else>
            <div>{{userInfo.username}}</div>
            <div>{{userInfo.mobile}}</div>
        </div>
    </div>
</template>


<script>

import {mapActions,mapMutations,mapState} from "vuex";

export default {
    data() {
        return {
            // isLogin:false,
            // userInfo:{}
        }
    },

    mounted() {
        
    },

    activated() {
        
        if(!localStorage.getItem("userId")){
            // this.isLogin = false;
            this.setIsLogin(false);
        }else{
            this.queryIsLogin();
        }
    },

    computed: {
        ...mapState(["isLogin","userInfo"])
    },

    methods: {
        ...mapActions(["queryIsLogin"]),
        ...mapMutations(["setIsLogin"])
    },

    
}
</script>


<style scoped>
    
</style>