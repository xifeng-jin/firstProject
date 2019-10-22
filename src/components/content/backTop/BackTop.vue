<template>
  <div class="backTop">
    <img src="~assets/image/common/top.png" alt="none">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .backTop {
    position: fixed;
    bottom: 55px;
    right: 4px;

    z-index: 9;
  }
  .backTop img {
    width: 43px;
    height: 43px;
  }
</style>
