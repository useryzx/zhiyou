import Vue from 'vue'
import Second from './Second.vue'
// import router from '../../router'
import env from "../../env.js";

Vue.config.productionTip = env.productionTip;

new Vue({
  render: h => h(Second)
}).$mount('#app')
