import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RoomList from '../views/RoomList.vue'


// 在Vue项目中使用vue的各种插件时，需要使用Vue.use进行注册。
Vue.use(VueRouter);

const routes = [
    {path:"/",component:Home},
    {path:"/home/roomlist",component:RoomList}
]

const router = new VueRouter({
    routes
})

export default router
