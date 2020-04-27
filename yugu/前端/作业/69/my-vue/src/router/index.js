import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import RoomList from '@/views/RoomList.vue'
import Room from '@/views/Room.vue'

Vue.use(VueRouter)
const routes = [{
    path: "/",
    component: Home
  },
  {
    path: "/Home/RoomList",
    name:"name",
    component: RoomList
  },
  {
    path: "/Home/RoomList/room",
    name:"room",
    component: Room
  }
]

const router = new VueRouter({
  routes
})

export default router