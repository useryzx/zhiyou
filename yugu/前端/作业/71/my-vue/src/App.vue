<template>
  <div id="app">

    <router-view id="r-view" />

    <van-tabbar v-model="activeIndex" :border=true id="tabbar">
      <van-tabbar-item to="/">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ?homeIconH: homeIcon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/find">
        <span>发现</span>
        <template #icon="props">
          <img :src="props.active ?findIconH: findIcon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/order">
        <span>订单</span>
        <template #icon="props">
          <img :src="props.active ?orderIconH: orderIcon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ?userIconH: userIcon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import homeIcon from './assets/home.jpg'
  import homeIconH from './assets/home-h.jpg'
  import findIcon from './assets/find.jpg'
  import findIconH from './assets/find-h.jpg'
  import orderIcon from './assets/order.jpg'
  import orderIconH from './assets/order-h.jpg'
  import userIcon from './assets/user.jpg'
  import userIconH from './assets/user-h.jpg'


  export default {
    data() {
      return {
        homeIcon,
        homeIconH,
        findIcon,
        findIconH,
        orderIcon,
        orderIconH,
        userIcon,
        userIconH,
        activeIndex: 0
      }
    },
    mounted() {
      this.$router.afterEach((to, from) => {
        // to and from are both route objects.
        this.checkActiveIndex(to.path);
      })
    },
    methods: {
      checkActiveIndex(to) {
        switch (to) {
          case "/":
            this.activeIndex = 0;
            break;
          case "/find":
            this.activeIndex = 1;
            break;
          case "/order":
            this.activeIndex = 2;
            break;
          case "/user":
            this.activeIndex = 3;
            break;
          default:
            break;
        }
      }
    },
  }
</script>

<style scoped>
  #tarbar {
    border-top: 1px solid #999;
  }

  #r-view {
    height: 100vh;
    padding-bottom: 50px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
</style>