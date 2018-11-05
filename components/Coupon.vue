<template>
  <div class="u-coupon">

    <div class="u-coupon-cell" @click="noUseCoupon">
      <div class="title">不使用优惠券</div>
      <div :class="['u-checkbox', noUse ? 'active' : '']"></div>
    </div>
    <!-- 可用 -->
    <div class="u-coupon-cell" v-for="(item, index) in usableList" :key="index" @click="selectCoupon(item)">
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
    <div class="u-coupon-tip" v-if="unusableList.length !== 0">不可用优惠券</div>
    <div class="u-coupon-cell disabled" v-for="(item, index) in unusableList" :key="index">
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
    </div>

    <div class="u-coupon-bottom">
      <!-- todo 优惠券说明 -->
      <nuxt-link to="" class="u-link">优惠券说明</nuxt-link>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'uCoupon',

    props: {
      amount: {
        type: Number
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
        selectId: null
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
      }
    }
  }
</script>
<style lang="less" scoped>
.u-coupon {
  background: @cor_border;
  height: 100vh;
  padding: 10px 20px;
  font-size: 0;
  padding-bottom: 50px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
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
    // width: 100%;
    text-align: center;
  }
}
</style>