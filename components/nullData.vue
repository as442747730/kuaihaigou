<template>
  <div class="nulldata">
    <img class="null-logo" v-lazy="require('~/assets/img/pic_mpty_state_200x200@2x.png')" />
    <p class="null-world">{{tips}}</p>
  </div>
</template>
<script>
export default {
  props: {
    tips: {
      type: String,
      default: '暂无您想要查询的商品'
    }
  }
}
</script>
<style lang="less" scoped>
.nulldata {
  padding-top: 80px;
  height: calc(100vh - 180px);
  box-sizing: border-box;

  .null-logo {
    display: block;
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }

  .null-world {
    font-size: 14px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 14px;
    text-align: center;
  }

}
</style>