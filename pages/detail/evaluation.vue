<template>
  <div class="recommended">
    <div class="u-detail-title">
      <p>recommended to you</p>
      <h3>为你推荐</h3>
    </div>
    <ul class="recommended-item margin-20">
      <li class="recommended-list" v-for="$v in 4">
        <div class="pro">
          <img src="~/assets/img/img.png">
        </div>
        <div class="desc">
          <h3>法国1982拉菲法国1982拉菲传奇Lafite</h3>
          <p>750ml | 日常餐酒 | 紧致单宁</p>
          <span>¥ 399</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'u-evaluation',

  data () {
    return {
    }
  },

  mounted () {
  },

  methods: {
  }

}
</script>
<style lang="less" scoped>
// 推荐
.recommended {
  &-list {
    display: inline-block;
    width: 160px; 
    margin-right: 15px;
    margin-bottom: 20px;
    &:nth-child(2n) {
      margin-right: 0;
    }
    .pro {
      border: 1px solid #eaeaea;
      height: 158px;
      text-align: center;
      line-height: 158px;
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
        font-family: 'PingFangSC-Medium';
        margin: 12px 0 10px;
        line-height: 18px;
        font-weight: bold;
        height: 36px;
        overflow: hidden;
      }
      p {
        color: #999;
        font-size: 12px;
        margin-bottom: 10px;
      }
      span {
        font-size: 15px;
        color: #F99C00;
        font-family: 'Impact'
      }
    }
  }
}
</style>
