<template>
    <div>
        <h1>首页</h1>
    </div>
</template>


<script>

import {mapActions,mapMutations,mapState} from "vuex";

export default {
    data(){
        return {
            
        }
    },
    activated() {
        if(!localStorage.getItem("userId")){
            // this.isLogin = false;
            this.setIsLogin(false);
        }else{
            this.queryIsLogin();
        }
    },

    mounted() {
        getPosition();
    },


    computed: {
        ...mapState(["isLogin","userInfo"])
    },

    methods: {
        ...mapActions(["queryIsLogin"]),
        ...mapMutations(["setIsLogin","setAddInfo"]),

        getPosition(){
            let position = localStorage.getItem("addInfo");
            if(addInfo){
                this.setAddInfo(addInfo);
            }else{
                navigator.geolocation.getCurrentPosition(function(pos){
                    let lat = pos.coords.latitude;
                    let lnt = pos.coords.longitude;
                    
                },function(err){

                });
            }
        }
    },
}
</script>


<style scoped>
    
</style>