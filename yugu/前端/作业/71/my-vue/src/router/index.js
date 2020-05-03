import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Find from '@/views/Find.vue'
import Order from '@/views/Order.vue'
import User from '@/views/User.vue'
import Login from '@/views/Login.vue'


// 在Vue项目中使用vue的各种插件时，需要使用Vue.use进行注册。
Vue.use(VueRouter);

const routes = [{
    path: "/",
    component: Home
  },
  {
    path: "/find",
    component: Find
  },
  {
    path: "/order",
    component: Order
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/user/login",
    component: Login
  },
  {
    path: "/home",
    component: User
  },

]

const router = new VueRouter({
  routes
})

export default router