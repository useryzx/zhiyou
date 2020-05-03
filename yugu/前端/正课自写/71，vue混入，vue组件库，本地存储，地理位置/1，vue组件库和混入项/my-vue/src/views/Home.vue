<template>
    <div>
        <h1>首页</h1>
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
        <el-slider v-model="num" class="slider">
        </el-slider>
        <el-button type="primary" @click="tip">按钮</el-button>
    </div>
</template>
<script>
    import loadMore from '../mixins/loadMore.js'
    import {
        Slider
    } from 'element-ui'
    export default {
        data() {
            return {
                homeNum: 1,
                value: true,
                num: 50
            }
        },
        mounted() {
            console.log(this);
            this.m1()
        },
        methods: {
            m1() {
                console.log("Home中的m1方法");
            },
            tip(){
                this.$alert("内容","标题",{
                    confirmButtonText:"Go"
                })
            }
        },
        // mixin是组件的混入项，组件的配置对象中可以混入多个混入项，添加混入项之后，就相当于把混入项对象中提供的data，methods等内容导入到了本组件中，从而实现组建逻辑的复用
        mixins: [loadMore],
        components: {
            "el-slider": Slider
        }
    }
</script>

<style scoped>
    .slider {
        width: 100px;
    }
</style>