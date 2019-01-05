<template>
  <div class="topselect">
    <div class="top">
      <div class="top_l">
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
      <div class="filter-item filter-btn" @click="sortFn">分类筛选</div>
    </div>
    <transition name="slide-bottom">
      <div class="drop-wrapper-select" v-if="expanded">
        <div class="drop-wrapper-body">
          <div class="items" :class="[sortList === 1 ? 'ones' : 'ones_three']">
            <div class="item" :class="{active: oneIndex === index}" v-for="(n, index) in 20" :key="index" @click="bigFn(index)">大分类</div>
          </div>
          <div class="items" :class="[sortList === 2 ? 'twos' : 'twos_three']" v-if="sortList > 1">
            <div class="item" :class="{active: twoIndex === index}" v-for="(n, index) in 20" :key="index" @click="middleFn(index)">次级分类</div>
          </div>
          <div class="items threes" v-if="sortList === 3">
            <div class="item" :class="{active: threeIndex === index}" v-for="(n, index) in 20" :key="index" @click="subFn(index)">子分类</div>
          </div>
        </div>
        <div class="drop-wrapper-bottom">
          <div class="btn" @click="restFn">重置</div>
          <div class="btn co" @click="okFn">确认</div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="modal" v-if="expanded"></div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'TopSelect',
  data () {
    return {
      expanded: false,
      sortList: 1,
      oneIndex: null,
      twoIndex: null,
      threeIndex: null,
      searchGoodname: ''
    }
  },
  methods: {
    sortFn () {
      this.expanded = !this.expanded
    },
    bigFn (index) {
      this.sortList = 2
      this.oneIndex = index
      this.twoIndex = null
      this.threeIndex = null
    },
    middleFn (index) {
      this.sortList = 3
      this.twoIndex = index
      this.threeIndex = null
    },
    subFn (index) {
      this.threeIndex = index
    },
    restFn () {
      this.expanded = false
      this.sortList = 1
      this.oneIndex = null
      this.twoIndex = null
      this.threeIndex = null
    },
    okFn () {
      this.expanded = false
    },
    toSearch () {
    }
  }
}
</script>
<style lang="less" scoped>
.topselect {
  .top {
    height: 40px;
    padding: 0 20px;
    background: #fff;
    z-index: 40;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
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
        background: rgba(250, 250, 250, 1);
        border-radius: 14px;
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
          font-size: 12px;
        }

        input::-webkit-search-cancel-button {
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

  .filter {
    height: 30px;
    padding: 0 20px;
    background: #F5F5F5;
    display: flex;
    justify-content: space-between;
    z-index: 40;
    position: fixed;
    top: 40px;
    left: 0;
    width: 100%;
    box-sizing: border-box;

    &-item {
      padding: 10px 0;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 13px;
    }

    &-btn {
      padding-right: 16px;
      background-image: url('~/assets/img/Icons/ic_xiala_g_line_12x12@2x.png');
      background-size: 12px 12px;
      background-repeat: no-repeat;
      background-position: right center;
    }
  }

  .drop-wrapper-select {
    width: 100%;
    position: fixed;
    z-index: 34;
    top: 70px;

    .drop-wrapper-body {
      background: white;
      display: flex;
      flex-wrap: wrap;
      max-height: calc(100vh - 120px);
      overflow: auto;
      box-sizing: border-box;
      .items {
      	overflow: auto;
      }
      .ones {
      	background: #fff;
				width: 100%;
      }
      .twos {
      	width: 66.6%;
      	background: #fff;
      }
      .threes {
      	width: 33.3%;
      	background: #fff;
      }
      .ones_three {
      	width: 33.3%;
      	background: #F5F5F5;
      }
      .twos_three {
      	width: 33.3%;
      	background: #F9F9F9;
      }
      .item {
        width: 100%;
        padding: 15px 0;
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        text-align: center;
        &.active {
					color:rgba(51,51,51,1);
					background: #fff;
        }
      }
    }

    .drop-wrapper-bottom {
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      display: flex;

      .btn {
        flex: 1;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        font-weight: bold;
        color: @nice-blue;
        background: white;
        text-align: center;

        &.co {
          background: @nice-blue;
          color: white;
        }
      }
    }
  }

  .modal {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100vh;
  }
}
</style>