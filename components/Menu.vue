<template>
  <!-- 个人中心 左侧菜单 -->
  <div class="u-menu">
    <div class="menu-wrapper">
      <div class="menu-ul">
        <div :class="['menu-li', m.key]" v-for="m in menuList" :key="m.key" @click="topage(m.key)">{{ m.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'u-menu',
    data () {
      return {
        menuList: [
          { name: '我的消息', key: 'msg' },
          { name: '发票信息', key: 'invo' },
          { name: '地址管理', key: 'address' },
          { name: '我的优惠券', key: 'coupon' },
          { name: '售后记录', key: 'after' },
          { name: '账号管理', key: 'account' },
          { name: '资质认证', key: 'certif' },
          { name: '打赏记录', key: 'reward' },
          { name: '服务中心', key: 'service' }
        ]
      }
    },
    methods: {
      topage (key) {
        console.log('key', key)
        switch (key) {
          case 'invo':
            window.location.href = '/invoice/list'
            break
          case 'address':
            window.location.href = '/address/list'
            break
          case 'coupon':
            window.location.href = '/coupon/list'
            break
          case 'account':
            window.location.href = '/account/mgnumber'
            break
          default:
            console.log('暂未开放')
            break
        }
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
