<template>
  <div class="u-cpms">
    <transition name="fade">
      <div class="modal"></div>
    </transition>
  </div>
</template>
<style lang="less" scoped>
  .u-cpms {
    position: fixed;
    top: 90px;
    left: 0;
    bottom: 0;
    z-index: 30;
    background: rgba(0,0,0,0.6);
    background: pink;
    width: 100%;
    height: 100vh;
  }
</style>
