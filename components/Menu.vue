<template>
  <!-- 个人中心 左侧菜单 -->
  <div class="u-menu">
    <div class="menu-wrapper">
      <div class="menu-ul">
        <div :class="['menu-li', m.key]" v-for="m in menuList" :key="m.key" @click="linkTo(m.url)" v-if="m.key !== 'out'">{{ m.name }}</div>
        <div v-else :class="['menu-li', m.key]" :key="m.key" @click='loginOut'>{{ m.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { userApi } from '@/api/users'
  export default {
    name: 'u-menu',
    data () {
      return {
        menuList: [
          { name: '我的消息', key: 'msg', url: '' },
          { name: '发票信息', key: 'invo', url: '/invoice/list' },
          { name: '地址管理', key: 'address', url: '/address/list' },
          { name: '我的优惠券', key: 'coupon', url: '/coupon/list' },
          { name: '售后记录', key: 'after', url: '/aftersale/list' },
          { name: '账号管理', key: 'account', url: '/account/mgnumber' },
          { name: '资质认证', key: 'certif', url: '/prove' },
          { name: '打赏记录', key: 'reward', url: '/mine/reward' },
          { name: '服务中心', key: 'service', url: '' },
          { name: '退出登录', key: 'out', url: 'javascript:void(0)' }
        ]
      }
    },
    methods: {
      linkTo (val) {
        window.location.href = val
      },
      async loginOut () {
        const { code } = await userApi.loginOut()
        if (code === 200) {
          this.$toast('登出成功')
          setTimeout(() => {
            window.location.reload()
          }, 1000)
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
