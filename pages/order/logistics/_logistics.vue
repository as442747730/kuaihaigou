<template>
  <div class="m-order-logistics">

    <van-pull-refresh class="van-refresh" v-model="refreshing" @refresh="onRefresh">

      <div class="logistics-wrapper">

        <div class="logistics-item" v-for="(item, index) in deliverList" :key="index">
          <p class="logistics-item-content">物流公司：<span>顺丰快递</span></p>
          <p class="logistics-item-content">物流单号：<span>1293849824243434</span></p>
          <p class="logistics-item-content">包含商品：<span>4件</span></p>
        </div>

      </div>

    </van-pull-refresh>

  </div>
</template>
<script>
export default {
  validate ({ params }) {
    console.log(params)
    return /^\d+$/.test(params.logistics)
  },

  name: '',

  layout: 'default',

  async asyncData (req) {

  },

  head () {
    return {
      title: '物流清单',
      meta: [
        { hid: 'title', name: 'title', content: '物流清单' }
      ]
    }
  },

  data () {
    return {
      refreshing: false,
      deliverList: [1, 2]
    }
  },

  methods: {
    // 刷新
    onRefresh () {

    }
  }
}
</script>

<style lang="less" scoped>
.m-order-logistics {
  min-height: 100vh;
  background: @cor_border;
  .van-refresh {
    min-height: 100vh;
  }
  .logistics-wrapper {
    transition: 0ms;
    transform: translate3d(0, 0px, 0);

    .logistics-item {
      margin-bottom: 10px;
      padding: 20px;
      background: white;
      font-size: 13px;
      color: @cor_666;
      font-weight: 400;
      background-image: url('~/assets/img/order/icon-arrow.png');
      background-position: calc(100% - 20px) center;
      background-repeat: no-repeat;
      background-size: 14px 14px;
      span {
        color: @cor_333;
        font-weight: bold;
      }
      &-content {
        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>
