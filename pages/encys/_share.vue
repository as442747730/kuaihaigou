<template>
  <section class="share_home">
    <div class="title_home">
      <h2>
            知识分享
          </h2>
      <a class="to-channel">
            进入频道
            <i class="van-icon van-icon-arrow"></i>  
          </a>
    </div>
    <div v-swiper:mySwiper2="shareSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide share-list">
          <div class="share-list-box">
            <div class="share_home-user">
              <u class="ib-middle"></u>
              <div class="ib-middle">
                <span>一朵小粒欣</span>
                <p>2018-08-23</p>
              </div>
            </div>
            <div class="share_home-content">
              <h3>2017雄狮，Decanter 97分好评，帕克眼中实力一级庄</h3>
              <div class="tips">
                <span>频道：经验 | 心得 | 美食</span>
                <span>话题：红酒</span>
              </div>
              <p>红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上…</p>
              <div class="pro">
                <img src="~/assets/img/home/img_home_335x180@2x.png">
                  </div>
                <div class="u-other">
                  <span class="zan"><i></i>100</span>
                  <span class="chat"><i></i>98</span>
                  <span class="watch"><i></i>27456</span>
                  <div class="more_share">
                    <i class="point"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide share-list">
            <div class="share-list-box">
              <div class="share_home-user">
                <u class="ib-middle"></u>
                <div class="ib-middle">
                  <span>一朵小粒欣</span>
                  <p>2018-08-23</p>
                </div>
              </div>
              <div class="share_home-content">
                <h3>2017雄狮，Decanter 97分好评，帕克眼中实力一级庄</h3>
                <div class="tips">
                  <span>频道：经验 | 心得 | 美食</span>
                  <span>话题：红酒</span>
                </div>
                <p>红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上…</p>
                <div class="pro">
                  <img src="~/assets/img/home/img_home_335x180@2x.png">
                  </div>
                  <div class="u-other">
                    <span class="zan"><i></i>100</span>
                    <span class="chat"><i></i>98</span>
                    <span class="watch"><i></i>27456</span>
                    <div class="more_share">
                      <i class="point"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      shareSwiper: {
        speed: 800,
        slidesPerView: 'auto'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.share_home {

  .share-list {
    font-size: 0;
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
      width: 320px;
      height: 514px;
    }
  }

  &-user {
    border-bottom: 1px solid #f5f5f5;
    padding: 20px;

    u {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 17px;
      background: #ff6c6c;
    }

    span {
      display: block;
      font-size: 16px;
      color: #333;
    }

    p {
      margin-top: 9px;
      color: #999;
      font-size: 12px;
      display: inline-block;
      vertical-align: middle;

      &:before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-right: 4px;
        width: 14px;
        height: 14px;
        background: url('~/assets/img/home/ic_time_g_14x14@2x.png') no-repeat center/contain
      }
    }
  }

  &-content {
    padding: 15px 20px;

    h3 {
      font-size: 16px;
      color: #333;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      line-height: 22px;
    }

    .tips {
      color: #999;
      font-size: 12px;
      margin: 10px 0 15px;

      span:first-child {
        margin-right: 20px;
      }
    }

    p {
      max-height: 120px;
      overflow: hidden;
      text-align: justify;
      font-size: 14px;
      color: #999;
      line-height: 24px;
    }

    .pro {
      margin: 10px 0 20px;

      img {
        width: 100%;
        height: auto;
      }
    }
  }
}

// 通用
.title_home {
  position: relative;
  padding: 20px 0;
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