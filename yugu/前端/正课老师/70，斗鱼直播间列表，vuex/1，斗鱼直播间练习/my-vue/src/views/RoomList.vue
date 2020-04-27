<template>
    <div @scroll="onRootScroll">
        <NavBar>{{cname}}</NavBar>

        <div id="room-list">
            <RoomCell
                v-for="r,i in roomList"
                :key="i"
                :room="r"
            ></RoomCell>

            <div class="list-holer" v-for="n in 5"></div>
            

        </div>

    </div>
</template>


<script>

import NavBar from "@/components/NavBar.vue";
import RoomCell from "@/components/RoomCell.vue";



export default {
    data() {
        return {
            cid:null,
            cname:null,
            roomList:[],
            isLoading:false
        }
    },

    mounted() {
        this.cid = this.$route.query.cid;
        this.cname = this.$route.query.cname;

        this.queryRoomList();
    },

    methods: {
        queryRoomList(){
            this.isLoading = true;
            this.axios.get(`/api/RoomApi/live/${this.cid}`,{
                params:{
                    offset:this.roomList.length,
                    limit:20
                }
            })
            .then(res=>{
                console.log(res);
                this.roomList = this.roomList.concat(res.data.data);
                this.isLoading = false;
            })
            .catch(err=>{
                this.isLoading = false;
            })
        },

        onRootScroll(e){
            let st = e.target.scrollTop;
            let sh = e.target.scrollHeight;
            let ch = e.target.clientHeight;
            if(st>=sh-ch-50){
                if(!this.isLoading){
                    this.queryRoomList();
                }
            }
        }
    },

    components:{
        NavBar,
        RoomCell
    }
}
</script>


<style scoped>
    #room-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .list-holer{
        width: 150px;
        margin: 0px 10px;
    }
</style>