<template>
    <div id="entry-box">
        <div v-for="e in entryList" class="entry-box-item">
            <img :src="imgFilter(e.image_hash)" class="entry-box-item-img">
            <p class="entry-box-item-title">{{e.name}}</p>
        </div>
    </div>
</template>


<script>
import imgFilter from "@/util/imgFilter.js";
export default {
    props:["entryList"],
    methods: {
        imgFilter
    },
}
</script>


<style scoped>
    #entry-box{
        display: flex;
        flex-wrap: wrap;
    }


    .entry-box-item{
        width: 20vw;
        text-align: center;
        margin: 10px 0;
    }

    .entry-box-item-img{
        width: 70%;
        
    }

    .entry-box-item-title{
        font-size: 14px;
        margin: 0px 0;
    }
</style>