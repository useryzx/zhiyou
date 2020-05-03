<template>
    <div class="root">
        <div class="left" @click="backClick" v-if="!hideBackBtn">
            &lt;
        </div>
        <div v-else class="left"></div>
        <div class="title">
            <slot></slot>
        </div>
        <div class="right">
            ...
        </div>
    </div>
</template>


<script>
    export default {
        methods: {
            backClick(){
                this.$router.back();
            }
        },
        props:["hideBackBtn"]
    }
</script>


<style scoped>
    .root{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        height: 64px;
        background-color: grey;
        align-items: center;
        width: 100%;
        left: 0;
        top: 0;
        position: fixed;
        z-index: 100;
    }
    .title{
        font-weight: bold;
        font-size: 32px;
    }
    .left,.right{
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        font-weight: bold;
    }
</style>