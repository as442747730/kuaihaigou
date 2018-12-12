<template>
  <div class="encys">
    <com-head titleConfig="红酒百科"></com-head>
    <div class="top">
      <div class="topbanner">
        <h2>查询工具</h2>
        <p>收好这本词典，助你深入了解葡萄酒</p>
      </div>
      <div class="topnav">
        <div class="topnav-item">
          <div class="item">
            <div class="item_bk bk1"></div>
            <div class="item_word">葡萄品种</div>
          </div>
        </div>
        <div class="topnav-item">
          <div class="item">
            <div class="item_bk bk2"></div>
            <div class="item_word">产区</div>
          </div>
        </div>
        <div class="topnav-item">
          <div class="item">
            <div class="item_bk bk3"></div>
            <div class="item_word">酒庄</div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-in">
        <share-study></share-study>
        <news-info></news-info>
      </div>
    </div>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
import shareStudy from './_share'
import newsInfo from './_news'
export default {
  components: {
    comHead,
    shareStudy,
    newsInfo
  }
}
</script>
<style lang="less" scoped>
.encys {}

// 内容
.main {
  padding-top: 10px;
  background: #F5F5F5;

  &-in {
    background: #fff;
    padding-left: 20px;
    padding-bottom: 40px;
  }
}

// 上部
.top {
  padding-top: 20px;
  .padlr20;

  .topbanner {
    height: 70px;
    background-image: url('~/assets/img/encys/img_baike_335x70@2x.png');
    .bg_cover;

    &>h2 {
      padding-top: 15px;
      height: 17px;
      font-size: 17px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      text-align: center;
    }

    &>p {
      padding-top: 10px;
      height: 13px;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 13px;
      text-align: center;
    }
  }

  .topnav {
    padding: 20px 0;
    .flex_around;

    .item {

      &_bk {
        width: 55px;
        height: 55px;
        .bg_cover;
      }

      &_word {
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 14px;
        text-align: center;
        padding-top: 15px;
      }

      .bk1 {
        background-image: url('~/assets/img/encys/ic_putaopinz_55x55@2x.png');
      }

      .bk2 {
        background-image: url('~/assets/img/encys/ic_chanqu_55x55@2x.png');
      }

      .bk3 {
        background-image: url('~/assets/img/encys/ic_jiuzhuang_55x55@2x.png');
      }

    }
  }
}
</style>