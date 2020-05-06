import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


import {
  Switch,
  MessageBox,
  Button
} from "element-ui";

Vue.use(Switch)
.use(Button);

// 通过代码使用的组件，需要注册到组件原型上。
Vue.prototype.$alert = MessageBox.alert;



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
