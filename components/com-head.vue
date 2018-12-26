<template>
  <header>
    <span class="icon_back" @click="goback"></span>
    <h3 class="title">{{titleConfig}}</h3>
    <div class="h_r" @click="rbFn">
      <slot></slot>
    </div>
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
    rbFn () {
      this.$emit('headRigfn')
    },
    goback () {
      let path = this.$route.path
      switch (path) {
        case '/mine/person':
        case '/mine/follow':
        case '/invoice/list':
        case '/address/list':
        case '/coupon/list':
        case '/account/mgnumber':
          window.location.href = '/mine'
          break
        case '/account/mgphone':
          window.location.href = '/account/mgnumber'
          break
        case '/address/manage':
          window.location.href = '/address/list'
          break
        case '/address/add':
          window.location.href = '/address/manage'
          break
        case '/invoice/add':
          window.location.href = '/invoice/list'
          break
        case '/coupon/explain':
          window.location.href = '/coupon/list'
          break
        case '/encys':
          window.location.href = '/home'
          break
        case '/noun':
          window.location.href = '/encys'
          break
        default:
          console.log('未知页面')
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
header {
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1PX solid #F1F1F1;
  position: relative;
  line-height: 1;
  font-size: 12px;
  background: #fff;

  .icon_back {
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 45px;
    // height: 100%;
    position: relative;
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
  .h_r {
    padding-right: 20px;
    height: 100%;
    font-size:13px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(102,102,102,1);
    display: flex;
    justify-content: left;
    align-items: center;
  }
}
</style>