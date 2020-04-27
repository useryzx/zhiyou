<template>
    <div>
        <h1 class="room-title">
            <span class="room-span" @click="spanClick">◀</span>
            {{uid}}
        </h1>
        <img :src="src" alt="" class="room-img">
        <h2 v-text="online==1?'online':'offline'"></h2>
    </div>
</template>


<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                uid: "",
                cateId: "",
                gameName: "",
                src: null,
                online:2
            }
        },
        mounted() {
            this. getRoom()
        },
        activated() {
            this. getRoom()
        },
        methods: {
            getRoom() {
                this.uid = this.$route.params.uid;
                axios.get(`/gameRoom/api/RoomApi/room/${this.$route.params.id}`)
                    .then(({
                        data
                    }) => {
                        this.src = data.data.room_thumb;
                        this.online= data.data.room_status;
                        this.cateId = data.data.cate_id; 
                        this.gameName = data.data.cate_name; 
                    })
            },
            spanClick() {
                this.$router.push({
                    name: "name",
                    params: {
                        params: this.cateId,
                        gameName: this.gameName
                    }
                })

            },
        },
    }
</script>


<style scoped>
    .room-title {
        user-select: none;
        width: 100%;
        margin: 0;
        padding: 5px 0;
        background-color: rgb(250, 250, 250);
        text-align: center;
        color: rgb(216, 149, 86);
    }
    .room-img{
        width: 100%;
    }
    .room-span {
        position: absolute;
        left: 5px;
        line-height: 100%;
        user-select: none;
        cursor: pointer;
    }
</style>