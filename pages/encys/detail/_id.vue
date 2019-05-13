<template>
  <div class="noun">
    <div class="noun-head">
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
        <div class="lynav_item" :class="{active: lynavIndex === 0}">{{getType}}介绍</div>
        <div class="lynav_item" :class="{active: lynavIndex === 1}">{{getType}}图片
          <span>（{{imagesArr.length}}）</span>
        </div>
      </div>
      <section>
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
      <div class="foot" @click="lookMoreFn" v-if="isMore">
        <span> 查看更多 ></span>
      </div>
    </section>
    <!-- 详情 end -->
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
</template>
<script>
import CpmOne from '~/components/noun/Cpmone'
import { encyApi } from '~/api/encys'
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
    CpmOne
  },
  async asyncData (req) {
    let queryNum = req.query.num
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
      return { letter: objInit, objDetail: objVariety, imagesArr: _imgArr, navIndex: 0, showone: true }
    } else if (queryNum === '1') {
      let { classify, countryid, oneAreaId, twoAreaId, threeAreaId, fourAreaId } = req.query
      const params = { classify, countryid, oneAreaId, twoAreaId, threeAreaId, fourAreaId }
      const { code, data } = await encyApi.serverCountry(params, req)
      if (code === 200) {
        let countrys = data.baikeCountryCountRespList
        return { countryList: countrys, navIndex: 1 }
      }
    } else if (queryNum === '2') {
      const params = { classify: '-1' }
      const { code, data } = await encyApi.serverWineryCountry(params, req)
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
      selectWorldId: null, // 默认世界（全部）
      selectAreaId: null, // 产区id(全部)
      areaparams: {}, // 产区参数集
      winerySortkey: [{name: '热门', sortkey: 1}, {name: '推荐', sortkey: 2}, {name: '知名度', sortkey: 3}, {name: '销量', sortkey: 4}],
      elSort: null,
      wineryParams: {}, // 酒庄参数集
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
      } else if (this.navIndex === 3) {
         return '酒款'
      }else {
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
  },
  methods: {
    elNavs (index) {
      window.location.href = '/encys/detail/' + index
    },
    winerySortFn (sorts) {
      let params = { sortedBy: sorts.sortkey }
      Object.assign(this.wineryParams, params)
      this.getWineryList()
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
        // let firstCountry = this.countryList[0].countryid
        // console.log('firstCountry', firstCountry)
        this.selectAreaId = -1
        this.getAreaDetail()
      } else if (this.navIndex === 2) {
        let firstCountry
        if (this.countryList[0]) {
          firstCountry = this.countryList[0].countryid
        }
        let params = {
          classify: '-1',
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
        // 开始时红葡萄 selectVarietyId = _id, 避免确认按钮无效
        if (this.selectVarietyId === _id) {
          this.getVarietyDetail()
        }
        this.selectVarietyId = _id
      } else if (this.navIndex === 1) {
        let str = ''
        for (let [key, val] of Object.entries(obj)) {
          let keyval = key + '=' + val + '&'
          str += keyval
        }
        str += 'isshow=1'
        // console.log('str', str)
        window.location.href = '/noun?num=1&' + str
        // let { classify, countryid, oneAreaId, twoAreaId, threeAreaId, fourAreaId } = obj
        // let _areaId = fourAreaId && fourAreaId !== '-1' && fourAreaId !== 'null'
        //   ? fourAreaId : threeAreaId && threeAreaId !== '-1' && threeAreaId !== 'null'
        //     ? threeAreaId : twoAreaId && twoAreaId !== '-1' && twoAreaId !== 'null'
        //     ? twoAreaId : oneAreaId && oneAreaId !== '-1' && oneAreaId !== 'null'
        //     ? oneAreaId : countryid && countryid !== '-1' && countryid !== 'null'
        //     ? countryid : classify && classify !== '-1' && classify !== 'null'
        //     ? classify : 1
        // this.selectAreaId = _areaId
        // this.getAreaDetail()
      } else if (this.navIndex === 2) {
        /**
         * 全部 -1
        */
        Object.assign(this.wineryParams, obj)
        console.log(this.wineryParams, 'wineryParams')
        this.getWineryList()
      }
    },
    goWinery (winery) {
      let encyId = winery.wineryid
      window.location.href = '/noun/detail/' + encyId + '?num=' + 2
    },
    lookMoreFn () {
      let _index = this.navIndex
      let encyId
      if (_index === 0) {
        encyId = this.selectVarietyId
      } else if (_index === 1) {
        encyId = this.selectAreaId
      }
      window.location.href = '/noun/detail/' + encyId + '?num=' + _index
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
      this.selectWorldId = wroldId
      console.log('wroldId', wroldId)
      this.areaCountryFn()
    },
    async areaCountryFn () {
      // 世界的国家列表 1 => 产区； 2 => 酒庄
      let params = { classify: this.selectWorldId }
      let countryFn
      if (this.navIndex === 1) {
        countryFn = encyApi.getAreaCountry(params)
      } else if (this.navIndex === 2) {
        countryFn = encyApi.getWineryCountry(params)
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
    }
  },
  watch: {
    selectVarietyId: function () {
      this.getVarietyDetail()
    }
  }
}
</script>
</script>
<style lang="less">
@bgcor1: #fff;
.noun {
  width: 100vw;
  height: 100vh;
  background: #F5F5F5;
  overflow: hidden;
  .noun-head {
    position: relative;
    height: 85px;
    background: @bgcor1;
    z-index: 100;
  }
  .heads {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    box-sizing: border-box;
    border-bottom: 1PX solid #F1F1F1;
    .icon_back {
      position: relative;
      width: 45px;
      height: 100%;
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 14px;
        margin-top: -7px;
        margin-left: -4px;
        background-image: url('~assets/img/Icons/ic_return_b_30x30@2x.png');
        background-position: 50% 50%;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .title {
      font-size: 17px;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
  .topnav {
    height: 40px;
    // border-bottom: 1PX solid #F5F5F5;
    box-sizing: border-box;
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
        background-image: url('~assets/img/Icons/ic_triangle_bt_12x12@2x.png');
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
        background-image: url('~assets/img/Icons/ic_triangle_bt_12x12@2x.png');
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
          height: auto;
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