<template>
  <header>
    <span class="icon_back" @click="goback"></span>
    <h3 class="title">{{titleConfig}}</h3>
    <slot></slot>
  </header>
</template>
<script>
export default {
  props: {
    titleConfig: {
      type: String
    }
  },
  methods: {
    goback () {
      console.log('1234561')
      console.log(window.location.hash, 'hash')
      if (window.location.hash === '#editinfo') {
        this.$bus.emit('closeHead', false)
      }
      this.$router.go(-1)
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
  border-bottom: 1PX solid #F1F1F1;
  position: relative;
  line-height: 1;
  font-size: 12px;
  background: #fff;

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
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
}
</style>