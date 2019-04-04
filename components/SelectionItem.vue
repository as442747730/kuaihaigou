<template>
  <div class="hot-list-box" v-if="pick.goodsMinimalResp" :class="{'w100': selectList.length === 1}">
    <div class="desc">
      <h3>{{ pick.goodsMinimalResp.goodsName }}</h3>
      <div class="author">作者：{{ pick.auth }}</div>
    </div>
    <div class="bottom">
      <div class="summary">{{ pick.summary }}</div>
      <div class="pro" v-lazy:background-image="pick.img">
        <div class="goods-info">
          <div class="ib-middle goods-info-img" v-lazy:background-image="pick.goodsMinimalResp.cover"></div>
          <div class="ib-middle goods-info-detail">
            <p class="u-ellipsis">{{ pick.goodsMinimalResp.goodsName }}</p>
            <em class="ib-middle">¥{{ pick.goodsMinimalResp.actualPrice }}</em>
            <del class="ib-middle">市场价：¥{{ pick.goodsMinimalResp.marketPrice }}</del>
          </div>
        </div>
      </div>
      <div class="u-other">
        <span class="zan"><i></i>{{ pick.likeNum }}</span>
        <span class="chat"><i></i>{{ pick.commentNum }}</span>
        <span class="watch"><i></i>{{ pick.browseNum }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pick: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>
.hot-list {
  margin-left: 15px;
  &:last-child {
    width: 340px;
  }
  &-box {
    border-radius: 8px;
    border: 1PX solid #eaeaea;
    box-sizing: border-box;
    width: 320px;
  }
  .bottom {
    padding: 10px 15px;
  }
  .pro {
    margin: 10px 0 15px;
    height: 180px;
    border-radius: 4px;
    text-align: center;
    position: relative;
    .bg_cover;
  }
  .desc {
    font-size: 12px;
    border-bottom: 1PX solid #f5f5f5; 
    padding: 15px;
    &>h3 {
      font-size: 15px;
      font-family: PingFangSC-Medium;
      color:rgba(51,51,51,1);
      line-height: 21px;
      display: flex;
      align-items: center;
      overflow: hidden;
      height: 42px;
    }
    &>p {
      padding: 10px 0;
      font-size:12px;
      color:rgba(153,153,153,1);
      line-height:12px;
    }
    .author {
      font-size: 12px;
      color: #333;
      padding: 10px 0 0px;
    }
  }
  .summary {
    color: #666;
    height: 68px;
    font-size: 13px;
    line-height: 23px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .goods-info {
    position: absolute;
    width: 270px;
    box-sizing: border-box;
    bottom: 10px;
    left: 16px;
    padding: 5px 10px;
    background: #f9f9f9;
    &-img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      .bg_cover;
      background-color: #fff;
    }
    &-detail {
      width: calc(100% - 60px);
      text-align: left;
    }
    p {
      color: #333;
      font-size: 11px;
      margin-bottom: 8px;
      font-weight: bold;
      line-height: 1.2;
    }
    em {
      color: @c-price;
      font-size: 15px;
    }
    del {
      font-size: 11px;
      color: #666;
      margin-left: 8px;
    }
  }
}
</style>