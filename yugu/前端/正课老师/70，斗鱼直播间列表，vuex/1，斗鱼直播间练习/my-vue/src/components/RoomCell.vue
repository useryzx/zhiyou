<template>
    <div class="root">
        <div class="bg-img" :style="{'background-image':`url(${room.room_src})`}">
            <div class="nickname-label">{{room.nickname}}</div>
            <div class="hn-label">{{room.hn|wanFilter}}</div>
        </div>
        <div class="roomname-label">{{room.room_name}}</div>
    </div>
</template>


<script>

import wanFilter from "@/utils/wanFilter.js"

export default {
    props:["room"],

    filters:{
        wanFilter
    }
    
}
</script>


<style scoped>
    .root{
        /* border: solid 1px black; */
        width: 150px;
        margin: 10px 10px;
    }

    .bg-img{
        height: 93px;
        background-size: 100% 100%;
        position: relative;
        
    }

    .nickname-label,.hn-label{
        position: absolute;
        bottom: 4px;
        color: white;
        font-size: 12px;
        text-shadow: 0 0 8px black;
    }
    .nickname-label{
        left: 4px;
    }
    .hn-label{
        right: 4px;
    }
    .roomname-label{
        font-size: 14px;
        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
    }
</style>