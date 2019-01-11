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
        <span class="tab" @click="toWineCenter">
          <i class="tab-icon-xjzx"></i>
          <span class="tab-txt">
            选酒中心
          </span>
        </span>
        <span class="tab" @click="toEncys">
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
        <span class="tab" @click="toArrondi">
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

      <section class="commend_home">
        <div class="margin-20">
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
        </div>

        <div class="commend_home-content">
          <div class="bg" style="background: url('~/assets/img/home/img_tuijian_335x160@2x.png') no-repeat center"></div>
          <div v-swiper:mySwiper4="swiperCommend">
            <div class="swiper-wrapper">
              <div class="swiper-slide commend-list">
                <div class="pro">
                  <img src='~/assets/img/green_wine.jpg'>
                </div>
                <div class="desc">
                  <h3 class="font_hight">拉菲珍宝红葡萄酒</h3>
                  <p>750ml | 日常餐酒 | 紧致单宁</p>
                  <em class="font_impact">¥199</em>
                </div>
              </div>
              <div class="swiper-slide commend-list">
                <div class="pro">
                  <img src='~/assets/img/green_wine.jpg'>
                </div>
                <div class="desc">
                  <h3 class="font_hight">拉菲珍宝红葡萄酒</h3>
                  <p>750ml | 日常餐酒 | 紧致单宁</p>
                  <em class="font_impact">¥199</em>
                </div>
              </div>
              <div class="swiper-slide commend-list">
                <div class="pro">
                  <img src='~/assets/img/green_wine.jpg'>
                </div>
                <div class="desc">
                  <h3 class="font_hight">拉菲珍宝红葡萄酒</h3>
                  <p>750ml | 日常餐酒 | 紧致单宁</p>
                  <em class="font_impact">¥199</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hot_home">
        <div class="margin-20">
          <div class="title_home">
            <h2>
              热门甄选
            </h2>
            <a class="to-channel" href="/selection">
              进入频道
              <i class="van-icon van-icon-arrow"></i>  
            </a>
          </div>
        </div>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide hot-list"
              v-for="(pick, index) in selectList"
              :key="index">
              <div class="hot-list-box">
                <div class="pro ib-top" v-lazy:background-image="pick.goodsMinimalResp.cover"></div>
                <div class="desc ib-middle">
                  <h3>{{pick.goodsMinimalResp.goodsName}}</h3>
                  <div class="tags">
                    <i class="tagsub" v-for="(tags, tagIndex) in pick.goodsMinimalResp.tagList" :key="tagIndex">{{tags}}</i>
                  </div>
                  <div class="itemr-info">
                    <span class="info_item icon_time">{{pick.goodsMinimalResp.year}}</span>
                    <span class="info_item icon_address" v-if="pick.goodsMinimalResp.area">{{pick.goodsMinimalResp.country}} / {{pick.goodsMinimalResp.area}}</span>
                    <span class="info_item icon_address" v-else>{{pick.goodsMinimalResp.country}}</span>
                    <span class="info_item icon_variety">{{pick.goodsMinimalResp.variety}}</span>
                  </div>
                  <div class="u-bars">
                    <div class="bars">
                      <div class="bars-left">复杂：{{pick.goodsMinimalResp.complexity}}分</div>
                      <div class="bars-right">
                        <span class="bars-right_top w30"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="infor">
                  <h3>{{ pick.title }}</h3>
                  <p>{{ pick.summary }}</p>
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
            <a class="to-channel" href="/selection">
              进入频道
              <i class="van-icon van-icon-arrow"></i>  
            </a>
          </div>
        </div>

        <div v-swiper:mySwiper2="shareSwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide share-list"
              v-for="(share, index) in knowList"
              :key="index">
              <div class="share-list-box">
                <div class="share_home-user" v-if="share.userResp">
                  <u class="ib-middle" v-lazy:background-image="share.userResp.headimgurl"></u>
                  <div class="ib-middle">
                    <span>{{ share.userResp.nickname }}</span>
                    <p>{{ share.userResp.createdAt }}</p>
                  </div>
                </div>
                <div class="share_home-content">
                  <h3>{{ share.title }}</h3>
                  <div class="tips">
                    <span>频道：{{ share.channelName }}</span>
                    <span>话题：{{ share.topicName }}</span>
                  </div>
                  <p>{{ share.summary }}</p>
                  <div class="pro">
                    <img v-if="share.imgsPaht" v-lazy="share.imgsPaht[0]">
                  </div>
                  <div class="u-other">
                    <span class="zan"><i></i>{{ share.likeNumber }}</span>
                    <span class="chat"><i></i>{{ share.commentNumber }}</span>
                    <span class="watch"><i></i>{{ share.readNumber }}</span>
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
          <a class="to-channel" href="/community">
            进入频道
            <i class="van-icon van-icon-arrow"></i>  
          </a>
        </div>
        <ul class="community_home-item">
          <li
            class="community_home-list type_1 noing"
            v-for="(munity, index) in munityList"
            :key="index">
            <div class="pro">
              <div class="full bg" :style="'background: url(' + bannerImg + ') no-repeat center/cover'"></div>
            </div>
            <div class="desc">
              <h3>第{{ munity.period }}期 | {{ munity.theme }} <span>{{ munity.title }}</span></h3>
              <p>活动时间：{{ munity._times }}</p>
              <p>活动地点：{{ munity._dz }}</p>
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
            <a class="to-channel" href="/hotspot">
              进入频道
              <i class="van-icon van-icon-arrow"></i>  
            </a>
          </div>
        </div>
        <div v-swiper:mySwiper3="swiperNews">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide news-list"
              v-for="(news, index) in newsList"
              :key="index">
              <div class="news-list-box">
                <h3>{{ news.title }}</h3>
                <div class="tips">
                  <span>作者：{{news.author || '佚名'}}</span>
                  <span>来源：{{ news.sourceAddress}}</span>
                  <span>分类：{{circlenavList[news.classificationId]}}</span>
                </div>
                <div class="pro">
                  <div class="bg full" :style="'background: url(' + news.imgPath + ') no-repeat center/cover'"></div>
                </div>
                <div class="desc">
                  {{ news.summary }}
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
import { userApi } from '~/api/users'
import { selectApi } from '~/api/selection'
import { newApi } from '~/api/news'
import { knowApi } from '~/api/knowledge'
import { munityApi } from '~/api/community'
import tools from '~/utils/tools'
import bannerImg from '~/assets/img/home/img_home_335x180@2x.png'

export default {
  name: 'home',
  layout: 'page-with-tabbar',
  async asyncData (req) {
    const selectFn = selectApi.serverRecomlist(req)
    const newsFn = newApi.serverPage({ page: 1, count: 5 }, req)
    const knowFn = knowApi.homePage({ page: 1, count: 5 }, req)
    const munityFn = munityApi.serverActiveList({ page: 1, count: 5 }, req)
    // 并发异步
    const { code: selectCode, data: selectData } = await selectFn
    const { code: newsCode, data: newsData } = await newsFn
    const { code: knowCode, data: knowData } = await knowFn
    const { code: munityCode, data: munityData } = await munityFn
    // 防止一个某一数据请求失败，所以给预估返回列表一个空数组
    let _selects = []
    let _news = []
    let _knows = []
    let _munitys = []
    if (selectCode === 200) {
      _selects = selectData
    }
    if (newsCode === 200) {
      _news = newsData.array
    }
    if (knowCode === 200) {
      _knows = knowData.array
    }
    if (munityCode === 200) {
      let { array } = munityData
      _munitys = array.map(v => {
        // 时间
        const { startTime, endTime } = v
        const newtimes = tools.concatDate(startTime, endTime)
        v._times = newtimes
        // 地址
        const { province, city, district, address } = v
        const _provice = tools.getStrIndex(province)
        const _city = tools.getStrIndex(city)
        const _district = tools.getStrIndex(district)
        v._dz = _provice + _city + _district + address
        return v
      })
    }
    return {
      selectList: _selects,
      newsList: _news,
      knowList: _knows,
      munityList: _munitys
    }
  },
  data () {
    return {
      bannerImg: bannerImg,
      selectList: [], // 甄选
      newsList: [], // 新闻热点
      knowList: [], // 知识分享
      munityList: [], // 社区活动
      circlenavList: ['这些圈子都在看', '行业热点', '培训讲座', '企业招商'],
      swiperCommend: {
        speed: 800,
        slidesPerView: 'auto'
      },

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

  methods: {
    toWineCenter () {
      // 选酒中心
      window.location.href = '/winecenter'
    },
    toEncys () {
      // 红酒百科
      window.location.href = '/encys'
    },
    async toArrondi () {
      //  商家专区
      const { code, data } = await userApi.userDetail()
      if (code === 200) {
        let { certCategory } = data
        if (certCategory === 0) {
          this.$dialog.confirm({
            title: '提示',
            message: '商家专区仅对认证用户开放，您的账号尚未认证，是否前往认证?',
            confirmButtonText: '去认证',
            cancelButtonText: '取消'
          }).then(() => {
            // window.location.href = '/account/login'
          }).catch(() => {})
        } else {
          window.location.href = '/winecenter/arrondi'
        }
      } else if (code === 506) {
        this.$dialog.confirm({
          title: '提示',
          message: '商家专区仅对认证用户开放，检测到您未登录，请先登录！',
          confirmButtonText: '去登陆',
          cancelButtonText: '取消'
        }).then(() => {
          console.log(123456)
          window.location.href = '/account/login'
        }).catch(() => {})
      }
    },
    tohotspot () {
      window.location.href = '/hotspot'
    }
  }
}
</script>
<style lang="less">
@import '../assets/css/var.less';
.m-home {
  display: block;
  padding-bottom: 50px;
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

.commend_home {
  &-content {
    margin-left: 20px;
    .bg {
      width: 100%;
      height: 160px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
  }
  .commend-list {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    width: 150px;
    height: 244px;
    box-sizing: border-box;
    padding: 4px 12px 16px;
    text-align: center;
    margin-right: 15px;
    .pro {
      height: 148px;
      img {
        max-width: 100%;
        max-height: 100%;
        height: auto;
      }
    }
    .desc {
      h3 {
        font-size: 14px;
        color: #333;
      }
      p {
        margin: 10px 0 4px;
        color: #999;
        font-size: 10px;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      em {
        color: #F99C00;
        font-size: 18px;
      }
    }
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
      overflow: hidden;
    }
    .pro {
      width: 100px;
      height: 159px;
      text-align: center;
      .bg_cover;
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
     .tags {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-top: 10px;

        .tagsub {
          margin-top: 10px;

          &+.tagsub {
            margin-left: 5px;
            padding-left: 5px;
            position: relative;

            &:before {}
          }
        }
      }
      .info_item {
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
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
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
      .bg_cover;
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
  margin-bottom: 47px;
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
