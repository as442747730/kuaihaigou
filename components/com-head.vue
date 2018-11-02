<template>
  <header>
    <span class="icon_back"></span>
    <h3 class="title">{{titleConfig}}</h3>
  </header>
</template>
<script>
export default {
  props: {
    titleConfig: {
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
header {
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #F1F1F1;
  position: relative;
  line-height: 1;
  font-size: 12px;

  .icon_back {
    position: absolute;
    top: 0;
    left: 0;
    width: 45px;
    height: 100%;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 14px;
      margin-top: -7px;
      margin-left: -4px;
      background-image: url('~/assets/img/Icons/ic_return_b_30x30@2x.png');
      background-position: 50% 50%;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  .title {
    font-size: 17px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
}
</style>