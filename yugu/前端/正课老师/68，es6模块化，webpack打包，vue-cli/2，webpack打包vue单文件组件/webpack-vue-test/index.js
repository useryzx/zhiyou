
// 使用es6模块化导入从npm下载的Vue
import Vue from "vue";


// 导入入口组件。
import App from "./App.vue";


// 使用webpack打包vue项目时，需要手动挂载根组件
let root = new Vue({
    // 设置渲染函数
    render(h){
        return h(App);
    }
});

// 挂载跟组件
root.$mount("#app");

