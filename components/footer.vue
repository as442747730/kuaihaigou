<template>
  <footer>
    <span class="footer-icon cur">
      <i class="footer-icon-index"></i>
      <span class="footer-txt">
        首页
      </span>
    </span>
    <span class="footer-icon">
      <i class="footer-icon-xjzx" @click="gotoWine"></i>
      <span class="footer-txt">
        选酒中心
      </span>
    </span>
    <span class="footer-icon">
      <i class="footer-icon-add"></i>
    </span>
    <span class="footer-icon">
      <i class="footer-icon-zsfx"></i>
      <span class="footer-txt">
        知识分享
      </span>
    </span>
    <span class="footer-icon">
      <i class="footer-icon-my" @click="gotoLogin"></i>
      <span class="footer-txt">
        我的
      </span>
    </span>
  </footer>
</template>
<script>
  export default {
    name: 'u-footer',

    data() {
      return {
      }
    },

    methods: {
      gotoLogin () {
        window.location.href = '/account/login'
      },
      gotoWine () {
        window.location.href = '/winecenter'
      }
    }

  }
</script>
<style lang="less" scoped>
footer {
  font-size: 0;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 49px;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px; 
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff; 
  z-index: 9999;
  .footer-icon {
    display: block;
    text-align: center;
    color: #333;
    &.cur {
      .footer-txt {
        color: #093C79
      }
    }
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    &-index {
      background-image: url('~/assets/img/home/ic_home_ele@2x.png');
    }
    &-xjzx {
      background-image: url('~/assets/img/home/ic_mall_nor@2x.png');
    }
    &-add {
      width: 43px!important;
      height: 33px!important;
      background-image: url('~/assets/img/home/icon_ic_fabu_43x33@2x.png');
    }
    &-zsfx {
      background-image: url('~/assets/img/home/ic_applets_nor@2x.png');
    }
    &-my {
      background-image: url('~/assets/img/home/ic_us_nor@2x.png');
    }
  }
  .footer-txt {
    display: block;
    font-size: 10px;
    color: #C7CCD7;
  }
}
</style>
