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
        <div class="com-item" v-for="(good, index) in goodsList" :key="index" :style="index + 1 === goodsList.length ? 'border-bottom: none' : ''">
          <a href="javascript:void(0)">
            <div class="item_l">
              <div class="item_l_bk" v-lazy:background-image="good.imgUrl" @click="toGoodDetail(good.id)"></div>
              <div class="add-button" @click.stop="compareFn(good.id)">添加到对比列表</div>
            </div>
            <div class="item_r" v-if="isNovice" @click="toGoodDetail(good.id)">
              <h3 class="font_hight">{{good.goodsName}}</h3>
              <div class="itemr-price">
                <span class="t_price">¥ {{good.actualPrice}}</span>
                <del class="m_price">市场价：¥ {{good.marketPrice}}</del>
              </div>
              <div class="tag-wrap"><span class="tag-item" v-for="(tag, tagIndex) in customArray(good.tagListJson)">{{ tag }}</span></div>
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
            </div>
            <div class="item_r" v-else @click="toGoodDetail(good.id)">
              <h3 class="font_hight">{{good.goodsName}}</h3>
              <div class="itemr-price">
                <span class="t_price">¥ {{good.actualPrice}}</span>
                <del class="m_price">市场价：¥ {{good.marketPrice}}</del>
              </div>
              <div class="tag-wrap"><span class="tag-item" v-for="(tag, tagIndex) in customArray(good.tagListJson)">{{ tag }}</span></div>
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
import { goodsApi } from '~/api/goods'
import countryCpm from '~/components/winecenter/countryList'
import listTwo from '~/components/winecenter/listTwo'
import nullData from '~/components/nullData'
import { wineApi } from '~/api/wine'
import tools from '~/utils/tools'
import wechatLogin from '~/utils/wechatLogin'
import Inertia from '~/utils/inertia'

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

  middleware: 'checkWxStatus',

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
    console.log(goodCode)
    if (goodCode === 200) {
      let { array, page, totalPageNo } = goodData
      const ismore = page < totalPageNo
      return {
        env: req.env,
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
      env: 0, // 浏览器环境
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
  async mounted () {
    let params = { ifWine: true }
    const { code, data } = await wineApi.clientAttrs(params)
    if (code === 200) {
      this.extras = data
      this.getProplist()
      this.getInfos()
    }

    await this.addBarwid()
    const compareBtn = document.querySelector('.compare-btn')
    new Inertia(compareBtn)
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
      if (this.env === 1) {
        wechatLogin.wxLogin('/order/cart')
      } else {
        window.location.href = '/order/cart'
      }
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
    },
    async compareFn (goodsId) {
      const { code } = await goodsApi.addCompare(goodsId)
      if (code === 200) {
        this.$toast('加入对比成功')
      }
    },
    toGoodDetail(id) {
      window.location.href = '/detail/' + id
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
      background-image: url("~assets/img/Icons/ic_qiehuan_blue_22x22.png");
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
        background-image: url('~assets/img/Icons/ic_search_g_16x16@2x.png');
        .bg_cover;
      }
      .delete_icon {
        padding: 6px 0;
        width: 14px;
        height: 14px;
        background-repeat: no-repeat;
        background-size: 14px 14px;
        background-position: center center;
        background-image: url('~assets/img/Icons/ic_shanchu_g_14x14@2x.png');
      }
      .inpbox {
        width: 130px;
        height: 13px;
        background: transparent;
        box-sizing: content-box;
      }
      input::-webkit-search-cancel-button{
        display: none;
        line-height: 28px;
      }
    }
    .icon_buy {
      width: 30px;
      height: 30px;
      background-image: url("~assets/img/Icons/ic_shop_b_30x30@2x.png");
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
      background-image: url("~assets/img/Icons/ic_triangle_bt_12x12@2x.png");
      opacity: 0.5;
      transform: rotate(180deg);
      transition: 0.2s;
      // background-image: url("~assets/img/Icons/ic_triangle_gu_12x12@2x.png");
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
      transform: rotate(0);
      background-image: url("~assets/img/Icons/ic_triangle_bt_12x12@2x.png");
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
        background-image: url("~assets/img/Icons/ic_xiala_b_line_12x12.png");
        .bg_cover;
        // background-image: url("~assets/img/Icons/ic_xiala_g_line_12x12.png");
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
          background-image: url("~assets/img/Icons/ic_xiala_b_line_12x12.png");
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
  .u-bars;
  padding-bottom: 15px;
  border-bottom: 1px solid #f5f5f5;
  padding-right: 15px;
  margin: 20px 0;
  & > a {
    .flex_between;
    align-items: flex-start;
  }

  .item_l {
    width: 130px;
    height: 130px;
    border-radius: 4px;
    border: 1PX solid #eaeaea;
    box-sizing: border-box;
    &_bk {
      width: 120px;
      height: 120px;
      margin: 4px auto;
      .bg_contain;
    }
    .add-button {
      margin-top: 15px;
      width: 130px;
      height: 40px;
      box-sizing: border-box;
      border-radius: 2px;
      border: 1PX solid #C7C7C7;
      text-align: center;
      line-height: 38px;
      font-size: 11px;
      font-weight: bold;
      color: #333;
      &:active {
        opacity: .9;
      }
    }
  }

  .item_r {
    width: 195px;
    min-height: 180px;
    &>h3 {
      font-size: 13px;
      color: #333;
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .tag-wrap {
      margin-right: -5px;
      .tag-item {
        display: inline-block;
        min-width: 45px;
        padding: 0 4px;
        height: 15px;
        box-sizing: border-box;
        font-size: 9px;
        color: #999;
        border: 1PX solid #ddd;
        border-radius: 2px;
        text-align: center;
        line-height: 13px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }

    &>p {
      .u-mltip;
      line-height: 18px;
      padding-bottom: 0;
    }

    .itemr-price {
      .t_price {
        display: inline-block;
        font-size: 15px;
        font-family:PingFangSC-Semibold;
        font-weight: bold;
        color: @c-price;
      }

      .m_price {
        display: inline-block;
        padding-left: 7px;
        font-size: 11px;
        color: @cor_999;
      }

    }

  }

}
// 高手选酒
.novice {
  .itemr-info {
    margin-left: -7px;
    padding-bottom: 10px;
    &>span {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      background-color: #def3f9;
      border-radius: 10px;
      padding-left: 26px;
      padding-right: 10px;
      vertical-align: middle;
      margin-top: 10px;
      position: relative;
      font-size: 11px;
      font-weight: bold;
      color: #03a1cd;
      margin-left: 7px;
      background-position: left center;
      background-repeat: no-repeat;
      background-size: 20px auto;
    }
    .icon_time {
      background-image: url("~assets/img/Icons/ic_time_24x24.png");
    }
    .icon_address {
      background-image: url("~assets/img/Icons/ic_position_24x24.png");
    }
    .icon_variety {
      background-image: url("~assets/img/Icons/ic_grape_24x24.png");
    }
  }
  .itemr-price {
    padding: 10px 0 12px;
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
    background: url('~assets/img/Icons/ic_vs_blue_45x45@2x.png') no-repeat center/contain;
  }
}
</style>