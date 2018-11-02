<template>
  <div class="m-demo">

    <uCoupon></uCoupon>

  </div>
</template>

<script>
import uCoupon from '~/components/Coupon'

export default {
  name: 'demo',

  head () {
    return {
      title: '测试页面',
      meta: [
        { hid: 'title', name: 'title', content: '测试页面' }
      ]
    }
  },

  components: {
    uCoupon
  },

  data () {
    return {
    }
  }

}
</script>

<style lang="less" scoped>
.m-demo {
  min-height: 100vh;
}
</style>