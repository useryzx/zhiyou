import Vue from 'vue'
import Setting from './Setting.vue'
// import router from '../../router'
import env from "../../env.js";

Vue.config.productionTip = env.productionTip;

new Vue({
  render: h => h(Setting)
}).$mount('#app')
