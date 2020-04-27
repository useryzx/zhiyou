<template>
  <div id="app">
    <router-view class="rv" />
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .rv{
    height: 100vh;
    padding-top: 64px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
</style>