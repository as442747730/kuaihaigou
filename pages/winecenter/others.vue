<template>
  <div class="others" ref="scrollElem">
    <div class="others-head">
      <div class="upper upzindex">
        <div class="top">
          <div class="top_l" @click="toWinecenter">
            <span class="top_l-span icon_switch"></span>
            <span class="top_l-span world">红酒商品</span>
          </div>
          <div class="top_r">
            <i class="icon_search" @click="toSearch"></i>
            <i class="icon_buy"></i>
          </div>
        </div>
        <div class="screen">
          <div class="screen-item" :class="{active: sizerIndex === index}" @click="elClassify(index)" v-for="(cls, index) in sortList" :key="index">{{cls.name}}</div>
        </div>
      </div>
    </div>
    <section class="other-content">
      <ul class="othList">
        <li class="othList-item" v-for="(good, index) in goodsList" :key="index">
          <div class="top">
            <div class="top_bk" :style="'background: url(' + good.imgUrl + ') no-repeat center/contain'"></div>
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
    </section>
    <list-one :isShow="isShow" :postObjs="classify" @selectOk="selectOk" @closeFn="closeClassify"></list-one>  
  </div>
</template>
<script>
import listOne from '~/components/cpms/listOne'
import tools from '~/utils/tools'
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
      ifWine: false
    }
    const { code, data } = await wineApi.goodList(params, req)
    console.log(code)
    if (code === 200) {
      console.log(data)
      let { array, extras, total, page, totalPageNo } = data
      let firstCategory = tools.adjustProps(extras.firstCategory)
      let secondCategory = tools.adjustProps(extras.secondCategory)
      let thirdCategory = tools.adjustProps(extras.thirdCategory)
      return {
        curTotal: total,
        curPage: page,
        curTotalPage: totalPageNo,
        tansmit: params,
        goodsList: array,
        extras: extras,
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
      curTotalPage: 1,
      loadOk: true, // 加载是否完成
      moreData: false, // 没有更多数据
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
    listOne
  },
  mounted () {
    window.addEventListener('scroll', () => {
      let winH = document.documentElement.clientHeight || document.body.clientHeight
      let elemBound = this.$refs.scrollElem.getBoundingClientRect()
      let _top = Math.abs(elemBound.top)
      let _height = elemBound.height
      let bottomH = _height - (_top + winH)
      if (bottomH <= 100) {
        if (this.loadOk && !this.moreData) {
          this.loadOk = false
          if (this.curPage < this.curTotalPage) {
            this.curPage += 1
            Object.assign(this.tansmit, { page: this.curPage })
            this.scrollData()
          } else {
            this.moreData = false
          }
        }
      }
    })
  },
  methods: {
    async getPageData () {
      // 筛选
      this.moreData = true
      this.loadOk = true
      Object.assign(this.tansmit, { page: 1 })
      const { code, data } = await wineApi.clientList(this.tansmit)
      if (code === 200) {
        let { array, page, totalPageNo } = data
        this.curPage = page
        this.curTotalPage = totalPageNo
        this.goodsList = array
      } else {
        this.$toast(data)
      }
    },
    async scrollData () {
      // 滚动
      this.moreData = true
      this.loadOk = true
      Object.assign(this.tansmit, { page: 1 })
      const { code, data } = await wineApi.clientList(this.tansmit)
      if (code === 200) {
        let { array, page, totalPageNo } = data
        this.curPage = page
        this.curTotalPage = totalPageNo
        this.goodsList.push(...array)
        this.loadOk = true
      } else {
        this.$toast(data)
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
          break
        case 1:
          this.secondIndex = elIndex
          objId = { secondCategoryid: id }
          break
        case 2:
          this.thirdIndex = elIndex
          objId = { thirdCategoryid: id }
          break
      }
      console.log(objId, 'objId')
      Object.assign(this.tansmit, objId)
      this.getPageData()
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
    },
    toWinecenter () {
      window.location.href = '/winecenter'
    },
    toSearch () {
      window.location.href = '/search?id=others'
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
  // padding-bottom: 50px;
  .padlr20;

  .othList {
    padding-bottom: 20px;
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
          width: 34px;
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
  .padlr20;
  .cpmzIndex;

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
        background-image: url("../../assets/img/Icons/ic_qiehuan_blue_22x22.png");
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
        background-image: url("../../assets/img/Icons/ic_search_b_30x30.png");
      }

      .icon_buy {
        .bg_cover;
        background-image: url("../../assets/img/Icons/ic_shop_b_30x30.png");
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

}
.upper.upzindex {
  z-index: 3000;
}
</style>