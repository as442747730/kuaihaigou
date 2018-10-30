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

        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide share-list">
            
            </div>
          </div>
        </div>
      </section>
    
    </article>
    <!-- <van-button type="default" round>按钮</van-button> -->
    <!-- <div class="u-button" @click="gotoLogin">按钮</div> -->

    <!-- <div class="u-login-input">
      <input placeholder="请输入密码"></input>
    </div> -->
  </div>
</template>
<script>
import api from '../utils/request'
import bannerImg from '../assets/img/home/img_home_335x180@2x.png'
export default {
  name: 'home',
  layout: 'default',

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

  data() {
    return {
      bannerImg: bannerImg,

      swiperOption: {
        // width: 320 * window.innerWidth / 375,
        speed: 800,
        // spaceBetween : '4%',
        slidesPerView: 'auto'
      }
    }
  },

  created() {
  },

  methods: {
    gotoLogin () {
      window.location.href = '/account/login'
    }
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
    border-bottom: 1px solid #f5f5f5;
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
      border: 1px solid #eaeaea;
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
      border-top: 1px solid #eaeaea;
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
      top: 1px;
    }
  }
}
</style>
