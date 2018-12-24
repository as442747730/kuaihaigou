<template>
  <main class="u-detail">
    <section class="u-detail_header">
      <van-nav-bar title="商品详情" left-arrow @click-left="historyBack">
        <van-icon name="fenxiang" slot="right" />
        <van-icon name="collect" slot="right" />
      </van-nav-bar>
    </section>

    <section class="u-detail_info">

      <div class="u-detail_banner">
        <div v-swiper:mySwiper="swiperBanner">
          <div class="swiper-wrapper">
            <div class="swiper-slide banner-list" v-for="(banner, index) in topGoods.imgList" :key="index">
              <div class="banner-list-box">
                <div class="pro">
                  <img :src="banner.imgUrl">
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-page">
            <span class="point" :class="{active: index === 0}" v-for="(point, index) in topGoods.imgList" :key="index"></span>
          </div>
        </div>
      </div>

      <div class="u-detail_info-desc margin-30">
        <h2 class="limit_one">{{topGoods.goodsName}}</h2>
        <p>
          <span v-for="(tag, index) in topGoods.topList" :key="index">{{tag}}</span>
        </p>
        <em class="price">
          ¥ {{ showPrice }}
        </em>
        <div class="to-compare" @click="compareFn">
          去对比
        </div>
        <br>
        <div class="active">
          全场满88元免邮
        </div>
        <!-- 单品时出现 -->
        <div class="single-sku-num" v-if='singleObj.isSingle'>
          <h4>数量：</h4>
          <van-stepper
            :min="1"
            :max="singleObj.stock"
            @change="changeSingleFn"
            v-model="singleObj.num"
            :integer="true" />
          <div class="surstock">剩余库存{{ singleObj.stock }}</div>
        </div>
      </div>
    </section>

    <div class="u-detail_line"></div>

    <!-- 配送 -->
    <div class="u-detail_send" @click="openAreaSelect">
      <div class="ib-middle">
        <i></i>
        <span class="limit_one">{{ areaTxt }}</span>
      </div>
      <div class="choose-txt">
        <p class="ib-middle" v-if="ifsend">可配送</p>
        <p class="ib-middle" v-else>不可配送</p>
        <i class="van-icon ib-middle van-icon-arrow"></i>
      </div>
    </div>

    <div class="u-detail_line"></div>

    <section class="u-detail_choose">
      <div class="u-detail_choose-item" @click="openSkuFn" v-if='skuAttrList.length !== 0'>
        <span>选择规格</span>
        <div class="choose-txt">
          <p class="ib-middle">
            <span>{{ getskuInfo.skuname }}</span>
          </p>
          <i class="van-icon ib-middle van-icon-arrow"></i>
        </div>
      </div>
      <div class="u-detail_choose-item" @click="openPack" v-if='packList.length !== 0'>
        <span>套餐购买</span>
        <div class="choose-txt">
          <p class="ib-middle">
            <span v-if="!!elpackId">{{ nowpack.name }}</span>
          </p>
          <i class="van-icon ib-middle van-icon-arrow"></i>
        </div>
      </div>
    </section>

    <div class="u-detail_line" id="local"></div>

    <section class="u-detail_tab">
      <ul class="tab-item">
        <li class="tab-list" :class="{'cur': tabIndex === 1}" @click="chooseType(1)">
          <span>图文详情</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 2}" @click="chooseType(2)">
          <span>酒评参数</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 3}" @click="chooseType(3)">
          <span>评价提问</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 4}" @click="chooseType(4)">
          <span>售后服务</span>
        </li>
      </ul>
    </section>

    <section class="u-detail_tab hidden" :class="{'show': tabFixed}">
      <ul class="tab-item">
        <li class="tab-list" :class="{'cur': tabIndex === 1}" @click="chooseType(1)">
          <span>图文详情</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 2}" @click="chooseType(2)">
          <span>酒评参数</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 3}" @click="chooseType(3)">
          <span>评价提问</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 4}" @click="chooseType(4)">
          <span>售后服务</span>
        </li>
      </ul>
    </section>

    <!-- 内容模块 -->
    <transition name='slide-fade2' mode="out-in">
      <component v-bind:is="view" :viewdata="viewData" :hotlist="hotlist" :goodsid="goodsId" :scrollbottom='scrollBottom'></component>
    </transition>

    <!-- 底栏 -->
    <van-goods-action>
      <van-goods-action-mini-btn icon="kefu" text=" " @click="onClickefu" />
      <van-goods-action-mini-btn icon="cart2" text=" " @click="onClickMiniBtn" />
      <van-goods-action-big-btn :loading='isLoading' text="加入购物车" @click="addCart" />
      <van-goods-action-big-btn :loading='buyLoading' class='buy-now' text="立即购买" @click="buyNow" primary />
    </van-goods-action>
    <!-- 规格弹窗 -->
    <van-actionsheet v-model="skuShow" title="选择规格">
      <div class="sku-wrap">
        <div class="goods-info">
          <div class="pro ib-middle">
            <img v-if="topGoods.imgList[0].imgUrl" :src="topGoods.imgList[0].imgUrl">
          </div>
          <div class="desc ib-bottom">
            <div class="price">
              ¥{{ getskuInfo.allprice }}
            </div>
            <div class="selected">
              已选：【{{ getskuInfo.skuname }}】
            </div>
          </div>
        </div>
        <div class="sku-item" v-for="(skuList, index) in newSkuAttrs" :key="index">
          <h4 class="sku-title">{{skuList[0].specName}}</h4>
          <div class="sku-item-ul">
            <div class="sku-list"
              :class="{cur: sku.specValue === skuVals[index]}"
              @click="elSkuFn(sku, index)"
              v-for="(sku, ind) in skuList"
              :key="ind">
              <span class="sku-name">{{sku.specValue}}</span>
            </div>
          </div>
        </div>
        <div class="sku-num">
          <h4>数量</h4>
          <van-stepper
            :min="1"
            :max="skuObj.stock"
            @change="changeSkuFn"
            v-model="getskuInfo.num"
            :integer="true" />
          <div class="surstock">剩余库存{{ skuObj.stock }}</div>
        </div>
      </div>
    </van-actionsheet>
    <!-- 套餐弹窗 -->
    <van-actionsheet v-model="packShow" title="选择套餐">
      <div class="sku-wrap pack-wrap">
        <div class="goods-info">
          <div class="pro ib-middle">
            <img :src="nowpack.coverUrl">
          </div>
          <div class="desc ib-bottom">
            <div class="price">
              ¥ {{ nowpack.allprice }}
            </div>
            <div class="selected">
              已选：【{{ nowpack.name}}】
            </div>
          </div>
        </div>
        <div class="sku-item">
          <h4 class="sku-title">包装</h4>
          <div class="sku-item-ul">
            <div class="sku-list"
              :class="{cur: pack.id === elpackId}"
              @click="elpackFn(index, elpackId, pack)"
              v-for="(pack, index) in packList"
              :key="index">
              <span class="sku-name">{{ pack.name }}</span>
            </div>
          </div>
        </div>
        <div class="pack-goods-bill">
          <span>商品清单：</span>
          <p>{{ packDetaList }}</p>
        </div>
        <div class="sku-num">
          <h4>数量</h4>
          <van-stepper
            :min="1"
            :max="nowpack.goodsNum"
            @change="changepackFn"
            v-model="packDetaNum"
            :integer="true" />
          <div class="surstock">剩余库存{{ nowpack.goodsNum }}</div>
        </div>
      </div>
    </van-actionsheet>
    <!-- 省市区联动 -->
    <van-popup v-model="popupShow" position="bottom">
      <van-picker ref="areaPicker" :columns="columns" show-toolbar @change="handleChange" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>

  </main>
</template>
<script>
import api from '~/utils/request'
import { goodsApi } from '~/api/goods'
import { userApi } from '~/api/users'
import { cartApi } from '~/api/cart'
import uGraphic from '~/components/detail/Graphic'
import uParame from '~/components/detail/Parame'
import uComment from '~/components/detail/Comment'
import uAfter from '~/components/detail/After'

export default {
  components: {
    uGraphic,
    uParame,
    uComment,
    uAfter
  },

  head () {
    return {
      title: '商品详情',
      meta: [
        { hid: 'title', name: 'title', content: '商品详情' }
      ]
    }
  },
  async asyncData (req) {
    const goodsId = req.params.detail
    let id = goodsId
    let detailFn = goodsApi.getDetail(id, req)
    let topSaleFn = goodsApi.getTopSales(req)
    let userInfoFn = userApi.serverPostInfo(req)
    const {code: detCode, data: detData} = await detailFn
    const {code: hotCode, data: hotData} = await topSaleFn
    const {code: userCode} = await userInfoFn
    if (detCode === 200) {
      let hotlist = []
      let isLogin = false
      if (hotCode === 200) {
        hotlist = hotData
      }
      console.log(userCode)
      if (userCode === 200) {
        isLogin = true
      }
      // console.log('detData', detData)
      let { imgList, goodsName, actualPrice, introduce } = detData
      let topData = {
        imgList: imgList,
        goodsName: goodsName,
        actualPrice: actualPrice,
        introduce: introduce
      }
      let { skuAttrList, skuList, packList } = detData

      // 商品清单
      let { goodsDetailMobile, listDetailMobile, lists } = detData
      let goodsList = {
        goodsDetailMobile: goodsDetailMobile, // 商品详情
        listDetailMobile: listDetailMobile, // 包装清单
        lists: lists // 清单列表
      }
      // 酒评参数
      let { redAttr, brandName, goodsWineCommentResp, goodsNum } = detData
      let wineParams = {
        goodsIndentify: goodsNum, // 商品编号
        redAttr: redAttr, // 红酒属性
        brandName: brandName,
        goodsWineCommentResp: goodsWineCommentResp
      }

      // 评价提问
      let { satisfactionNum, satisfactionDegree } = detData
      let commentParams = {
        satisfactionNum: satisfactionNum,
        satisfactionDegree: satisfactionDegree
      }

      // 商品是否单品
      let { stock } = detData
      let isSingle = false
      if (skuList.length === 0) isSingle = true
      let singleObj = {
        isSingle: isSingle,
        stock: stock,
        actualPrice: actualPrice,
        allprice: actualPrice
      }

      console.log(isLogin)

      return {
        goodsId: goodsId,
        isLogin: isLogin,
        topGoods: topData,
        skuAttrList: skuAttrList,
        skuList: skuList,
        packList: packList,
        goodsList: goodsList,
        wineParams: wineParams,
        commentParams: commentParams,
        hotlist: hotlist,
        singleObj: singleObj
      }
    }
  },

  data () {
    return {
      goodsId: '',
      isLogin: false,
      // 初始化数据
      swiperBanner: {
        speed: 600,
        slidesPerView: 'auto',
        on: {
          slideChangeTransitionStart: function (swiper) {
            document.querySelectorAll('.point').forEach(el => {
              el.classList.remove('active')
            })
            document.getElementsByClassName('swiper-page')[0].querySelectorAll('.point')[this.activeIndex].classList.add('active')
          }
        }
      },
      topGoods: {}, // 上部商品详情数据
      turePrice: 0,
      skuAttrList: [], // 商品规格
      newSkuAttrs: [], // 重新组合skuAttrList
      nowSkuAttr: {}, // 选中商品规格
      skuVals: [], // 选中 specValue 数组
      skuList: [],
      skuObj: {
        num: 1
      }, // 选中sku对象
      elSkuNum: 1, // 选择sku的数量
      getskuInfo: {
        num: 1,
        oneprice: 0,
        allprice: 0,
        skuname: ''
      }, // 获取sku 信息
      packList: [], // 套餐集合
      elpackIndex: 0, // 选中套餐索引
      packDetaNum: 1, // 套餐 当前数量
      packDetaList: '', // 套餐 商品清单
      nowpack: {
        coverUrl: '',
        oneprice: 0,
        allprice: 0,
        name: '',
        goodsNum: 0
      }, // 选中套餐
      elpackId: '', // 选中套餐id
      singleObj: {}, // 单品信息
      ifsend: false, // 是否可配送
      goodsDetailMobile: '', // 商品详情
      listDetailMobile: '', // 包装清单
      goodsList: {}, // 商品清单
      wineParams: {}, // 酒评参数
      viewData: {}, // 组件传递的参数
      active: 1,
      view: uGraphic,
      tabIndex: 1,
      tabFixed: false,
      // 功能数据
      skuShow: false,
      packShow: false,
      num: 10,

      // 配送功能
      areaTxt: '请选择',
      // 省市区的id
      provinceId: '86',
      cityId: '',
      // districtId: '',
      // 省市区的中文
      provinceTxt: '',
      cityTxt: '',
      // districtTxt: '',
      // 所选的省市区在选择组件中对应列表的索引，每次打开时使用 van-picker 的 setColumnIndex 方法设置选中的省市区
      provinceIndex: 0,
      cityIndex: 0,
      // districtIndex: 0,
      // 省市区
      provinceList: [],
      cityList: [],
      // districtList: [],

      popupShow: false,
      columns: [{ values: [] }, { values: [] }],

      // 底栏
      isLoading: false,
      buyLoading: false,

      // 滚动到底部
      scrollBottom: false
    }
  },

  computed: {
    showPrice: function () {
      let retprice = this.topGoods.actualPrice
      if (this.elpackId !== '') {
        retprice = this.nowpack.allprice
      } else if (this.getskuInfo.skuname !== '') {
        retprice = this.getskuInfo.allprice
      } else {
        retprice = this.singleObj.allprice
      }
      return retprice
    }
  },

  async created (req) {
    const {code, data} = await goodsApi.getProvince('86')
    if (code === 200) {
      this.provinceList = data.map(v => {
        return {
          id: v.id,
          text: v.areaName
        }
      })
    }
    // 判断 skuList 是否存在
    if (this.skuList.length !== 0) {
      // skuAttrListi生成二维数组
      let skuArr = this.skuAttrList
      let arr = skuArr.map(v => {
        return v.specName
      })
      let setArr = [...new Set(arr)]
      let newArr = Array.from({ length: setArr.length })
      for (let i = 0; i < skuArr.length; i++) {
        setArr.map((value, index) => {
          if (skuArr[i].specName === value) {
            if (!newArr[index]) {
              newArr[index] = []
              // 初始化skuVals
              this.skuVals.push(skuArr[i].specValue)
            }
            newArr[index].push(skuArr[i])
          }
        })
      }
      this.newSkuAttrs = newArr
      // 初始化规格选择
      this.getSkuFn()
    }
  },

  mounted () {
    this.scrollTimer = null
    let that = this
    window.addEventListener('scroll', this.handleScroll(function () {
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      let tabOffsetTop = document.querySelector('.u-detail_tab').offsetTop
      // 距离底部大约200像素
      console.log(scrollTop)
      if (scrollTop + this.windowHeight === this.scrollHeight) {
        console.log('到底部了')
        this.scrollBottom = true
      } else {
        this.scrollBottom = false
      }
      if (scrollTop >= tabOffsetTop) {
        that.tabFixed = true
      } else {
        that.tabFixed = false
      }
    }))
  },

  methods: {
    chooseType (val) {
      this.isQuestion = false
      this.tabIndex = val
      this.goAnchor('#local')
      switch (val) {
        case 1:
          this.viewData = this.goodsList
          this.view = 'uGraphic'
          break
        case 2:
          this.viewData = this.wineParams
          this.view = 'uParame'
          break
        case 3:
          this.viewData = this.commentParams
          this.view = 'uComment'
          break
        case 4:
          this.viewData = {
            name: 'uAfter'
          }
          this.view = 'uAfter'
          break
      }
    },
    // 锚点跳转
    goAnchor (selector) {
      let anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop
    },
    openAreaSelect () {
      this.getArea(this.provinceId, 'city')
      if (this.$refs.areaPicker) {
        this.$refs.areaPicker.setColumnValues(1, this.cityList)
        // this.$refs.areaPicker.setColumnValues(2, this.districtList)
        this.$refs.areaPicker.setColumnIndex(0, this.provinceIndex)
        this.$refs.areaPicker.setColumnIndex(1, this.cityIndex)
        // this.$refs.areaPicker.setColumnIndex(2, this.districtIndex)
      } else {
        this.columns[0].values = this.provinceList
        this.columns[1].values = this.cityList
        // this.columns[2].values = this.districtList
      }
      this.popupShow = true
    },
    async getArea (id, val) {
      const { code, data } = await api.clientGet('/api/area/' + id)
      if (code === 200) {
        this[val + 'List'] = data.map((n) => { return { text: n.areaName, id: n.id } })
      }
    },
    async handleChange (instance, val, column) {
      if (column === 0) {
        await this.getArea(val[column].id, 'city')
        instance.setColumnValues(1, this.cityList)
      }
    },
    onCancel () {
      this.popupShow = false
    },
    async onConfirm (val, idx) {
      console.log('val confirm', val)
      this.provinceId = val[0].id
      this.cityId = val[1].id

      this.provinceTxt = val[0].text
      this.cityTxt = val[1].text

      this.provinceIndex = idx[0]
      this.cityIndex = idx[1]

      this.areaTxt = this.provinceTxt + this.cityTxt

      let goodsId = this.goodsId
      let cityId = this.cityId
      const {code, data} = await goodsApi.checkDistr(goodsId, cityId)
      if (code === 200) {
        if (data === 2) {
          this.ifsend = false
        } else {
          this.ifsend = true
        }
      }
      this.popupShow = false
    },
    openSkuFn () {
      // 打开规格弹窗
      if (this.skuList.length !== 0) {
        this.getSkuFn()
        this.skuShow = true
        this.elpackId = ''
      }
    },
    elSkuFn (sku, index) {
      // 选择规则
      this.skuVals.splice(index, 1, sku.specValue)
      this.getSkuFn()
    },
    getSkuFn () {
      // 根据id 拿到skuList
      console.log(this.skuList, 'skuList')
      let obj = this.skuList.find(v => {
        return this.everyGood(v.skuName)
      })
      console.log('obj', obj)
      this.skuObj = obj
      let {sellPrice, stock, skuName, id} = obj
      let lastnum = this.getskuInfo.num
      let nownum = stock >= lastnum ? lastnum : 1
      let allprice = sellPrice * nownum
      this.getskuInfo.skuname = skuName
      this.getskuInfo.num = nownum
      this.getskuInfo.oneprice = sellPrice
      this.getskuInfo.allprice = allprice
      this.getskuInfo.skuid = id
      console.log(this.getskuInfo, 'getskuInfo')
    },
    everyGood (str) {
      // str 包含数组的每一个元素
      return this.skuVals.every(val => str.includes(val))
    },
    openPack () {
      // 打开套餐弹窗
      if (this.packList.length > 0) {
        let index = this.elpackIndex
        this.packShow = true
        let {coverUrl, goodsNum, price, name, id} = this.packList[index]
        this.setNowpack(coverUrl, goodsNum, price, name, id)
        this.getPackdetail(id)
      } else {
        this.$toast('暂无套餐')
      }
    },
    elpackFn (index, elid, pack) {
      // 选择套餐
      // console.log('pack', pack)
      this.elpackIndex = index
      let {coverUrl, goodsNum, price, name, id} = pack
      if (this.packDetaNum > goodsNum) {
        this.packDetaNum = 1
      }
      // if (elid !== id && !this.singleObj.isSingle) {
      //   this.skuRest()
      //   this.elpackId = id
      //   console.log(1)
      // } else {
      //   console.log(2)
      //   this.elpackId = elid === id ? '' : id
      // }
      // 当前 elid === id，则 取消选中状态
      if (!this.singleObj.isSingle) {
        if (elid !== id) {
          this.skuRest()
          this.elpackId = id
        }
      } else {
        this.elpackId = elid === id ? '' : id
      }
      // this.elpackId = elid === id ? '' : id
      this.setNowpack(coverUrl, goodsNum, price, name, id)
      this.getPackdetail(id)
    },
    setNowpack (coverUrl, goodsNum, price, name, id) {
      // 设置当前选中套餐需要参数
      this.nowpack.id = id
      this.nowpack.coverUrl = coverUrl
      this.nowpack.goodsNum = goodsNum
      this.nowpack.oneprice = price
      this.nowpack.name = name
      this.nowpack.allprice = price * this.packDetaNum
    },
    async getPackdetail (packid) {
      // 套餐 的商品清单
      const { code, data } = await goodsApi.getPack(packid)
      if (code === 200) {
        let goods = data.goodsPackResps
        let arrs = goods.map(v => {
          return v.goodsName
        })
        this.packDetaList = arrs.join(' + ')
      }
    },
    changeSkuFn () {
      let {num, oneprice} = this.getskuInfo
      let allprice = oneprice * num
      this.getskuInfo.allprice = allprice
      console.log(this.getskuInfo, 'getskuInfo pluspack')
    },
    changepackFn () {
      let oneprice = this.nowpack.oneprice
      this.nowpack.allprice = oneprice * this.packDetaNum
    },
    skuRest () {
      // 规格重置
      this.getskuInfo.num = 1
      this.getskuInfo.oneprice = 0
      this.getskuInfo.allprice = 0
      this.getskuInfo.skuname = ''
    },
    // 单品
    changeSingleFn () {
      this.singleObj.allprice = this.singleObj.num * this.singleObj.actualPrice
    },
    async compareFn () {
      // 去对比
      let goodsId = this.goodsId
      const {code, data} = await goodsApi.addCompare(goodsId)
      if (code === 200) {
        this.$toast('加入对比')
      } else {
        this.$toast(data)
      }
    },
    // 去购物查看
    onClickMiniBtn () {
      window.location.href = '/order/cart'
    },
    // 加入购物车
    async addCart () {
      if (!this.isLogin) return this.jumpLogin()
      let param = {}
      if (this.elpackId) {
        // 套餐
        param = {
          packNum: this.packDetaNum,
          packid: this.nowpack.id
        }
        // 验证购买套餐数量小于库存
        if (param.packNum > this.nowpack.goodsNum) return this.$toast('当前商品库存不足！')
      } else if (this.getskuInfo.skuid) {
        // sku
        param = {
          skuNum: this.getskuInfo.num,
          skuid: this.getskuInfo.skuid
        }
        if (param.skuNum > this.skuObj.stock) return this.$toast('当前商品库存不足！')
      } else {
        // 单品
        param = {
          goodsNum: this.singleObj.num,
          goodsId: this.goodsId
        }
        if (param.goodsNum > this.singleObj.stock) return this.$toast('当前商品库存不足！')
      }
      this.isLoading = true
      console.log(param)
      const { code, data } = await goodsApi.addCart(param)
      if (code === 200) {
        this.$toast('加入购物车成功！')
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      } else if (code === 506) {
        this.jumpLogin()
      } else {
        this.$toast(data)
        this.isLoading = false
      }
    },
    // 立即购买
    async buyNow () {
      if (!this.isLogin) return this.jumpLogin()
      let param = {}
      let reqObj = {}
      if (this.elpackId) {
        // 套餐
        param = {
          packNum: this.packDetaNum,
          packid: this.nowpack.id
        }
        reqObj = {
          num: this.packDetaNum,
          packid: this.nowpack.id
        }
        // 验证购买套餐数量小于库存
        if (param.packNum > this.nowpack.goodsNum) return this.$toast('当前商品库存不足！')
      } else if (this.getskuInfo.skuid) {
        // sku
        param = {
          skuNum: this.getskuInfo.num,
          skuid: this.getskuInfo.skuid
        }
        reqObj = {
          num: this.getskuInfo.num,
          skuid: this.getskuInfo.skuid
        }
        if (param.skuNum > this.skuObj.stock) return this.$toast('当前商品库存不足！')
      } else {
        // 单品
        param = {
          goodsNum: this.singleObj.num,
          goodsId: this.goodsId
        }
        reqObj = {
          num: this.singleObj.num,
          goodsId: this.goodsId
        }
        if (param.goodsNum > this.singleObj.stock) return this.$toast('当前商品库存不足！')
      }
      this.buyLoading = true
      const { code: cartCode, data: cartData } = await goodsApi.addCart(param)
      if (cartCode !== 200) {
        this.$toast(cartData)
        this.buyLoading = false
        return
      }
      const { code: setCode, data: setData } = await cartApi.readyToSettle({ orderDetailReqList: reqObj })
      if (setCode === 200) {
        if (setData.length !== 0) {
          this.$toast('您购买的商品库存不足')
          this.buyLoading = false
        } else {
          window.location.href = '/order/submit'
        }
      } else {
        this.$toast(setData)
      }
    },
    onClickefu () {
      console.log(3)
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 200)
      }
    },
    // 跳转登录
    jumpLogin () {
      this.$toast('检测到您未登录，请先登录！')
      setTimeout(() => {
        window.location.href = '/account/login'
      }, 1000)
    },

    historyBack () {
      window.history.go(-1)
    }
  }
}
</script>
<style lang="less">
.u-detail {
  margin-bottom: 50px;
  &_banner {
    padding-left: 25px;
    .swiper-page {
      position: absolute;
      width: 100%;
      text-align: center;
      bottom: 10px;
      left: -10px;
      z-index: 11;
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 5px;
        background: #000;
        opacity: .15;
        &.active {
          opacity: .5
        }
      }
    }
  }
  .banner-list {
    width: 315px;
    margin-left: 5px;
    &.swiper-slide-active {
      .banner-list-box {
        transform: scale(1);
        &:after{
          opacity: 0;
        }
      }     
    }
    &:last-child {
      width: 350px;
    }
    &-box {
      border-radius: 8px;
      border: 1PX solid #e6e6e6;
      box-sizing: border-box;
      width: 315px;
      height: 350px;
      transform: scale(.94);
      transition: transform ease .6s;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        border-radius: 8px;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: .1;
        background: #000;
        transition: opacity .6s;
        transform: translateZ(0);
      }
    }
    .pro {
      width: 100%;
      height: 350px;
      text-align: center;
      line-height: 350px;
      img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
    }
  }
  &_info {
    font-size: 0;
    margin-top: 15px;
    &-desc {
      margin-bottom: 25px;
      position: relative;
      margin-top: 20px;
      h2 {
        font-size: 17px;
        color: #333;
      }
      p {
        font-size: 14px;
        color: #999;
        margin: 12px 0 10px;
      }
      .price {
        font-size: 19px;
        font-style: normal;
        font-family: 'Impact';
        color: #F99C00
      }
      .to-compare {
        position: absolute;
        right: 0;
        top: 35px;
        width: 78px;
        height: 31px;
        line-height: 33px;
        border: 1PX solid #c7c7c7;
        border-radius: 18px;
        text-align: center;
        color: #333;
        font-size: 13px;
      }
      .active {
        margin-top: 10px;
        display: inline-block;
        padding: 5px 6px;
        color: #fff;
        font-size: 11px;
        font-weight: bold;
        font-family: 'PingFangSC-Medium';
        border-radius: 2px;
        background:rgba(251,98,72,1)
      }
      .single-sku-num {
        margin-top: 20px;
        font-size: 14px;
        h4 {
          vertical-align: middle;
          display: inline-block;
        }
        &>div {
          vertical-align: middle;
          display: inline-block;
        }
        .surstock {
          margin-left: 10px;
          font-size: 12px;
        }
      }
    }
  }
  &_line {
    height: 10px;
    background: #f5f5f5; 
  }
  &_send {
    padding: 19px 30px;
    font-size: 0;
    .ib-middle {
      i {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        width: 14px;
        height: 17px;
        background: url('~/assets/img/Icons/ic_position_b_18x18@2x.png') no-repeat center/contain
      }
      span {
        width: 200px;
        vertical-align: middle;
        display: inline-block;
        font-weight: bold;
        font-size: 15px;
        font-family: 'PingFangSC-Semibold';
        color: #333;
        line-height: 1.2;
      }
    }
    .choose-txt {
      float: right;
      p {
       color: #666; 
       margin-right: 10px;
       font-size: 15px;
      }
      i {
        color: #333;
        font-weight: bold;
        font-size: 10px;
      }
    }
  }
  &_choose {
    padding: 0px 30px; 
    &-item {
      padding: 25px 0; 
      font-size: 15px;
      &:nth-child(2n) {
        padding: 0 0 25px 0; 
      }
      span {
        color: #333;
        font-weight: bold;
        font-family: 'PingFang-SC-Medium'
      }
      .choose-txt {
        float: right;
        p {
         color: #666; 
         margin-right: 10px;
        }
        i {
          color: #333;
          font-weight: bold;
          font-size: 10px;
        }
      }
    }
  }
  .sku-wrap {
    padding: 0 20px 86px; 
    .goods-info {
      padding: 20px 0 0;
      margin-bottom: 30px;
      .pro {
        width: 100px;
        height: 100px;
        border: 1PX solid #e6e6e6;
        line-height: 100px;
        text-align: center;
        overflow: hidden;
        img {
          max-height: 100%;
          max-width: 100%;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .desc {
        margin-bottom: 16px;
        margin-left: 14px;
        .price {
          font-family: 'Impact';
          color: #F99C00;
          font-size: 19px;
        }
        .selected {
          margin-top: 10px;
          font-size: 13px;
          color: #666;
        }
      }
    }
    // sku信息
    .sku-item {
      h4 {
        margin: 10px 0 20px;
        font-size: 15px;
        color: #333;
        font-family: 'PingFang-SC-Medium';
      }
      .sku-list {
        margin-right: 15px; 
        display: inline-block;
        width: 158px;
        height: 38px;
        line-height: 40px;
        text-align: center;
        background: #FCFCFC;
        border: 1PX solid #f1f1f1;
        font-size: 13px;
        color: #333;
        font-weight: bold;
        margin-bottom: 20px;
        &:nth-child(2n) {
          margin-right: 0
        }
        &.cur {
          background: #DEF3F9;
          color: #03A1CD;
          border-color: transparent;
        }
      }
    }
    .sku-num {
      margin-top: 10px;
      line-height: 24px;
      h4 {
        font-size: 15px;
        display: inline-block;
        line-height: 24px;
        vertical-align: middle;
      }
      .surstock {
        float: right;
        font-size: 12px;
        line-height: 24px;
        margin-right: 20px;
      }
      .van-stepper {
        float: right;
      }
    }
  }
  .pack-wrap {
    .pack-goods-bill {
      font-size: 0;
      span {
        color: #333;
        font-weight: bold;
        font-size: 13px;
      }
      p {
        margin-top: 6px;
        font-size: 12px;
        color: #666;
        line-height: 22px;
      }
    }
    .sku-num {
      margin-top: 30px;
    }
  }
  .van-goods-action {
    z-index: 9999;
  }
  .van-goods-action-big-btn {
    background: #f6f6f6;
    border: 0;
    color: #333;
    &.buy-now {
      background: #03A1CD;
      color: #fff;
    }
  }
  &_tab {
    &.hidden {
      visibility: hidden;
      position: fixed;
      z-index: 99;
      left: 0;
      top: 0;
      width: 100%;
      background: #fff;
      transform: translateY(-140%);
      transition: ease .6s;
    }
    &.show {
      visibility: visible;
      transform: none;
      box-shadow: -1PX -12px 11px 9px #131313;
    }
    .tab-item {
      padding: 0 30px; 
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1PX solid #f1f1f1;
    }
    .tab-list {
      font-size: 13px;
      color: #ccc;
      font-weight: bold;
      font-family: 'PingFang-SC-Medium';
      position: relative;
      &.cur {
        color: #333;
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -16px;
          margin-left: -10px;
          width: 20px;
          height: 2px;
          background: #333;
        }
      }
    }
  }
  .van-modal {
    z-index: 2000!important
  }
}
.u-goods-content {
  overflow: hidden;
  font-size: 0;
  .content {
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .customs {
    .u-detail-title h3 {
      width: 130px!important;
    }
    &-wrap {
      p {
        margin: 10px 0 20px;
        text-align: center;
        color: #4285F4;
        font-size: 13px;
        font-family: 'PingFang-SC-Medium';
        font-weight: bold;
      }
      .swiperCustoms {
        padding-left: 25px;
        margin-bottom: 14px;
      }
      .swiperThumbs {
        left: -260px;
        width: 629px;
      }
    }
  }
  .customs-list {
    width: 315px;
    margin-left: 5px;
    &.swiper-slide-active {
      .customs-list-box {
        transform: scale(1);
      }     
    }
    &:last-child {
      width: 350px;
    }
    &-box {
      border-radius: 8px;
      border: 1PX solid #e6e6e6;
      box-sizing: border-box;
      width: 315px;
      height: 400px;
      transform: scale(.94);
      transition: transform ease .6s;
    }
    .pro {
      width: 100%;
      height: 400px;
      text-align: center;
      line-height: 400px;
      overflow: hidden;
      img {
        width: auto;
        height: 100%;
        vertical-align: middle;
      }
    }
  }
  .customs-thumbs-list {
    width: 60px;
    height: 72px;
    .full {
      transition: transform ease .6s;
      transform: scale(.9);
      position: relative;
      &:after {
        content: '';
        opacity: .4;
        transition: opacity .6s;
        background: #000;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
    &.swiper-slide-active {
      margin-right: 5px;
      margin-left: 5px;
      .full {
        transform: scale(1);
        &:after {
          opacity: 0;
        }
      }
    }
  }
}

.u-detail-title {
  text-align: center;
  margin: 26px 0 23px;
  position: relative;
  &:after {
    content: '';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 7px;
    height: 1PX;
    background: #ddd;
    z-index: -1;
  }
  h3 {
    font-size: 15px;
    color: #333;
    font-family: 'PingFangSC-Semibold';
    font-weight: bold;
    width: 96px;
    background: #fff;
    display: inline-block;
  }
  p {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-size: 12px;
    color: #ddd;
    font-family: 'PingFangSC-Semibold';
  }
}

.u-detail-loading {
  text-align: center;
  background: #f5f5f5;
  color: rgba(0, 0, 0, .5);
  margin: 30px 0 0;
  .van-loading {
    padding: 15px 0; 
    display: inline-block;
    vertical-align: middle;
  }
  p {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 10px;
  }
}
.van-popup {
  z-index: 9999!important;
}
.van-dialog {
  z-index: 10001!important
}
.van-modal {
  z-index: 10000!important
}
.van-actionsheet__item {
  height: 50px;
  &:first-child {
    border-bottom: 6px solid #e6e6e8;
    span {
      color: #D0352D
    } 
  }
  span {
    font-size: 17px;
    color: #000;
  }
}
</style>