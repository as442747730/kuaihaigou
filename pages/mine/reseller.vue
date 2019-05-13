<template>
  <div class="reseller">
    <van-nav-bar title="我的分销" left-arrow @click-left="historyBack">
    </van-nav-bar>
    <van-row class="reseller-t">
      <van-col span="8">
       <p class="maney-t">我的消费金额(元)</p>
       <p class="maney-n">1000.00</p>
      </van-col>
      <van-col span="8">
        <p class="maney-t">已打款金额(元)</p>
        <p class="maney-n">1000.00</p>
      </van-col>
      <van-col span="8">
        <p class="maney-t">待打款金额(元)</p>
        <p class="maney-n">1000.00</p>
      </van-col>
    </van-row>
    <van-tabs v-model="active" swipeable color="#000;" class="reseller-list">
      <van-tab title="消费统计">
        <div class="l-consume">
          <div class="wares">
            超好喝的小甜水
          </div>
          <div class="l-money">
            <p>￥200</p>
            <p>x1</p>
          </div>
        </div>
        <div class="l-Total">
          <p>共1件商品 总计：<span>￥6000</span></p>
          <p>2018-06-14 17:14:21</p>
        </div>
      </van-tab>
      <van-tab title="打款统计">打款统计</van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {

  data() {
    return {
      active: 0
    };
  },
  methods: {
    historyBack () {
      window.history.go(-1)
    },
  }
}
</script>
<style style lang="less" scoped>
  .reseller {
    .reseller-t {
      padding: 0 10px 10px;
      background-color: #00f;
      color: #fff;
      text-align:center;
      p{
        padding-top: 10px;
      }
      .maney-t {
        font-size: 12px;
        font-family: PingFangSC-Medium;
      }
      .maney-n {
        font-size: 20px;
        font-family: PingFangSC-Medium;
      }
    }
    .reseller-list {
      border-bottom: 1px solid #000;
      .l-consume {
        display: flex;
        padding: 0 10px;
        .wares{
          flex-grow:1;
          font-size: 20px;
          font-weight: 500;
          font-family: PingFangSC-Semibold;
          line-height: 36px;
          padding-top: 10px;
        }   
        .l-money {
          flex-grow:1;
          p {
            padding-top: 10px;
            font-family: PingFangSC-Medium;
            text-align: right;
          }
          p:nth-of-type(1) {
            font-size: 16px;
            font-weight: 500;
            color: #f60;
          }
          p:nth-of-type(2) {
            font-size: 12px;
          }
        }
      }
      .l-Total {
        padding-bottom: 10px;
         p {
            padding-top: 10px;
            font-family: PingFangSC-Medium;
            text-align: right;
          }
          p:nth-of-type(1) {
            font-size: 16px;
            >span {
              font-weight: 500;
              color: #f60;
            }
           
          }
          p:nth-of-type(2) {
            font-size: 12px;
            color: #aaa;
          }
      }
    }
  }
</style>

