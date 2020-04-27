<template>
    <div class="root">
        <div v-if="!hideBackBtn" class="left" @click="backClick">
            ←
        </div>
        <div v-else class="left"></div>
        <div class="title">
            <slot></slot>
        </div>
        <div class="right"></div>
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
        height: 64px;
        align-items: center;
        background-color: #cccccc;
        padding: 0 10px;
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 100;
    }

    .left,.right{
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .left{
        font-size: 26px;
        font-weight: bold;
    }

    .title{
        font-size: 26px;
        font-weight: bold;
    }

</style>