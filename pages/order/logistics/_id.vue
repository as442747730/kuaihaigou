<template>
  <div class="u-logistics" position="right">
    <ul class="u-logistics-item" v-if='!logisDetailShow'>
      <li class="u-logistics-list" v-for='($v, $k) in logisData.deliverBillList' :key='$k' @click='logisDetail($v)'>
        <div class="box">
          <p>物流公司：<span>{{ $v.logisticsCompany }}</span></p>
          <p>物流单号：<span>{{ $v.logisticsBillIdentify || '暂未揽件' }}</span></p>
          <p style="margin: 0">包含商品：<span>{{ countNum($v.deliverBillItemResp) }}件</span></p>
        </div>
        <van-icon name="arrow" />
        <div class="depart-line"></div>
      </li>
    </ul>
    <van-popup class="u-logistics" v-model="logisDetailShow" position="right" :overlay='false'>
      <div class="u-logistics-order">
        <p>物流单号：{{ detailData.logisticsBillIdentify || '暂无物流单号' }}</p>
        <p>物流公司：{{ detailData.logisticsCompany || '暂无' }}</p>
      </div>
      <div class="depart-line"></div>
      <div class="u-logistics-goods">
        <h3 class="font_medium">商品详情</h3>
        <p v-for='($v2, $k2) in detailData.deliverBillItemResp' :key='$k2'><i>·</i> {{ $v2.goodsName }} &nbsp; x {{ $v2.deliverNum }}</p>
      </div>
      <div class="depart-line"></div>
      <div class="u-logistics-detail">
        <h3>物流详情</h3>
        <ul>
          <li class="u-logistics-detail-list" v-for='($v3, $k3) in traces' :key='$k3'>
            <i class="ib-top"></i>
            <div class="desc ib-middle">
              <p>{{ $v3.AcceptStation }}</p>
              <p class="rs">{{ $v3.AcceptTime }}</p>
            </div>
          </li>
        </ul>
        <div class="no-msg" v-if='tracesEmpty'>暂无物流信息！</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { orderApi } from '~/api/order'
export default {
  name: '',

  layout: 'default',

  head () {
    return {
      title: '订单跟踪',
      meta: [
        { hid: 'title', name: 'title', content: '订单跟踪' }
      ]
    }
  },

  async asyncData (req) {
    let logisDetailShow = false
    let detailData = {}
    const { code, data } = await orderApi.getOrderDetail(req.params.id, req)
    if (code === 200) {
      if (data.deliverBillList.length === 1) {
        logisDetailShow = true
        detailData = data.deliverBillList[0]
      }
    }
    return { logisData: data, logisDetailShow: logisDetailShow, detailData: detailData }
  },

  data () {
    return {
      logisDetailShow: true,
      detailData: {}, // 物流详细
      logisData: {},
      traces: [],
      tracesEmpty: false
    }
  },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.logisDetailShow = false
        this.tracesEmpty = false
      }
    }
  },

  async created () {
    if (this.logisDetailShow) {
      const { code, data } = await orderApi.queryTrack(this.detailData.logisticsCompany, this.detailData.logisticsBillIdentify)
      if (code === 200) {
        this.traces = JSON.parse(data).Traces
        if (this.traces.length === 0) this.tracesEmpty = true
      }
    }
    // console.log(this.traces)
    console.log(this.logisData)
  },

  methods: {
    async logisDetail (val) {
      const Toast1 = this.$toast.loading({
        duration: 0,
        message: '物流数据获取中'
      })
      const { code, data } = await orderApi.queryTrack(val.logisticsCompany, val.logisticsBillIdentify)
      if (code === 200) {
        this.detailData = val
        console.log(this.detailData)
        Toast1.clear()
        this.logisDetailShow = true
        window.location.hash = 'logisDetail'
        this.traces = JSON.parse(data).Traces
        console.log(this.traces)
        if (this.traces.length === 0) {
          this.tracesEmpty = true
        }
      } else {
        Toast1.clear()
        this.$toast(data)
      }
    },
    countNum (array) {
      let total = 0
      array.forEach(v => {
        total += v.deliverNum
      })
      return total
    }
  }
}
</script>
<style lang="less">
.u-logistics {
  width: 100vw;
  height: 100vh;
  &-list {
    position: relative;
    .box {
      padding: 20px;
    }
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
      margin-bottom: 10px;
      line-height: 18px;
      padding-left: 7px;
      position: relative;
      i {
        position: absolute;
        left: 0;
      }
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
    p {
      line-height: 24px;
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
    .no-msg {
      text-align: center;
      color: @cor_333;
      font-size: 13px;
      margin: 20px 0;
    }
  }
}
</style>
