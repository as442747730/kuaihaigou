<template>
  <div class="nouns" :class="{overauto: isScorll && !showWineryList}" :data-showWineryList="showWineryList">
    <div class="noun" ref="refNoun">
      <div class="noun-head">
        <com-head titleConfig="名词解释">
          <div class="search"></div>
        </com-head>
        <div class="topnav">
          <div
            class="item"
            v-for="(nav, index) in navList"
            :class="[{active: navIndex === index}, {opcpm: showone && navIndex === index}]"
            @click="elNavs(index)"
            :key="index">
            <span>{{nav.name}}</span>
            <i class="ic_sj"></i>
          </div>
        </div>
      </div>
      <!-- 酒庄列表 start -->
      <section class="wineryList" v-if="showWineryList">
        <div class="winery-head">
          <span
            v-for="(sorts, index) in winerySortkey"
            :data-val="wineryParams.sortedBy"
            :class="{active: wineryParams.sortedBy === sorts.sortkey}"
            @click="winerySortFn(sorts)"
            :key="index">{{sorts.name}}</span>
        </div>
        <div class="winery-items">
          <ul class="item-ul">
            <li
              class="item_li"
              v-for="(winery, index) in wineryArr"
              @click="goWinery(winery)"
              :key="index">
              <div class="li-bk" v-lazy:background-image="winery.cover"></div>
              <div class="li-zh u-ellipsis">{{winery.wineryName}}</div>
              <div class="li-en">
                <div class="en_inline">
                  <p>{{winery.englishName}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <!-- 酒庄列表 end -->
      <!-- 详情 start -->
      <section v-else>
        <div class="top">
          <div class="topinfo">
            <h2>{{objDetail.chineseName}}（{{objDetail.englishName}}）</h2>
            <p>作者：{{objDetail.auth}}</p>
            <div class="btn">
              <span>名词解释</span>
            </div>
          </div>
        </div>
        <div class="lynav">
          <div class="lynav_item" :class="{active: lynavIndex === 0}" @click="lynavFn(0)">{{getType}}介绍</div>
          <div class="lynav_item" :class="{active: lynavIndex === 1}" @click="lynavFn(1)">{{getType}}图片
            <span>（{{imagesArr.length}}）</span>
          </div>
        </div>
        <section v-if="lynavIndex === 0">
          <div class="introduce" v-if="objDetail.baikeMessageList">
            <div class="introduce-item" v-for="(bakeMes, index) in objDetail.baikeMessageList" :key="index">
              <span>{{bakeMes.name}}:</span>
              <p>
                {{bakeMes.content}}
              </p>
            </div>
          </div>
          <div class="featcontent" v-if="objDetail.content">
            <div class="cont content-wrapper" v-html="objDetail.content"></div>
          </div>
        </section>
        <section class="picture" v-if="lynavIndex === 1">
          <ul class="picture-uls">
            <li
              class="uls_li"
              ref="liImg"
              v-for="(image, index) in imgsArray"
              @click="opImage(index)"
              :key="index">
              <img :style="{'height': image._height + 'px'}" v-lazy="image.src" />
            </li>
          </ul>
        </section>
        <div class="foot" @click="lookMoreFn" v-if="isMore">
          <span> 查看更多 ></span>
        </div>
      </section>
      <!-- 详情 end -->

      <!--
        文章评论
        type -> 文章类型
        articelId -> 文章id
        ifLike -> 是否喜欢
        ifCollect -> 是否收藏
      -->
      <articel-comment v-show='!isMore' :type='articelType' :articelId='objDetail.id' :ifLike='objDetail.ifLike' :ifCollect='objDetail.ifCollect'></articel-comment>

      <!-- 筛选器 start -->
      <cpmOne
        :isShow="showone"
        :navIndex="navIndex"
        :letters="getLetter"
        :varityIndex="varity"
        :grapeList="grapeList"
        @corsFn="clorsFn"
        @enzhFn="enzhFn"
        @letterFn="letterFn"
        :areaContryList="countryList"
        @areaWorldFn="areaWorldFn"
        @btnRest="btnRest"
        @btnOk="btnOk"></cpmOne>
        <!-- 筛选器 end -->
    </div>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
import CpmOne from '~/components/noun/Cpmone'
import { encyApi } from '~/api/encys'
import { ImagePreview } from 'vant'
import tools from '~/utils/tools'
import articelComment from '@/components/articel/Comment'
export default {
  head () {
    return {
      title: '名词解释',
      meta: [
        { hid: 'title', name: 'title', content: '名词解释' }
      ]
    }
  },
  components: {
    comHead,
    CpmOne,
    articelComment
  },
  async asyncData (req) {
    let queryNum = req.query.num
    console.log('queryNum', queryNum, typeof queryNum)
    if (queryNum === '0') {
      // 红葡萄 1， 白葡萄 2
      let varietyId = 1
      let varietyFn = encyApi.serverVarietyList(varietyId, req)
      let initFn = encyApi.serverInitials(req)
      const { code: varietyCode, data: varietyData } = await varietyFn
      const { code: initCode, data: initData } = await initFn
      let objInit = {}
      let objVariety = {}
      let _imgArr = []
      if (initCode === 200) {
        objInit = initData
      }
      if (varietyCode === 200) {
        objVariety = varietyData
        _imgArr = varietyData.imgs
      }
      // _imgArr = ['http://public.kuaihaigou.com/FrWQ0eZd2oylIQh0gK8egK4oa713', 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=962a2223b4014a909e3e40bd99763971/21a4462309f79052101fdaaf01f3d7ca7bcbd51b.jpg', 'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=e22d24982b9759ee555066cb82fa434e/0dd7912397dda14447e32c27bfb7d0a20df486b9.jpg', 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=2e94e5c1282dd42a400907ab333a5b2f/e4dde71190ef76c65e514b839016fdfaae516793.jpg', 'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=5ed2cd93e424b899c13c7f385e071d59/d52a2834349b033b2d5f1b4918ce36d3d439bd4a.jpg', 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=afe49511adec08fa390015a769ef3d4d/b17eca8065380cd7c9c49343ac44ad3458828141.jpg', 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=c1c3a89e63061d95624631384bf50a5d/5ab5c9ea15ce36d3bdfb529637f33a87e850b19d.jpg', 'http://img0.imgtn.bdimg.com/it/u=3960337833,4234451047&fm=26&gp=0.jpg', 'https://f11.baidu.com/it/u=2465775762,1509670197&fm=72', 'http://img1.imgtn.bdimg.com/it/u=3390961998,1154407883&fm=200&gp=0.jpg', 'http://img5.imgtn.bdimg.com/it/u=639238630,2179659181&fm=26&gp=0.jpg']
      return { letter: objInit, objDetail: objVariety, imagesArr: _imgArr }
    } else if (queryNum === '1') {
      let worldId = -1
      const { code, data } = await encyApi.serverCountry(worldId, req)
      if (code === 200) {
        let countrys = data.baikeCountryCountRespList
        return { countryList: countrys, navIndex: 1, showone: true }
      }
    } else if (queryNum === '2') {
      let worldId = '-1'
      const { code, data } = await encyApi.serverWineryCountry(worldId, req)
      // console.log('data', data)
      if (code === 200) {
        let countrys = data.baikeCountryCountRespList
        return { countryList: countrys, navIndex: 2, showone: true }
      }
    }
  },
  data () {
    return {
      imagesArr: [],
      imgsArray: [],
      lynavIndex: 0,
      navList: [{name: '葡萄品种'}, {name: '产区'}, {name: '酒庄'}],
      navIndex: null,
      showone: false,
      letter: {}, // 葡萄首字母信息
      varity: {
        corIndex: 0,
        enzhIndex: 0
      },
      selectVarietyId: 1, // 品种id(红葡萄)
      grapeList: [], // 葡萄品种列表
      objDetail: {}, // 页面详情
      isScorll: false, // 页面是否可滚动
      isMore: true, // 是否显示 查看更多
      countryList: [],
      selectWorldId: -1, // 默认世界（全部）
      selectAreaId: -1, // 产区id(全部)
      winerySortkey: [{name: '热门', sortkey: 1}, {name: '推荐', sortkey: 2}, {name: '知名度', sortkey: 3}, {name: '销量', sortkey: 4}],
      elSort: null,
      wineryParams: {}, // 酒庄列表参数
      isWineryList: false, // 是否显示酒庄列表
      wineryArr: [], // 酒庄列表
      articelType: '4' // 文章类型
    }
  },
  computed: {
    getType () {
      if (this.navIndex === 0) {
        return '品种'
      } else if (this.navIndex === 1) {
        return '产区'
      } else if (this.navIndex === 2) {
        return '酒庄'
      } else {
        return '品种'
      }
    },
    getLetter () {
      // 首字母类型
      if (this.varity.corIndex === 0 && this.varity.enzhIndex === 0) {
        return this.letter.redEnglishLetterList
      } else if (this.varity.corIndex === 0 && this.varity.enzhIndex === 1) {
        return this.letter.redPinyinLetterList
      } else if (this.varity.corIndex === 1 && this.varity.enzhIndex === 0) {
        return this.letter.whiteEnglishLetterList
      } else if (this.varity.corIndex === 1 && this.varity.enzhIndex === 1) {
        return this.letter.whitePinyinLetterList
      } else {
        return []
      }
    },
    showWineryList () {
      // 是否显示酒庄列表
      return this.navIndex === 2 && this.isWineryList
    }
  },
  mounted () {
    console.log('11', this.objDetail)
  },
  methods: {
    elNavs (index) {
      if (this.navIndex !== index) {
        this.showone = true
        this.navIndex = index
        // 重置介绍图片
        this.lynavIndex = 0
        this.isMore = true
        if (this.navIndex === 0) {
          this.getInitials()
        } else {
          this.areaCountryFn()
        }
      } else {
        this.showone = !this.showone
      }
    },
    lynavFn (index) {
      // 介绍 图片
      if (this.lynavIndex === 0 && this.isMore) {
        return
      }
      if (index === 1) {
        this.adjustImage()
      }
      this.lynavIndex = index
    },
    winerySortFn (sorts) {
      // console.log(sorts, 'sorts')
      let params = { sortedBy: sorts.sortkey }
      Object.assign(this.wineryParams, params)
      this.getWineryList()
    },
    goWinery (winery) {
      // console.log(winery, 'winery')
      this.getWineryDetail(winery.wineryid)
    },
    clorsFn (index) {
      this.varity.corIndex = index
    },
    enzhFn (index) {
      this.varity.enzhIndex = index
    },
    async letterFn (world) {
      // 品种列表
      let { corIndex, enzhIndex } = this.varity
      let varietyType = corIndex + 1
      let langType = enzhIndex + 1
      let params = {
        varietyType: varietyType,
        langType: langType,
        firstWord: world
      }
      const { code, data } = await encyApi.getVarietyList(params)
      if (code === 200) {
        this.grapeList = data
      }
    },
    btnRest () {
      // 重置按钮
      this.showone = false
      this.varity.corIndex = 0
      this.varity.enzhIndex = 0
      /** {品种 | 产区 | 酒庄} */
      if (this.navIndex === 0) {
        this.selectVarietyId = 1 // 红葡萄
      } else if (this.navIndex === 1) {
        let firstCountry = this.countryList[0].countryid
        this.selectAreaId = firstCountry
      } else if (this.navIndex === 2) {
        let firstCountry = this.countryList[0].countryid
        let params = {
          classify: -1,
          countryid: firstCountry
        }
        Object.assign(this.wineryParams, params)
        this.getWineryList()
      }
    },
    btnOk (obj) {
      // 确认按钮
      // 0 品种
      // 1 产区
      // 2 酒庄
      if (this.navIndex === 0) {
        let _id
        if (!obj.varietyid) {
          _id = this.varity.corIndex + 1
        } else {
          _id = obj.varietyid
        }
        this.selectVarietyId = _id
      } else if (this.navIndex === 1) {
        // console.log(obj)
        let { worldId, countryId, bigId, districtId, subId, smallId } = obj
        let firstCountry = this.countryList[0].countryid
        let _areaId = (!smallId || smallId === -4) ? ((!subId || subId === -3) ? ((!districtId || districtId === -2) ? ((!bigId || bigId === -1) ? ((!countryId || countryId === -1) ? ((!worldId || worldId === -1) ? firstCountry : worldId) : countryId) : bigId) : districtId) : subId) : smallId
        this.selectAreaId = _areaId
      } else if (this.navIndex === 2) {
        // console.log('obj winery', obj)
        /**
         * 全部 {classify} -1, {countryid} -1
         * 全部 {oneAreaId} -1, {twoAreaId} -2, {threeAreaId} -3, {fourAreaId} -4
         *
        */
        let { worldId, countryId, bigId, districtId, subId, smallId } = obj
        let params = {
          classify: worldId,
          countryid: countryId,
          oneAreaId: bigId,
          twoAreaId: districtId,
          threeAreaId: subId,
          fourAreaId: smallId
        }
        Object.assign(this.wineryParams, params)
        this.getWineryList()
      }
    },
    lookMoreFn () {
      this.isScorll = true
      this.isMore = false
    },
    getnounH () {
      // 查看更多 状态
      this.$nextTick(() => {
        let winH = document.documentElement.clientHeight || document.body.clientHeight
        let elnoun = this.$refs.refNoun.getBoundingClientRect().height
        console.log('elnoun > winH', elnoun > winH)
        this.isMore = elnoun > winH
      })
    },
    async getInitials () {
      // 品种 首字母
      const { code, data } = await encyApi.clientInitials()
      if (code === 200) {
        this.letter = data
      }
    },
    async getVarietyDetail () {
      // 葡萄品种
      const { code, data } = await encyApi.getVarietyDetail(this.selectVarietyId)
      if (code === 200) {
        this.articelType = '4'
        this.showone = false
        this.objDetail = data
        this.isScorll = false
        this.isMore = true
        this.imagesArr = !data.imgs ? [] : data.imgs
      }
    },
    areaWorldFn (wroldId) {
      // console.log('worldId', wroldId)
      this.selectWorldId = wroldId
      this.areaCountryFn()
    },
    async areaCountryFn () {
      // 世界的国家列表 1 => 产区； 2 => 酒庄
      let id = this.selectWorldId
      let countryFn
      if (this.navIndex === 1) {
        countryFn = encyApi.getAreaCountry(id)
      } else if (this.navIndex === 2) {
        countryFn = encyApi.getWineryCountry(id)
      }
      const { code, data } = await countryFn
      if (code === 200) {
        this.countryList = data.baikeCountryCountRespList
      }
    },
    async getAreaDetail () {
      // 产区详情
      const { code, data } = await encyApi.getAreaDetail(this.selectAreaId)
      if (code === 200) {
        // console.log('data', data)
        this.articelType = '5'
        this.showone = false
        this.objDetail = data
        this.isScorll = false
        this.isMore = true
        this.imagesArr = !data.imgs ? [] : data.imgs
      }
    },
    async getWineryList () {
      // 酒庄列表
      const { code, data } = await encyApi.getWineryList(this.wineryParams)
      if (code === 200) {
        console.log(data)
        this.articelType = '6'
        this.isScorll = false
        this.isMore = true
        this.wineryArr = data.array
        this.isWineryList = true
        this.showone = false
      }
    },
    async getWineryDetail (wineryId) {
      // 酒庄详情
      const { code, data } = await encyApi.getWineryDetail(wineryId)
      if (code === 200) {
        console.log('data', data)
        this.isWineryList = false
        this.isScorll = false
        this.isMore = true
        this.objDetail = data
        this.imagesArr = !data.imgs ? [] : data.imgs
      }
    },
    opImage (position, timer) {
      // 展示大图
      let images = this.imagesArr
      const instance = ImagePreview({
        images,
        asyncClose: !!timer,
        startPosition: typeof position === 'number' ? position : 0
      })
      if (timer) {
        setTimeout(() => {
          instance.close()
        }, timer)
      }
    },
    adjustImage () {
      // 图片高度
      let _promises = this.imagesArr.map(path => {
        return tools.getImgInfos(path, 105)
      })
      Promise.all(_promises).then(res => {
        console.log('res', res)
        this.imgsArray = res
        this.$nextTick(() => {
          tools.waterFall('.uls_li', '.picture-uls', 3)
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    selectVarietyId: function () {
      this.getVarietyDetail()
    },
    selectAreaId: function () {
      this.getAreaDetail()
    }
  }
}
</script>
</script>
<style lang="less">
@bgcor1: #fff;
.nouns {
  width: 100vw;
  height: 100vh;
  background: #F5F5F5;
  overflow: hidden;
  .pop-box {
    z-index: 99!important;
  }
  .vanmb {
    z-index: 98!important;
  }
}
.nouns.overauto {
  overflow: auto !important;
}
.noun {
  .noun-head {
    position: relative;
    z-index: 100;
    background: @bgcor1;
  }
  // 搜索按钮
  .search {
    position: absolute;
    top: 0;
    right: 20px;
    width: 30px;
    height: 100%;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -15px;
      width: 30px;
      height: 30px;
      background-image: url('~/assets/img/Icons/ic_search_b_30x30@2x.png');
      .bg_cover;
    }
  }
  .topnav {
    height: 40px;
    border-bottom: 1PX solid #F5F5F5;
    .flex_around;

    .item {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 13px;
      .flex_between;

      .ic_sj {
        margin-left: 5px;
        width: 8px;
        height: 5px;
        opacity: .5;
        transform: rotate(0);
        transition: .2s;
        background-image: url('~/assets/img/Icons/ic_triangle_bt_12x12@2x.png');
        .bg_cover;
      }
    }

    .item.active {
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);

    }
    .item.opcpm {
      .ic_sj {
        opacity: 1;
        transform: rotate(180deg);
        background-image: url('~/assets/img/Icons/ic_triangle_bt_12x12@2x.png');
      }
    }
  }
  // 上部
  .top {
     background:  @bgcor1;
    .topinfo {
      .padlr20;
      padding-top: 20px;
      padding-bottom: 15px;

      &>h2 {
        font-size: 19px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }

      &>p {
        padding: 10px 0;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 12px;
      }

      .btn {
        &>span {
          padding: 4px 4px 4px 6px;
          background: rgba(89, 195, 225, 1);
          border-radius: 2px;
          color: #fff;
          font-size: 12px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
        }
      }
    }
  }

  // 左右两栏切换
  .lynav {
    height: 40px;
    .flex_between;

    &_item {
      width: 50%;
      font-size: 14px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 14px;
      text-align: center;
    }

    &_item:first-child {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -7px;
        width: 1PX;
        height: 14px;
        background: #CCCCCC;
      }
    }

    &_item.active {
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }

  // 介绍
  .introduce {
    margin-bottom: 10px;
    background: @bgcor1;
    overflow: hidden;
    .padlr20;

    &-item {
      margin: 10px 0;
      padding-left: 75px;
      font-size: 14px;
      &:first-child {
        margin-top: 25px;
      }
      &:last-child {
        margin-bottom: 25px;        
      }
      &>span {
        float: left;
        margin-left: -75px;
        font-family: PingFang-SC-Regular;
        color: rgba(153, 153, 153, 1);
        font-weight: 400;
        display: inline-block;
        width: 70px;
        line-height: 24px;
        word-wrap: break-word;
        .u-ellipsis;
      }

      &>p {
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        word-wrap: break-word;
      }
    }
  }
  .introduce:empty {
    margin-bottom: 0;
  }
  .featcontent {
    width: 100vw;
    .cont {
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      background: @bgcor1;
      font-size:14px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:28px;
      p {
        width: 100%;
      }
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }

  // 图片集合
  .picture {
    padding: 0 20px;
    background: #fff;
    &-uls {
      // display: flex;
      // flex-wrap: wrap;
      // align-items: center;
      // align-content: top;
      margin-left: -10px;
      border-bottom: 20px solid transparent;
      position: relative;
      .uls_li {
        display: inline-block;
        vertical-align: top;
        width: 33.3%;
        box-sizing: border-box;
        border-left: 10px solid transparent;
        border-top: 15px solid transparent;
        &>img {
          display: inline-block;
          width: 100%;
        }
      }
    }

  }
  // 查看更多
  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 159px;
    background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
    .flex_allCenter;
    &>span {
      margin-top: 90px;
      padding: 10px 20px;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(3, 161, 205, 1);
    }
  }

  .wineryList {
   
    .winery-head {
      padding: 0 30px;
      height: 45px;
      .flex_between;
      &>span {
        font-size:13px;
        padding: 10px 10px;
        font-size:13px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:13px;
        &.active {
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
      }
    }
    .winery-items {
      background: #fff;
      padding: 0 20px;
      margin-left: -20px;
      height: calc(100vh - 130px);
      overflow: auto;
      .item-ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        .item_li {
          border-left: 20px solid transparent;
          border-top: 20px solid transparent;
          // width: 150px;
          width: 50%;
          box-sizing: border-box;
          .li-bk {
            padding: 50% 0;
            border-radius: 4px;
            overflow: hidden;
            .bg_cover;
          }
          .li-zh {
            font-size:13px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:25px;
          }
          .li-en {
            line-height: 30px;
            font-size:12px;
            overflow: hidden;
            .en_inline {
              display: inline-block;
              vertical-align: middle;
              &>p {
                line-height: 15px;
                font-size:12px;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(153,153,153,1);
                word-wrap: break-word;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                overflow : hidden;
                display:-webkit-box;
                -webkit-box-orient: vertical;
              }
            }

          }
        }
      }
    }
  }
}
</style>