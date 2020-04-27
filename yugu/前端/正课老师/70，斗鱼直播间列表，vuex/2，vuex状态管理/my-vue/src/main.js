import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store.js"

Vue.config.productionTip = false




new Vue({
  router,
  render: h => h(App),
  // store需要在根组件中注入
  store
}).$mount('#app')
