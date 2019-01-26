<template>
  <div class="winecenter">
    <div class="top-one">
      <div class="one_l" @click="toOthers">
        <span class="icon_switch"></span>
        <span class="world">其它商品</span>
      </div>
      <div class="one_r">
        <div class="searchbox">
          <i class="search_icon"></i>
          <form action="javascript:return true;">
            <input class="inpbox" v-model="searchGoodname" placeholder="请输入想要查找的内容" type="search" @keyup.13="toSearch" />
          </form>
          <i class="delete_icon" @click="clearSearch"></i>
        </div>
        <i class="icon_buy" @click="toCart"></i>
      </div>
    </div>
    <div class="top-two">
      <div class="two-item" :class="{hascor: countryIndex !== null}" @click="elCountry">国家产区</div>
      <div class="two-item" :class="[{active: sizerIndex == index}, {hascor: item.iscor || index === 2}]" @click="elScreens(index)" v-for="(item, index) in sizerOne" :key="index">{{item.name}}</div>
    </div>
    <div class="top-three" :class="{threeZindex: twoType}">
      <div class="three-item" :class="[{active: sizerIndex == index + 3}, {hascor: rank.iscor}]" @click="elScreens(index + 3)" v-for="(rank, index) in sizerTwo" :key="index">
        <span>{{rank.name}}</span>
      </div>
      <div class="three-item hascor" :class="{active: sizerIndex == 6}" @click="elScreens(6)">
        <span>{{noviceMaster}}</span>
      </div>
    </div>
    <div class="winecenter-content" ref="scrollElem">
      <section class="novice" ref="scrollChild">
        <div class="com-item" v-for="(good, index) in goodsList" :key="index">
          <a :href="'/detail/' + good.id">
            <div class="item_l">
              <div class="item_l_bk" v-lazy:background-image="good.imgUrl"></div>
            </div>
            <div class="item_r" v-if="!isNovice">
              <h3 class="font_hight">{{good.goodsName}}</h3>
              <p>
                <span v-for="(tag, tagIndex) in customArray(good.tagListJson)">
                  <template v-if='tagIndex === customArray(good.tagListJson).length - 1'>
                    {{ tag }}
                  </template>
                  <template v-else>
                    {{ tag + ' | ' }}
                  </template>
                </span>
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
              <h3 class="font_hight">{{good.goodsName}}</h3>
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
          </a>
        </div>
        <div class="load-more" v-if="hasScroll">{{moreData ? loadTxt : '已无更多商品'}}</div>
      </section>
      <null-data v-if="goodsList.length === 0"></null-data>
    </div>
    <!-- 国家弹窗 start -->
    <country-cpm :showcountry="showCountry" :countryIndex="countryIndex" :countryList="countryList" :areaList="areaList" :areaIndex="areaIndex" @selectCountry="selectCountry" @selectArea="selectArea" @delCountry="delCountry" @countryRest="countryRest" @countryOk="countryOk"></country-cpm>
    <!-- 国家弹窗 end -->
    <!-- 刷选器 Start -->
    <list-two :posttype="postType" :twotype="twoType" :postObj="postObj" :showtwo="showtwo" @closeFn="closeScreens" @updateList="onListFn" @subRest="subRest" @subOk="subOk">
      <div slot="foot" v-if="sizerIndex === 2 || sizerIndex === 6 || sizerIndex === null"></div>
    </list-two>
    <!-- 刷选器 Start -->
    <!-- 去对比 -->
    <div class="compare-btn" @click='toCompare'>
      <div>
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
import countryCpm from '~/components/winecenter/countryList'
import listTwo from '~/components/winecenter/listTwo'
import nullData from '~/components/nullData'
import { wineApi } from '~/api/wine'
import tools from '~/utils/tools'

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
      count: 5,
      ifWine: true,
      ifSellOut: false,
      ifExclusive: false
    }
    // 保存对象初始值
    const defparams = { ...params }
    const { code: goodCode, data: goodData } = await wineApi.goodList(params, req)
    if (goodCode === 200) {
      let { array, page, totalPageNo } = goodData
      const ismore = page < totalPageNo
      return {
        tansmit: params,
        defaultTansmit: defparams,
        curPage: page,
        totalPage: totalPageNo,
        moreData: ismore,
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
      priceIndex: null,
      varietyList: [], // 品种列表
      varietyIndex: null,
      sceneList: [],
      sceneIndex: null,
      featureList: [],
      featureIndex: null,
      sortIndex: 0,
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
      tansmit: {}, // 传递参数
      defaultTansmit: {}, // 默认参数
      curPage: 1,
      totalPage: 1,
      loadOk: true, // 加载是否完成
      moreData: true, // 有更多数据
      hasScroll: false, // 是否有滚动
      loadTxt: '下拉加载更多',
      searchGoodname: '' // 搜索商品名字
    }
  },
  components: {
    countryCpm,
    listTwo,
    nullData
  },
  async created () {
    console.log(this.goodsList)
    this.Inertia = require('~/static/inertia')
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
    const compareBtn = document.querySelector('.compare-btn')
    this.Inertia(compareBtn)
    let scrollElem = this.$refs.scrollElem
    let scrollChild = this.$refs.scrollChild
    let allH = scrollElem.clientHeight
    let sctop = scrollElem.offsetTop
    scrollElem.addEventListener('scroll', tools.throttel(() => {
      let { height, top } = scrollChild.getBoundingClientRect()
      let _top = Math.abs(top)
      let bottomH = height - (_top + sctop + allH)
      // console.log('bottomH', bottomH)
      this.hasScroll = true
      if (bottomH <= 100 && this.loadOk && this.moreData) {
        this.loadOk = false
        this.fetchData(true)
      }
    }))
  },
  methods: {
    toCart () {
      window.location.href = '/order/cart'
    },
    toOthers () {
      window.location.href = '/winecenter/otherone'
    },
    toSearch () {
      let objGoodname = { goodsName: this.searchGoodname }
      Object.assign(this.tansmit, objGoodname)
      this.fetchData()
    },
    clearSearch () {
      this.searchGoodname = ''
      this.toSearch()
    },
    subRest () {
      this.defTansmitFn()
      this.closeScreens()
      this.clearIndex()
      this.fetchData()
    },
    subOk () {
      this.closeScreens()
      this.fetchData()
    },
    defTansmitFn () {
      // 重置默认参数，防止 tansmit指向 defaultTansmit的内存地址，修改 defaultTansmit 对象
      this.tansmit = Object.assign({}, this.defaultTansmit)
    },
    countryRest () {
      this.defTansmitFn()
      this.showCountry = false
      this.clearIndex()
      this.fetchData()
    },
    countryOk () {
      this.showCountry = false
      this.fetchData()
    },
    async fetchData (getMore) {
      // 滚动
      this.$toast.loading('加载中...')
      this.loadTxt = '加载中'
      if (getMore) {
        this.curPage += 1
        this.hasScroll = true
      } else {
        this.curPage = 1
        this.hasScroll = false
      }
      Object.assign(this.tansmit, { page: this.curPage })
      const { code, data } = await wineApi.clientList(this.tansmit)
      if (code === 200) {
        let { array, page, totalPageNo } = data
        this.curPage = page
        this.totalPage = totalPageNo
        this.moreData = page < totalPageNo
        if (getMore) {
          this.goodsList.push(...array)
        } else {
          this.goodsList = array
        }
        this.addBarwid()
        this.loadTxt = '下拉加载更多'
      }
      this.loadOk = true
    },
    addBarwid () {
      // 进度条
      this.$nextTick(() => {
        let ubars = this.$refs.ubars
        if (Array.isArray(ubars)) {
          ubars.map(v => {
            v.style.width = v.getAttribute('data-bar') + '%'
          })
        }
      })
    },
    selectCountry (info) {
      // 选择国家
      console.log('info', info)
      this.countryIndex = info.elIndex
      // 重置产区
      this.areaIndex = null
      let subObj = { countryid: info.id }
      Object.assign(this.tansmit, subObj)
      if (info.id === null && info.elIndex === null) {
        this.areaList = []
        this.internationList = []
      } else {
        this.getAreaList(info.id)
      }
    },
    selectArea (info) {
      console.log('info', info)
      this.areaIndex = info.elIndex
      let subObj = { areaid: info.id }
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
    onListFn (obj) {
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
          if (groupIndex === 0) {
            this.priceIndex = elIndex
            subObj.minActualPrice = id ? id.min : null
            subObj.maxActualPrice = id ? id.max : null
          } else {
            subObj.typeid = id
            this.varietyIndex = elIndex
          }
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
          // 选择相同选项
          if (id !== null) {
            this.sortIndex = elIndex
          }
          this.showtwo = false
          this.fetchData()
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
          if (groupIndex === 0) {
            this.alcoholIndex = elIndex
            subObj.minAlcoholDegree = id ? id.min : null
            subObj.maxAlcoholDegree = id ? id.max : null
          } else {
            this.netIndex = elIndex
            subObj.minNetVolume = id ? id.min : null
            subObj.maxNetVolume = id ? id.max : null
          }
          break
        case 6:
          if (id === 2) {
            this.isNovice = false
            this.noviceMaster = '高手选酒'
          } else if (id === 1) {
            this.isNovice = true
            this.noviceMaster = '新手选酒'
          }
          // 选择相同选项
          if (id !== null) {
            this.playerIndex = elIndex
          }
          this.fetchData()
          this.showtwo = false
          this.sizerIndex = null
          break
      }
      this.postObj.list[groupIndex].elIndex = elIndex
      Object.assign(this.tansmit, subObj)
      console.log(this.tansmit, 'tansmit')
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
              title: '价格范围',
              clsType: 'u-list3',
              list: this.priceList,
              elIndex: this.priceIndex
            },
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
      // if (!Array.isArray(arr)) return false
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
      let truePirce = priceArr.map((v, index, array) => {
        if (v.max === 0) {
          v.name = v.min + '~' + '以上'
        } else {
          v.name = v.min + '~' + v.max
        }
        v.id = v
        return v
      })
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
      this.searchGoodname = ''
      this.countryIndex = null
      this.areaIndex = null
      this.priceIndex = null
      this.varietyIndex = null
      this.sceneIndex = null
      this.featureIndex = null
      this.sortIndex = 0
      this.stationIndex = null
      this.internationIndex = null
      this.grapeIndex = null
      this.alcoholIndex = null
      this.netIndex = null
      this.playerIndex = 0
      // 重置选项中的包含选中样式
      this.sizerOne = this.sizerOne.map(v => {
        return { name: v.name, iscor: false }
      })
      this.sizerTwo = this.sizerTwo.map(v => {
        return { name: v.name, iscor: false }
      })
    },
    // 去对比
    async toCompare () {
      const { code, data } = await wineApi.showGoodsForContrast()
      if (code === 200) {
        console.log(data)
        if (data.length >= 2) {
          window.location.href = '/compare'
        } else if (data.length === 1) {
          this.$toast('对比商品不能少于2件')
        } else if (data.length === 0) {
          this.$toast('您还未添加对比商品')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.winecenter {
  background: #fff;
  line-height: 1;
  font-size: 12px;
  &-content {
    max-height: calc(100vh - 180px);
    overflow: auto;
  }
}
.top-one {
  height: 40px;
  background: #fff;
  position: relative;
  z-index: 4000;
  .padlr20;
  .flex_between;
  .one_l {
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
  .one_r {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .searchbox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 204px;
      margin-right: 5px;
      height: 28px;
      background:rgba(250,250,250,1);
      border-radius:14px;
      padding: 0 15px;
      box-sizing: border-box;
      .search_icon {
        width: 16px;
        height: 16px;
        background-image: url('~/assets/img/Icons/ic_search_g_16x16@2x.png');
        .bg_cover;
      }
      .delete_icon {
        padding: 6px 0;
        width: 14px;
        height: 14px;
        background-repeat: no-repeat;
        background-size: 14px 14px;
        background-position: center center;
        background-image: url('~/assets/img/Icons/ic_shanchu_g_14x14@2x.png');
      }
      .inpbox {
        width: 130px;
        height: 13px;
        padding: 5px 0;
        background: transparent;
        box-sizing: content-box;
      }
      input::-webkit-search-cancel-button{
        display: none;
      }
    }
    .icon_buy {
      width: 30px;
      height: 30px;
      background-image: url("~/assets/img/Icons/ic_shop_b_30x30.png");
      .bg_cover;
    }
  }
}
.top-two {
  height: 40px;
  z-index: 9999;
  background: #fff;
  position: relative;
  z-index: 4000;
  .padlr20;
  .flex_between;
  .two-item {
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
.top-three {
  height: 40px;
  background: #fff;
  position: relative;
  border-bottom: 1PX solid @cor_border;
  padding: 0 20px 10px;
  .flex_between;
  .three-item {
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
        font-weight: 500;
        color: @cor_333;
      }
    }
    &.active {
      &>span {
        font-family: PingFangSC-Semibold;
        font-weight: 500;
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
.threeZindex {
  z-index: 4000 !important;
}
// 选酒公共
.com-item {
  .padlr20;
  margin: 20px 0;
  & > a {
    .flex_between;
  }

  .item_l {
    width: 120px;
    height: 210px;
    border-radius: 8px;
    border: 1PX solid #eaeaea;
    &_bk {
      margin-top: 6px;
      width: 100%;
      height: 202px;
      .bg_contain;
    }
  }

  .item_r {
    width: 195px;
    min-height: 213px;

    &>h3 {

      font-size: 15px;

      color: rgba(51, 51, 51, 1);

      line-height: 21px;

    }

    &>p {
      .u-mltip;
      line-height: 18px;
      padding-bottom: 0;
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
.load-more {
  line-height: 50px;
  background: #F5F5F5;
  text-align: center;
  font-size: 12px;
  background: #F5F5F5;
  color: #666;
}

.compare-btn {
  position: fixed;
  bottom: 30%;
  right: 0;
  padding: 0 20px;
  z-index: 10000;
  div {
    padding: 10px;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background: #7A7A7A;
    box-sizing: border-box;
  }
  i {
    display: inline-block;
    width: 45px;
    height: 45px;
    background: url('~/assets/img/Icons/ic_vs_blue_45x45@2x.png') no-repeat center/contain;
  }
}
</style>