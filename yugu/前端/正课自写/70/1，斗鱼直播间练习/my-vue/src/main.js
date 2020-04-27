import Vue from 'vue'
import App from './App.vue'
import router from './router'



// 把axios放在组件原型中，所有组件都可以访问这个属性
import axios from "axios"
Vue.prototype.axios = axios


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')