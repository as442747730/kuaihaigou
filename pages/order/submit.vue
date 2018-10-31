<template>
  <div class="m-order-submit">

    <div class="m-section-position more-link">
      <span>添加收货地址</span>
    </div>

    <div class="m-section-cell">
      <div class="m-section-cell-item more-link small">
        <div class="label">优惠券</div>
        <span class="content">5张可用</span>
      </div>
      <div class="m-section-cell-item">
        <div class="label">优币抵扣<span class="tip">您有Hi币 2222个</span></div>
        <van-stepper ></van-stepper>
      </div>
    </div>

    <div class="m-section-cell">
      <div class="m-section-cell-item">
        <div class="label">商品合计</div>
        <div class="content">￥198</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">运费</div>
        <div class="content"><div class="badge">满88元包邮</div>0</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">优惠券</div>
        <div class="content">0</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">优币抵扣</div>
        <div class="content">0</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">活动优惠</div>
        <div class="content"><div class="badge">APP首单减免8元</div>0</div>
      </div>
    </div>

    <div class="m-section-cell">
      <div class="m-section-cell-item more-link small">
        <div class="label">发票信息</div>
        <div class="content"></div>
      </div>
    </div>

    <div class="m-section-bottom">
      <div class="m-section-bottom-left">应付金额：<span class="total">￥209</span></div>
      <div class="m-section-bottom-right active-status" >提交订单</div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'submit',
  layout: 'default',

  head () {
    return {
      title: '填写订单',
      meta: [
        { hid: 'title', name: 'title', content: '填写订单' }
      ]
    }
  },

  data () {
    return {
    }
  }

}
</script>
<style lang="less" scoped>
@import url('../../assets/css/var.less');
.m-order-submit {
  min-height: 100vh;
  font-size: 0;
  .m-section-position {
    height: 65px;
    background: #FFFFFF;
    position: relative;
    font-size: 15px;
    color: @cor_333;
    line-height: 65px;
    padding-left: 67px;
    margin-bottom: 10px;
    &::before {
      content: '';
      display: block;
      width: 17px;
      height: 21px;
      background-image: url('../../assets/img/order/icon-position.png');
      background-size: cover;
      background-position: center;
      position: absolute;
      top: 50%;
      left: 23px;
      transform: translate(0, -50%);
    }
  }

  .m-section-cell {
    padding: 0 20px;
    padding-top: 10px;
    background: #FFFFFF;
    margin-bottom: 10px;
    &-item {
      position: relative;
      padding: 20px 0 20px 0;
      display: flex;
      align-items: center;
      &:not(:last-child) {
        border-bottom: 1px solid #EEEEEE;
      }
      .label {
        flex: 1;
        font-size: 15px;
        font-color: @cor_333;
        .tip {
          padding-left: 10px;
          color: @cor_999;
          font-size: 13px;
        }
      }
      .content {
        font-size: 14px;
        color: @cor_666;
        .badge {
          display: inline-block;
          vertical-align: text-bottom;
          padding: 5px 6px;
          background: #FB6248;
          border-radius: 2px;
          color: white;
          font-size: 11px;
          margin-right: 6px;
        }
      }
      .van-stepper {
        padding-right: 10px;
      }
    }
  }

  .m-section-bottom {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    display: flex;
    align-items: flex-start;
    font-size: 0;
    &-left {
      flex: 1;
      font-size: 15px;
      color: @cor_333;
      line-height: 50px;
      padding-left: 20px;
      .total {
        font-size: 19px;
        color: #F99C00;
        font-family: Impact;
      }
    }
    &-right {
      width: 120px;
      height: 100%;
      line-height: 50px;
      text-align: center;
      background: #03A1CD;
      font-size: 15px;
      color: white;
    }
  }

  .more-link {
    &.small {
      padding-right: 32px;
      &:after {
        right: 10px;
      }
    }
    &:after {
      content: '';
      display: block;
      width: 6px;
      height: 9px;
      background-image: url('../../assets/img/order/icon-arrow-right.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translate(0, -50%);
    }
  }
}
</style>
