<template>
  <div class="adapter-ipx">
    <div  class="footer">
      <span
        class="footer-icon"
        :class="{ cur: postIndex.includes(foot.path) }"
        @click="toPage(foot.path)"
        v-for="(foot, index) in footList"
        :key="index">
        <i :class="clsList[index]"></i>
        <span class="footer-txt" v-if="index !== 2">{{ foot.name }}</span>
      </span>

    </div>

  </div>
</template>
<script>
export default {
  name: 'u-footer',
  props: ['postIndex'],
  data () {
    return {
      clsList: ['footer-icon-index', 'footer-icon-xjzx', 'footer-icon-add', 'footer-icon-zsfx', 'footer-icon-my'],
      footList: [
        { name: '首页', path: '/home' },
        { name: '选酒中心', path: '/winecenter' },
        { name: 'add' },
        { name: '知识分享', path: '/knowledge' },
        { name: '我的', path: '/mine' }
      ]
    }
  },
  methods: {
    toPage (path) {
      if (!path) {
        // todo 发布文章入口
        this.canvalToBGblur()
        return
      }
      window.location.href = path
    }
  }
}
</script>
<style lang="less" scoped>
.footer {
  font-size: 0;
  border-top: 1PX solid #eee;
  // box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 49px;
  justify-content: space-around;
  align-items: center;
  // padding: 0 24px;
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
        color: #093C79;
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
        background-image: url('~/assets/img/foot/ic_us_ele@2x.png');
      }
    }
  }
  .footer-txt {
    display: block;
    font-size: 10px;
    line-height: 1;
    color: #C7CCD7;
  }
}
</style>
