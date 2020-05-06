<template>
    <div>
        <h1>首页</h1>

        <el-switch v-model="flag"></el-switch>

        <p>{{num}}</p>

        <el-slider v-model="num" id="slider"></el-slider>

        <el-button type="primary" @click="m1">按钮</el-button>
    </div>

    <input type="email">

</template>



<script>


import loadMore from "@/mixins/loadMore.js";
import {Slider} from "element-ui";

export default {

    components:{
        "el-slider":Slider
    },

    data(){
        return {
            homeNum:null,
            url:"",
            flag:true,
            num:50
        }
    },

    mounted() {
        console.log("这是home组件的mounted");

        // this.m1();
    },

    // mixins是组件的混入项，组件配置对象中可以混入多个混入项，添加混入项之后，就相当于把混入项对象中提供的data,methods等内容导入到了本组件中，从而可以实现组件逻辑的复用。
    mixins:[loadMore],

    methods: {
        m1(){
            // console.log("home组件中的m1方法");

            this.$alert("内容","标题",{
                confirmButtonText:"我知道了"
            });
        }
    },





    // methods: {
    //     queryData(){
    //         this.axios.get("/api")
    //         .then(res=>{
    //             this.data = res.data;
    //         })
    //     }
    // },

    
}



</script>


<style scoped>
    #slider{
        width: 200px;
    }
</style>