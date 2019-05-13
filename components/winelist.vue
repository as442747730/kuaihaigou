<template>
  <div class="winery-items">
    <ul class="item-ul">
      <li
        class="wine_li"
        v-for="(winery, index) in wineryArr"
        @click="goWinery(winery)"
        :key="index">
        <div class="winebox">
          <div class="li-winebk" v-lazy:background-image="winery.cover">
            <div class="rt-icon"></div>
          </div>
          <div class="li-zh u-ellipsis">保加利亚·超级好喝的朗姆酒111111111111</div>
          <div class="li-en">
            <div class="en_inline">
              <p class="en_p">Bulgaria's Super Delicious Rum</p>
              <p class="zh_p">平均价格:666￥</p>
            </div>
          </div>
        </div>
        <div class="wineinfo">
          <p>
            <span class="wineicon"></span>
            手指葡萄
          </p>
          <p>
            <span class="wineicon"></span>
            1982
          </p>
          <p>
            <span class="wineicon"></span>
            美国
          </p>
          <p>
            <span class="wineicon"></span>
            A级
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:'uWinelist',

  props:{
    wineryArr:Array
  },
  data() {
    return {

    }
  },
  methods: {

  }

}
</script>
<style lang="less" scoped>
.winery-items {
  background: #fff;
  padding: 0 20px;
  margin-left: -20px;
  // height: calc(100vh - 130px);
  overflow: auto;
  .item-ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .wine_li {
      margin-top: 20px;
      margin-left: 20px;
      border: 1px solid rgb(202, 202, 202);
      width:100%;
      display: flex;
      .winebox {
        width:50%;
        padding-bottom:10px;
        .li-winebk {
          padding: 40% 0;
          overflow: hidden;
          position:relative;
          background-size:100% 100%;
          border-bottom: 1px solid rgb(202, 202, 202);
        }
        .li-zh {
          padding-left: 6px;
          font-size:13px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(51,51,51,1);
          line-height:25px;
        }
      }
      .wineinfo {
        flex-grow:1;
        padding: 10px;
        box-sizing: border-box;
        background-color: rgb(202, 202, 202);
        p {
          padding: 10px 0;
          font-size:14px;
          font-family:PingFangSC-Semibold;
          line-height:30px;
          text-align: right;
          .wineicon {
            padding:20px;
            float: left;
            background-image:url('~assets/img/home/ic_huanyipi_g_18x18@2x.png');
          }
        }
      }
    }
  }
}
</style>


