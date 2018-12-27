<template>
  <div class="nouns" :class="{overauto: isScorll}">
    <div class="noun" ref="refNoun">
      <div class="noun-head">
        <com-head titleConfig="名词解释">
          <div class="search"></div>
        </com-head>
        <div class="topnav">
          <div
            class="item"
            v-for="(nav, index) in navList"
            :class="{active: navIndex === index}"
            @click="elNavs(index)"
            :key="index">
            <span>{{nav.name}}</span>
            <i class="ic_sj"></i>
          </div>
        </div>
      </div>
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
        <div class="lynav_item active">品种介绍</div>
        <div class="lynav_item">品种图片
          <span v-if="objDetail.imgs">（{{objDetail.imgs.length}}）</span>
        </div>
      </div>
      <!-- 品种 start -->
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
          <div class="cont" v-html="objDetail.content"></div>
        </div>
      </section>
      <!-- 品种 end -->
      <div class="foot" @click="lookMoreFn" v-if="isMore">
        <span> 查看更多 ></span>
      </div>
      <cpmOne
        :isShow="showone"
        :letters="getLetter"
        :varityIndex="varity"
        :grapeList="grapeList"
        @corsFn="clorsFn"
        @enzhFn="enzhFn"
        @letterFn="letterFn"
        @btnRest="btnRest"
        @btnOk="btnOk"></cpmOne>
    </div>
    <cpmOne
      :isShow="showone"
      :letters="getLetter"
      :varityIndex="varity"
      :grapeList="grapeList"
      @corsFn="clorsFn"
      @enzhFn="enzhFn"
      @letterFn="letterFn"
      @btnRest="btnRest"
      @btnOk="btnOk"></cpmOne>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
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
    comHead,
    CpmOne
  },
  async asyncData (req) {
    // 红葡萄 1， 白葡萄 2
    let varietyId = 1
    let varietyFn = encyApi.serverVarietyList(varietyId, req)
    let initFn = encyApi.getInitials(req)
    const { code: varietyCode, data: varietyData } = await varietyFn
    const { code: initCode, data: initData } = await initFn
    let objInit = {}
    let objVariety = {}
    if (initCode === 200) {
      objInit = initData
    }
    if (varietyCode === 200) {
      objVariety = varietyData
    }
    return { letter: objInit, objDetail: objVariety }
  },
  data () {
    return {
      navList: [{name: '葡萄品种'}, {name: '产区'}, {name: '酒庄'}],
      navIndex: null,
      showone: false,
      letter: {}, // 葡萄首字母信息
      varity: {
        corIndex: 0,
        enzhIndex: 0
      },
      grapeList: [], // 葡萄品种列表
      objDetail: {}, // 页面详情
      isScorll: false, // 页面是否可滚动
      isMore: false // 是否显示 查看更多
    }
  },
  computed: {
    getLetter () {
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
    }
  },
  mounted () {
    this.getnounH()
  },
  methods: {
    elNavs (index) {
      if (this.navIndex === index) {
        this.navIndex = null
        this.showone = false
      } else {
        this.navIndex = index
        this.showone = true
      }
    },
    clorsFn (index) {
      this.varity.corIndex = index
    },
    enzhFn (index) {
      this.varity.enzhIndex = index
    },
    async letterFn (world) {
      console.log('world', world)
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
    async encyDetail () {
    },
    btnRest () {
      this.showone = false
      this.navIndex = null
      this.varity.corIndex = 0
      this.varity.enzhIndex = 0
    },
    async btnOk (grape) {
      // 品种确认按钮
      let _id
      if (!grape.varietyid) {
        _id = this.corIndex + 1
      } else {
        _id = grape.varietyid
      }
      const { code, data } = await encyApi.getVarietyDetail(_id)
      if (code === 200) {
        this.showone = false
        this.objDetail = data
        this.getnounH()
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
    }
  }
}
</script>
</script>
<style lang="less" scoped>
@bgcor1: #fff;
.nouns {
  width: 100vw;
  height: 100vh;
  background: #F5F5F5;
  overflow: hidden;
}
.nouns.overauto {
  overflow: auto !important;
}
.noun {
  .noun-head {
    position: relative;
    z-index: 3000;
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
        line-height: 19px;

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
    .padlr20;

    &-item {
      margin: 10px 0;
      padding-left: 75px;
      font-size: 14px;

      &>span {
        float: left;
        margin-left: -75px;
        font-family: PingFang-SC-Regular;
        color: rgba(153, 153, 153, 1);
        font-weight: 400;
        display: inline-block;
        width: 70px;
        line-height: 24px;
        .u-ellipsis;
      }

      &>p {
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;

      }
    }
  }
  .introduce:empty {
    margin-bottom: 0;
  }
  .featcontent {
    .cont {
      padding: 20px;
      background: @bgcor1;
      font-size:14px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:28px;
      img {
        display: inline-block;
        max-width: 100%;
        margin: 0 auto;
      }
    }
  }

  // 图片集合
  .pics {
    &-ul {
      display: flex;
      margin-left: -10px;
      .ul_item {
        width: 30%;
        padding-left: 10px;
        box-sizing: border-box;
        .item_img {
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
    width: 100%;
    height: 44px;
    // opacity: .5;
    background: @bgcor1;
    .flex_allCenter;
    &>span {
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(3, 161, 205, 1);
    }
  }
}
</style>