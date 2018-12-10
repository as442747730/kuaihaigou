<template>
  <div class="m-home">
    <header>
      <h1 class="ib-middle">首页</h1>
      <div class="u-search ib-middle">
        <input type="text">
        <i class="van-icon van-icon-search"></i>
      </div>
    </header>
    <article>

      <section class="banner_home margin-20">
        <div class="bg full" :style="'background: url(' + bannerImg + ') no-repeat center/cover'"></div>
      </section>

      <section class="tab_home">
        <span class="tab">
          <i class="tab-icon-xjzx"></i>
          <span class="tab-txt">
            选酒中心
          </span>
        </span>
        <span class="tab">
          <i class="tab-icon-hjbk"></i>
          <span class="tab-txt">
            红酒百科
          </span>
        </span>
        <span class="tab">
          <i class="tab-icon-sqhd"></i>
          <span class="tab-txt">
            社区活动
          </span>
        </span>
        <span class="tab">
          <i class="tab-icon-sjzq"></i>
          <span class="tab-txt">
            商家专区
          </span>
        </span>
      </section>

      <section class="notify_home margin-20">
        <i class="ib-middle"></i>
        <p class="ib-middle">品味杯中风情，曼妙醇香，未饮而醉，风情何止万种？</p>
        <div class="notify_home-icon ib-middle bg"></div>
      </section>

      <section class="entry_home margin-20">
        <div class="bg full"></div>
        <div class="bg full"></div>
      </section>

      <section class="commend_home margin-20">
        <div class="title_home">
          <h2>
            美酒推荐
            <p>达人体验</p>
          </h2>
          <div class="change-new">
            <i></i>
            换一批
          </div>
        </div>
      </section>

      <section class="hot_home">
        <div class="margin-20">
          <div class="title_home">
            <h2>
              热门精选
            </h2>
            <a class="to-channel">
              进入频道
              <i class="van-icon van-icon-arrow"></i>  
            </a>
          </div>
        </div>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide hot-list">
              <div class="hot-list-box">
                <div class="pro ib-top"></div>
                <div class="desc ib-middle">
                  <h3>拉菲珍宝红葡萄酒</h3>
                  <p>750ml | 日常餐酒 | 紧致单宁</p>
                  <div class="itemr-info">
                    <span class="info_item icon_time">2016</span>
                    <span class="info_item icon_address">法国／波尔多</span>
                    <span class="info_item icon_variety">黑皮诺</span>
                  </div>
                  <div class="u-bars">
                    <div class="bars">
                      <div class="bars-left">复杂：30分</div>
                      <div class="bars-right">
                        <span class="bars-right_top w30"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="infor">
                  <h3>2017小拉菲，尝得到的一级庄韵味</h3>
                  <p>红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。</p>
                </div>
              </div>
            </div>
            <div class="swiper-slide hot-list">
              <div class="hot-list-box">
                <div class="pro ib-top"></div>
                <div class="desc ib-middle">
                  <h3>拉菲珍宝红葡萄酒</h3>
                  <p>750ml | 日常餐酒 | 紧致单宁</p>
                  <div class="itemr-info">
                    <span class="info_item icon_time">2016</span>
                    <span class="info_item icon_address">法国／波尔多</span>
                    <span class="info_item icon_variety">黑皮诺</span>
                  </div>
                  <div class="u-bars">
                    <div class="bars">
                      <div class="bars-left">复杂：30分</div>
                      <div class="bars-right">
                        <span class="bars-right_top w30"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="infor">
                  <h3>2017小拉菲，尝得到的一级庄韵味</h3>
                  <p>红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。</p>
                </div>
              </div>
            </div>
            <div class="swiper-slide hot-list">
              <div class="hot-list-box">
                <div class="pro ib-top"></div>
                <div class="desc ib-middle">
                  <h3>拉菲珍宝红葡萄酒</h3>
                  <p>750ml | 日常餐酒 | 紧致单宁</p>
                  <div class="itemr-info">
                    <span class="info_item icon_time">2016</span>
                    <span class="info_item icon_address">法国／波尔多</span>
                    <span class="info_item icon_variety">黑皮诺</span>
                  </div>
                  <div class="u-bars">
                    <div class="bars">
                      <div class="bars-left">复杂：30分</div>
                      <div class="bars-right">
                        <span class="bars-right_top w30"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="infor">
                  <h3>2017小拉菲，尝得到的一级庄韵味</h3>
                  <p>红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="share_home">
        <div class="margin-20">
          <div class="title_home">
            <h2>
              知识分享
            </h2>
            <a class="to-channel">
              进入频道
              <i class="van-icon van-icon-arrow"></i>  
            </a>
          </div>
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
                    <img src="../assets/img/home/img_home_335x180@2x.png">
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
                    <img src="../assets/img/home/img_home_335x180@2x.png">
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

      <section class="community_home margin-20">
        <div class="title_home">
          <h2>
            社区活动
          </h2>
          <a class="to-channel">
            进入频道
            <i class="van-icon van-icon-arrow"></i>  
          </a>
        </div>
        <ul class="community_home-item">
          <li class="community_home-list type_1 noing">
            <div class="pro">
              <div class="full bg" :style="'background: url(' + bannerImg + ') no-repeat center/cover'"></div>
            </div>
            <div class="desc">
              <h3>第38期 | 红酒之夜 <span>2018快海购红酒沙龙</span></h3>
              <p>活动时间：2018年7月8日-2018年7月9日</p>
              <p>活动地点：广州市天河区珠江新城四季酒店68层2号展厅</p>
            </div>
          </li>
          <li class="community_home-list type_2 ing">
            <div class="pro">
              <div class="full bg" :style="'background: url(' + bannerImg + ') no-repeat center/cover'"></div>
            </div>
            <div class="desc">
              <h3>第38期 | 红酒之夜 <span>2018快海购红酒沙龙</span></h3>
              <p>活动时间：2018年7月8日-2018年7月9日</p>
              <p>活动地点：广州市天河区珠江新城四季酒店68层2号展厅</p>
            </div>
          </li>
        </ul>
      </section>

      <section class="news_home">
        <div class="margin-20">
          <div class="title_home">
            <h2>
              新闻资讯
            </h2>
            <a class="to-channel">
              进入频道
              <i class="van-icon van-icon-arrow"></i>  
            </a>
          </div>
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
    
    </article>


  </div>
</template>
<script>
// import api from '~/utils/request'
import bannerImg from '~/assets/img/home/img_home_335x180@2x.png'

export default {
  name: 'home',
  layout: 'page-with-tabbar',

  // async asyncData (req) {
  //   return api.all([
  //     api.serverGet('/api-1', {}, req),
  //     api.serverGet('/api-2', {}, req)
  //   ])
  //     .then(api.spread(function (data1, data2) {
  //       console.log(data1, data2)
  //     })).catch(error => {
  //       req.redirect('/error')
  //     })
  // },

  // async asyncData (req) {
  //   return api.serverGet('/api').then((res) => {
  //     if (res.code !== 200) {
  //       // todo 失败回调
  //     }
  //     return { text: res.data.text }
  //   })
  // },

  data () {
    return {
      bannerImg: bannerImg,

      swiperOption: {
        speed: 800,
        slidesPerView: 'auto'
      },

      shareSwiper: {
        speed: 800,
        slidesPerView: 'auto'
      },

      swiperNews: {
        speed: 800,
        slidesPerView: 'auto'
      }
    }
  },

  created () {
    // console.log(this.swiperOption)
  },

  methods: {
  }

}
</script>
<style lang="less">
@import '../assets/css/var.less';
.m-home {
  display: block;
  header {
    padding: 0 20px 24px 20px;
    margin: 49px 0 24px;
    border-bottom: 1PX solid #f5f5f5;
    h1 {
      font-size: 26px;
      color: #333;
    }
    .u-search {
      width: 243px;
      height: 35px;
      margin-left: 30px;
      border-right: 6px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        background: #fafafa;
        color: #CCD8E6;
        font-size: 14px;
        padding-left: 36px;
        box-sizing: border-box;
      }
      i {
        top: 12px;
        left: 12px;
        font-size: 16px;
        color: #CCD8E6;
        position: absolute;
      }
    }
  }
}

.banner_home {
  width: 335px;
  height: 180px;
  background: #a6e3fd;
  border-radius: 6px;
  margin-top: 20px;
  margin-bottom: 17px;
}

.tab_home {
  padding: 0 20px; 
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: block;
    text-align: center;
    font-size: 14px;
    color: #333;
  }
  i {
    display: inline-block;
    width: 35px;
    height: 35px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .tab-txt {
    margin-top: 7px;
  }
  .tab-icon {
    &-xjzx {background-image: url('../assets/img/home/ic_xuanjiuzhongxin_35x35@2x.png')}
    &-hjbk {background-image: url('../assets/img/home/ic_hongjiubaike_35x35@2x.png')}
    &-sqhd {background-image: url('../assets/img/home/ic_shequhuodong_35x35@2x.png')}
    &-sjzq {background-image: url('../assets/img/home/ic_xuanjiuzhongxin_35x35@2x.png')}
  }   
}

.notify_home {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 60px;
  background: #fef5e5;
  border-radius: 30px;
  i {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: 10px;
    background: #fff; 
  }
  p {
    width: 215px;
    font-size: 12px;
    color: #333;
    line-height: 20px;
    margin: 0 10px;
  }
  &-icon {
    width: 60px;
    height: 60px;
    background-image: url('../assets/img/home/ic_like_60x60@2x.png')
  }
}

.entry_home {
  font-size: 0;
  &>div {
   width: 160px;
   height: 100px;
   display: inline-block;
   &:first-child {
    margin-right: 15px;
    background-image: url('../assets/img/home/img_jiushenrukou_160x100@2x.png')
  }
   &:last-child {
    background-image: url('../assets/img/home/img_xinshourukou_160x100@2x.png')
   } 
  }
}

.hot_home {
  .hot-list {
    width: 320px;
    margin-left: 15px;
    &:last-child {
      width: 340px;
    }
    &-box {
      border-radius: 8px;
      border: 1PX solid #eaeaea;
      box-sizing: border-box;
      padding: 20px 0 0; 
      width: 320px;
      height: 370px;
    }
    .pro {
      width: 100px;
      height: 159px;
      text-align: center;
    }
    .desc {
      font-size: 12px;
      width: 195px;
      &>h3 {
        font-size:15px;
        font-family: PingFangSC-Medium;
        color:rgba(51,51,51,1);
        line-height:21px;
      }
      &>p {
        padding: 10px 0;
        font-size:12px;
        font-family: PingFang-SC-Regular;
        color:rgba(153,153,153,1);
        line-height:12px;
      }
      span {
        display: inline-block;
        height:24px;
        line-height: 24px;
        background:#DEF3F9;
        border-radius:12px;
        padding-left: 25px;
        padding-right: 5px;
        vertical-align: middle;
        margin-top: 10px;
        position: relative;
        font-size:12px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color: #03A1CD;
        margin-left: 7px;
        &:before {
          content: '';
          width: 24px;
          height: 24px;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -12px;
          .bg_cover;
        }
      }
      .icon_time {
        &:before {
          background-image: url('../assets/img/Icons/ic_time_24x24.png');
        }
      }
      .icon_address {
        &:before {
          background-image: url('../assets/img/Icons/ic_position_24x24.png');
        }
      }
      .icon_variety {
        &:before {
          background-image: url('../assets/img/Icons/ic_grape_24x24.png');
        }
      }
    }
    .infor {
      margin-top: 12px;
      border-top: 1PX solid #eaeaea;
      background: #FBFBFB;
      padding: 15px 20px 10px;
      h3 {
        color: #333;
        font-size: 16px;
        margin-bottom: 10px;
      }
      p {
        color: #999;
        font-size: 14px;
        line-height: 24px;
        text-align: justify;
      } 
    }
  }
}

.share_home {
  .share-list {
    font-size: 0;
    width: 320px;
    margin-left: 15px;
    &:last-child {
      width: 340px;
    }
    &-box {
      border-radius: 8px;
      border: 1PX solid #eaeaea;
      box-sizing: border-box;
      width: 320px;
      height: 514px;
    }
  }
  &-user {
    border-bottom: 1PX solid #f5f5f5;
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
        background: url('../assets/img/home/ic_time_g_14x14@2x.png') no-repeat center/contain
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
    .tips{
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

.community_home {
  &-list {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    .pro {
      height: 180px;
      border-radius: 6px;
      overflow: hidden;
    }
    .desc {
      h3 {
        margin: 13px 0 10px;
        display: inline-block;
        color: #333;
        font-size:16px;
        font-weight: bold;
        font-family: 'PingFangSC-Semibold';
        span {
          font-weight: normal;
          font-family: 'PingFang-SC'
        }
      }
      p {
        font-size: 12px;
        color: #999;
        line-height: 20px;
      }
    }
  }
}

.news_home {
  margin-bottom: 64px;
  .news-list {
    width: 320px;
    margin-left: 15px;
    &:last-child {
      width: 340px;
    }
    &-box {
      border-radius: 8px;
      border: 1PX solid #eaeaea;
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
  margin: 30px 0 20px;
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
      background: url('../assets/img/home/ic_huanyipi_g_18x18@2x.png') no-repeat center/contain;
      vertical-align: sub;
    }
  }
  .to-channel {
    position: absolute;
    right: 0;
    top: 0;
    color: #bbb;
    font-size: 14px;
    font-family: 'PingFangSC-Semibold';
    i {
      font-size: 12px;
      font-weight: bold;
      transform: scale(.8);
      position: relative;
      top: 1PX;
    }
  }
}
</style>
