import Vue from 'vue'
import App from './App.vue'
// import router from '../../router'
import env from "@/env.js"
Vue.config.productionTip = env.productionTip

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
