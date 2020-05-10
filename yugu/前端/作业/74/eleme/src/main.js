import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "./vantConfig.js";
import "./index.css";

Vue.config.productionTip = false

import axios from "axios";

Vue.prototype.http = axios;

import store from './store/store.js'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')