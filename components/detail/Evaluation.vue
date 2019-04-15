<!-- 推荐商品，所有商品的组件模块都通用 -->
<template>
  <div class="recommended">
    <div class="u-detail-title">
      <p>recommended to you</p>
      <h3>为你推荐</h3>
    </div>
    <ul class="recommended-item">
      <li class="recommended-list" v-for="(hot, index) in hotList" :key="index">
        <div class="pro">
          <a :href="'/detail/' + hot.id">
            <img :src="hot.cover">
          </a>
        </div>
        <div class="desc">
          <h3>
            <a :href="'/detail/' + hot.id">{{ hot.goodsName }}</a>
          </h3>
          <p>
            <span v-for="(tag, index) in hot.tagList" :key="index">{{ tag }}</span>
          </p>
          <span>¥ {{ hot.actualPrice }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'u-evaluation',
  props: {
    hostlist: Array
  },
  data () {
    return {
      hotList: this.hostlist
    }
  },
  created () {
    console.log(this.hotList)
  }
}
</script>
<style lang="less" scoped>
// 推荐
.recommended {
  &-item {
    padding: 0 19px;
  }
  &-list {
    display: inline-block;
    width: 162px; 
    margin-right: 13px;
    margin-bottom: 20px;
    &:nth-child(2n) {
      margin-right: 0;
    }
    .pro {
      border: 1PX solid #eaeaea;
      height: 160px;
      text-align: center;
      line-height: 160px;
      overflow: hidden;
      img {
        display: inline-block;
        vertical-align: middle;
        max-width: 100%;
      }
    }
    .desc {
      h3 {
        color: #333;
        font-size: 13px;
        margin: 11px 0 10px;
        line-height: 18px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      p {
        color: #999;
        font-size: 12px;
        margin-bottom: 10px;
      }
      span {
        font-size: 15px;
        color: #FB6248;
        font-family:PingFangSC-Semibold;
        font-weight: bold;
      }
    }
  }
}
</style>
