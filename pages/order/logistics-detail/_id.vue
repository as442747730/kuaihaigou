<template>
  <div class="m-order-logistics-detail">

    <div class="detail-head">
      <p class="detail-head-item"><span>物流公司：</span>顺丰快递</p>
      <p class="detail-head-item"><span>物流单号：</span>10203920944343443<span class="btn">复制</span></p>
      <p class="detail-head-item"><span>包含商品：</span>4件</p>
    </div>

    <div class="detail-body">
      <div class="title">物流详情</div>
      <div class="stage-wrapper">
        <div class="stage-li" v-for="(item, index) in stageList" :key="index">
          <p class="li-title">{{ item.txt }}</p>
          <p class="li-date">{{ item.date }}</p>
          <i class="icon-point"></i>
        </div>
        <!-- <div class="stage-li">
          <p class="li-title">到达目的地网点广东深圳公司，快件将很快进行派送</p>
          <p class="li-date">2018-09-09 12:33:22</p>
          <i class="icon-point"></i>
        </div>
        <div class="stage-li">
          <p class="li-title">在广东深圳公司进行发出扫描</p>
          <p class="li-date">2018-09-09 12:33:22</p>
          <i class="icon-point"></i>
        </div> -->
      </div>
    </div>

  </div>
</template>
<script>
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

  data () {
    return {
      stageList: [
        { txt: '订单已签收，期待再次为您服务', date: '2018-09-09 12:33:22' },
        { txt: '到达目的地网点广东深圳公司，快件将很快进行派送', date: '2018-09-09 12:33:22' },
        { txt: '在广东深圳公司进行发出扫描', date: '2018-09-09 12:33:22' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.m-order-logistics-detail {
  min-height: 100vh;
  background: @cor_border;
  .detail-head {
    padding: 36px 20px 57px 20px;
    margin-bottom: 10px;
    background: white;
    &-item {
      color: @cor_666;
      font-size: 13px;
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      span {
        color: @cor_333;
        font-weight: bold;
      }
      .btn {
        color: #03A1CD;
        float: right;
      }
    }
  }
  .detail-body {
    background: white;
    padding: 25px 20px 40px 20px;
    .title {
      font-size: 17px;
      font-weight: bold;
      color: @cor_333;
      margin-bottom: 25px;
    }
    .stage-wrapper {
      .stage-li {
        margin-left: 8px;
        padding-left: 20px;
        box-sizing: border-box;
        position: relative;
        &:not(:last-child) {
          padding-bottom: 40px;
        }
        .li-title {
          font-size: 15px;
          color: @cor_333;
          line-height: 20px;
        }
        .li-date {
          margin-top: 10px;
          font-size: 13px;
          color: @cor_999;
        }
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          width: 2PX;
          height: 100%;
          background: #EBEBEB;
        }
        // 只有一个的时候
        &:nth-last-child(1):first-child {
          &::before {
            display: none;
          }
        }
        &:first-child {
          border-left: none;
          &::before {
            height: 100%;
            top: 10px;
          }
          .icon-point {
            background: #03A1CD;
            background-clip: padding-box;
            border: 4PX solid rgba(3,161,205,0.3);
            left: -8px;
            top: 0;
          }
        }
        &:last-child {
          border-left: none;
          &::before {
            height: 10px;
            top: 0;
          }
        }
        .icon-point {
          position: absolute;
          width: 10px;
          height: 10px;
          display: block;
          background: #EBEBEB;
          border-radius: 100%;
          left: -4px;
          top: 6px;
        }
      }
    }
  }
}
</style>
