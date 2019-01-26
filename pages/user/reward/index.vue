<template>
  <div class="m-page-user">
    <tab :uid='uid' :index='2'></tab>

    <div class="reward-box">
      <ul class="reward-item">
        <li class="reward-list" v-for='($v, $k) in rewardData' :key='$k' :class="['type_' + $k, rewardIndex === $k ? 'cur' : '']" @click='rewardSelect($k)'>
            <span><b>{{ formatMoney($v.price) }}</b>元</span>
            <p>{{ $v.desc }}</p>
        </li>
      </ul>
      <div class="desc" v-if='rewardInfor.rewardNum !== 0'>
        <p>他收到过<b>{{ rewardInfor.rewardNum }}</b>人打赏</p>
        <div class="pro">
          <a 
            v-for='($v2, $k2) in rewardInfor.rewardUserList'
            :key='$k2' :style="'background: url(' + $v2.headimgurl + ') no-repeat center/cover'" 
            :href="'/user?uid=' + $v2.id"
          ></a>
        </div>
      </div>
      <div class="desc" v-else>
        <p style="text-align: center">目前还没有用户给Ta打赏，快来占坑吧～</p>
      </div>
    </div>

    <!-- 打赏 -->
    <pay-reward :payShow='payShow' :setRewardIndex='rewardIndex' :userid='uid' @payClose='payClose'></pay-reward>

    <!-- 支付结果 -->
    <van-dialog v-model="resultWindow" :show-confirm-button="false" :closeOnClickOverlay='false' >
      <div class="result-wrap">
        <van-icon name='cross' @click='closeResult' />
        <template v-if='hasPayed'>
          <div class="pro">
            <img src="~/assets/img/order/ic_zhifuchenggong_130x90@2x.png">
          </div>
          <div class="desc">
            <h3>打赏成功</h3>
            <p>您的打赏金额将会到达作者账户中。</p>
          </div>
        </template>
        <template v-else>
          <div class="pro">
            <img src="~/assets/img/order/ic_zhifuzhibai_130x90@2x.png">
          </div>
          <div class="desc">
            <h3>打赏失败</h3>
            <p>请尝试重新打赏</p>
          </div>
        </template>
        <div class="u-button" @click='closeResult'>
          我知道了
        </div>
      </div>
    </van-dialog>

  </div>
</template>

<script>
import { personApi, userApi } from '@/api/users'
import { rewardApi } from '@/api/reward'
import Tab from '@/components/user/Tab.vue'
import payReward from '@/components/Pay-reward'
import tools from '@/utils/tools'

export default {
  name: '',

  layout: 'page-with-user',

  components: { Tab, payReward },

  head () {
    return {
      title: '个人主页_给Ta打赏',
      meta: [
        { hid: 'title', name: 'title', content: '个人主页_给Ta打赏' }
      ]
    }
  },

  async asyncData (req) {
    const { code: code1, data: data1 } = await personApi.serverReward(req.query.uid)
    const { code: code2 } = await userApi.serverPostInfo(req)
    if (code1 === 200) {
      let ifLogin = code2 === 200
      return {
        uid: req.query.uid || null,
        ifLogin: ifLogin,
        rewardInfor: data1
      }
    }
  },

  data () {
    return {
      ifLogin: false,
      uid: null, // 用户id
      rewardInfor: [],

      rewardData: [{
        price: 0.01,
        desc: '喜欢你'
      }, {
        price: 5.2,
        desc: '么么哒'
      }, {
        price: 6.66,
        desc: '666'
      }, {
        price: 12,
        desc: '佩服'
      }, {
        price: 50,
        desc: '老司机'
      }, {
        price: 520,
        desc: '带我飞'
      }],

      rewardIndex: null,

      payShow: false, // 打开支付选项
      resultWindow: false,
      hasPayed: null
    }
  },

  async mounted () {
    console.log(this.rewardInfor)
    // 有rewardId，调用支付状态检测
    let getReward = tools.getUrlQues('rewardId')
    if (getReward) {
      const { code, data } = await rewardApi.checkPayOrNot(getReward)
      if (code === 200) {
        if (data.hasPayed) {
          this.hasPayed = data.hasPayed
          this.resultWindow = true
        }
      }
    }
  },

  methods: {
    rewardSelect (index) {
      if (!this.ifLogin) {
        this.$toast('系统检测到您尚未登录，请先登录！')
        setTimeout(() => {
          window.location.href = '/account/login'
        }, 1000)
        return
      }
      this.payShow = true
      this.rewardIndex = index
    },
    payClose () {
      this.payShow = false
    },
    closeResult () {
      window.location.replace('/user/reward?uid=' + this.uid)
    },
    formatMoney (a) {
      return tools.money(a)
    }
  }
}
</script>

<style lang="less" scoped>
.reward-box {
  padding: 20px;
  .reward-item {
    margin-top: 0px;
    font-size: 0;
  }
  .reward-list {
    text-align: left;
    box-sizing: border-box;
    padding: 10px 0 11px 12px;
    width: 105px;
    height: 60px;
    border-radius: 8px;
    margin-right: 10px;
    display: inline-block;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    border: 1PX solid transparent;
    position: relative;
    &:after {
      display: none;
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      background: url('~/assets/img/reward/pic_check_blue_30x30@2x.png') no-repeat center/contain;
    }
    &.cur {
      border-color: #03a1cd;
      &:after {
        display: block;
      }
    }
    &:last-child {
      margin-right: 0;
    }
    &.type_0{
      background-image: url('~/assets/img/reward/img_dahsan_01_175x100@2x.png');
      margin-bottom: 10px;
    }
    &.type_1{
      background-image: url('~/assets/img/reward/img_dahsan_02_175x100@2x.png') 
    }
    &.type_2{
      margin-right: 0;
      background-image: url('~/assets/img/reward/img_dahsan_03_175x100@2x.png') 
    }
    &.type_3{
      background-image: url('~/assets/img/reward/img_dahsan_04_175x100@2x.png') 
    }
    &.type_4{
      background-image: url('~/assets/img/reward/img_dahsan_05_175x100@2x.png') 
    }
    &.type_5{
      background-image: url('~/assets/img/reward/img_dahsan_06_175x100@2x.png') 
    }
    span{
      font-size: 12px;
      color: #fff;
      b{
        margin-right: 5px;
        font-weight: normal;
        font-size: 22px;
        font-family: 'Impact';
        position: relative;
        top: 3px;
      }
    }
    p{
      font-size: 10px;
      color: #fff;
      margin-top: 5px;
    }
  }
  .desc {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    p {
      color: #999;
      b {
        color: #333;
        font-weight: normal;
      }
    }
    a {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.result-wrap {
  padding: 40px 45px 22px;
  text-align: center;
  position: relative;
  .pro {
    width: 130px;
    height: 90px;
    display: inline-block;
    img {
      max-width: 100%;
    }
  }
  .desc {
    h3 {
      margin: 25px 0 15px;
      font-size: 17px;
      color: #333;
    }
    p {
      color: #999;
      font-size: 13px;
    }
  }
  .u-button {
    display: inline-block;
    margin-top: 30px;
    width: 133px;
    height: 42px;      
  }
  i {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #333;
    font-size: 24px;
  }
}
</style>
