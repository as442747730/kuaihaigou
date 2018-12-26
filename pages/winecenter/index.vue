<template>
  <div class="winecenter" ref="scrollElem">
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
          <div class="screen-item" :class="[{active: sizerIndex == index}, {hascor: item.iscor}]" @click="elScreens(index)" v-for="(item, index) in sizerOne" :key="index">{{item.name}}</div>
        </div>
      </div>
      <div class="elmdl" :class="{elZindex: twoType}">
        <div class="elmdl-item" :class="[{active: sizerIndex == index + 3}, {hascor: rank.iscor}]" @click="elScreens(index + 3)" v-for="(rank, index) in sizerTwo" :key="index">
          <span>{{rank.name}}</span>
        </div>
        <div class="elmdl-item" :class="{active: sizerIndex == 6}" @click="elScreens(6)">
          <span>{{noviceMaster}}</span>
        </div>
      </div>
      <list-two :posttype="postType" :twotype="twoType" :postObj="postObj" :showtwo="showtwo" @closeFn="closeScreens" @updateList="onListFn" @subRest="subRest" @subOk="subOk">
        <div class="slideall" slot="headSild" v-if="sizerIndex === 0">
          <div class="slider">
            <van-slider
              v-model="stepvalue"
              :step="stepOne"
              @change="changeSlider"
              bar-height="4px">
            </van-slider>
            <!-- <div class="slider_in" @click="halfStepFn"></div> -->
            <div class="slider-items">
              <span v-for="(price, index) in priceList" :key="index">
                <i v-if="price !== '不限'">¥</i>{{price}}
              </span>
            </div>
          </div>
        </div>
        <div slot="foot" v-if="sizerIndex === 2 || sizerIndex === 6"></div>
      </list-two>
    </div>
    <div class="winecenter-content">
      <section class="novice">
        <div class="com-item" v-for="(good, index) in goodsList" :key="index">
          <div class="item_l">
            <a :href="'/detail/' + good.id">
              <div class="item_l_bk" :style="'background: url(' + good.imgUrl + ') no-repeat center/contain'"></div>
            </a>
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
              <del class="m_price">市场价：¥ {{good.marketPrice}}</del>
            </div>
          </div>
          <div class="item_r" v-else>
            <h3>{{good.goodsName}}</h3>
            <p>
              <span v-for="(tag, tagIndex) in customArray(good.tagListJson)">{{tag}}</span>
            </p>
            <div class="u-bars" v-if="good.ifAcidityShow">
              <div class="bars">
                <div class="bars-left">酸度：{{good.acidity}}<span>分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar='good.acidity'></span>
                </div>
              </div>
            </div>
            <div class="u-bars" v-if="good.ifBitternessShow">
              <div class="bars">
                <div class="bars-left">苦度：{{good.bitterness}}<span>分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar="good.bitterness"></span>
                </div>
              </div>
            </div>
            <div class="u-bars" v-if="good.ifAstringencyShow">
              <div class="bars">
                <div class="bars-left">涩度：{{good.astringency}}<span>分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar="good.astringency"></span>
                </div>
              </div>
            </div>
            <div class="u-bars" v-if="good.ifFruityShow">
              <div class="bars">
                <div class="bars-left">果香：{{good.fruity}} <span>分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar="good.fruity"></span>
                </div>
              </div>
            </div>
            
            <div class="u-bars" v-if="good.ifTanninShow">
              <div class="bars">
                <div class="bars-left">单宁：{{good.tannin}} <span>分</span></div>
                <div class="bars-right">
                  <span class="bars-right_top" ref="ubars" :data-bar='good.tannin'></span>
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
              <span class="t_price">¥ {{good.actualPrice}}</span>
              <del class="m_price">市场价：¥ {{good.marketPrice}}</del>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- 国家弹窗 start -->
    <country-cpm :showcountry="showCountry" :countryIndex="countryIndex" :countryList="countryList" :areaList="areaList" :areaIndex="areaIndex" @selectCountry="selectCountry" @selectArea="selectArea" @delCountry="delCountry" @countryRest="countryRest" @countryOk="countryOk"></country-cpm>
    <!-- 国家弹窗 end -->
   
  </div>
</template>
<script>
import countryCpm from '~/components/cpms/countryList'
import listTwo from '~/components/cpms/listTwo'
import { wineApi } from '~/api/wine'

export default {
  head () {
    return {
      title: '选酒中心',
      meta: [
        { hid: 'title', name: 'title', content: '选酒中心' }
      ]
    }
  },

  layout: 'page-with-tabbar',

  async asyncData (req) {
    let params = {
      page: 1,
      count: 10,
      ifWine: true
    }
    const { code: goodCode, data: goodData } = await wineApi.goodList(params, req)
    if (goodCode === 200) {
      let { array, total, page, totalPageNo } = goodData
      return {
        curTotal: total,
        curPage: page,
        curTotalPage: totalPageNo,
        goodsList: array
      }
    }
  },

  data () {
    return {
      showCountry: false, // 是否打开countryList
      showtwo: false, // 是否打开listTwo
      twoType: false,
      isNovice: true, // 是否为新手
      stepvalue: 0, // 滑块的百分比
      sliderStep: 0, // 滑块步长
      stepHalf: 0,
      stepOne: 0,
      isSlider: false, // 是否滑动滑块
      postObj: {},
      postType: true,
      sizerOne: [{name: '价格类型', iscor: false}, {name: '场景特色', iscor: false}, {name: '推荐排序', iscor: false}],
      sizerTwo: [{name: '等级', iscor: false}, {name: '葡萄品种', iscor: false}, {name: '其他筛选', iscor: false}],
      sizerIndex: null,
      noviceMaster: '新手选酒',
      isCountry: false, // 是否国家产区
      isPrice: false, // 是否为价格类型
      goodsList: [], // 商品列表
      reqList: [], // 滚动返回的数据
      extras: {}, // 其它属性类
      countryList: [], // 国家列表
      countryIndex: null, // 选中的国家索引
      areaList: [], // 产区列表
      areaIndex: null, // 选中的产区索引
      priceList: [], // 价格列表
      varietyList: [], // 品种列表
      varietyIndex: null,
      sceneList: [],
      sceneIndex: null,
      featureList: [],
      featureIndex: null,
      sortIndex: null,
      stationList: [],
      stationIndex: null,
      internationList: [],
      internationIndex: null,
      grapeList: [],
      grapeIndex: null,
      alcoholList: [],
      alcoholIndex: null,
      netList: [], // 净含量列表
      netIndex: null,
      playerIndex: 0,
      tansmit: {
        page: 1,
        count: 10,
        ifWine: true
      }, // 传递参数
      curTotal: 0,
      curPage: 1,
      curTotalPage: 1,
      loadOk: true, // 加载是否完成
      moreData: true // 有更多数据
    }
  },
  components: {
    countryCpm,
    listTwo
  },
  async created () {
    let params = { ifWine: true }
    const { code, data } = await wineApi.clientAttrs(params)
    if (code === 200) {
      console.log('data extras', data)
      this.extras = data
      this.getProplist()
      this.getInfos()
    }
  },
  mounted () {
    this.addBarwid()
    window.addEventListener('scroll', () => {
      let winH = document.documentElement.clientHeight || document.body.clientHeight
      let elemBound = this.$refs.scrollElem.getBoundingClientRect()
      let _top = Math.abs(elemBound.top)
      let _height = elemBound.height
      let bottomH = _height - (_top + winH)
      if (bottomH <= 100) {
        if (this.loadOk && this.moreData) {
          this.loadOk = false
          if (this.curPage < this.curTotalPage) {
            this.curPage += 1
            Object.assign(this.tansmit, { page: this.curPage })
            this.scrollList()
          } else {
            this.moreData = false
          }
        }
      }
    })
  },
  methods: {
    toOthers () {
      window.location.href = '/winecenter/others'
    },
    toSearch () {
      window.location.href = '/search?id=winecenter'
    },
    onListFn (obj) {
      console.log('obj', obj)
      let { id, groupIndex, elIndex } = obj
      // 筛选项有选中
      if (this.sizerIndex <= 2) {
        this.sizerOne[this.sizerIndex].iscor = !!id
      } else if (this.sizerIndex <= 5) {
        this.sizerTwo[this.sizerIndex - 3].iscor = !!id
      }
      let subObj = {}
      switch (this.sizerIndex) {
        case 0:
          subObj.typeid = id
          this.varietyIndex = elIndex
          break
        case 1:
          if (groupIndex === 0) {
            subObj.sceneid = id
            this.sceneIndex = elIndex
          } else {
            subObj.charactid = id
            this.featureIndex = elIndex
          }
          break
        case 2:
          if (id === 666) {
            subObj.sortedBy = 1
            subObj.ifSellOut = true
          } else {
            subObj.sortedBy = id
            subObj.ifSellOut = false
          }
          this.sortIndex = elIndex
          this.getPageData()
          this.showtwo = false
          this.sizerIndex = null
          break
        case 3:
          if (groupIndex === 0) {
            subObj.instatlevelid = id
            this.stationIndex = elIndex
          } else {
            subObj.internationalLevelid = id
            this.internationIndex = elIndex
          }
          break
        case 4:
          this.grapeIndex = elIndex
          subObj.varietyid = id
          break
        case 5:
          console.log('id', id)
          if (groupIndex === 0) {
            this.alcoholIndex = elIndex
            if (!id) {
              delete subObj.minAlcoholDegree
              delete subObj.maxAlcoholDegree
            } else {
              subObj.minAlcoholDegree = id[0]
              subObj.maxAlcoholDegree = id[1]
            }
          } else {
            this.netIndex = elIndex
            if (!id) {
              delete subObj.minNetVolume
              delete subObj.maxNetVolume
            } else {
              subObj.minNetVolume = id[0]
              subObj.maxNetVolume = id[1]
            }
          }
          break
        case 6:
          this.playerIndex = elIndex
          if (id === 1) {
            this.isNovice = true
            this.noviceMaster = '新手选酒'
          } else {
            this.isNovice = false
            this.noviceMaster = '高手选酒'
          }
          this.getPageData()
          this.showtwo = false
          this.sizerIndex = null
          break
      }
      this.postObj.list[groupIndex].elIndex = elIndex
      Object.assign(this.tansmit, subObj)
      // console.log(this.tansmit, 'tansmit')
    },
    subRest () {
      this.tansmit = { page: 1, count: 10, ifWine: true }
      this.getPageData()
      this.closeScreens()
      this.clearIndex()
    },
    subOk () {
      this.closeScreens()
      this.getPageData()
    },
    countryRest () {
      this.tansmit = { page: 1, count: 10, ifWine: true }
      this.showCountry = false
      this.getPageData()
    },
    countryOk () {
      this.showCountry = false
      this.getPageData()
    },
    async getPageData () {
      // 筛选器
      this.moreData = true
      this.loadOk = true
      Object.assign(this.tansmit, { page: 1 })
      const { code, data } = await wineApi.clientList(this.tansmit)
      if (code === 200) {
        let { array, page, totalPageNo } = data
        this.curPage = page
        this.curTotalPage = totalPageNo
        this.goodsList = array
        this.addBarwid()
      } else {
        this.$toast(data)
      }
    },
    async scrollList () {
      // 滚动
      let params = this.tansmit
      const { code, data } = await wineApi.clientList(params)
      if (code === 200) {
        let { array, page, totalPageNo } = data
        this.goodsList.push(...array)
        this.curPage = page
        this.curTotalPage = totalPageNo
        this.addBarwid()
        this.loadOk = true
      } else {
        this.$toast(data)
        this.loadOk = true
      }
    },
    addBarwid () {
      // 进度条
      this.$nextTick(() => {
        let ubars = this.$refs.ubars
        ubars.map(v => {
          v.style.width = v.getAttribute('data-bar') + '%'
        })
      })
    },
    selectCountry (info) {
      // 选择国家
      // console.log('info', info)
      let {elIndex, id} = info
      this.countryIndex = elIndex
      // 重置产区
      this.areaIndex = 0
      let subObj = { countryid: id }
      Object.assign(this.tansmit, subObj)
      this.getAreaList(id)
    },
    selectArea (info) {
      console.log('info', info)
      let {elIndex, id} = info
      this.areaIndex = elIndex
      let subObj = { areaid: id }
      Object.assign(this.tansmit, subObj)
    },
    elCountry () {
      // 点击 国家/地区
      this.showCountry = !this.showCountry
      if (this.showCountry) {
        this.closeScreens()
      }
    },
    delCountry () {
      // 关闭国家筛选项
      this.showCountry = !this.showCountry
    },
    elScreens (index) {
      // 控制筛选器
      if (this.sizerIndex !== index) {
        this.sizerIndex = index
        this.showtwo = true
      } else {
        this.showtwo = false
        this.sizerIndex = null
      }
      if (index === 2 || index === 6) {
        this.postType = false
      } else {
        this.postType = true
      }
      // 控制上下栏筛选器
      if (index < 3) {
        this.twoType = false
      } else {
        this.twoType = true
      }
      // 传递数据
      let getList = []
      switch (index) {
        case 0:
          getList = [
            {
              title: '葡萄酒类型',
              clsType: 'u-list4',
              list: this.varietyList,
              elIndex: this.varietyIndex
            }
          ]
          break
        case 1:
          getList = [
            {
              title: '喝酒场景',
              clsType: 'u-list4',
              list: this.sceneList,
              elIndex: this.sceneIndex
            },
            {
              title: '特色',
              clsType: 'u-list4',
              list: this.featureList,
              elIndex: this.featureIndex
            }
          ]
          break
        case 2:
          getList = [
            {
              clsType: 'listone',
              list: [{name: '默认', id: 1}, {name: '最新', id: 2}, {name: '最贵', id: 3}, {name: '最便宜', id: 4}, {name: '仅看往期', id: 666}],
              elIndex: this.sortIndex
            }
          ]
          break
        case 3:
          if (this.internationList.length > 0) {
            getList = [
              {
                title: '站内等级',
                clsType: 'u-list4',
                list: this.stationList,
                elIndex: this.stationIndex
              },
              {
                title: '国际级别',
                clsType: 'u-list4',
                list: this.internationList,
                elIndex: this.internationIndex
              }
            ]
          } else {
            getList = [
              {
                title: '站内等级',
                clsType: 'u-list4',
                list: this.stationList,
                elIndex: this.stationIndex
              }
            ]
          }
          break
        case 4:
          getList = [
            {
              clsType: 'u-list4',
              list: this.grapeList,
              elIndex: this.grapeIndex
            }
          ]
          break
        case 5:
          getList = [
            {
              title: '酒精度',
              clsType: 'u-list3',
              list: this.alcoholList,
              elIndex: this.alcoholIndex
            },
            {
              title: '净含量',
              clsType: 'u-list2',
              list: this.netList,
              elIndex: this.netIndex
            }
          ]
          break
        case 6:
          getList = [
            {
              clsType: 'listone',
              list: [{id: 1, name: '新手选酒'}, {id: 2, name: '高手选酒'}],
              elIndex: this.playerIndex
            }
          ]
          break
      }
      this.$set(this.postObj, 'list', getList)
    },
    closeScreens (val) {
      // 关闭listTwo组件
      this.sizerIndex = null
      this.showtwo = false
    },
    closeCountry () {
      // 关闭countryList组件
      this.showCountry = false
      this.countryIndex = null
    },
    customArray (arr) {
      if (!Array.isArray(arr)) return false
      return JSON.parse(arr)
    },
    getProplist () {
      // 品种类型
      this.varietyList = this.adjustProps(this.extras.typeRespList, 'typeName')
      // 国家
      this.countryList = this.adjustProps(this.extras.countryRespList, 'countryName')
      // 普通品种
      this.grapeList = this.adjustProps(this.extras.varietyRespList, 'varietyName')
      // 网站等级
      this.stationList = this.adjustProps(this.extras.instationLevelRespList, 'levelName')
      // 场景
      this.sceneList = this.adjustProps(this.extras.sceneRespList, 'scene')
      // 特点
      this.featureList = this.adjustProps(this.extras.charactRespList, 'charact')
      // 净含量
      this.netList = this.combProps(this.extras.netVolumeList, 'ml')
      // 酒精度
      this.alcoholList = this.combProps(this.extras.alcoholDegreeList, '%')
    },
    async getAreaList (countried) {
      // 获取产区
      const { code, data } = await wineApi.getAreaList(countried)
      if (code === 200) {
        console.log('data', data)
        let {internationalLevelRespList, productionAreaRespList} = data
        this.areaList = productionAreaRespList.map(v => {
          return { name: v.areaName, id: v.id }
        })
        this.internationList = internationalLevelRespList.map(v => {
          return { id: v.id, name: v.levelName }
        })
      }
    },
    adjustProps (array, prop) {
      return array.map(v => {
        return { id: v.id, name: v[prop] }
      })
    },
    getInfos () {
      // 价格类型中的价格
      let priceArr = this.extras.priceRangeRespList
      let lens = priceArr.length
      let oneStep = 1 / lens * 100
      let halfStep = 1 / (lens * 2) * 100
      this.stepOne = oneStep
      this.stepHalf = halfStep
      this.sliderStep = halfStep
      let truePirce = []
      priceArr.map((v, index) => {
        if (index === 0) {
          truePirce.push(v.min)
        }
        if (index === lens - 1) {
          let lastone
          if (v.max === 0) {
            lastone = '不限'
          } else {
            lastone = v.max
          }
          truePirce.push(lastone)
          return false
        }
        truePirce.push(v.max)
      })
      // console.log(truePirce, 'truePirce')
      this.priceList = truePirce
    },
    combProps (array, mark) {
      //  { "max": 300, "min": 0 } => { name: '0 ~ 300', id: { "max": 300, "min": 0 } }
      let arr1 = []
      array.map(v => {
        let { min, max } = v
        if (typeof (min) === 'undefined') {
          min = 0
        }
        if (typeof (max) === 'undefined') {
          max = '以上'
        }
        let strs = min + mark + ' ~ ' + max + mark
        arr1.push({ id: v, name: strs })
      })
      return arr1
    },
    clearIndex () {
      // 清空所有选中筛选项
      this.countryIndex = null
      this.varietyIndex = null
      this.sceneIndex = null
      this.featureIndex = null
      this.sortIndex = null
      this.stationIndex = null
      this.internationIndex = null
      this.alcoholIndex = null
      this.netIndex = null
      this.playerIndex = null
      // 重置选项中的包含选中样式
      this.sizerOne = this.sizerOne.map(v => {
        return { name: v.name, iscor: false }
      })
      this.sizerTwo = this.sizerTwo.map(v => {
        return { name: v.name, iscor: false }
      })
    },
    changeSlider (value) {
    }
  }
}
</script>
<style lang="less" scoped>
.winecenter {
  background: #fff;
  line-height: 1;
  font-size: 12px;
  padding-top: 140px;
  &-content {
    .padlr20;
  }
  &-head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
  }
}

.upper {
  padding-top: 10px;
  z-index: 3000;
  position: relative;
  background: #fff;
  .padlr20;
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
      background-image: url("~/assets/img/Icons/ic_triangle_bt_12x12@2x.png");
      opacity: 0.5;
      transform: rotate(0);
      transition: 0.2s;
      // background-image: url("~/assets/img/Icons/ic_triangle_gu_12x12@2x.png");
      .bg_cover;
    }
  }
  .hascor {
    color: @cor_333;
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }

  .active {
    color: @cor_333;
    font-family: PingFangSC-Medium;
    font-weight: 500;

    &:after {
      opacity: 1;
      transform: rotate(180deg);
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
        opacity: 0.5;
        transform: rotate(0);
        transition: 0.2s;
        background-image: url("~/assets/img/Icons/ic_xiala_b_line_12x12.png");
        .bg_cover;
        // background-image: url("~/assets/img/Icons/ic_xiala_g_line_12x12.png");
      }
    }
    &.hascor {
      &>span {
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: @cor_333;
      }
    }
    &.active {
      &>span {
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: @cor_333;
        &:after {
          opacity: 1;
          transform: rotate(180deg);
          background-image: url("~/assets/img/Icons/ic_xiala_b_line_12x12.png");
        }
      }
    }
  }
}
.elZindex {
  z-index: 3000;
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

.slideall {
  .headprice {
    font-size: 19px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    .padtb20;
  }
  .slider {
    padding-top: 50px;
    position: relative;
    &_in  {
      width: 33.3%;
      height: 30px;
      position: absolute;
      top: 35px;
      left: 0;
      background: rgba(0, 0, 0, .3);
    }
    &-items {
      .padtb20;
      .flex_between;
      &>span {
        font-size: 12px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: @cor_666;
      }
    }
  }
}

</style>