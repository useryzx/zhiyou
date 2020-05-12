<template>
    <div>
        <RestCell 
            v-for="r,i in restList"
            :rest="r.restaurant"
            :key="i"
            :index="i"
        ></RestCell>
    </div>
</template>


<script>

import RestCell from "@/components/RestCell.vue";

export default {
    components:{
        RestCell
    },
    props:["restList"]
}
</script>


<style scoped>
    
</style>