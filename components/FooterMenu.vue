<template>
  <div class="u-footer-menu">
    <div class="subs-icon"></div>
  </div>
</template>

<script>
export default {
  name: 'uFooterMenu',

  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.u-footer-menu {
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 21; // footer的z-index为20
  .subs-icon {
    width: 55px;
    height: 55px;
    background-image: url(~/assets/img/knowledge/icon-article.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
