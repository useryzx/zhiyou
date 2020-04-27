<!-- .vue文件是vue的单文件组件，这个文件中创建并导出一个组件配置对象 -->

<!-- 
    .vue文件中分为3个部分：
    组件的模板
    组件的配置对象
    组件的样式
 -->


 <!-- 组件的模板，写在template标签中 -->
<template>
    <div>
        <h1 class="title">{{msg}}</h1>
    </div>
</template>


<!-- script标签中导出组件的配置对象 -->
<script>
    
export default {
    // 单文件组件中，模板直接写在template标签中，所以配置对象中不需要再写template
    data(){
        return {
            msg:"helloworld"
        }
    }
}
</script>


<!-- 组件的样式，写在style标签中 -->
<style>
    .title{
        color: red;
    }
</style>