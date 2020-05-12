<template>
    <div class="root">
        <div class="minus" @click="minus" :style="{visibility:value>0?'visible':'hidden'}">-</div>
        <div class="num" :style="{visibility:value>0?'visible':'hidden'}">{{value}}</div>
        <div class="add" @click="add">+</div>
    </div>
</template>


<script>
export default {
    props:["value"],
    methods: {
        minus(){
            this.$emit("input",this.value-1);
        },
        add(){
            this.$emit("input",this.value+1);
        }
    },
}
</script>


<style scoped>
    .root{
        display: inline-block;
        display: flex;
        width: 60px;
        height: 20px;
        align-items: center;
    }
    .minus,.num,.add{
        width: 20px;
        text-align: center;
        line-height: 20px;
        font-weight: bold;
        height: 20px;
    }
    .minus{
        border-radius: 50%;
        font-size: 20px;
        border: solid 1px rgb(35, 149, 255);
        color: rgb(35, 149, 255);
        line-height: 15px;
    }
    .num{
        font-size: 14px;
    }
    .add{
        font-size: 20px;
        border-radius: 50%;
        background-color: rgb(35, 149, 255);
        color: white;
    }

</style>