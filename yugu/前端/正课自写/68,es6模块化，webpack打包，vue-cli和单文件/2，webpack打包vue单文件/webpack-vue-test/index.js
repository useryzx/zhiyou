
import Vue from "vue";
// 导入入口组件
import App from "./app.vue"
const root= new Vue({
    // 使用webpack打包vue项目时，需要手动挂载根组件
    render(h){
        return h(App);
    }
});
root.$mount("#app");