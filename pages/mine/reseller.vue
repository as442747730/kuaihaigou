<template>
  <div class="reseller">
    <van-nav-bar title="我的分销" left-arrow @click-left="historyBack">
    </van-nav-bar>
    <van-row class="reseller-t">
      <van-col span="8">
        <p class="maney-t">我的消费金额(元)</p>
        <p class="maney-n">{{ data.alreadyWithdraw }}元</p>
      </van-col>
      <van-col span="8">
        <p class="maney-t">已打款金额(元)</p>
        <p class="maney-n">{{ data.unWithdraw }}元</p>
      </van-col>
      <van-col span="8">
        <p class="maney-t">待打款金额(元)</p>
        <p class="maney-n">{{ data.consume }}元</p>
      </van-col>
    </van-row>
    <van-tabs v-model="active" swipeable color="#000;" class="reseller-list" @click="changeTab">
      <van-tab title="消费统计">
        <div class="l-consume" v-for="(item, index) in consumeList" :key="index">
          <div class="wares">
            {{ item.goodName }}
          </div>
          <div class="l-money">
            <p>￥{{ item.price }}</p>
            <p>x{{ item.goodNum }}</p>
          </div>
          <div class="l-Total">
          <p>共{{ item.goodNum }}件商品 总计：<span>￥{{ item.sumConsume }}</span></p>
          <p>{{ item.createdAt }}</p>
        </div>
        </div>
        <div v-if="consumeList.length == 0" class="toolTips">暂无消费记录</div>
      </van-tab>
      <van-tab title="打款统计">
        <div class="evidence" v-for="(item, index) in payList" :key="index">
          <div class="evidence-info">
            <div class="evidence-row">
              <p>打款人姓名: {{ item.accountName }}</p>
              <p>打款账户: {{ item.account }}</p>
            </div>
            <div class="evidence-row">
              <p>打款方式: {{ item.withdrawWay }}</p>
              <p>时间: {{ item.createdAt }}</p>
            </div>
          </div>
          <div class="evidence-pay">
            <p>打款金额</p>
            <p>￥{{ item.money }}</p>
          </div>
          <div class="evidence-unpay">
            <div>待打款金额</div>
            <div>￥{{ item.unWithdraw }}</div>
          </div>
          <div class="evidence-consume">
            <div>当前消费金额</div>
            <div>￥{{ item.currentConsumeMoney }}</div>
          </div>
          <div class="evidence-img">
            <van-button type="default" @click="viewVoucher(item)">查看凭证</van-button>
          </div>
        </div>
        <div v-if="payList.length == 0" class="toolTips">暂无打款记录</div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { userApi } from '~/api/users'
import { ImagePreview } from 'vant';
export default {
  async asyncData (req) {
    const reseller = await userApi.resellerInfo(req) //用户分销信息
    const resellerConsume = await userApi.consumeInfo({count:this.count, page:this. consumePage},req) //用户消费信息
    const resellerPay = await userApi.resellerpay({count:this.count, page:this. payPage},req) //用户打款信息
    if(reseller.code === 200 && resellerConsume.code === 200 && resellerPay.code === 200){
      return {
        data: reseller.data,
        consumeNum: resellerConsume,
        payNum:resellerPay,
        consumePage:resellerConsume.data.page,
        payPage:resellerPay.data.page,
        consumeList:resellerConsume.data.array,
        payList:resellerPay.data.array,
      }
    }
  },
  data() {
    return {
      active: 0,
      payMoney:0,//付款
      unpayMoney:0,//未付款
      consume:0,//消费金额
      consumePage:0,//消费页码
      payPage:0,//打款页码
      count:10,//每页条数
      consumeList:[],//各项消费数据
      payList:[],//各项打款数据
    };
  },
  methods: {
    historyBack() {
      window.history.go(-1)
    },
    async changeTab(index,req) {
      if(index == 1) {
        
      }
    },
    viewVoucher(item) {
      let img = []
      img.push(item.certificateImg) 
      // img.push("http://public.kuaihaigou.com/FhILVnm9LAugcgxqg9ODnsH-ZbH2") 
      ImagePreview({
        images: img,
      });
    }
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
      border-bottom: 1px solid #aaa;
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
      .evidence {
        font-size: 14px ;
        font-family: PingFangSC-Medium;
        >div {
          border-bottom: 1px solid #aaa;
        }
        .evidence-info{
          display: flex;
          padding-left: 20px;
          .evidence-row{
            flex: 1;
            padding-bottom:20px;
            >p {
              font-size: 16px;
              margin-top: 20px;
            }
          }
        }
        .evidence-pay{
          padding: 20px 0;
          border-bottom: 1px solid #aaa;
          p {
            margin-top: 10px;
            font-size: 16px;
            text-align: center;
          }
        }
        .evidence-consume, .evidence-unpay{
          padding: 10px 0;
          font-size: 0;
          &>div{
            box-sizing: border-box;
            width: 50%;
            line-height: 24px;
            padding: 0 20px;
            display: inline-block;
            font-size: 16px;
          }
          &>div:nth-of-type(2){
            text-align: right;
          }
        }
        .evidence-img {
          text-align: center;
        }
      }
      .toolTips{
        font-size: 20px;
        text-align: center;
        padding: 16px 0;
      }
    }
  }
</style>

