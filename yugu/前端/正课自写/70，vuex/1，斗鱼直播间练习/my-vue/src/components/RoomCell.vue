<template>
    <div class="root">
        <div class="bg-img" :style="{'background-image':`url(${room.room_src})`}">
            <div class="nickname-label">{{room.nickname}}</div>
            <div class="hn-label">{{room.hn|wanFilter}}</div>
        </div>
        <p class="roomname-label">{{room.room_name}}</p>
    </div>
</template>


<script>
    import wanFilter from '@/utils/wanFilter.js'

    export default {
        props: ["room"],
        filters:{
            wanFilter,
        }
    }
</script>


<style scoped>
    .root {
        /* border: 1px solid red; */
        width: 150px;
        margin: 10px 10px;
    }

    .bg-img {
        height: 93px;
        background-size: contain;
        position: relative;
    }

    .nickname-label,
    .hn-label {
        position: absolute;
        bottom: 0;
        color: white;
        font-size: 12px;
        text-shadow: 0 0 8px black;
    }

    .nickname-label {
        left: 4px;
    }

    .hn-label {
        right: 4px;
    }
    .roomname-label{
        font-size: 14px;
        color: 14px;
        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
    }
</style>