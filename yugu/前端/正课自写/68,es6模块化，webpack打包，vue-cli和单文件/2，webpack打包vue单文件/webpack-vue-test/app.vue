<!-- .vue是vue的单文件组件，这个文件中创建并导出一个组件配置对象 -->
<!-- .vue文件中分为三部分
    1.组件的模板，2.组建的配置对像，3.组件的样式
-->


<!-- 1.组件的模版，写在template中 -->
<template>
    <div>
        <h1 class="msg">{{msg}}</h1>
    </div>
</template>

<!-- 2.script标签中导出组件的配置对像 -->
<script>
    export default {
        // 单文件组件中，模版直接写在template中，多疑配置对象中不用在写template
        data() {
            return {
                msg:"hello world"
            }
        },
    }
</script>
<!-- 组件的样式写在style标签中 -->
<style>
    .msg{
        color: aqua;
    }
</style>