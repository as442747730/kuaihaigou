<template>
  <div class="m-page-user">
    <tab :uid='uid' :index='1'></tab>
    <div class="model-item">
      <a :href="'/user/collect?uid=' + uid">商品</a>
      <a class="cur" :href="'/user/collectArticle?uid=' + uid">文章</a>
      <a href="javascript:void(0)" @click='selectShow = true'>{{ orderTxt }}</a>
    </div>

    <div class="u-collect-articel">
      <div class="u-collect-articel-list hot-list" v-for='($v, $k) in collectData' :key='$k'>
        <!-- 知识分享 -->
        <a class="share-item" v-if='$v.collectType === 1' :href="'/knowledge/detail/' + $v.id + '?type=' + $v.articleType">
          <div class="user-wrap">
            <div class="avatar" :style="`background-image: url(${$v.userResp.headimgurl || require('~/assets/img/defaultImg.png')})`"></div>
            <div class="user">
              <p class="user-nickname">{{ $v.userResp.nickname }}</p>
              <div class="tips">
                <span class="tips_one">频道：{{ $v.channelName }}</span>
                <span>话题：{{ $v.topicName }}</span>
              </div>
              <div class="time">{{ $v.createdAt }}</div>
            </div>
          </div>
          <div class="content-wrap">
            <h3 class="article-title">{{ $v.title }}</h3>
            <div class="article-cover">
              <img v-if="$v.articleType === 1 && $v.imgsPaht && $v.imgsPaht.length !== 0" :src="$v.imgsPaht[0]" class="cover-img" alt="">
              <img v-if="$v.articleType === 1 && (!$v.imgsPaht || $v.imgsPaht.length === 0)" class="cover-img" :src="require('~/assets/img/shareDefault.png')" alt="">
              <video v-if="$v.articleType === 2" class="cover-img" ref="refvideo" controls :src="$v.videoPath">
                <source :src="$v.videoPath" type="video/mp4">
              </video>
            </div>
            <div class="ctrls">
              <div class="ctrl">
                <img class="ib-middle" src="~/assets/img/Icons/ic_dianzan_g_18x18@2x.png" />
                <span class="ib-middle">{{ $v.likeNumber }}</span>
              </div>
              <div class="ctrl">
                <img class="ib-middle" src="~/assets/img/Icons/ic_pinglun_g_18x18@2x.png" />
                <span class="ib-middle">{{ $v.commentNumber }}</span>
              </div>
              <div class="ctrl">
                <img class="ib-middle" src="~/assets/img/Icons/ic_liulang_g_18x18@2x.png" />
                <span class="ib-middle">{{ $v.readNumber }}</span>
              </div>
            </div>
          </div>
        </a>
        <!-- 新闻资讯 -->
        <div class="list-box" v-if="$v.collectType === 2">
          <div class="list">
            <div class="content">
              <div class="content-head">
                <p><a :href="'/hotspot/detail/' + $v.id">{{ $v.title }}</a></p>
              </div>
              <div class="content-other">
                <span>作者：{{$v.author || '佚名'}}</span>
                <!-- <span v-if="$v.sourceAddress">来源：{{$v.sourceAddress}}</span> -->
                <span v-if='$v.sourceAddress || $v.sourceAuthor'>来源：
                  <a v-if='$v.sourceAddress && $v.sourceAuthor' :href="$v.sourceAddress">{{ $v.sourceAuthor }}</a>
                  <a v-if='$v.sourceAddress && !$v.sourceAuthor' :href="$v.sourceAddress">链接</a>
                  <a v-if='!$v.sourceAddress && $v.sourceAuthor' href="javascript:void(0)">{{ $v.sourceAuthor }}</a>
                </span>
                <span v-if="$v.classificationId >= 0">分类：{{circlenavList[$v.classificationId]}}</span>
              </div>
              <div class="content-time">{{$v.createdAt}}</div>
              <!-- <div class="content-labels">
                <span
                  class="label"
                  v-for="(lab, labIndex) in $v.labels"
                  @click.stop="tolabel(lab)"
                  :key="labIndex">
                    <a :href="'/hotspot/label/' + lab.id">{{ lab.labelName }}</a>
                  </span>
              </div> -->
              <div class="imgs">
                <a :href="'/hotspot/detail/' + $v.id">
                  <div class="imgone" v-lazy:background-image="$v.imgPath + '?imageslim'"></div>
                </a>
              </div>
              <div class="article news-content">
                <a :href="'/hotspot/detail/' + $v.id">{{ $v.summary }}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- 甄选内容 -->
        <div class="picklist" v-if="$v.collectType === 3">
          <a :href="'/selection/detail/' + $v.id">
            <div class="hot-list-box" v-if="$v.goodsMinimalResp" >
              <div class="desc">
                <h3>{{ $v.goodsMinimalResp.goodsName }}</h3>
                <div class="author">作者：{{ $v.auth }}</div>
              </div>
              <div class="bottom">
                <div class="summary">{{ $v.summary }}</div>
                <div class="pro" v-lazy:background-image="$v.img">
                  <div class="goods-info">
                    <div class="box">
                      <div class="ib-middle goods-info-img" v-lazy:background-image="$v.goodsMinimalResp.cover"></div>
                      <div class="ib-middle goods-info-detail">
                        <p class="u-ellipsis">{{ $v.goodsMinimalResp.goodsName }}</p>
                        <em class="ib-middle">¥{{ $v.goodsMinimalResp.actualPrice }}</em>
                        <del class="ib-middle">市场价：¥{{ $v.goodsMinimalResp.marketPrice }}</del>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="u-other">
                  <span class="zan"><i></i>{{ $v.likeNumber }}</span>
                  <span class="chat"><i></i>{{ $v.commentNumber }}</span>
                  <span class="watch"><i></i>{{ $v.readNumber }}</span>
                </div>
              </div>
            </div>
            <!-- <div class="infos" v-if="$v.goodsMinimalResp">
              <div class="infos-l" v-lazy:background-image="$v.goodsMinimalResp.cover"></div>
              <div class="infos-r">
                <div class="head">{{$v.goodsMinimalResp.goodsName}}</div>
                <p class="tags">
                  <span class="tagsub" v-for="(tags, tagIndex) in $v.goodsMinimalResp.tagList" :key="tagIndex">{{tags}}</span>
                </p>
                <div class="lables">
                  <span class="label ic_year">{{$v.goodsMinimalResp.year}}</span>
                  <span class="label ic_address" v-if="$v.goodsMinimalResp.area">{{$v.goodsMinimalResp.country}} / {{$v.goodsMinimalResp.area}}</span>
                  <span class="label ic_address" v-else>{{$v.goodsMinimalResp.country}}</span>
                  <span class="label ic_variety">{{$v.goodsMinimalResp.variety}}</span>
                </div>
                <div class="probars">
                  <div class="word">复杂：{{$v.goodsMinimalResp.complexity}}分</div>
                  <div class="probar">
                    <div class="probar_cors"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="articles">
              <h3 class="title">{{ $v.title }}</h3>
              <p class="content">{{ $v.summary }}</p>
            </div> -->
          </a>
        </div>
        <!-- 名词解释 -->
        <div class="varity" v-if="$v.collectType >= 4">
          <a :href="'/noun/detail/' + $v.attrid + '?num=' + ($v.collectType - 4)">
            <h3 class="varity-head">{{ $v.title }}</h3>
            <div class="varity-bk">
              <div class="varity-bk_in" v-lazy:background-image="$v.bgimg"></div>
            </div>
            <div class="varity-article">{{ $v.summary | fillArticle }}</div>
            <div class="varity-foot" style="border-top: 1px solid #EAEAEA;">
              <i class="icon_same ic_good"></i>
              <span class="num_same">{{ $v.likeNumber }}</span>
              <i class="icon_same ic_collect marl"></i>
              <span class="num_same">{{ $v.commentNumber }}</span>
              <i class="icon_same ic_look marl"></i>
              <span class="num_same">{{ $v.readNumber }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class='more-loading' v-show='pageLoding'>
      <van-loading type="spinner" />
      <p>正在加载更多</p>
    </div>

    <div class="no-more" v-show='pageEmpty'>
      <p>没有更多内容了！</p>
    </div>

    <!-- 类别选择框 -->
    <van-popup v-model="selectShow" position="bottom">
      <van-picker ref="reasonPicker" :columns="orderList" show-toolbar @cancel="handleCancel" @confirm="handleSelect" />
    </van-popup>

  </div>
</template>

<script>
import { personApi } from '@/api/users'
import Tab from '@/components/user/Tab.vue'
import userLab from '@/components/Usericon.vue'
import ShareItem from '@/components/ShareItem'

export default {
  name: '',

  layout: 'page-with-user',

  components: { Tab, userLab, ShareItem },

  head () {
    return {
      title: '个人主页_文章收藏',
      meta: [
        { hid: 'title', name: 'title', content: '个人主页_文章收藏' }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await personApi.serverArticel({ page: 1, count: 5, type: null, userId: req.query.uid })
    if (code === 200) {
      console.log(data.array)
      data.array.forEach(item => {
        if (item.personalInfoResp) {
          item.userResp = item.personalInfoResp
        }
      })
      let pageEmpty = false
      pageEmpty = data.total <= 5
      return {
        uid: req.query.uid || null,
        collectData: data.array || {},
        pageEmpty: pageEmpty
      }
    }
  },

  data () {
    return {
      uid: null, // 用户id
      collectData: [],

      pageEmpty: false,
      page: 1, // 当前页
      pageLoding: false, // 加载ing

      selectShow: false, // 类型选择
      orderList: [
        { sort: null, text: '全部' },
        { sort: 1, text: '分享' },
        { sort: 2, text: '热点' },
        { sort: 3, text: '甄选' },
        { sort: 4, text: '名词' }
      ],
      orderTxt: '全部',
      channelName: ['经验/知识', '美食/周边'],
      circlenavList: ['这些圈子都在看', '行业热点', '培训讲座', '企业招商'],
      type: null // 文章类型
    }
  },

  mounted () {
    console.log(this.collectData)
    window.addEventListener('scroll', this.handleScroll(() => {
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.windowHeight >= this.scrollHeight - 200 && !this.pageLoding && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    }))
  },

  methods: {
    async getData (page, needClear = false) {
      this.pageLoding = true
      const { code, data } = await personApi.collect({ page: page, count: 5, type: this.type, userId: this.uid })
      if (code === 200) {
        data.array.forEach(item => {
          if (item.personalInfoResp) {
            item.userResp = item.personalInfoResp
          }
        })
        if (needClear) {
          // data.array.forEach(v => {
          //   if (v.collectType === 3) {
          //     v.goodsMinimalResp.cover = v.goodsMinimalResp.cover + '?' + new Date().getTime()
          //   } else if (v.collectType >= 4) {
          //     v.bgimg = v.bgimg + '?' + new Date().getTime() + '&imageView2/5/w/600/h/330'
          //   }
          // })
          this.collectData = []
          this.collectData = data.array
          // setTimeout(() => {
          // }, 1000)
        } else {
          this.collectData.push(...data.array)
        }
        this.pageEmpty = this.page * 5 >= data.total
      } else {
        this.pageEmpty = false
      }
      this.pageLoding = false
    },
    handleCancel () {
      this.selectShow = false
    },
    handleSelect (val) {
      this.orderTxt = val.text
      this.type = val.sort
      this.selectShow = false
      this.pageEmpty = false
      this.page = 1
      this.getData(1, true)
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
    },
    setImgUrl (url) {
      return url.indexOf('imageslim') !== -1 ? url.split('?')[0] + '?imageView2/5/w/480/h/480' : url + '?imageView2/5/w/480/h/480'
    },
    formatHtml (str) {
      str = str.replace(/&nbsp;/g, '')
      str = str.replace('。', '')
      return str
    }
  },
  filters: {
    fillArticle (str) {
      str = str.toString()
      /* eslint-disable */
      return str.replace(/<strong>.*?<\/strong>/g, '').replace(/<h\d.*?>.*<\/h\d>/g, '').replace(/<img .*?\/>/g, '').replace(/[<.*?>|<\/.*?\>|&nbsp;]/g, '').replace(/[\n|\s|\r|\\s|↵]/g, '').substr(0, 100)
      /* eslint-disable */
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common.less';
.u-collect-articel {
  margin: 20px 0;
  &-list {
    padding: 0 20px;
    margin-bottom: 20px;
  }
}
.share-item {
  display: block;
  border-radius: 8px;
  border: 1PX solid #EAEAEA;
  .user-wrap {
    border-bottom: 1PX solid #EAEAEA;
    display: flex;
    padding: 15px 20px 16px 20px;
    overflow: hidden;
    .avatar {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .user {
      flex: 1;
      overflow: hidden;
      &-nickname {
        width: 100%;
        font-size: 15px;
        color: #333;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tips {
        font-size: 12px;
        color: #333;
        line-height: 12px;
        margin-bottom: 10px;
        &_one {
          margin-right: 10px;
        }
      }
      .time {
        font-size: 12px;
        color: #999;
        position: relative;
        padding-left: 20px;
        line-height: 14px;
        &:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 14px;
          height: 14px;
          transform: translateY(-50%);
          background-image: url('~assets/img/Icons/ic_time_g_14x14@2x.png');
          .bg_cover;
        }
      }
    }
  }
  .content-wrap {
    padding: 15px 20px;
    .article-title {
      font-size: 15px;
      color: #333;
      font-weight: bold;
      line-height: 21px;
      max-height: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 10px;
    }
    .article-cover {
      width: 295px;
      height: 150px;
      border-radius: 4px;
      overflow: hidden;
      .cover-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .ctrls {
      display: flex;
      font-size: 0;
      .ctrl {
        padding-top: 16px;
        &:not(:first-child) {
          margin-left: 25px;
        }
        &>img {
          display: inline-flex;
          width: 18px;
          height: 18px;
        }
        &>span {
          padding-left: 3px;
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
}
.varity-article {
  font-size: 14px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 24px;
  margin: 10px 0;
  border-bottom: none;
  margin: 0;
}
.hot-list {
  .bottom {
    padding: 10px 15px;
  }
  .pro {
    margin: 10px 0 15px;
    height: 180px;
    border-radius: 4px;
    text-align: center;
    position: relative;
    overflow: hidden;
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
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    background: #404240;
    padding-top: 10px;
    .box {
      width: 270px;
      height: 60px;
      margin: 0 auto;
      background: #fff;
      padding: 5px 10px;
      box-sizing: border-box;
      display: flex;
    }
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
      margin-bottom: 2px;
      font-weight: bold;
      line-height: 23px;
    }
    em {
      color: @c-price;
      font-family:PingFangSC-Semibold;
      font-weight: bold;
      font-size: 15px;
    }
    del {
      font-size: 11px;
      color: #666;
      margin-left: 8px;
    }
  }
}
.news-content {
  font-size: 13px!important;
  line-height: 23px!important;
}
.model-item a{
  &:last-child {
    &:after {
      content: '\F007';
      font: normal normal normal 14px/1 "vant-icon";
      color: #999;
      display: inline-block;
      position: relative;
      left: 5px;
      top: 2px;
      transform: rotate(-90deg);
    }
  }
}
</style>
