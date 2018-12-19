<template>
  <div class="coupon">
    <com-head :titleConfig="configtitle"></com-head>
    <nav class="navs">
      <div
        class="navs-item"
        :class="{active: index === navIndex}"
        v-for="(nav, index) in navlist"
        @click="navFn(index)"
        :key="index">{{ nav }}</div>
    </nav>
    <div class="lists">
      <section class="list" v-if="navIndex === 0">
        <div class="list-item" v-for="n in 5">
          <div class="item-l">
            <div class="price">￥<span class="price_weight">10</span></div>
            <p class="useok">满100元可用</p>
          </div>
          <div class="item-r">
            <h4 class="r_name">全品类通用券</h4>
            <p>适用平台：全平台</p>
            <p>有效期：2018-4-30至2018-12-30</p>
          </div>
        </div>
      </section>
      <section class="list" v-else-if="navIndex === 1">
        <div class="list-item list-used" v-for="n in 5">
          <div class="item-l">
            <div class="price use_used">￥<span class="price_weight">10</span></div>
            <p class="useok use_used">满100元可用</p>
          </div>
          <div class="item-r">
            <div class="r_logo"></div>
            <h4 class="r_name use_used r_name-logo">全品类通用券全品类通用券全品类通用券全品类通用券</h4>
            <p class="use_used r_name-logo">适用平台：全平台</p>
            <p class="use_used">有效期：2018-4-30至2018-12-30</p>
          </div>
        </div>
      </section>
      <section class="list" v-else-if="navIndex === 2">
        <div class="list-item list-used" v-for="n in 5">
          <div class="item-l">
            <div class="price use_used">￥<span class="price_weight">10</span></div>
            <p class="useok use_used">满100元可用</p>
          </div>
          <div class="item-r">
            <h4 class="r_name use_used">全品类通用券</h4>
            <p class="use_used">适用平台：全平台</p>
            <p class="use_used">有效期：2018-4-30至2018-12-30</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
export default {
  components: {
    comHead
  },
  data () {
    return {
      configtitle: '我的优惠券',
      navlist: ['未使用', '使用记录', '已过期'],
      navIndex: 0
    }
  },
  methods: {
    navFn (index) {
      this.navIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
.coupon {
  width: 100vw;
  height: 100vh;
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
          background-image: url('~/assets/img/ic_yishiyong_60x40@2x.png');
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
</style>