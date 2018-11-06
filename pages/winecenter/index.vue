<template>
  <div class="winecenter" :class="{stopwineScroll: isRoll}">
    <div class="winecenter-head">
      <div class="upper">
        <div class="top">
          <div class="top_l" @click="toOthers">
            <span class="icon_switch"></span>
            <span class="world">其它商品</span>
          </div>
          <div class="top_r" @click="toSearch">
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
      
      <div class="elmdl">
        <div class="elmdl-item" :class="{active: ranks.elIndex == index + 3}" @click="elScreens(index + 3)" v-for="(rank, index) in ranks.list" :key="index">
          <span>{{rank}}</span>
        </div>
        <div class="elmdl-item" :class="{active: ranks.elIndex == 3}" @click="elScreens(6)">
          <span>{{noviceMaster}}</span>
        </div>
      </div>

      <com-list ref="refComlist" :postType="postType" :postObj="postObj" :martop="martop" @shut="closeScreens">
        <div slot="headSild" v-if="screens.elIndex === 0">
          <h2 class="headprice">¥700</h2>
          <div class="slider">
            <van-slider v-model="stepvalue" :step="10" bar-height="4px" />
            <div class="slider-items">
              <span>¥0</span>
              <span>¥300</span>
              <span>¥900</span>
              <span>不限</span>
            </div>
          </div>
        </div>
        <div slot="foot" v-if="screens.elIndex === 2 || screens.elIndex === 6"></div>
      </com-list>

    </div>
    <div class="winecenter-content">
      <section class="novice">
        <div class="com-item" v-for="(good, index) in goodsList" :key="index">
          <div class="item_l">
            <div class="item_l_bk" :style="'background: url(' + good.imgUrl + ') no-repeat center/contain'"></div>
          </div>
          <div class="item_r" v-if="!isNovice">
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
          <div class="item_r" v-else>
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
                  <span class="bars-right_top" ref="ubars" :data-bar='good.acidity'></span>
                </div>
              </div>
            </div>
            <div class="u-bars">
              <div class="bars">
                <div class="bars-left">复杂：{{good.complexity}} <span>分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar='good.complexity'></span>
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
import testImg1 from '../../assets/img/img.png'
import testImg2 from '../../assets/img/img2.png'
import uFooter from '~/components/footer'
import countryCpm from '~/components/cpms/country-list.vue'
import comList from '~/components/cpms/comList.vue'
import api from '~/utils/request'

export default {
  head () {
    return {
      title: '我的购物车',
      meta: [
        { hid: 'title', name: 'title', content: '我的购物车' }
      ]
    }
  },
  data () {
    return {
      footIndex: 1,
      bkImg1: testImg1,
      bkImg2: testImg2,
      isRoll: false,
      isNovice: true, // 是否为新手
      stepvalue: 0,
      postObj: {},
      postType: true,
      martop: false, // 控制comList 组件的属性
      screens: {
        list: ['价格类型', '场景特色', '推荐排序'],
        elIndex: null
      },
      ranks: {
        list: ['等级', '葡萄品种', '其他筛选'],
        elIndex: null
      },
      noviceMaster: '新手选酒',
      isCountry: false, // 是否国家产区
      isPrice: false, // 是否为价格类型
      goodsList: [], // 商品列表
      countryList: [], // 国家列表
      areaList: [] // 产区列表
    }
  },
  components: {
    uFooter,
    countryCpm,
    comList
  },
  mounted () {
    this.getPageData()
  },

  methods: {
    toOthers () {
      window.location.href = '/winecenter/others'
    },
    toSearch () {
      window.location.href = '/search?id=winecenter'
    },
    async getPageData () {
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

    addBarwid () {
      this.$nextTick(() => {
        let ubars = this.$refs.ubars
        ubars.map(v => {
          v.style.width = v.getAttribute('data-bar') + '%'
        })
      })
    },

    openCollapse (n) {
      if (n === 1) {
        this.isPrice = true
        this.isRoll = this.isPrice
      }
    },

    swtichNovice () {
      this.isNovice = !this.isNovice
      this.addBarwid()
    },
    ctrlNoviceMaster (index) {
      let list = ['新手选酒', '高手选酒']
      this.noviceMaster = list[index]
      this.isNovice = (index === 0)
      this.addBarwid()
    },

    elCountry () {
      if (this.ranks.elIndex !== null) {
        this.$refs.refRank.resetFn()
        return false
      }
      if (this.screens.elIndex !== null) {
        this.$refs.refPrice.resetFn()
        return false
      }
      this.isCountry = !this.isCountry
      this.isRoll = this.isCountry
      if (this.isCountry) {
        setTimeout(() => {
          this.$refs.refcountryCpm.addClass()
        })
      }
    },
    elScreens (index) {
      index <= 2 ? this.martop = false : this.martop = true
      if (index === 2 || index === 6) {
        this.postType = false
      } else {
        this.postType = true
      }
      this.$set(this.screens, 'elIndex', index)
      this.isRoll = true
      setTimeout(() => {
        if (index <= 2) {
          this.$refs.refComlist.addClsType2()
        } else {
          this.$refs.refComlist.addClsType1()
        }
      }, 10)

      let getList = []
      switch (index) {
        case 0:
          getList = [
            {
              title: '葡萄酒类型',
              clsType: 'u-list4',
              list: ['干红', '干红', '干红', '干红', '干红']
            }
          ]
          break
        case 1:
          getList = [
            {
              title: '喝酒场景',
              clsType: 'u-list4',
              list: ['宴会', '会议', '会议定制', '喝酒场景', '喝酒场景', '喝酒场景']
            },
            {
              title: '特色',
              clsType: 'u-list4',
              list: ['特色', '特色', '特色', '特色', '特色']
            }
          ]
          break
        case 2:
          getList = [
            {
              clsType: 'listone',
              list: ['全部', '最新', '最便宜', '最贵', '仅看往期']
            }
          ]
          break
        case 3:
          getList = [
            {
              title: '站内等级',
              clsType: 'u-list4',
              list: ['入门级', '中级', '高级', '豪华级', '豪华级2']
            },
            {
              title: '国际级别',
              clsType: 'u-list4',
              list: ['AOC/AOP', 'VDP/IGP', 'DOCG', 'VCE', 'AOC/AOP', 'VDP/IGP', 'DOCG', 'VCE', 'VCE', 'VCE']
            }
          ]
          break
        case 4:
          getList = [
            {
              clsType: 'u-list4',
              list: ['混酿型', '赤霞珠', '黑皮诺', '梅洛', '混酿型', '赤霞珠', '黑皮诺', '梅洛']
            }
          ]
          break
        case 5:
          getList = [
            {
              title: '酒精度',
              clsType: 'u-list3',
              list: ['11%以下', '11%-11.9%', '12%-12.9%', '13%-13.9%', '14%以上']
            },
            {
              title: '净含量',
              clsType: 'u-list2',
              list: ['300mL以下', '300mL-500mL', '501mL-999mL', '501mL-999mL']
            }
          ]
          break
        case 6:
          getList = [
            {
              clsType: 'listone',
              list: ['新手选酒', '高手选酒']
            }
          ]
          break
      }
      this.$set(this.postObj, 'list', getList)
    },
    closeScreens () {
      this.screens.elIndex = null
      this.isRoll = false
    },
    customArray (arr) {
      return JSON.parse(arr)
    }
  }
}
</script>
<style lang="less" scoped>

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
      background-image: url("~/assets/img/Icons/ic_qiehuan_blue_22x22.png");
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
      background-image: url("~/assets/img/Icons/ic_search_b_30x30.png");
    }

    .icon_buy {
      .bg_cover;
      background-image: url("~/assets/img/Icons/ic_shop_b_30x30.png");
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
    padding-right: 13px;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -2.5px;
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

.elmdl {
  position: relative;
  z-index: 60;
  padding-bottom: 15px;
  background: #fff;
  border-bottom: 1PX solid #f5f5f5;
  .padlr20;
  .flex_between;

  &-item {
    .flex_allCenter;
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
        background-image: url("~/assets/img/Icons/ic_xiala_g_line_12x12.png");
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

    border: 1PX solid #eaeaea;

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

  padding-bottom: 50px;

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

</style>