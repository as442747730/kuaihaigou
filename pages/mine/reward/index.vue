<template>
  <div class="u-reward">
    <div class="u-reward-info">
      <div class="u-reward-info-box">
        <span>赏金余额</span>
        <b>¥ {{ formatMoney(rewardTotal) }}</b>
        <p>我有一樽酒，欲以赠远人～多分享好内容哦～</p>
      </div>
    </div>
    <div class="depart-line"></div>
    <div class="tab">
      <span :class="{'cur': setType === 1}" @click='changeType(1)'>知音打赏我</span>
      <span :class="{'cur': setType === 2}" @click='changeType(2)'>我打赏他人</span>
      <span :class="{'cur': setType === 3}" @click='changeType(3)'>消费记录</span>
    </div>
    <div class="u-reward-content">
      <!-- 知音打赏我 -->
      <ul class="u-reward-item" v-if='setType === 1'>
        <li class="u-reward-list" v-for='($v, $k) in rewardData' :key='$k'>
          <a :href="'/user?uid=' + $v.personalInfoResp.id">
            <div class="pro" :style="'background:url(' + ($v.personalInfoResp.headimgurl || defaulthead) + ') no-repeat center/cover'"></div>
          </a>
          <div class="desc">
            <span class="font_hight">{{ $v.personalInfoResp.nickname }}</span>
            <p>于{{ $v.createdAt }}打赏您</p>
          </div>
          <div class="price font_hight">+{{ formatMoney($v.rewardAmount) }}元</div>
        </li>
      </ul>
      <!-- 我打赏他人 -->
      <ul class="u-reward-item" v-if='setType === 2'>
        <li class="u-reward-list" v-for='($v, $k) in rewardData' :key='$k'>
          <a :href="'/user?uid=' + $v.personalInfoResp.id">
            <div class="pro" :style="'background:url(' + ($v.personalInfoResp.headimgurl || defaulthead) + ') no-repeat center/cover'"></div>
          </a>
          <div class="desc">
            <span class="font_hight">{{ $v.personalInfoResp.nickname }}</span>
            <p>您于{{ $v.createdAt }}打赏{{ $v.personalInfoResp.nickname }}</p>
          </div>
          <div class="price font_hight">-{{ formatMoney($v.rewardAmount) }}元</div>
        </li>
      </ul>

      <!-- 消费记录 -->
      <ul class="u-reward-item" v-if='setType === 3'>
        <li class="u-reward-record" v-for='($v, $k) in rewardData' :key='$k'>
          <h3 class="font_hight">订单编号：{{ $v.orderIdentify }}</h3>
          <p>下单时间：{{ $v.submitOrderTime }}</p>
          <span>-{{ formatMoney($v.hiCoinReduction) }}元</span>
        </li>
      </ul>

      <div class='more-loading' v-show='pageLoding'>
        <van-loading type="spinner" />
        <p>正在加载更多</p>
      </div>

      <div class="no-more" v-show='pageEmpty'>
        <p>没有更多内容了！</p>
      </div>
    </div>
  </div>
</template>
<script>
import { userApi } from '~/api/users'
import tools from '~/utils/tools'

export default {
  head () {
    return {
      title: '会员中心_打赏记录',
      meta: [
        { hid: 'title', name: 'title', content: '会员中心_打赏记录' }
      ]
    }
  },
  async asyncData (req) {
    const { code: code1, data: data1 } = await userApi.serveRewardToMe({ page: 1, count: 5 }, req)
    const { code: code2, data: data2 } = await userApi.serveGetTotal(req)
    if (code1 === 200 && code2 === 200) {
      let pageEmpty = false
      pageEmpty = data1.total <= 5
      return {
        rewardTotal: data2 || 0,
        rewardData: data1.array || {},
        pageEmpty: pageEmpty,
        pageTotal: data1.total
      }
    } else if (code1 === 506) {
      req.redirect('/account/login')
    }
  },
  data () {
    return {
      rewardData: [],
      type: 1,
      setType: 1,
      rewardTotal: 0,

      defaulthead: this.defaulthead,

      pageEmpty: false,
      page: 1, // 当前页
      pageLoding: false // 加载ing
    }
  },
  async mounted () {
    console.log(this.rewardData)
    const content = document.querySelector('.u-reward-content')
    content.addEventListener('scroll', this.handleScroll(() => {
      this.eleHeight = content.clientHeight
      this.scrollHeight = content.scrollHeight
      let scrollTop = content.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.eleHeight >= this.scrollHeight - 200 && !this.pageLoding && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    }))
  },
  methods: {
    async getData (page, needClear = false, type) {
      if (needClear) {
        var toast1 = this.$toast.loading({ message: '数据获取中', duration: 0, mask: true })
        this.type = type
      }
      this.pageLoding = true
      const { code, data } = this.type === 1 ? await userApi.rewardToMe({ page: page, count: 5 }) : this.type === 2 ? await userApi.rewardFromMe({ page: page, count: 5 }) : await userApi.record({ page: page, count: 5 })
      if (code === 200) {
        if (needClear) {
          this.rewardData = data.array
          this.setType = type
          toast1.clear()
        } else {
          this.rewardData.push(...data.array)
        }
        this.pageEmpty = this.page * 5 >= data.total
      } else {
        this.pageEmpty = false
      }
      this.pageLoding = false
    },
    changeType (val) {
      if (this.type === val) return
      this.page = 1
      this.pageEmpty = false
      this.getData(this.page, true, val)
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 150)
      }
    },
    formatMoney (a) {
      return tools.money(a)
    }
  }
}
</script>
<style lang="less" scoped>
.u-reward {
  &-info {
    padding: 20px;
    color: #fff;
    font-size: 0;
    &-box {
      height: 130px;
      box-sizing: border-box;
      padding: 20px 0 0 15px;
      background: url('~/assets/img/reward/img_shanjin_900x210@2x.png') no-repeat center/cover;
    }
    span {
      font-size: 9px;
    }
    b {
      display: block;
      font-family: 'Impact';
      font-size: 30px;
      margin: 10px 0; 
    }
    p {
      font-size: 9px;
    }
  }
  .tab {
    display: flex;
    justify-content: space-between;
    padding: 13px 40px;
    border-bottom: 1px solid #f5f5f5;
    span {
      font-size: 14px;
      color: #ccc;
      &.cur {
        position: relative;
        color: #333;
        font-weight: bolder;
        &:after {
          content: '';
          position: absolute;
          width: 20px;
          height: 2PX;
          border-radius: 2PX;
          left: 50%;
          margin-left: -10px;
          bottom: -10px;
        }
      }
    }
  }
  &-content {
    height: ~'calc(100vh - 222px)';
    overflow: scroll;
  }
  &-item {
    padding: 0 0 0px 20px;
    font-size: 0;
  }
  &-list {
    padding: 25px 0;
    position: relative;
    border-bottom: 1px solid #F1F1F1;
    .pro {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      vertical-align: middle;
    }
    .desc {
      display: inline-block;
      vertical-align: middle;
      width: ~'calc(100% - 45px)';
      box-sizing: border-box;
      padding-left: 10px;
      span {
        color: #333;
        font-size: 15px;
      }
      p {
        font-size: 13px;
        color: #666;
        margin-top: 10px;
      }
    }
    .price {
      position: absolute;
      right: 30px;
      color: #FB6248;
      font-size: 15px;
      top: 25px;
    }
  }
  &-record {
    position: relative;
    padding: 20px 0;
    border-bottom: 1px solid #f1f1f1;
    h3 {
      color: #333;
      font-size: 15px;
    }
    p {
      font-size: 13px;
      color: #666;
      margin-top: 10px;
    }
    span {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 15px;
      color: #F99C00;
    }
  }
}
</style>

