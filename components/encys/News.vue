<template>
  <section class="news_home">
    <div class="title_home">
      <h2> 新闻资讯</h2>
      <a class="to-channel">
          进入频道
          <i class="van-icon van-icon-arrow"></i>  
         </a>
    </div>
    <div v-swiper:mySwiper3="swiperNews">
      <div class="swiper-wrapper">
        <div class="swiper-slide news-list">
          <div class="news-list-box">
            <h3>拉菲传说：拉菲传奇和拉菲珍藏葡萄酒三者之间的区别</h3>
            <div class="tips">
              <span>国际资讯</span>
              <span>作者：拉菲尼斯</span>
              <span>来源：红酒网</span>
            </div>
            <div class="pro">
              <div class="bg full" :style="'background: url(' + bannerImg + ') no-repeat center/cover'"></div>
            </div>
            <div class="desc">
              红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上…
            </div>
          </div>
        </div>
        <div class="swiper-slide news-list">
          <div class="news-list-box">
            <h3>拉菲传说：拉菲传奇和拉菲珍藏葡萄酒三者之间的区别</h3>
            <div class="tips">
              <span>国际资讯</span>
              <span>作者：拉菲尼斯</span>
              <span>来源：红酒网</span>
            </div>
            <div class="pro">
              <div class="bg full" :style="'background: url(' + bannerImg + ') no-repeat center/cover'"></div>
            </div>
            <div class="desc">
              红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上…
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import bannerImg from '~/assets/img/home/img_home_335x180@2x.png'
export default {
  data () {
    return {
      bannerImg: bannerImg,
      swiperNews: {
        speed: 800,
        slidesPerView: 'auto'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.news_home {
  .news-list {
    width: 320px;
    margin-left: 15px;

    &:first-child {
    	margin-left: 0;
    }

    &:last-child {
      width: 340px;
    }

    &-box {
      border-radius: 8px;
      border: 1px solid #eaeaea;
      box-sizing: border-box;
      padding: 20px;
      width: 320px;
      height: 408px;
    }

    h3 {
      line-height: 22px;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      font-family: 'PingFangSC-Semibold';
    }

    .tips {
      margin: 6px 0 16px;

      span {
        font-size: 12px;
        color: #999;
        display: inline-block;
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .pro {
      height: 150px;
      border-radius: 6px;
      overflow: hidden;
    }

    .desc {
      margin-top: 10px;
      line-height: 24px;
      color: #999;
      font-size: 14px;
      max-height: 122px;
      overflow: hidden;
    }
  }
}

// 通用
.title_home {
  position: relative;
  padding: 30px 0 20px;
  h2 {
    font-size: 22px;
    color: #333;
    p {
      margin-top: 10px;
      font-size: 14px;
      color: #bbb;
      font-weight: normal;
    }
  }
  .change-new {
    position: absolute;
    right: 0;
    top: 0;
    color: #bbb;
    font-size: 14px;
    font-family: 'PingFangSC-Semibold';
    i {
      width: 18px;
      height: 18px;
      display: inline-block;
      background: url('~/assets/img/home/ic_huanyipi_g_18x18@2x.png') no-repeat center/contain;
      vertical-align: sub;
    }
  }
  .to-channel {
    position: absolute;
    right: 20px;
    top: 50%;
    color: #bbb;
    font-size: 14px;
    font-family: 'PingFangSC-Semibold';
    transform: translateY(-50%);
    i {
      font-size: 12px;
      font-weight: bold;
      transform: scale(.8);
      position: relative;
      top: 1px;
    }
  }
}
</style>