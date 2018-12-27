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
      </div>
      <div class="depart-line"></div>
      <div class="u-logistics-goods">
        <h3 class="font_medium">商品详情</h3>
        <p>· 法国1982拉菲法国1982拉菲传奇Lafite</p>
        <p>· 法国1982拉菲法国1982拉菲传奇Lafite</p>
        <p>· 法国1982拉菲法国1982拉菲传奇Lafite</p>
        <p>· 法国1982拉菲法国1982拉菲传奇Lafite</p>
      </div>
      <div class="depart-line"></div>
      <div class="u-logistics-detail">
        <h3>物流详情</h3>
        <ul>
          <li class="u-logistics-detail-list" v-for='($v2, $k2) in traces' :key='$k2'>
            <i class="ib-top"></i>
            <div class="desc ib-middle">
              <p>{{ $v2.AcceptStation }}</p>
              <p class="rs">{{ $v2.AcceptTime }}</p>
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
      logisDetailShow: false,
      detailData: {}, // 物流详细
      traces: []
    }
  },

  methods: {
    turnBack () {
      this.$emit('parent-event', false)
      // location.href = 'javascript:history.go(-1)'
      window.location.hash = '#'
    },
    async logisDetail (val) {
      const Toast1 = this.$toast.loading('物流数据获取中')
      const { code, data } = await orderApi.queryTrack(val.logisticsCompany, val.logisticsBillIdentify)
      if (code === 200) {
        this.detailData = val
        Toast1.clear()
        this.logisDetailShow = true
        window.location.hash = 'logisDetail'
        this.traces = JSON.parse(data).Traces
        console.log(this.traces)
      } else {
        Toast1.clear()
        this.$toast(data)
      }
    },
    backLast () {
      window.location.hash = 'logis'
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
  &-goods {
    padding: 20px;
    h3 {
      font-size: 13px;
      color: #333;
      font-weight: bold;
      margin-bottom: 15px;
    }
    p {
      color: #666;
      font-size: 13px;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &-order {
    padding: 20px;
    color: @cor_333;
    font-size: 13px;
    font-family: 'PingFangSC-Medium';
    font-weight: bold;
    span {
      font-weight: normal;
      color: @cor_666;
    }
  }
  &-detail {
    padding: 20px;
    h3 {
      color: #333;
      font-size: 13px;
      margin-bottom: 25px;
    }
    &-list {
      padding-bottom: 30px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: 2px;
        background: #EBEBEB;
        left: 8px;
        height: 100%;
        top: 8px;
      }
      &:last-child:before {
        display: none;
      }
      &:not(:first-child) {
        i {
          background: transparent; 
          &:after {
            background: #EBEBEB!important;
          }
        }
      }
      i {
        position: relative;
        display: inline-block;
        width: 18px;
        height: 18px;
        background: #b3e2f0;
        border-radius: 50%;
        margin-right: 12px;
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -5px;
          margin-top: -5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #03A1CD;
        }
      }
      .desc {
        width: calc(100% - 30px);
        p {
          color: #333;
          font-size: 15px;
          margin-bottom: 10px;
          line-height: 22px;
          &.rs {
            font-size: 12px;
            color: #999;
            line-height: 1;
          }
        }
      }
    }
  }
}
</style>