<template>
    <div @scroll="scrollTop">
        <h1 class="list-title">游戏分类</h1>
        <div class="list-list-box">
            <div class="list-item-box" v-for="item in gameRoomList" :key="item.cate_id"
                @click="itemClick(item.cate_id,item.game_name)">
                <img :src="item.game_icon" class="list-item-img">
                <p class="list-item-text">{{item.game_name}}</p>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                rootOffset: 0,
                ind: 0,
                gameRoomList: []
            }
        },
        mounted() {

            axios.get("/gameRoom/api/RoomApi/game")
                .then(({
                    data
                }) => {
                    let gameList = data.data;
                    gameList = JSON.parse(JSON.stringify(gameList))
                    this.gameRoomList = this.gameRoomList.concat(gameList)
                })
        },
        activated() {
            this.$el.scrollTop = this.rootOffset
        },
        methods: {
            itemClick(params, gameName) {
                this.$router.push({
                    name: "name",
                    params: {
                        params,
                        gameName
                    }
                })
            },
            scrollTop(e) {
                this.rootOffset = e.target.scrollTop
            },
        }
    }
</script>


<style scoped>
    .list-title {
        user-select: none;
        width: 100%;
        margin: 0;
        padding: 5px 0;
        background-color: rgb(255, 255, 255);
        text-align: center;
        color: rgb(206, 112, 4);
    }

    .list-list-box {
        display: flex;
        flex-wrap: wrap;
    }

    .list-item-box {
        width: 33.3%;
        height: 120px;
        border: 1px solid transparent;
        box-sizing: border-box;
        position: relative;
        text-align: center;
    }

    .list-item-img {
        width: 90%;
        height: 75%;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -65%);
    }

    .list-item-text {
        margin: 0;
        padding: 0;
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 13px;
        font-weight: 600;
        width: 100%;
    }
</style>