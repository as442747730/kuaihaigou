<template>
  <div class="otherone">
    <top-select></top-select>
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
  </div>
</template>
<style lang="less" scope>
</style>
<script>
import topSelect from '~/components/winecenter/topSelect'
import nullData from '~/components/nullData'
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
  components: {
    topSelect,
    nullData
  },
  async asyncData (req) {
    let params = {
      page: 1,
      count: 5,
      ifWine: false,
      ifSellOut: false,
      ifExclusive: false
    }
    let goodsFn = wineApi.goodList(params, req)
    const { code: goodCode, data: goodData } = await goodsFn
    if (goodCode === 200) {
      let { array, total, page } = goodData
      return {
        curTotal: total,
        curPage: page,
        tansmit: params,
        goodsList: array
      }
    }
  },
  data () {
    return {
      tansmit: {}, // 传递参数
      curPage: 1,
      curTotal: 0,
      goodsList: [],
      loadOk: true, // 加载是否完成
      moreData: false, // 没有更多数据
      loadTxt: '加载更多',
      hasScroll: false,
      searchGoodname: ''
    }
  },
  methods: {
    customArray (arr) {
      if (!Array.isArray(arr)) return false
      return JSON.parse(arr)
    }
  }
}
</script>
<style lang="less" scoped>
  .otherone {
  	padding-top: 70px;
  }
	.other-content {
	  max-height: calc(100vh - 120px);
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
</style>