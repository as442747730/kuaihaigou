<template>
  <div class="u-coupon">

    <div class="u-coupon-cell" @click="noUseCoupon">
      <div class="title">不使用优惠券</div>
      <div :class="['u-checkbox', noUse ? 'active' : '']"></div>
    </div>
    <!-- 可用 -->
    <div class="u-coupon-cell" v-for="item in usableList" @click="selectCoupon(item)">
      <div class="left">
        <div class="left-content">
          <div class="price">￥<span>{{ item.faceValue }}</span></div>
          <p class="desc">满{{ item.useThreshold }}元可用</p>
        </div>
        <div class="right-content">
          <p class="title">全品类通用券</p>
          <p class="desc">适用平台：全平台</p>
          <p class="desc">有效期：{{ item.startTimeDesc }}-{{ item.endTimeDesc }}</p>
        </div>
      </div>
      <div :class="['u-checkbox', selectId === item.id ? 'active' : '']"></div>
    </div>
    <!-- 不可用 -->
    <!-- <div class="u-coupon-tip" v-if="unusableList.length !== 0">不可用优惠券</div>
    <div class="u-coupon-cell disabled" v-for="(item, index2) in unusableList" :key="index2">
      <div class="left">
        <div class="left-content">
          <div class="price">￥<span>{{ item.faceValue }}</span></div>
          <p class="desc">满{{ item.useThreshold }}元可用</p>
        </div>
        <div class="right-content">
          <p class="title">全品类通用券</p>
          <p class="desc">适用平台：全平台</p>
          <p class="desc">有效期：{{ item.startTimeDesc }}-{{ item.endTimeDesc }}</p>
        </div>
      </div>
      <div class="placeholder"></div>
    </div> -->

    <van-dialog v-model="transShow" :show-confirm-button="false" close-on-click-overlay>
      <div class="dialog-title font_medium">兑换优惠卷</div>
      <div class="dialog-body">
        <van-field v-model="codeNum" placeholder="请输入优惠券兑换码"></van-field>
        <div class="confirm-btn font_medium" @click="sendTransform">兑换</div>
      </div>
    </van-dialog>

    <div class="u-coupon-bottom">
      <a href="/coupon/explain" class="u-link">优惠券说明</a>
      <a @click='transShow = true'>兑换优惠卷</a>
    </div>

  </div>
</template>
<script>
  import { couponApi } from '~/api/coupon'
  export default {
    name: 'uCoupon',

    props: {
      amount: {
        type: String
      },
      usableList: {
        type: Array
      },
      unusableList: {
        type: Array
      }
    },

    data () {
      return {
        noUse: false,
        selectId: null,

        transShow: false, // 兑换弹窗
        codeNum: '' // 兑换码
      }
    },

    methods: {
      noUseCoupon () {
        this.noUse = true
        this.selectId = ''
        this.$emit('handleSelectCoupon', '')
      },
      selectCoupon (val) {
        this.noUse = false
        this.selectId = val.id
        this.$emit('handleSelectCoupon', val)
      },
      // 确认兑换
      async sendTransform () {
        const { code, data } = await couponApi.convertCoupon({ code: this.codeNum })
        if (code === 200) {
          this.$toast('兑换成功')
          this.transShow = false
          this.renderData()
        } else {
          this.$toast(data)
        }
      },
      async renderData () {
        const { code, data } = await couponApi.listForUsable(this.amount)
        if (code === 200) {
          this.$emit('changeCoupon', data)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.u-coupon {
  background: @cor_border;
  font-size: 0;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 10px 20px;
  padding-bottom: 50px;
  padding-top: 56px;
  overflow: scroll;
  &-cell {
    padding: 15px;
    background: white;
    border-radius: 2px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 15px;
      color: @cor_333;
    }

    &.disabled div {
      color: #CCCCCC!important;
    }
    &.disabled p {
      color: #CCCCCC!important;
    }

    .left {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      &-content {
        width: 85px;
        box-sizing: border-box;
        color: #FB6248;
        position: relative;
        .price {
          text-align: center;
          font-weight: bold;
          font-size: 15px;
          span {
            font-size: 29px;
          }
        }
        .desc {
          margin-top: 5px;
          text-align: center;
          font-size: 10px;
          font-weight: 200;
        }
        &::after {
          content: '';
          display: inline-block;
          width: 1PX;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
          height: 80%;
          background: #F1F1F1;
        }
      }
      .right-content {
        padding-left: 15px;
        .title {
          font-weight: bold;
          margin-bottom: 10px;
        }
        .desc {
          margin-top: 5px;
          font-size: 10px;
          font-weight: 100;
          color: @cor_999;
          white-space: nowrap;
        }
      }
    }
    .placeholder {
      width: 20px;
    }
  }
  &-tip {
    font-size: 13px;
    color: @cor_999;
    text-align: center;
    position: relative;
    margin-bottom: 20px;
    &::before {
      content: '';
      display: inline-block;
      border-top: 1PX solid #CCCCCC;
      width: 120px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
    &::after {
      content: '';
      display: inline-block;
      border-top: 1PX solid #CCCCCC;
      width: 120px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  &-bottom {
    width: 100%;
    height: 50px;
    left: 0;
    text-align: center;
    background: #fff;
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      font-size: 13px;
      color: #666;
      display: inline-block;
      padding: 0 50px;
    }
    .u-link {
      border-right: 1px solid #f1f1f1;
    }
  }
  .dialog-title {
    padding: 20px 0 35px;
    text-align: center;
    font-size: 17px;
    color: @cor_333;
    font-weight: bold;
  }
  .dialog-body {
    padding: 0px 20px 20px 20px;
    .van-field {
      margin-bottom: 20px;
    }
    .confirm-btn {
      border-radius: 4px;
      width: 100%;
      height: 50px;
      background: @nice-blue;
      line-height: 50px;
      color: white;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      margin-top: 20px;
    }
  }
}
</style>