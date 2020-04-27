<template>
    <div>
        <h1>发现页面</h1>
        <p>num:{{num}}</p>
    </div>
</template>


<script>

import {mapState} from "vuex";

export default {
    computed: {
        ...mapState(["num"])
    },
}
</script>


<style scoped>
    
</style>