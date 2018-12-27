<template>
  <van-popup class="u-logistics" v-model="logisShow" position="right">
    <section class="u-detail_header">
      <van-nav-bar title="物流清单" left-arrow @click-left='turnBack'></van-nav-bar>
    </section>
    <ul class="u-logistics-item">
      <li class="u-logistics-list" v-for='($v, $k) in logisData' :key='$k' @click='logisDetail($v)'>
        <p>物流公司：<span>{{ $v.logisticsCompany }}</span></p>
        <p>物流单号：<span>{{ $v.logisticsBillIdentify }}</span></p>
        <p style="margin: 0">包含商品：<span>4件</span></p>
        <van-icon name="arrow" />
      </li>
      <div class="depart-line"></div>
    </ul>
    <van-popup class="u-logistics" v-model="logisDetailShow" position="right" :overlay='false'>
      <section class="u-detail_header">
        <van-nav-bar title="订单跟踪" left-arrow @click-left='backLast'></van-nav-bar>
      </section>
      <div class="u-logistics-order">
        <p>物流单号：{{ detailData.logisticsBillIdentify }}</p>
        <div class="depart-line"></div>
      </div>
      <div class="u-logistics-detail">
        <h3>物流详情</h3>
        <ul>
          <li class="u-logistics-detail-list">
            <i></i>
            <div class="desc">
              <p>订单已签收</p>
              <span>2017-04-01 12:00:00</span>
            </div>
          </li>
        </ul>
      </div>
    </van-popup>
  </van-popup>
</template>

<script>
import { orderApi } from '~/api/order'
export default {
  name: 'uLogistics',

  props: {
    logisData: {
      type: Array,
      default: () => []
    },
    logisShow: {
      type: Boolean,
      default: false
    }
  },

  model: {
    prop: 'logisShow',
    event: 'parent-event'
  },

  watch: {
    $route (to, from) {
      if (to.hash === '#logis') {
        this.logisDetailShow = false
      }
    }
  },

  data () {
    return {
      logisDetailShow: true,
      detailData: {} // 物流详细
    }
  },

  methods: {
    turnBack () {
      this.$emit('parent-event', false)
      location.href = 'javascript:history.go(-1)'
    },
    async logisDetail (val) {
      const Toast1 = this.$toast.loading('物流数据获取中')
      const { code, data } = await orderApi.queryTrack(val.logisticsCompany, val.logisticsBillIdentify)
      if (code === 200) {
        this.detailData = val
        Toast1.clear()
        this.logisDetailShow = true
        window.location.hash = 'logisDetail'
        console.log(data)
      } else {
        Toast1.clear()
        this.$toast(data)
      }
    },
    backLast () {
    }
  }
}
</script>

<style lang="less">
.u-logistics {
  width: 100vw;
  height: 100vh;
  &-item {

  }
  &-list {
    padding: 20px;
    position: relative;
    p {
      color: @cor_333;
      font-size: 13px;
      font-family: 'PingFangSC-Medium';
      margin-bottom: 15px;
      font-weight: bold;
      span {
        font-weight: normal;
        color: @cor_666;
      }
    }
    .van-icon {
      position: absolute;
      top: 50%;
      font-size: 14px;
      transform: translate(-50%, -50%);
      right: 0;
      font-weight: bold;
      color: #666;
    }
  }
  &-order {
    
  }
  &-detail-list {

  }
}
</style>