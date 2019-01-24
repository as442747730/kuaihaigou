<template>
  <div class="m-home">
    <header>
      <h1 class="ib-middle">首页</h1>
      <div class="u-search ib-middle" @click='toSearch'>
        <input type="text">
        <i class="van-icon van-icon-search"></i>
      </div>
    </header>
    <article>

      <section class="banner_home margin-20">
        <div class="bg full" v-lazy:background-image="bannerImg"></div>
      </section>

      <section class="tab_home">
        <a class="tab" href="/winecenter">
          <i class="tab-icon-xjzx"></i>
          <span class="tab-txt">
            选酒中心
          </span>
        </a>
        <a class="tab" href="/encys">
          <i class="tab-icon-hjbk"></i>
          <span class="tab-txt">
            红酒百科
          </span>
        </a>
        <a class="tab" href="/community?status=0">
          <i class="tab-icon-sqhd"></i>
          <span class="tab-txt">
            社区活动
          </span>
        </a>
        <a class="tab" @click="toArrondi">
          <i class="tab-icon-sjzq"></i>
          <span class="tab-txt">
            商家专区
          </span>
        </a>
      </section>

      <section class="notify_home margin-20">
        <div class="swiper-container home_in" v-swiper:mySwiper6="notyfySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(poet, index) in poetList"
              :key="index">
              <i class="ib-middle" :style="{backgroundImage: 'url('+ poet.headimgurl +')'}"></i>
              <p class="ib-middle">{{poet.content}}</p>
              <div class="notify_home-icon ib-middle bg"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="entry_home margin-20">
        <div class="bg full"></div>
        <div class="bg full"></div>
      </section>

      <section class="commend_home" id="comwines">
        <div class="margin-20">
          <div class="title_home">
            <h2>
              美酒推荐
              <p>达人体验</p>
            </h2>
            <div class="change-new" id="changeNew">
              <i></i>
              换一批
            </div>
          </div>
        </div>

        <div class="commend_home-content">
          <div class="home_bk">
            <div class="bg" :style="{backgroundImage: 'url(' + wineBk + ')'}">
              <div class="bg_world">{{wineSence}}</div>
            </div>
            <!-- <div class="bg" v-lazy:background-image="wineBk"></div> -->
          </div>
          <div v-swiper:mySwiper4="swiperCommend">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide commend-list"
                v-for="(wine, index) in wineList"
                :key="index">
                <div class="pro">
                  <img v-lazy="wine.cover" />
                </div>
                <div class="desc">
                  <h3 class="font_hight">{{wine.goodsName}}</h3>
                  <p class="tags">
                    <span
                      class="subtag"
                      v-for="(mytag, tagIndex) in wine.tagList"
                      :key="tagIndex">{{mytag}}</span>
                  </p>
                  <em class="font_impact">{{wine.actualPrice}}</em>
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
              <div class="hot-list-box" v-if="pick.goodsMinimalResp">
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
                  <h3 class="content_title">
                    <p>{{ share.title }}</p>
                  </h3>
                  <div class="tips">
                    <span>频道：{{ share.channelName }}</span>
                    <span>话题：{{ share.topicName }}</span>
                  </div>
                  <p class="content_summary">{{ share.summary }}</p>
                  <div class="pro">
                    <div class="content_bk" v-if="share.imgsPaht" v-lazy:background-image="share.imgsPaht[0]"></div>
                    <!-- <img v-if="share.imgsPaht" v-lazy="share.imgsPaht[0]"> -->
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
          <a class="to-channel" href="/community?status=0">
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
              <div class="full bg munity_bk" v-lazy:background-image="munity.cover">
                <span class="theme" v-if="munity.themeType === 1">官方<br>活动</span>
                <span class="theme" v-if="munity.themeType === 2">合作<br>活动</span>
                <span class="theme" v-if="munity.themeType === 3">酒展</span>

                <span class="status sign" v-if="munity.status === 1">报名中</span>
                <span class="status carry" v-if="munity.status === 2 || munity.status === 3">进行中</span>
                <span class="status ends" v-if="munity.status === 4">已结束</span>
              </div>
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
                <h3 class="box_title">
                  <p>{{ news.title }}</p>
                </h3>
                <div class="tips">
                  <span>作者：{{news.author || '佚名'}}</span>
                  <span>来源：{{ news.sourceAddress}}</span>
                  <span>分类：{{circlenavList[news.classificationId]}}</span>
                </div>
                <div class="pro">
                  <div class="bg full" v-if="news.imgPath" v-lazy:background-image="news.imgPath"></div>
                </div>
                <div class="desc">
                  <p>{{ news.summary }}</p>
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
import { wineApi } from '~/api/wine'
import { selectApi } from '~/api/selection'
import { newApi } from '~/api/news'
import { knowApi } from '~/api/knowledge'
import { munityApi } from '~/api/community'
import { poetApi } from '~/api/poets'
import tools from '~/utils/tools'
import bannerImg from '~/assets/img/home/img_home_335x180@2x.png'

export default {
  name: 'home',
  layout: 'page-with-tabbar',
  async asyncData (req) {
    // 分页查询列表，第1页，前5条数据
    const params = { page: 1, count: 5 }
    const wineFn = wineApi.serverGoodwineList(0, req)
    const poetFn = poetApi.serverSignlist(params, req)
    const selectFn = selectApi.serverRecomlist(req)
    const newsFn = newApi.serverPage(params, req)
    const knowFn = knowApi.homePage(params, req)
    const munityFn = munityApi.serverActiveList(params, req)
    // 并发异步
    const { code: wineCode, data: wineData } = await wineFn
    const { code: poetCode, data: poetData } = await poetFn
    const { code: selectCode, data: selectData } = await selectFn
    const { code: newsCode, data: newsData } = await newsFn
    const { code: knowCode, data: knowData } = await knowFn
    const { code: munityCode, data: munityData } = await munityFn
    // 防止一个某一数据请求失败，所以给预估返回列表一个空数组
    let _winebk = ''
    let _sence = ''
    let _wines = []
    let _poets = []
    let _selects = []
    let _news = []
    let _knows = []
    let _munitys = []
    if (wineCode === 200) {
      const { cover, scenesName, goodsList } = wineData
      _wines = goodsList
      _winebk = cover
      _sence = scenesName
    }
    if (poetCode === 200) {
      _poets = poetData.array
      console.log('_poets', _poets)
    }
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
      wineBk: _winebk,
      wineSence: _sence,
      wineList: _wines,
      poetList: _poets,
      selectList: _selects,
      newsList: _news,
      knowList: _knows,
      munityList: _munitys
    }
  },
  data () {
    return {
      bannerImg: bannerImg,
      wineBk: '', // 美酒推荐背景图
      wineSence: '', // 美酒推荐场景
      wineList: [], // 美酒
      poetList: [], // 酒坛诗社
      selectList: [], // 甄选
      newsList: [], // 新闻热点
      knowList: [], // 知识分享
      munityList: [], // 社区活动
      circlenavList: ['这些圈子都在看', '行业热点', '培训讲座', '企业招商'],
      notyfySwiper: {
        speed: 800,
        direction: 'vertical',
        loop: true,
        autoplay: true
      },
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
  async mounted () {
    // 美酒推荐，每5秒切换为下一个场景
    const { code: scenCode, data: scenData } = await wineApi.clicentScener()
    if (scenCode === 200) {
      const promises = scenData.map(v => wineApi.clientGoodwineList(v.id))
      const proResult = await Promise.all(promises)
      console.log(proResult)
      let nowIndex = 0
      let len = proResult.length
      let isChange = true
      setInterval(() => {
        if (isChange) {
          nowIndex = nowIndex < (len - 1) ? nowIndex += 1 : 0
          const { cover, scenesName, goodsList } = proResult[nowIndex].data
          this.wineBk = cover
          this.wineSence = scenesName
          this.wineList = goodsList
        }
      }, 5000)
      // 换一批
      const chEl = document.querySelector('#changeNew')
      let _this = this
      chEl.onclick = function () {
        console.time('chEl')
        isChange = false
        nowIndex = nowIndex < (len - 1) ? nowIndex += 1 : 0
        const { cover, scenesName, goodsList } = proResult[nowIndex].data
        _this.wineBk = cover
        _this.wineSence = scenesName
        _this.wineList = goodsList
        isChange = true
        console.timeEnd('chEl')
      }
    }
  },
  methods: {
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
          window.location.href = '/account/login'
        }).catch(() => {})
      }
    },
    toSearch () {
      window.location.href = '/search'
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
  .bg {
    .bg_cover;
  }
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
  .tab {
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
    &-sjzq {background-image: url('../assets/img/home/ic_shangjiazhuangqu_35x35@2x.png')}
  }   
}

.notify_home {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 60px;
  background: #fef5e5;
  border-radius: 30px;
  .home_in {
    position: relative;
    height: 60px;
  }
  i {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: 10px;
    .bg_cover;
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
    .home_bk {
      margin-right: 20px;
      .bg {
        height: 160px;
        border-radius: 10px;
        margin-bottom: 20px;
        .bg_cover;
        &_world {
          float: left;
          margin-left: 20px;
          margin-top: 109px;
          font-size:16px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:16px;
        }
      }
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
          &:before {
            content: '';
            width: 1PX;
            height: 12px;
            background: pink;
            position: absolute;
            top: 50%;
            left: -1PX;
            margin-top: -6px;
            background: rgba(153,153,153,1);
          }
        }
      }
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
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    .content_title {
      font-size: 16px;
      color: #333;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      height: 44px;
      display: flex;
      align-items: center;
      p {
        line-height: 22px;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .tips{
      color: #999;
      font-size: 12px;
      margin: 10px 0 15px;
      span:first-child {
        padding-right: 20px;

      }
    }
    .content_summary {
      text-align: justify;
      font-size: 14px;
      color: #999;
      line-height: 24px;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }
    .pro {
      margin: 10px 0 20px;
    }
    .content_bk {
      height: 150px;
      border-radius: 10px;
      .bg_cover;
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
      .bg {
        .bg_cover;
      }
      .munity_bk {
        .theme {
          float: left;
          margin-left: 10px;
          font-size: 13px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 16px;
          padding: 3px 5px;
          background: rgba(0, 0, 0, .4);
          position: relative;

          &:before {
            position: absolute;
            left: 0;
            bottom: -6px;
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 6px 20px;
            border-color: transparent transparent transparent rgba(0, 0, 0, .4);
          }

          &:after {
            position: absolute;
            right: 0;
            bottom: -6px;
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 20px 6px 0;
            border-color: transparent rgba(0, 0, 0, .4) transparent transparent;
          }
        }

        .status {
          float: right;
          margin-top: 10px;
          margin-right: 10px;
          font-size: 14px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 14px;
          padding: 7px 10px;
          border-radius: 4px;
        }

        .sign {
          background: #FF3333;
        }

        .carry {
          background: #F99C00;
        }

        .ends {
          background: #999999;
        }
      }
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
      // height: 408px;
    }
    .box_title {
      display: flex;
      align-items: center;
      height: 44px;
      & > p {
        line-height: 22px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        font-family: 'PingFangSC-Semibold';
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .tips {
      margin: 6px 0 16px;
      span {
        display: inline-block;
        font-size: 12px;
        color: #999;
        max-width: 100%;
        padding-right: 20px;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 15px;
        &:last-child {
          padding-right: 0;
        }
      }
    }
    .pro {
      height: 150px;
      border-radius: 6px;
      overflow: hidden;
      .bg {
        .bg_cover;
      }
    }
    .desc {
      margin-top: 10px;
      height: 120px;
      & > p {
        line-height: 24px;
        color: #999;
        font-size: 14px;
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
