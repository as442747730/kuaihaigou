<template>
  <footer>
    <span
      class="footer-icon"
      :class="{cur: postIndex === index}"
      @click="toPage(index)"
      v-for="(foot, index) in footList"
      :key="index">
      <i :class="clsList[index]"></i>
      <span class="footer-txt" v-if="index !== 2">
        {{foot}}
      </span>
    </span>
  </footer>
</template>
<script>
  export default {
    name: 'u-footer',
    props: ['postIndex'],
    data () {
      return {
        clsList: ['footer-icon-index', 'footer-icon-xjzx', 'footer-icon-add', 'footer-icon-zsfx', 'footer-icon-my'],
        footList: ['首页', '选酒中心', 'add', '知识分享', '我的']
      }
    },
    methods: {
      toPage (index) {
        let path = ''
        switch (index) {
          case 0:
            path = '/home'
            break
          case 1:
            path = '/winecenter'
            break
          case 4:
            path = '/account/login'
            break
          default:
            path = '/home'
            break
        }
        window.location.href = path
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
  z-index: 20;
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
      background-image: url('~/assets/img/foot/ic_home_nor@2x.png');
    }
    &-xjzx {
      background-image: url('~/assets/img/foot/ic_mall_nor@2x.png');
    }
    &-add {
      width: 43px!important;
      height: 33px!important;
      background-image: url('~/assets/img/foot/icon_ic_fabu_43x33@2x.png');
    }
    &-zsfx {
      background-image: url('~/assets/img/foot/ic_applets_nor@2x.png');
    }
    &-my {
      background-image: url('~/assets/img/foot/ic_us_nor@2x.png');
    }
  }
  .footer-icon.cur {
    .footer-icon {
      &-index {
        background-image: url('~/assets/img/foot/ic_home_ele@2x.png');
      }
      &-xjzx {
        background-image: url('~/assets/img/foot/ic_mall_ele@2x.png');
      }
      &-zsfx {
        background-image: url('~/assets/img/foot/ic_applets_nor@2x.png');
      }
      &-my {
        background-image: url('~/assets/img/foot/ic_us_nor@2x.png');
      }
    }
  }
  .footer-txt {
    display: block;
    font-size: 10px;
    color: #C7CCD7;
  }
}
</style>
