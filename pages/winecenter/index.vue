<template>
  <div class="winecenter" :class="{stopwineScroll: isRoll}">
    <div class="winecenter-head">
      <div class="upper">
        <div class="top">
          <div class="top_l" @click="toOthers">
            <span class="icon_switch"></span>
            <span class="world">其它商品</span>
            <!-- <span class="world" v-if="isNovice" @click="swtichNovice">切换新手界面</span>
            <span class="world" v-else @click="swtichNovice">切换高手界面</span> -->
          </div>
          <div class="top_r">
            <i class="icon_search"></i>
            <i class="icon_buy"></i>
          </div>
        </div>
        <div class="screen">
          <div class="screen-item" @click="elCountry">国家产区</div>
          <div class="screen-item" :class="{active: screens.elIndex == index}" @click="elScreens(index)" v-for="(item, index) in screens.list" :key="index">{{item}}</div>
        </div>
      </div>
      <country-cpm ref="refcountryCpm" :postCountry="countryList" :postArea="areaList" @delCountry="elCountry"></country-cpm>
      <price-cpm ref="refPrice" :postPrice="this.screens.elIndex" @shut="closeScreens"></price-cpm>
      <div class="elmdl">
        <div class="elmdl-item" :class="{active: ranks.elIndex == index}" @click="elRanks(index)" v-for="(rank, index) in ranks.list" :key="index">
          <span>{{rank}}</span>
        </div>
      </div>
      <level-cpms ref="refRank" :postLevel="this.ranks.elIndex" @shut="closeRanks"></level-cpms>
    </div>
    <div class="winecenter-content">
      <section class="novice" v-if="isNovice">
        <div class="com-item" v-for="(good, index) in goodsList" :key="index">
          <div class="item_l">
            <div class="item_l_bk" :style="'background: url(' + good.imgUrl + ') no-repeat center/contain'"></div>
          </div>
          <div class="item_r">
            <h3>{{good.goodsName}}</h3>
            <p>
              <span v-for="(tag, tagIndex) in customArray(good.tagListJson)">{{tag}}</span>
            </p>
            <div class="itemr-info">
              <span class="info_item icon_time">{{good.year}}</span>
              <span class="info_item icon_address">{{good.country}}／{{good.area}}</span>
              <span class="info_item icon_variety">{{good.variety}}</span>
            </div>
            <div class="u-bars">
              <div class="bars">
                <div class="bars-left">复杂：{{good.complexity}} <span v-if="good.complexity">分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar="good.complexity"></span>
                </div>
              </div>
            </div>
            <div class="itemr-price">
              <span class="t_price">¥ {{good.actualPrice}}</span>
              <del class="m_price">市场价：¥ 499</del>
            </div>
          </div>
        </div>
      </section>
      <section class="killer" v-else>
        <div class="com-item" v-for="(good, index) in goodsList">
          <div class="item_l">
            <div class="item_l_bk" :style="'background: url(' +  good.imgUrl  + ') no-repeat center/contain'"></div>
          </div>
          <div class="item_r">
            <h3>{{good.goodsName}}</h3>
            <p>
              <span v-for="(tag, tagIndex) in customArray(good.tagListJson)">{{tag}}</span>
            </p>
            <div class="u-bars">
              <div class="bars">
                <div class="bars-left">酒精度：14.5</div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar="good.complexity"></span>
                </div>
              </div>
            </div>
            <div class="u-bars">
              <div class="bars">
                <div class="bars-left">果香：{{good.fruity}} <span>分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar="good.fruity"></span>
                </div>
              </div>
            </div>
            <div class="u-bars">
              <div class="bars">
                <div class="bars-left">酸度：{{good.acidity}}<span>分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar="good.acidity"></span>
                </div>
              </div>
            </div>
            <div class="u-bars">
              <div class="bars">
                <div class="bars-left">复杂：{{good.complexity}} <span>分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar="good.complexity"></span>
                </div>
              </div>
            </div>
            <div class="itemr-price">
              <span class="t_price">¥ 399</span>
              <del class="m_price">市场价：¥ 499</del>
            </div>
          </div>
        </div>
      </section>
    </div>
    <u-footer :postIndex="footIndex"></u-footer>
  </div>
</template>
<script>
<<<<<<< HEAD
import testImg1 from "../../assets/img/img.png";

import testImg2 from "../../assets/img/img2.png";

import uFooter from '~/components/footer'

import countryCpm from "~/components/cpms/country-list.vue";

import priceCpm from "~/components/cpms/price-list.vue";

import levelCpms from "~/components/cpms/level-cpms.vue";

import api from '~/utils/request'

export default {

  data() {

    return {

      footIndex: 1,

      bkImg1: testImg1,

      bkImg2: testImg2,

      isRoll: false,

      isNovice: true, // 是否为新手

      screens: {

        list: ["价格类型", "场景特色", "推荐排序"],

        elIndex: null

      },

      ranks: {

        list: ["等级", "葡萄品种", "其他筛选", '新手选酒'],

        elIndex: null

      },

      isCountry: false, // 是否国家产区

      isPrice: false, // 是否为价格类型

      goodsList: [], // 商品列表

      countryList: [], // 国家列表

      areaList: [], // 产区列表

    };

  },

  components: {

    uFooter,

    countryCpm,

    priceCpm,

    levelCpms

  },
  mounted() {
    this.getPageData()
  },

  methods: {
    toOthers() {
      window.location.href = '/winecenter/others'
    },
    async getPageData() {
      const { code, data } = await api.clientGet('/api/esGoods/paginate', { ifWine: true })
      if (code === 200) {
        this.goodsList = data.array
        await this.addBarwid()
        this.countryList = data.extras[3]
        this.areaList = data.extras[4]
      } else {
        this.$toast(data)
      }
    },

    addBarwid() {
      this.$nextTick(() => {
        let ubars = this.$refs.ubars
        ubars.map(v => {
          v.style.width = v.getAttribute('data-bar') + '%'
        })
      })
    },

    openCollapse(n) {

      console.log("n", n);

      if (n === 1) {

        this.isPrice = true;

        this.isRoll = this.isPrice;

      }

    },

    swtichNovice() {
      this.isNovice = !this.isNovice;
      this.addBarwid()
    },

    elCountry() {

      if (this.ranks.elIndex !== null) {
        this.$refs.refRank.resetFn()
        return false
=======
  import testImg1 from '../../assets/img/img.png'
  import testImg2 from '../../assets/img/img2.png'
  export default {
    data () {
      return {
        bkImg1: testImg1,
        bkImg2: testImg2,
        isNovice: true // 是否为新手
>>>>>>> f9f9cdb2193d5ed4c01d7f5888c5ef0365453f22
      }

      if (this.screens.elIndex !== null) {
        this.$refs.refPrice.resetFn()
        return false
      }

      this.isCountry = !this.isCountry;

      this.isRoll = this.isCountry
      if (this.isCountry) {
        setTimeout(() => {
          this.$refs.refcountryCpm.addClass()
        })
      }

    },
<<<<<<< HEAD

    elScreens(index) {

      if (this.ranks.elIndex !== null) {
        this.$refs.refRank.resetFn()

        return false
=======
    methods: {
      swtichNovice () {
        this.isNovice = !this.isNovice
>>>>>>> f9f9cdb2193d5ed4c01d7f5888c5ef0365453f22
      }

      this.$set(this.screens, "elIndex", index)

      this.isRoll = true;

      setTimeout(() => {

        this.$refs.refPrice.addClass()

      }, 10);

    },

    closeScreens() {

      this.screens.elIndex = null

      this.isRoll = false

    },

    elRanks(index) {

      this.ranks.elIndex = index;

      this.isRoll = true;

      setTimeout(() => {

        this.$refs.refRank.addClass()

      }, 10);

    },

    closeRanks() {

      this.ranks.elIndex = null;

      this.isRoll = false;

      console.log(this.ranks.elIndex)

    },

    customArray(arr) {
      return JSON.parse(arr)
    }

  }

};
</script>
<style lang="less" scoped>
@import "../../assets/css/var.less";

.stopwineScroll {
  height: 100vh;
  overflow: hidden;
}

.winecenter {

  background: #fff;

  line-height: 1;

  font-size: 12px;

  &-content {

    .padlr20;

  }

}

.upper {

  padding-top: 10px;

  .padlr20;
  .cpmzIndex;

}

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

      .bg_cover;

      background-image: url("../../assets/img/Icons/ic_qiehuan_blue_22x22.png");

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

  padding: 20px 0;

  .flex_between;

  &-item {

    font-size: 13px;

    font-family: PingFangSC-Regular;

    font-weight: 400;

    color: @cor_999;

    line-height: 13px;

    position: relative;

    &:after {

      content: "";

      position: absolute;

      top: 50%;

      right: -13px;

      margin-top: -2px;

      width: 8px;

      height: 5px;

      .bg_cover;

      background-image: url("../../assets/img/Icons/ic_triangle_gu_12x121.png");

    }

  }

  .active {

    color: @cor_333;

    font-family: PingFangSC-Medium;

    font-weight: 500;

    &:after {

      background-image: url("../../assets/img/Icons/ic_triangle_bt_12x12.png");

    }

  }

}

.elmdl {

  position: relative;

  z-index: 60;

  padding-bottom: 15px;

  background: #fff;

  border-bottom: 1px solid #f5f5f5;

  .padlr20;

  .flex_between;

  &-item {

    .flex_allCenter;

    // width: 100px;

    height: 30px;

    background: #f8f8f8;

    border-radius: 15px;

    padding-left: 10px;
    padding-right: 8px;

    &>span {

      font-size: 13px;

      font-family: PingFang-SC-Medium;

      font-weight: 500;

      color: rgba(153, 153, 153, 1);

      position: relative;

      padding-right: 17px;

      &:after {

        content: "";

        width: 12px;

        height: 12px;

        position: absolute;

        top: 50%;

        right: 0;

        margin-top: -6px;

        .bg_cover;

        background-image: url("../../assets/img/Icons/ic_xiala_g_line_12x12.png");

      }

    }

  }

  .active {

    &>span {

      font-family: PingFangSC-Semibold;

      font-weight: 600;

      color: @cor_333;

      &:after {

        background-image: url("~/assets/img/Icons/ic_xiala_b_line_12x12.png");

      }

    }

  }

}

// 选酒公共

.com-item {

  .flex_between;

  margin: 20px 0;

  .item_l {

    width: 120px;

    height: 213px;

    border-radius: 4px;

    border: 1px solid #eaeaea;

    &_bk {

      margin-top: 6px;

      width: 100%;

      height: 202px;

      .bg_cover;

    }

  }

  .item_r {

    width: 195px;

    min-height: 213px;

    &>h3 {

      font-size: 15px;

      font-family: PingFangSC-Medium;

      font-weight: 500;

      color: rgba(51, 51, 51, 1);

      line-height: 21px;

    }

    &>p {
      .u-mltip;
    }

    .itemr-price {

      .t_price {

        display: inline-block;

        font-size: 17px;

        font-family: Impact;

        color: #f99c00;

      }

      .m_price {

        display: inline-block;

        padding-left: 10px;

        font-size: 12px;

        font-family: PingFang-SC-Medium;

        font-weight: 500;

        color: @cor_999;

      }

    }

  }

}

// 新手选酒

.novice {

  padding-bottom: 5px;

  .itemr-info {

    margin-left: -7px;

    padding-bottom: 10px;

    &>span {

      display: inline-block;

      height: 24px;

      line-height: 24px;

      background: #def3f9;

      border-radius: 12px;

      padding-left: 25px;

      padding-right: 5px;

      vertical-align: middle;

      margin-top: 10px;

      position: relative;

      font-size: 12px;

      font-family: PingFangSC-Semibold;

      font-weight: 600;

      color: #03a1cd;

      margin-left: 7px;

      &:before {

        content: "";

        width: 24px;

        height: 24px;

        position: absolute;

        top: 50%;

        left: 0;

        margin-top: -12px;

        .bg_cover;

      }

    }

    .icon_time {

      &:before {

        background-image: url("../../assets/img/Icons/ic_time_24x24.png");

      }

    }

    .icon_address {

      &:before {

        background-image: url("../../assets/img/Icons/ic_position_24x24.png");

      }

    }

    .icon_variety {

      &:before {

        background-image: url("../../assets/img/Icons/ic_grape_24x24.png");

      }

    }

  }

  .itemr-price {

    padding-top: 4px;

  }

}

.killer {

  padding-bottom: 5px;

}
</style>