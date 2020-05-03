<template>
    <div @scroll="onRootScroll">
        <NavBar>{{cname}}</NavBar>
        <div id="room-list">
            <RoomCell v-for="(r, i) in roomList" :key="i" :room="r">
            </RoomCell>
            <div v-for="i in 5" class="list-holder"></div>
        </div>

    </div>
</template>


<script>
    import NavBar from '@/components/NavBar.vue'
    import RoomCell from '@/components/RoomCell.vue'
    export default {
        components: {
            NavBar,
            RoomCell,
        },
        data() {
            return {
                cid: null,
                cname: null,
                roomList: [],
                isLoading: false,
            }
        },
        mounted() {
            this.cid = this.$route.query.cid;
            this.cname = this.$route.query.cname;
            this.queryRoomList();
        },
        methods: {
            queryRoomList() {
                this.isLoading = true;
                this.axios.get(`/api/RoomApi/live/${this.cid}`, {
                    params: {
                        offset: this.roomList.length,
                        limit: 20
                    }
                }).then(res => {
                    this.roomList = this.roomList.concat(res.data.data);
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                })
            },
            onRootScroll(e) {
                let st = e.target.scrollTop;
                let sh = e.target.scrollHeight;
                let ch = e.target.clientHeight;
                if (st >= sh - ch - 50) {
                    console.log(e.target);
                    if (!this.isLoading) {
                        this.queryRoomList();
                    }
                }
            }
        },
    }
</script>


<style scoped>
    #room-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .list-holder {
        width: 150px;
        margin: 0 10px;
    }
</style>