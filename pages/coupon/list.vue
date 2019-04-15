<template>
  <div class="coupon" ref="scrollElem">
    <nav class="navs">
      <div class="navs-item" :class="{active: index === navIndex}" v-for="(nav, index) in navlist" @click="navFn(index)" :key="index">{{ nav }}</div>
    </nav>
    <div class="lists">
      <section class="list" v-if="navIndex === 0">
        <div class="list-item" v-for="(wsy, index) in wsylist" :key="index">
          <div class="item-l">
            <div class="price">￥<span class="price_weight">{{wsy.faceValue}}</span></div>
            <p class="useok">满{{wsy.useThreshold}}元可用</p>
          </div>
          <div class="item-r">
            <h4 class="r_name">{{ wsy.couponName || '' }}</h4>
            <p>有效期：{{wsy.startTimeDesc}}至{{wsy.endTimeDesc}}</p>
          </div>
        </div>
      </section>
      <section class="list" v-else-if="navIndex === 1">
        <div class="list-item list-used" v-for="(record, index) in recordlist" :key="index">
          <div class="item-l">
            <div class="price use_used">￥<span class="price_weight">{{record.faceValue}}</span></div>
            <p class="useok use_used">满{{record.useThreshold}}元可用</p>
          </div>
          <div class="item-r">
            <div class="r_logo"></div>
            <h4 class="r_name use_used r_name-logo">{{ record.couponName || '' }}</h4>
            <p class="use_used">有效期：{{record.startTimeDesc}}至{{record.endTimeDesc}}</p>
          </div>
        </div>
      </section>
      <section class="list" v-else-if="navIndex === 2">
        <div class="list-item list-used" v-for="(oldcou, index) in oldcouponlist" :key="index">
          <div class="item-l">
            <div class="price use_used">￥<span class="price_weight">{{oldcou.faceValue}}</span></div>
            <p class="useok use_used">满{{oldcou.useThreshold}}元可用</p>
          </div>
          <div class="item-r">
            <h4 class="r_name use_used">{{ oldcou.couponName || '' }}</h4>
            <p class="use_used">有效期：{{oldcou.startTimeDesc}}至{{oldcou.endTimeDesc}}</p>
          </div>
        </div>
      </section>
      <null-data tips="暂无你想要的优惠券" v-if="listNull"></null-data>
    </div>
    <div class="explain" v-if="navIndex === 0">
      <a href="/coupon/explain">优惠券说明</a>
    </div>
  </div>
</template>
<script>
import nullData from '~/components/nullData'
import { couponApi } from '~/api/coupon'
export default {
  head () {
    return {
      title: '我的优惠券',
      meta: [
        { hid: 'title', name: 'title', content: '我的优惠券' }
      ]
    }
  },
  components: {
    nullData
  },
  async asyncData (req) {
    let params = { page: 1, count: 8, ifUsed: false }
    const { code, data } = await couponApi.serverGetList(params, req)
    if (code === 200) {
      console.log(data)
      return { wsylist: data.array }
    } else if (code === 506) {
      req.redirect('/account/login')
    }
  },
  data () {
    return {
      configtitle: '我的优惠券',
      navlist: ['未使用', '使用记录', '已过期'],
      navIndex: 0,
      // 未使用
      wsylist: [],
      curWsy: {
        page: 1
      },
      wsyTotalpage: 1,
      wsyLoad: true,
      wsyMore: true,
      // 使用记录
      recordlist: [],
      curRecord: {
        page: 1
      },
      outWsy: {
        page: 1
      },
      recordTotalpage: 1,
      recordLoad: true,
      recordMore: true,
      // 已过期
      oldcouponlist: [],
      toastLoaing: null
    }
  },
  computed: {
    listNull () {
      return (this.navIndex === 0 && this.wsylist.length === 0) || (this.navIndex === 1 && this.recordlist.length === 0) || (this.navIndex === 2 && this.oldcouponlist.length === 0)
    }
  },
  mounted () {
    console.log(this.wsylist)
    // window.addEventListener('scroll', () => {
    //   let winH = document.documentElement.clientHeight || document.body.clientHeight
    //   let elemBound = this.$refs.scrollElem.getBoundingClientRect()
    //   let _top = Math.abs(elemBound.top)
    //   let _height = elemBound.height
    //   let bottomH = _height - (_top + winH)
    //   if (bottomH <= 100) {
    //     if (this.navIndex === 0) {
    //       if (this.wsyLoad && this.wsyMore) {
    //         if (this.wsyTotalpage > this.curWsy.page) {
    //           this.wsyLoad = false
    //           this.curWsy.page += 1
    //           this.wsyFn()
    //         } else {
    //           this.wsyMore = false
    //         }
    //       }
    //     } else if (this.navIndex === 1) {
    //       if (this.recordLoad && this.recordMore) {
    //         if (this.recordTotalpage > this.curRecord.page) {
    //           this.recordLoad = false
    //           this.curRecord.page += 1
    //           this.recordFn()
    //         } else {
    //           this.recordMore = false
    //         }
    //       }
    //     }
    //   }
    // })
  },
  methods: {
    navFn (index) {
      this.toastLoaing = this.$toast.loading({ message: '数据获取中', duration: 0, mask: false })
      if (index === 0) {
        this.wsyFn()
      } else if (index === 1) {
        this.recordFn()
      } else if (index === 2) {
        this.oldcoupon()
      }
    },
    async wsyFn () {
      // 未使用
      let params = {
        ifUsed: false,
        ifExpire: false
      }
      Object.assign(this.curWsy, params)
      const { code, data } = await couponApi.couponlist(this.curWsy)
      if (code === 200) {
        this.wsylist = data.array
        let { array, totalPageNo } = data
        this.wsylist = array
        this.wsyTotalpage = totalPageNo
      }
      this.wsyLoad = true
      this.navIndex = 0
      this.toastLoaing.clear()
    },
    async recordFn () {
      // 使用记录
      let params = {
        ifUsed: true
      }
      Object.assign(this.curRecord, params)
      const { code, data } = await couponApi.couponlist(this.curRecord)
      if (code === 200) {
        this.recordlist = data.array
        let { array, totalPageNo } = data
        this.wsyTotalpage = totalPageNo
        this.recordlist = array
      }
      this.recordLoad = true
      this.navIndex = 1
      this.toastLoaing.clear()
    },
    async oldcoupon () {
      // 过期优惠券
      let params = {
        ifExpire: true
      }
      Object.assign(this.outWsy, params)
      const { code, data } = await couponApi.couponlist(this.outWsy)
      if (code === 200) {
        // console.log(data)
        this.oldcouponlist = data.array
      } else if (code === 506) {
        window.location.href = '/account/login'
      }
      this.navIndex = 2
      this.toastLoaing.clear()
    }
  }
}
</script>
<style lang="less" scoped>
.coupon {
  width: 100vw;
  min-height: 100vh;
  background: #F5F5F5;
}

.navs {
  width: 100%;
  height: 45px;
  background: #fff;
  border-bottom: 1PX solid @cor_border;
  .flex_around;

  &-item {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
    line-height: 13px;

    &.active {
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      position: relative;

      &:after {
        content: '';
        position: absolute;
        left: 50%;
        margin-left: -6px;
        bottom: -6px;
        width: 13px;
        height: 3px;
        background: rgba(51, 51, 51, 1);
        border-radius: 2px;
      }
    }
  }
}

.lists {
  padding: 0 20px;
  overflow: hidden;

  .list {
    &-item {
      margin: 20px 0;
      height: 80px;
      background: #fff;
      border-radius: 2px;
      display: flex;
      align-items: center;

      .item-l {
        width: 100px;
        color: #FB6248;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        border-right: 1PX solid #F1F1F1;
        justify-content: center;

        .price {
          color: #FB6248;
          font-size: 15px;
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          text-align: center;

          &_weight {
            font-size: 29px;
          }
        }

        .useok {
          font-size: 10px;
          font-family: PingFang-SC-Medium;
          font-weight: bold;
          color: rgba(251, 98, 72, 1);
          text-align: center;
        }

        .price.use_used,
        .useok.use_used {
          color: #CCCCCC;
        }
      }

      .item-r {
        width: calc(100% - 100px);
        padding-left: 15px;
        box-sizing: border-box;
        position: relative;

        .r_logo {
          position: absolute;
          top: 0px;
          right: 8px;
          width: 60px;
          height: 37px;
          background-image: url('~assets/img/ic_yishiyong_60x40@2x.png');
          .bg_cover;
        }

        .r_name {
          font-size: 15px;
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 10px;
          height: 15px;
          width: 100%;
          overflow: hidden;
          .u-ellipsis;
        }

        .r_name.r_name-logo {
          width: calc(100% - 75px);
        }

        .r_name.use_used {
          color: #CCCCCC;
        }

        &>p {
          margin: 5px 0;
          font-size: 11px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }

        &>p.use_used {
          color: #CCCCCC;
        }
      }
    }
  }
}

.explain {
  padding: 20px 0;
  text-align: center;
  font-size: 13px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(3, 161, 205, 1);
  line-height: 13px;
}
</style>