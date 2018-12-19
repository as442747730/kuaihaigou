<template>
  <div class="others" :class="{stopwineScroll: isRoll}">
    <div class="others-head">
      <div class="upper upzindex">
        <div class="top">
          <div class="top_l" @click="toWinecenter">
            <span class="top_l-span icon_switch"></span>
            <span class="top_l-span world">红酒商品</span>
          </div>
          <div class="top_r" @click="toSearch">
            <i class="icon_search"></i>
            <i class="icon_buy"></i>
          </div>
        </div>
        <div class="screen">
          <div class="screen-item" :class="{active: classify.elIndex == index}" @click="elClassify(index)" v-for="(cls, index) in classify.list" :key="index">{{cls}}</div>
        </div>
      </div>
      <list-one :showlist="showList" @closeFn="closeClassify"></list-one>  
    </div>
    <section class="other-content">
      <ul class="othList">
        <li class="othList-item" v-for="n in 10">
          <div class="top">
            <div class="top_bk" :style="'background: url(' + mybk + ') no-repeat center/contain'"></div>
          </div>
          <div class="bottom">
            <div class="head">法国1982拉菲法国1982拉菲传奇Lafite</div>
            <p>
              <span>750ml</span>
              <span>日常餐酒</span>
              <span>紧致单宁</span>
            </p>
            <div class="price">¥ 399</div>
          </div>
        </li>
      </ul>
    </section>
    <!-- <u-footer :postIndex="1"></u-footer> -->
  </div>
</template>
<script>
// import uFooter from '~/components/footer'
import listOne from '~/components/cpms/listOne'
import Imgs from '~/assets/img/green_wine.jpg'
export default {
  head () {
    return {
      title: '我的购物车',
      meta: [
        { hid: 'title', name: 'title', content: '我的购物车' }
      ]
    }
  },

  layout: 'page-with-tabbar',

  data () {
    return {
      isRoll: false,
      showList: false,
      classify: {
        list: ['大分类', '子分类', '小分类'],
        elIndex: null,
        nowList: []
      },
      postObj: {},
      lists: ['酒具', '醒酒器', '餐具', '奶酪', '其他'],
      lists2: ['葡萄酒杯', '香槟酒杯', '威士忌杯', '鸡尾酒杯', '烈酒杯'],
      mybk: Imgs
    }
  },
  components: {
    // uFooter,
    listOne
  },
  methods: {
    toWinecenter () {
      window.location.href = '/winecenter'
    },
    toSearch () {
      window.location.href = '/search?id=others'
    },
    elClassify (index) {
      this.showList = !this.showList
      if (index === 0) {
        this.$set(this.postObj, 'list', this.lists)
      } else {
        this.$set(this.postObj, 'list', this.lists2)
      }
    },
    closeClassify (val) {
      this.showList = val
      this.classify.elIndex = null
      this.classify.nowList = []
    }
  }
}
</script>
<style lang="less" scoped>

.others {
  background: #fff;
  line-height: 1;
  font-size: 12px;
}

.other-content {
  padding-bottom: 50px;
  .padlr20;

  .othList {
    padding-bottom: 20px;
    flex-wrap: wrap;
    .flex_between;

    &-item {
      margin-top: 20px;
      width: 160px;

      .top {
        height: 160px;
        border-radius: 4px;
        border: 1PX solid #EAEAEA;
        .flex_allCenter;

        &_bk {
          width: 152px;
          height: 155px;
        }
      }

      .bottom {
        padding-top: 10px;

        .head {
          height: 36px;
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: @cor_333;
          line-height: 18px;
          overflow: hidden;
        }

        &>p {
          padding: 5px 0;
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 12px;
          overflow: hidden;

          &>span {
            position: relative;
            margin-right: 14px;

            &:after {
              content: '|';
              position: absolute;
              top: 0;
              right: -8px;
              height: 12px;
            }
          }

          span:last-child {
            margin-right: 0;

            &:after {
              content: '';
            }
          }

        }

        .price {
          width: 34px;
          height: 15px;
          font-size: 15px;
          font-family: Impact;
          color: rgba(249, 156, 0, 1);
          line-height: 15px;
        }
      }
    }
  }

}


.upper {
  padding-top: 10px;
  border-bottom: 1PX solid #F5F5F5;
  .padlr20;
  .cpmzIndex;

  .top {
    .flex_between;

    &_l {
      height: 28px;
      background: rgba(222, 243, 249, 1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      padding-left: 3px;

      &>span {
        font-size: 11px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(3, 161, 205, 1);
      }

      .icon_switch {
        width: 22px;
        height: 22px;
        background-image: url("../../assets/img/Icons/ic_qiehuan_blue_22x22.png");
        .bg_cover;

      }

      .world {
        padding: 0 10px 0 8px;
        color: @nice-blue;
      }
    }

    &_r {
      width: 70px;
      .flex_between;

      &>i {
        width: 30px;
        height: 30px;
      }

      .icon_search {
        .bg_cover;
        background-image: url("../../assets/img/Icons/ic_search_b_30x30.png");
      }

      .icon_buy {
        .bg_cover;
        background-image: url("../../assets/img/Icons/ic_shop_b_30x30.png");
      }

    }

  }

  .screen {
    padding: 0 20px;
    height: 49px;
    .flex_between;

    &-item {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: @cor_999;
      line-height: 13px;
      position: relative;
      padding: 10px 13px;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -2px;
        width: 8px;
        height: 5px;
        background-image: url("~/assets/img/Icons/ic_triangle_gu_12x12@2x.png");
        .bg_cover;
      }
    }

    .active {
      color: @cor_333;
      font-family: PingFangSC-Medium;
      font-weight: 500;

      &:after {
        background-image: url("~/assets/img/Icons/ic_triangle_bt_12x12@2x.png");
      }
    }
  }

}
.upper.upzindex {
  z-index: 3000;
}
</style>