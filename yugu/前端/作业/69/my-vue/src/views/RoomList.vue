<template>
    <div @scroll="scrollTop">
        <h1 class="inset-title">
            <span class="inset-span" @click="changeClick">◀</span>
            {{roomName}}
        </h1>
        <div class="inset-item-box">
            <div class="inset-item" v-for="(v,i) in gameList" :key="i" @click="roomClick(v.room_id,v.owner_uid)">
                <img class="inset-item-img" :src="v.room_src" alt />
                <p class="inset-item-text">
                    <span>{{v.nickname}}</span>
                    <span>{{v.hn}}</span>
                </p>
                <p class="room-name">{{v.room_name}}</p>
            </div>
            <div v-if="gameList.length%2!=0" class="inset-item" style="border: transparent 1px solid;"></div>
        </div>
    </div>
</template>


<script>
    import axios from "axios";
    export default {
        data() {
            return {
                offset: 0,
                timer: null,
                roomName: "",
                gameList: []
            };
        },
        created() {
            this.gameFun();
        },
        mounted() {
            let routeObj = this.$route;
            this.roomName = routeObj.params.gameName;
            if (!this.roomName) {
                this.$router.push("/");
            }
        },
        activated() {
            this.gameFun();
        },
        methods: {
            roomClick(id, uid) {
                this.$router.push({
                    name: "room",
                    params: {
                        id,
                        uid
                    }
                });
            },
            gameFun() {
                this.gameList = [];
                let routeObj = this.$route;
                this.roomName = routeObj.params.gameName;
                axios
                    .get(`/gameRoom/api/RoomApi/live/${routeObj.params.params}`)
                    .then(({
                        data
                    }) => {
                        this.gameList = this.gameList.concat(data.data);
                    });
            },
            changeClick() {
                this.$router.push("/");
            },

            scrollTop(e) {
                let scTop = e.target.scrollTop;
                let scHeight = e.target.scrollHeight;
                let cliHeight = e.target.clientHeight;

                if (scTop + cliHeight >= scHeight) {
                    let routeObj = this.$route;
                    if (!this.timer) {
                        this.offset++;
                        axios
                            .get(`/gameRoom/api/RoomApi/live/${routeObj.params.params}?offset=${this.offset}&limit=30`
                            )
                            .then(({
                                data
                            }) => {
                                this.gameList = this.gameList.concat(data.data);
                            });
                    } else {
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(() => {
                        this.timer = null;
                    }, 1000);
                }
            }
        },
    };
</script>

<style scoped>
    .inset-title {
        margin: 0;
        padding: 5px 0;
        background-color: rgb(255, 255, 255);
        text-align: center;
        color: rgb(235, 174, 84);
        position: relative;
    }

    .inset-span {
        position: absolute;
        left: 5px;
        line-height: 100%;
        user-select: none;
        cursor: pointer;
    }

    .inset-item-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-top: 8px;
    }

    .inset-item {
        width: 120px;
        height: 80px;
        border: transparent 1px solid;
        margin-bottom: 8px;
        position: relative;
        margin: 0;
        margin-bottom: 8px;
        font-size: 0;
    }

    .inset-item-img {
        width: 100%;
        height: 80%;
    }

    .inset-item-text span {
        display: inline-block;
    }

    .inset-item-text {
        width: 100%;
        position: absolute;
        color: white;
        font-size: 10px;
        z-index: 10;
        margin: 0 0 5px 0;
        display: flex;
        justify-content: space-between;
        bottom: 15px;
        overflow: hidden;
    }

    .room-name {
        width: 100%;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
    }
</style>