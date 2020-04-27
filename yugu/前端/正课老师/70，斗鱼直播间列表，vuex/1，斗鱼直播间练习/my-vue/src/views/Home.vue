<template>
    <div>
        <NavBar
            :hideBackBtn="true"
        >分类列表</NavBar>
        <div id="cate-list">
            <div v-for="c in cateList" class="list-item" @click="gotoRoomlist(c.cate_id,c.game_name)">
                <img class="list-item-icon" :src="c.game_icon">
                <p class="list-item-title">{{c.game_name}}</p>
            </div>
        </div>
    </div>
</template>


<script>

import NavBar from "@/components/NavBar.vue";

export default {
    components:{
        NavBar
    },
    data(){
        return {
            cateList:[]
        }
        
    },

    mounted() {
        this.axios.get("/api/RoomApi/game")
        .then(res=>{
            console.log(res.data);
            this.cateList = res.data.data;
        })
    },
    methods: {
        gotoRoomlist(cid,cname){
            this.$router.push(`/home/roomlist?cid=${cid}&cname=${cname}`);
        }
    },

}



</script>


<style scoped>

    #cate-list{
        display: flex;
        flex-wrap: wrap;
    }


    .list-item{
        width: 33.33vw;
        border: dotted 1px grey;
        box-sizing: border-box;
        text-align: center;
        padding-top: 6vw;
    }

    .list-item-icon{
        width: 25vw;
        height: 25vw;
        border-radius: 50%;
    }

    .list-item-title{
        font-size: 4vw;
    }



</style>