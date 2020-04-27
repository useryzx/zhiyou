<template>
  <div id="app">

    <transition :name="aniType">
      <keep-alive>
        <router-view class="r-view"></router-view>
      </keep-alive>
    </transition>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        aniType: ""
      }
    },
    mounted() {

      this.$router.afterEach((to, from) => {
        let toRoute = to.path.split("/").length - 1;
        let fromRoute = from.path.split("/").length - 1;
        if (toRoute < fromRoute) {
          this.aniType = "right"
        } else if (toRoute > fromRoute) {
          this.aniType = "left"
        } else {
          this.aniType = ""
        }
      })
    },
  }
</script>
<style>
  html {
    overflow-x: hidden;
  }

  .r-view {
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
    position: absolute;
    top: 0;
    background-color: white;
  }

  .left-leave,
  .left-enter-to,
  .right-leave,
  .right-enter-to {
    left: 0;
  }

  .left-leave-active,
  .left-enter-active,
  .right-leave-active,
  .right-enter-active {
    transition: all 0.5s;
  }

  .left-leave-to,
  .right-enter {
    left: -100%;
  }

  .left-enter,
  .right-leave-to {
    left: 100%;
  }

</style>