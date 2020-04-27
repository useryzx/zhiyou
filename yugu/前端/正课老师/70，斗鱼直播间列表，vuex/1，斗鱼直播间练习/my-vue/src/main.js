import Vue from 'vue'
import App from './App.vue'
import router from './router'



// Array.prototype.remove = function(el){
//     if(this.indexOf(el)>=0){
//         this.splice(this.indexOf(el),1);
//     }
// }
// let arr = ["a","b","c","d"];
// arr.remove("b");
// console.log(arr);



// 把axios放在组件圆形中，所有组件对象都可以访问这个属性。
import axios from "axios";
Vue.prototype.axios = axios;


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
