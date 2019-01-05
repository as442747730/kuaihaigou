<template>
  <div class="others">
    <div class="others-head">
      <div class="upper upzindex">
        <div class="top">
          <div class="top_l" @click="toWinecenter">
            <span class="top_l-span icon_switch"></span>
            <span class="top_l-span world">红酒商品</span>
          </div>
          <div class="top_r">
            <div class="searchbox">
              <i class="search_icon"></i>
              <form action="javascript:return true;">
                <input class="inpbox" v-model="searchGoodname" placeholder="请输入想要查找的内容" type="search" @keyup.13="toSearch" />
              </form>
            </div>
            <i class="icon_buy"></i>
          </div>
        </div>
        <div class="filter">
          <div class="filter-item">共218374件</div>
          <div class="filter-item filter-btn">分类筛选</div>
        </div>
      </div>
    </div>
    <section class="other-content" ref="scrollElem">
      <div class="box" ref="scrollChild">
        <ul class="othList">
          <li class="othList-item" v-for="(good, index) in goodsList" :key="index">
            <div class="top">
              <div class="top_bk" v-lazy:background-image="good.imgUrl"></div>
            </div>
            <div class="bottom">
              <div class="head">{{good.goodsName}}</div>
              <p>
                <span v-for="(tag, tagIndex) in customArray(good.tagListJson)">{{tag}}</span>
              </p>
              <div class="price">¥ {{good.actualPrice}}</div>
            </div>
          </li>
        </ul>
        <div class="load-more" v-if="hasScroll">{{moreData ? loadTxt : '已无更多商品'}}</div>
        <null-data v-if="goodsList.length === 0"></null-data>
      </div>
    </section>
    <list-one
      :isShow="isShow"
      :postObjs="classify"
      @selectOk="selectOk"
      @closeFn="closeClassify"></list-one>  
  </div>
</template>
<script>
import listOne from '~/components/cpms/listOne'
import { wineApi } from '~/api/wine'
import nullData from '~/components/nullData'

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
      ifWine: false,
      ifSellOut: false,
      ifExclusive: false
    }
    let params2 = {
      ifWine: false
    }
    let goodsFn = wineApi.goodList(params, req)
    let attrsFn = wineApi.serverAttrs(params2, req)
    const { code: goodCode, data: goodData } = await goodsFn
    const { code: attrsCode, data: attrsData } = await attrsFn
    if (goodCode === 200 && attrsCode === 200) {
      let { array, total, page } = goodData
      let firstCategory = []
      let secondCategory = []
      let thirdCategory = []
      firstCategory = attrsData.categoryTreeRespList
      firstCategory.map(v => {
        if (v.childrens.length > 0) {
          secondCategory.push(...v.childrens)
        }
      })
      secondCategory.map(v => {
        if (v.childrens.length > 0) {
          thirdCategory.push(...v.childrens)
        }
      })
      return {
        curTotal: total,
        curPage: page,
        tansmit: params,
        goodsList: array,
        firstList: firstCategory,
        secondList: secondCategory,
        thirdList: thirdCategory
      }
    }
  },

  data () {
    return {
      tansmit: {}, // 传递参数
      curPage: 1,
      curTotal: 0,
      loadOk: true, // 加载是否完成
      moreData: false, // 没有更多数据
      loadTxt: '加载更多',
      hasScroll: false,
      searchGoodname: '',
      firstList: [], // 大分类
      firstIndex: null, // 大分类选中索引
      secondList: [], // 子分类
      secondIndex: null, // 子分类选中索引
      thirdList: [], // 小分类
      thirdIndex: null, // 小分类选中索引
      postList: [],
      isShow: false,
      sortList: [{name: '大分类', isCor: false}, {name: '子分类', isCor: false}, {name: '小分类', isCor: false}],
      sizerIndex: null,
      classify: {
        elIndex: null,
        nowList: []
      }
    }
  },
  components: {
    listOne,
    nullData
  },
  mounted () {
    let scrollElem = this.$refs.scrollElem
    let scrollChild = this.$refs.scrollChild
    let allH = scrollElem.clientHeight
    let sctop = scrollElem.offsetTop
    function throttel (fn, interval = 300) {
      let canRun = true
      return function () {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
          fn.apply(this, arguments)
          canRun = true
        }, interval)
      }
    }
    scrollElem.addEventListener('scroll', throttel(() => {
      let { height, top } = scrollChild.getBoundingClientRect()
      let _top = Math.abs(top)
      let bottomH = height - (_top + sctop + allH)
      // console.log('bottomH', bottomH)
      if (bottomH <= 100 && this.loadOk && this.moreData) {
        this.loadOk = false
        this.fetchData(true)
      }
    }))
  },
  methods: {
    async fetchData (getMore) {
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
        this.moreData = this.curPage < totalPageNo
        if (getMore) {
          this.goodsList.push(...array)
        } else {
          this.goodsList = array
        }
        this.loadOk = true
      }
    },
    elClassify (index) {
      // 选择筛选器
      if (index !== this.sizerIndex) {
        this.isShow = true
        this.sizerIndex = index
      } else {
        this.isShow = false
        this.sizerIndex = null
      }
      if (this.isShow) {
        let getObj = {}
        switch (index) {
          case 0:
            getObj = {
              nowList: this.firstList,
              elIndex: this.firstIndex
            }
            break
          case 1:
            getObj = {
              nowList: this.secondList,
              elIndex: this.secondIndex
            }
            break
          case 2:
            getObj = {
              nowList: this.thirdList,
              elIndex: this.thirdIndex
            }
            break
        }
        Object.assign(this.classify, getObj)
        console.log(this.classify, 'classify elClassify')
      }
    },
    selectOk (event) {
      console.log('event', event)
      let clsIndex = this.sizerIndex
      let { elIndex, id } = event
      let objId = {}
      console.log('clsIndex', clsIndex)
      switch (clsIndex) {
        case 0:
          this.firstIndex = elIndex
          objId = { firstCategoryid: id }
          this.$delete(this.tansmit, 'secondCategoryid')
          this.$delete(this.tansmit, 'thirdCategoryid')
          break
        case 1:
          this.secondIndex = elIndex
          objId = { secondCategoryid: id }
          this.$delete(this.tansmit, 'thirdCategoryid')
          break
        case 2:
          this.thirdIndex = elIndex
          objId = { thirdCategoryid: id }
          break
      }
      Object.assign(this.tansmit, objId)
      this.fetchData(false)
      this.closeClassify()
    },
    closeClassify () {
      this.isShow = false
      this.sizerIndex = null
    },
    onRest () {
      // 重置数据
      this.firstIndex = null
      this.secondIndex = null
      this.thirdIndex = null
      this.searchGoodname = ''
    },
    toWinecenter () {
      window.location.href = '/winecenter'
    },
    toSearch () {
      let objGoodname = { goodsName: this.searchGoodname }
      Object.assign(this.tansmit, objGoodname)
      this.fetchData()
    },
    customArray (arr) {
      if (!Array.isArray(arr)) return false
      return JSON.parse(arr)
    }
  }
}
</script>
<style lang="less" scoped>

.others {
  width: 100vw;
  height: 100vh;
  background: #fff;
  line-height: 1;
  font-size: 12px;
}

.other-content {
  max-height: calc(100vh - 140px);
  overflow: auto;
  .othList {
    padding: 0 20px 20px;
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
          .bg_cover;
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
  .cpmzIndex;

  .top {
    padding: 5px 20px;
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
        padding: 0 20px;
        box-sizing: border-box;
        .search_icon {
          width: 16px;
          height: 16px;
          background-image: url('~/assets/img/Icons/ic_search_g_16x16@2x.png');
          .bg_cover;
        }
        .inpbox {
          width: 135px;
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
        opacity: .5;
        transform: rotate(0);
        background-image: url("~/assets/img/Icons/ic_triangle_bt_12x12@2x.png");
        transition: .2s;
        .bg_cover;
      }
    }

    .hasCor {
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

  .filter {
    background: #F5F5F5;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    &-item {
      padding: 10px 0;
      font-size:13px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(153,153,153,1);
      line-height:13px;
    }
    &-btn {
      padding-right: 16px;
      background-image: url('~/assets/img/Icons/ic_xiala_g_line_12x12@2x.png');
      background-size: 12px 12px;
      background-repeat: no-repeat;
      background-position: right center;
    }
  }

}
.upper.upzindex {
  z-index: 3000;
}
.load-more {
  line-height: 50px;
  background: #F5F5F5;
  text-align: center;
  font-size: 12px;
  background: #F5F5F5;
  color: #666;
}
</style>