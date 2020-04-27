<template>
    <div>
        <NavBar :hideBackBtn="true">分类列表</NavBar>
        <div id="cate-list">
            <div v-for="(c, i) in cateList" :key="i" class="list-item" @click="goToRoomList(c.cate_id,c.game_name)">
                <img :src="c.game_icon" :alt="c.game_name" class="list-item-img">
                <p class="list-item-title">{{c.game_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar.vue"

    export default {
        data() {
            return {
                cateList: []
            }
        },
        mounted() {
            this.axios.get("/api/RoomApi/game").then(res => {
                this.cateList = res.data.data;
            })
        },
        components: {
            NavBar
        },
        methods: {
            goToRoomList(cid,cname){
                this.$router.push(`/home/roomlist?cid=${cid}&cname=${cname}`)
            }
        },
    }
</script>


<style scoped>
    #cate-list {
        display: flex;
        flex-wrap: wrap;
    }

    .list-item {
        width: 33.33vw;
        border: 1px dotted grey;
        box-sizing: border-box;
        text-align: center;
        padding-top: 6vw;
    }

    .list-item-img {
        width: 25vw;
        height: 25vw;
        border-radius: 50%;
    }

    .list-item-title {
        font-size: 4vw;
    }
</style>