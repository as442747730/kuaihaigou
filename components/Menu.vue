<template>
  <!-- 个人中心 左侧菜单 -->
  <div class="u-menu">
    <div class="menu-wrapper">
      <div class="menu-ul">
        <div :class="['menu-li', m.key]" v-for="m in menuList" :key="m.key" @click="linkTo(m.url)">
          {{ m.name }}
          <i v-if="m.num !== 0 && m.key === 'msg'"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'u-menu',
    props: {
      notifyNum: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        menuList: [
          { name: '我的消息', key: 'msg', url: '/message', num: 0 },
          { name: '我的评论', key: 'comment', url: '/mine/comment' },
          { name: '发票信息', key: 'invo', url: '/invoice/list' },
          { name: '地址管理', key: 'address', url: '/address/list' },
          { name: '我的优惠券', key: 'coupon', url: '/coupon/list' },
          { name: '售后记录', key: 'after', url: '/aftersale/list' },
          { name: '账号管理', key: 'account', url: '/account/mgnumber' },
          { name: '资质认证', key: 'certif', url: '/prove' },
          { name: '打赏记录', key: 'reward', url: '/mine/reward' },
          { name: '服务中心', key: 'service', url: '/help' }
        ]
      }
    },
    watch: {
      notifyNum (val) {
        console.log(val)
        this.menuList[0].num = val
      }
    },
    methods: {
      linkTo (val) {
        window.location.href = val
      }
    }
  }
</script>

<style lang="less" scoped>
.u-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 11;
  .menu-wrapper {
    width: 250px;
    height: 100vh;
    box-sizing: border-box;
    background: white;
    .menu-ul {
      padding-top: 16px;
      padding-left: 20px;
      overflow: scroll;
      .menu-li {
        padding-left: 41px;
        background-size: 26px 26px;
        height: 26px;
        line-height: 26px;
        background-position: left center;
        background-repeat: no-repeat;
        font-size: 15px;
        color: @cor_333;
        font-weight: bold;
        margin-bottom: 25px;
        position: relative;
        i {
          position: absolute;
          min-width: 8PX;
          height: 8PX;
          background: #ff3333;
          border-radius: 50%;
          font-size: 10px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          top: 8px;
          left: 110px;
        }
        &.msg {
          background-image: url('~/assets/img/me/icon-msg.png');
        }
        &.invo {
          background-image: url('~/assets/img/me/icon-invo.png');
        }
        &.address {
          background-image: url('~/assets/img/me/icon-address.png');
        }
        &.coupon {
          background-image: url('~/assets/img/me/icon-coupon.png');
        }
        &.after {
          background-image: url('~/assets/img/me/icon-after.png');
        }
        &.account {
          background-image: url('~/assets/img/me/icon-account.png');
        }
        &.certif {
          background-image: url('~/assets/img/me/icon-certif.png');
        }
        &.reward {
          background-image: url('~/assets/img/me/icon-reward.png');
        }
        &.service {
          background-image: url('~/assets/img/me/icon-service.png');
        }
      }
    }
  }
}
</style>
