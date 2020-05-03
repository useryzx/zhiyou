import Vue from 'vue'
import App from './App.vue'
import router from './router'



import store from '@/store/store.js';
Vue.config.productionTip = false

new Vue({
  router,
  // store需要在根组件注入
  store,
  render: h => h(App)
}).$mount('#app')
