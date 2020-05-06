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
export default {
    data() {
        return {
            isLogin:false,
            userInfo:{}
        }
    },

    mounted() {
        
    },

    activated() {
        if(!localStorage.getItem("userId")){
            this.isLogin = false;
        }else{
            this.queryIsLogin();
        }
    },

    methods: {
        queryIsLogin(){
            this.http.get("/elepro/restapi/eus/v3/users/"+localStorage.getItem("userId"))
            .then(res=>{
                console.log(res);
                this.isLogin = true;
                this.userInfo = res.data;
            })
            .catch(err=>{
                this.isLogin = false;
            })
        }
    },

    
}
</script>


<style scoped>
    
</style>