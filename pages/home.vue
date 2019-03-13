<template>
  <div class="m-home">
    <header>
      <h1 class="ib-middle">首页</h1>
      <div class="u-search ib-middle" @click='toSearch'>
        <input type="text" placeholder="输入搜索的内容" disabled>
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
              <div class="ib-middle notify_home-word">
                <p class="ib-middle">{{poet.content}}</p>
              </div>
              <div class="ib-middle notify_home-empty" @click="poetZan(poet)"></div>
            </div>
          </div>
          <div class="notify_home-icon ib-middle bg"></div>
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
            <div class="bg ani_show_opacty2" :style="{ backgroundImage: 'url(' + wineBk + ')' }" :key='+new Date().getMilliseconds()'>
              <div class="bg_world">{{ wineSence }}</div>
            </div>
            <!-- <div class="bg" v-lazy:background-image="wineBk"></div> -->
          </div>
          <div v-swiper:mySwiper4="swiperCommend">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide commend-list ani_show_opacty"
                v-for="(wine, index) in wineList"
                @click="goWinedet(wine.id)"
                :key="+new Date().getMilliseconds() + index">
                <div class="pro">
                  <!-- <img v-lazy="wine.cover" /> -->
                  <img :src="wine.cover" />
                </div>
                <div class="desc">
                  <h3 class="font_hight">{{ wine.goodsName }}</h3>
                  <p class="tags">
                    <span
                      class="subtag"
                      v-for="(mytag, tagIndex) in wine.tagList"
                      :key="tagIndex">
                      {{ tagIndex === wine.tagList.length - 1 ? mytag : mytag + ' | ' }}
                    </span>
                  </p>
                  <em class="font_impact">¥{{ wine.actualPrice }}</em>
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
            <a class="to-channel" href="/selection?sortedBy=1">
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
              @click="goselect(pick.id)"
              :key="index">
              <div class="hot-list-box" v-if="pick.goodsMinimalResp" :class="{'w100': selectList.length === 1}">
                <div class="desc">
                  <h3>{{ pick.goodsMinimalResp.goodsName }}</h3>
                  <div class="author">作者：{{ pick.auth }}</div>
                  <!-- <div class="tags">
                    <i class="tagsub" v-for="(tags, tagIndex) in pick.goodsMinimalResp.tagList" :key="tagIndex">
                      <template v-if='tagIndex === pick.goodsMinimalResp.tagList.length - 1'>
                        {{ tags }}
                      </template>
                      <template v-else>
                        {{ tags + ' | ' }}
                      </template>
                    </i>
                  </div> -->
                  <!-- <div class="itemr-info">
                    <span class="info_item icon_time">{{pick.goodsMinimalResp.year}}</span>
                    <span class="info_item icon_address" v-if="pick.goodsMinimalResp.area">{{pick.goodsMinimalResp.country}} / {{pick.goodsMinimalResp.area}}</span>
                    <span class="info_item icon_address" v-else>{{pick.goodsMinimalResp.country}}</span>
                    <span class="info_item icon_variety">{{pick.goodsMinimalResp.variety}}</span>
                  </div> -->
                  <!-- <div class="u-bars">
                    <div class="bars">
                      <div class="bars-left">复杂：{{pick.goodsMinimalResp.complexity}}分</div>
                      <div class="bars-right">
                        <span class="bars-right_top" ref="ubars" :data-bar="pick.goodsMinimalResp.complexity"></span>
                      </div>
                    </div>
                  </div> -->
                </div>
                <div class="bottom">
                  <div class="summary">{{ pick.summary }}</div>
                  <div class="pro" v-lazy:background-image="pick.goodsMinimalResp.cover">
                    <div class="goods-info">
                      <div class="ib-middle goods-info-img" v-lazy:background-image="pick.goodsMinimalResp.cover"></div>
                      <div class="ib-middle goods-info-detail">
                        <p class="u-ellipsis">{{ pick.goodsMinimalResp.goodsName }}</p>
                        <em class="ib-middle">¥{{ pick.goodsMinimalResp.actualPrice }}</em>
                        <del class="ib-middle">市场价：¥{{ pick.goodsMinimalResp.marketPrice }}</del>
                      </div>
                    </div>
                  </div>
                  <div class="u-other">
                    <span class="zan"><i></i>{{ pick.likeNum }}</span>
                    <span class="chat"><i></i>{{ pick.commentNum }}</span>
                    <span class="watch"><i></i>{{ pick.browseNum }}</span>
                  </div>
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
            <a class="to-channel" href="/knowledge">
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
              <div class="share-list-box" :class="{'w100': knowList.length === 1}">
                <div class="share_home-user" v-if="share.userResp" @click="gomine(share.userResp.id)">
                  <u class="ib-middle" :style="'background-image: url('+ share.userResp.headimgurl +')'"></u>
                  <div class="ib-middle">
                    <span class="font_hight">
                      {{ share.userResp.nickname }}
                    </span>
                  </div>
                  <user-lab :level='String(share.userResp.userGradeNumber)' type='1' :profess='String(share.userResp.category)'></user-lab>
                </div>
                <div class="share_home-content" @click="goknowdetail(share)">
                  <!-- 文章 -->
                  <div class="pro" v-if="share.articleType === 1">
                    <div v-if='share.imgsPaht' class="content_bk swiper-lazy" :data-background="share.imgsPaht[0].indexOf('imageslim') !== -1 ? share.imgsPaht[0].split('?')[0] + '?imageView2/5/w/480/h/480' : share.imgsPaht[0] + '?imageView2/5/w/480/h/480'"></div>
                    <div v-else class="content_bk" :style="'background-image: url('+ defaultshare +')'"></div>
                  </div>
                  <!-- 视频 -->
                  <div class="video-box" v-if="share.articleType === 2">
                    <video ref="refvideo" class="video-player" controls>
                      <source :src="share.videoPath" type="video/mp4">
                    </video>
                  </div>
                  <h3 class="content_title u-ellipsis">
                    <p>{{ share.title }}</p>
                  </h3>
                  <div class="tips">
                    <span>频道：{{ share.channelName }}</span>
                    <span>话题：{{ share.topicName }}</span>
                  </div>
                  <time>{{ share.createdAt }}</time>
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
            @click="toDetail(munity.id)"
            :key="index">
            <div class="pro">
              <div class="full bg munity_bk" v-lazy:background-image="munity.cover">
                <span class="theme" v-if="munity.themeType === 1">官方<br>活动</span>
                <span class="theme" v-if="munity.themeType === 2">合作<br>活动</span>
                <span class="theme" v-if="munity.themeType === 3">酒会<br>酒展</span>

                <span class="status sign" v-if="munity.status === 1">报名中</span>
                <span class="status sign" v-if="munity.status === 2">报名已结束</span>
                <span class="status carry" v-if="munity.status === 3">进行中</span>
                <span class="status ends" v-if="munity.status === 4">已结束</span>
              </div>
            </div>
            <div class="desc">
              <h3>第{{ munity.period }}期 | {{ munity.theme }} <span>{{ munity.title }}</span></h3>
              <p>活动时间：{{ munity._times }}</p>
              <p class="text-limit">活动地点：{{ munity._dz }}</p>
            </div>
          </li>
        </ul>
      </section>

      <section class="news_home">
        <div class="margin-20">
          <div class="title_home">
            <h2>
              行业热点
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
              @click="gohostpot(news)"
              :key="index">
              <div class="news-list-box" :class="{'w100': newsList.length === 1}">
                <h3 class="box_title">
                  <p>{{ news.title }}</p>
                </h3>
                <div class="tips">
                  <span>作者：{{ news.author || '佚名' }}</span>
                  <span v-if='news.sourceAddress || news.sourceAuthor'>来源：
                    <a v-if='news.sourceAddress && news.sourceAuthor' :href="news.sourceAddress">{{ news.sourceAuthor }}</a>
                    <a v-if='news.sourceAddress && !news.sourceAuthor' :href="news.sourceAddress">链接</a>
                    <a v-if='!news.sourceAddress && news.sourceAuthor' href="javascript:void(0)">{{ news.sourceAuthor }}</a>
                  </span>
                  <span>分类：{{ circlenavList[news.classificationId] }}</span>
                </div>
                <div class="pro">
                  <div class="bg full swiper-lazy" v-if="news.imgPath" :data-background="news.imgPath + '?imageView2/5/w/480/h/480'"></div>
                </div>
                <div class="desc">
                  <p v-html='news.summary'></p>
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
import userLab from '@/components/Usericon.vue'
import tools from '~/utils/tools'
import bannerImg from '~/assets/img/home/img_home_335x180@2x.png'
import wechatLogin from '~/utils/wechatLogin'

export default {
  name: 'home',
  layout: 'page-with-tabbar',
  components: { userLab },
  middleware: 'checkWxStatus',
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
      if (Array.isArray(array)) {
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
    }
    return {
      env: req.env,
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
      env: null,
      bannerImg: bannerImg,
      defaultshare: this.defaultshare,
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
        slidesPerView: 'auto',
        lazy: {
          loadPrevNext: true
        }
      },
      swiperNews: {
        speed: 800,
        slidesPerView: 'auto',
        lazy: {
          loadPrevNext: true
        }
      },
      Switch: true
    }
  },
  created () {
    console.log(this.defaultshare)
    console.log('selectList', this.selectList)
    this.$nextTick(() => {
      let bars = this.$refs.ubars
      if (Array.isArray(bars)) {
        bars.map(v => {
          v.style.width = v.getAttribute('data-bar') + '%'
        })
      }
    })
  },
  async mounted () {
    // 美酒推荐，每5秒切换为下一个场景
    const { code: scenCode, data: scenData } = await wineApi.clicentScener()
    if (scenCode === 200) {
      if (Array.isArray(scenData)) {
        const promises = scenData.map(v => wineApi.clientGoodwineList(v.id))
        const proResult = await Promise.all(promises)
        console.log(proResult)
        let nowIndex = 0
        let len = proResult.length
        let isChange = false
        if (isChange) {
          nowIndex = nowIndex < (len - 1) ? nowIndex += 1 : 0
          const { cover, scenesName, goodsList } = proResult[nowIndex].data
          this.wineBk = cover
          this.wineSence = scenesName
          this.wineList = goodsList
        }
        // 换一批
        const chEl = document.querySelector('#changeNew')
        let _this = this
        chEl.onclick = function () {
          _this.wineList = []
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
    }
    const headerEle = document.querySelector('header')
    window.addEventListener('scroll', this.handleScroll(() => {
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      if (scrollTop > 80) {
        if (this.Switch) {
          headerEle.classList.add('change')
          console.log('往下滚')
        }
        this.Switch = false
      } else {
        this.Switch = true
        headerEle.classList.remove('change')
        console.log('到顶部了')
      }
    }))
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
            window.location.href = '/prove'
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
          if (this.env === 1) {
            setTimeout(() => { wechatLogin.wxLoginWithNoCheck(window.location.href) }, 500)
          } else {
            setTimeout(() => {
              window.location.href = '/account/login'
            }, 1000)
          }
        }).catch(() => {})
      }
    },
    async poetZan (poet) {
      console.log(1)
      // console.log('poet', poet)
      const { code, data } = await poetApi.zanPoet(poet.id)
      if (code === 200) {
        this.$toast.success('点赞成功')
      } else {
        this.$toast(data)
      }
    },
    formatHtml (str) {
      str = str.replace(/&nbsp;/g, '')
      str = str.replace('。', '')
      return str
    },
    toSearch () {
      window.location.href = '/search'
    },
    goWinedet (id) {
      window.location.href = '/detail/' + id
    },
    goselect (id) {
      window.location.href = '/selection/detail/' + id
    },
    gomine (id) {
      window.location.href = '/user?uid=' + id
    },
    goknowdetail (val) {
      window.location.href = `/knowledge/detail/${val.id}?type=${val.articleType}`
    },
    toDetail (id) {
      window.location.href = './community/detail/' + id + '?page=1'
    },
    gohostpot (val) {
      let detailId = val.id
      window.location.href = `/hotspot/detail/${detailId}`
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 150)
      }
    }
  }
}
</script>
<style lang="less">
.m-home {
  display: block;
  padding-bottom: 50px;
  font-size: 0;
  header {
    // padding: 0 20px 20px;
    // margin: 20px 0 24px;
    // border-bottom: 1PX solid #f5f5f5;
    padding: 20px;
    border-bottom: 1PX solid #f5f5f5;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    background: #fff;
    top: -2PX;
    z-index: 100;
    text-align: right;
    transition: ease .5s;
    transform: translateZ(0);
    &.change {
      padding: 10px 20px 5px;
      box-shadow: 0px 1PX 8PX -3PX #9c9c9c;
      .u-search {
        width: 36px;
        margin-left: 110px;
        background: #fff;
        input {
          background: #fff;
        }
      }
      h1 {
        font-size: 18px;
      }
    }
    h1 {
      font-size: 26px;
      color: #333;
      transition: ease .5s;
      transform: translateZ(0);
    }
    .u-search {
      width: 243px;
      height: 35px;
      margin-left: 30px;
      border-right: 6px;
      position: relative;
      transition: ease .5s;
      transform: translateZ(0);
      input {
        width: 100%;
        height: 100%;
        color: #CCD8E6;
        background: #fafafa;
        font-size: 14px;
        padding-left: 36px;
        box-sizing: border-box;
        transition: ease .5s;
      }
      i {
        top: 50%;
        transform: translateY(-50%);
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
  overflow: hidden;
  border-radius: 6px;
  .bg {
    height: 180px;
    margin-top: 95px;
    margin-bottom: 17px;
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
  overflow: hidden;
  border-radius: 30px;
  .home_in {
    position: relative;
    height: 60px;
    background: #fef5e5;
    border-radius: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  i {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: 10px;
    .bg_cover;
  }
  &-word {
    width: calc(100% - 120px);
    margin: 0 10px;
    &>p {
      font-size: 12px;
      color: #333;
      line-height: 20px;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  &-icon {
    width: 60px;
    height: 60px;
    background-image: url('../assets/img/home/ic_like_60x60@2x.png');
    position: absolute;
    right: 0;
    top: 0;
  }
  &-empty {
    width: 60px;
    height: 60px;
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
    width: 140px;
    height: 235px;
    text-align: center;
    margin-right: 15px;
    &:last-child {
      margin-right: 20px;
    }
    .pro {
      border-radius: 8px;
      box-sizing: border-box;
      padding: 12px 13px;
      height: 140px;
      border: 1PX solid #eaeaea;
      img {
        max-width: 100%;
        max-height: 100%;
        height: auto;
      }
    }
    .desc {
      text-align: left;
      h3 {
        font-size: 13px;
        height: 35px;
        color: #333;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 10px 0 0;
      }
      p {
        margin: 10px 0;
        color: #999;
        font-size: 10px;
        line-height: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      em {
        color: @c-price;
        font-size: 15px;
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
    margin-left: 15px;
    &:last-child {
      width: 340px;
    }
    &-box {
      border-radius: 8px;
      border: 1PX solid #eaeaea;
      box-sizing: border-box;
      width: 320px;
      // height: 370px;
      // overflow: hidden;
    }
    .bottom {
      padding: 10px 15px;
    }
    .pro {
      margin: 10px 0 15px;
      height: 180px;
      border-radius: 4px;
      text-align: center;
      position: relative;
      .bg_cover;
    }
    .desc {
      font-size: 12px;
      border-bottom: 1PX solid #f5f5f5; 
      padding: 15px;
      &>h3 {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        color:rgba(51,51,51,1);
        line-height: 21px;
        display: flex;
        align-items: center;
        overflow: hidden;
        height: 42px;
      }
      &>p {
        padding: 10px 0;
        font-size:12px;
        color:rgba(153,153,153,1);
        line-height:12px;
      }
      .author {
        font-size: 12px;
        color: #333;
        padding: 10px 0 0px;
      }
      // .tags {
      //   font-size: 12px;
      //   font-weight: 300;
      //   color: rgba(153, 153, 153, 1);
      //   margin: 10px 0 5px;

      //   .tagsub {
      //     margin-top: 10px;

      //     &+.tagsub {
      //       margin-left: 5px;
      //       padding-left: 5px;
      //       position: relative;

      //       &:before {}
      //     }
      //   }
      // }

      // .u-bars {
      //   margin-bottom: 0;
      // }

      // .info_item {
      //   display: inline-block;
      //   height:24px;
      //   line-height: 24px;
      //   background:#DEF3F9;
      //   border-radius:12px;
      //   padding-left: 25px;
      //   padding-right: 5px;
      //   vertical-align: middle;
      //   margin-top: 10px;
      //   position: relative;
      //   font-size:12px;
      //   font-weight: 600;
      //   color: #03A1CD;
      //   margin-right: 7px;
      //   &:before {
      //     content: '';
      //     width: 24px;
      //     height: 24px;
      //     position: absolute;
      //     top: 50%;
      //     left: 0;
      //     margin-top: -12px;
      //     .bg_cover;
      //   }
      // }
      // .icon_time {
      //   &:before {
      //     background-image: url('../assets/img/Icons/ic_time_24x24.png');
      //   }
      // }
      // .icon_address {
      //   &:before {
      //     background-image: url('../assets/img/Icons/ic_position_24x24.png');
      //   }
      // }
      // .icon_variety {
      //   &:before {
      //     background-image: url('../assets/img/Icons/ic_grape_24x24.png');
      //   }
      // }
    }
    .summary {
      color: #666;
      height: 68px;
      font-size: 13px;
      line-height: 23px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .goods-info {
      position: absolute;
      width: 270px;
      bottom: 10px;
      left: 13px;
      padding: 5px 10px;
      background: #f9f9f9;
      &-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        .bg_cover;
        background-color: #fff;
      }
      &-detail {
        width: calc(100% - 60px);
        text-align: left;
      }
      p {
        color: #333;
        font-size: 11px;
        margin-bottom: 8px;
        font-weight: bold;
        line-height: 1.2;
      }
      em {
        color: @c-price;
        font-size: 15px;
      }
      del {
        font-size: 11px;
        color: #666;
        margin-left: 8px;
      }
    }
    // .infor {
    //   margin-top: 12px;
    //   border-top: 1PX solid #eaeaea;
    //   background: #FBFBFB;
    //   padding: 15px 20px;
    //   h3 {
    //     color: #333;
    //     font-size: 16px;
    //     margin-bottom: 10px;
    //   }
    //   p {
    //     color: #999;
    //     font-size: 14px;
    //     line-height: 24px;
    //     text-align: justify;
    //     overflow: hidden;
    //     -o-text-overflow: ellipsis;
    //     text-overflow: ellipsis;
    //     display: -webkit-box;
    //     -webkit-line-clamp: 5;
    //     -webkit-box-orient: vertical;
    //   } 
    // }
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
      box-sizing: border-box;
      width: 320px;
      height: 365px;
    }
    .video-box {
      position: relative;
      .video-player {
        width: 100%;
        height: 200px;
        background: #000;
        border-radius: 0px 0px 4px 4px;
      }
    }
  }
  &-user {
    border: 1PX solid #eaeaea;
    border-radius: 4px 4px 0px 0px;
    border-bottom: 1PX solid #f5f5f5;
    padding: 10px;
    u {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      .bg_cover;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      font-size: 13px;
      color: #666;
      max-width: 120px;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: normal;
    }
    .u-icon-type1 {
      float: right;
    }
  }
  &-content {
    .content_title {
      font-size: 15px;
      color: #333;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      text-align: left;
      
      margin: 15px 0 13px;
      p {
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: justify;
      }
    }
    .tips{
      color: #666;
      font-size: 11px;
      margin: 0px 0 10px;
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
    .content_bk {
      height: 200px;
      border-radius: 0px 0px 4px 4px;
      .bg_cover;
    }
    time {
      display: inline-block;
      margin-bottom: 10px;
      color: #999;
      font-size: 11px;
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
          padding: 3PX 5PX;
          background: rgba(0, 0, 0, .4);
          position: relative;

          &:before {
            position: absolute;
            left: 0;
            bottom: -6PX;
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 6PX 20PX;
            border-color: transparent transparent transparent rgba(0, 0, 0, .4);
          }

          &:after {
            position: absolute;
            right: 0;
            bottom: -6PX;
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 20PX 6PX 0;
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
        font-weight: lighter;
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
      font-size: 0;
      // height: 408px;
    }
    .box_title {
      display: flex;
      align-items: center;
      max-height: 44px;
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
        max-width: 110px;
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
    font-size: 20px;
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
      font-size: 11px;
      font-weight: bold;
      position: relative;
      top: 1PX;
    }
  }
}

.ani_show_opacty {
  animation: show_opacty ease 1s 1 both;
}

.ani_show_opacty2 {
  animation: show_opacty2 ease 1s 1 both;
}

@keyframes show_opacty {
  0%{
    opacity: 0;
    transform: translateX(20px)
  }
  100%{
    opacity: 1;
    transform: translateX(0px)
  }
}

@keyframes show_opacty2 {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

</style>