<template>
  <div class="m-page-user">
    <tab :uid='uid' :index='1'></tab>
    <div class="model-item">
      <a :href="'/user/collect?uid=' + uid">商品</a>
      <a class="cur" :href="'/user/collectArticle?uid=' + uid">文章</a>
      <a href="javascript:void(0)" @click='selectShow = true'>{{ orderTxt }}</a>
    </div>

    <div class="u-collect-articel">
      <div class="u-collect-articel-list" v-for='($v, $k) in collectData' :key='$k'>
        <!-- 知识分享 -->
        <div class="u-share-articel-item"  v-if='$v.collectType === 1'>
          <a :href="'/knowledge/detail/' + $v.id + '?type=' + $v.articleType">
            <div class="author-info">
              <span class="avatar" :style="'background-image: url(' + ($v.personalInfoResp.headimgurl ? $v.personalInfoResp.headimgurl : require('~/assets/img/defaultImg.png')) + ')'"></span>
              <div class="info">
                <div class="nickname">
                  <span>{{ $v.personalInfoResp.nickname }}</span>
                  <user-lab :level='String($v.personalInfoResp.userGradeNumber)' type='1' :profess='String($v.personalInfoResp.category)'></user-lab>
                </div>
                <p class="date">{{ $v.createdAt }}</p>
              </div>
            </div>
            <h3 class="font_hight">{{ $v.title }}</h3>
            <!-- <div class="time">{{ $v.createdAt }}</div> -->
            <div class="tips">
              <span class="tips_one">频道：{{ channelName[$v.channelNumber - 1] }}</span>
              <span>话题：{{ $v.topicName }}</span>
            </div>
            <!-- 文章 -->
            <div class="artcon" v-if='$v.articleType === 1' v-html='formatHtml($v.summary)'></div>
            <div class="imglist" v-if='$v.articleType === 1 && $v.imgsPaht'>
              <div v-for="(item, index) in $v.imgsPaht" :key="index" :class="['imgitem', $v.imgsPaht.length === 1 ? 'big' : '' , $v.imgsPaht.length % 3 === 0 ? 'small' : '', $v.imgsPaht.length === 8 ? 'small' : '', ($v.imgsPaht.length === 5 && index === 4) ? 'big' : '']" v-lazy:background-image="setImgUrl(item) + '&' + new Date().getTime()">
              </div>
              <div class="imgitem small" v-if="$v.imgsPaht.length === 8"></div>
            </div>
            <!-- 视频 -->
            <div class="video-box" v-if="$v.articleType === 2">
              <video class="video-player" controls :src="$v.videoPath"></video>
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
          </a>
        </div>
        <!-- 新闻资讯 -->
        <div class="list-box" v-if="$v.collectType === 2">
          <div class="list">
            <div class="content">
              <div class="content-head">
                <p>
                  <a :href="'/hotspot/detail/' + $v.id">{{ $v.title }}</a>
                </p>
              </div>
              <div class="content-time">{{$v.createdAt}}</div>
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
              <div class="content-labels">
                <span
                  class="label"
                  v-for="(lab, labIndex) in $v.labels"
                  @click.stop="tolabel(lab)"
                  :key="labIndex">
                    <a :href="'/hotspot/label/' + lab.id">{{ lab.labelName }}</a>
                  </span>
              </div>
              <div class="imgs">
                <a :href="'/hotspot/detail/' + $v.id">
                  <div class="imgone" v-lazy:background-image="$v.imgPath + '?imageslim'"></div>
                </a>
              </div>
              <div class="article">
                <a :href="'/hotspot/detail/' + $v.id">{{ $v.summary }}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- 甄选内容 -->
        <div class="picklist" v-if="$v.collectType === 3">
          <a :href="'/selection/detail/' + $v.id">
            <div class="infos" v-if="$v.goodsMinimalResp">
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
            </div>
          </a>
        </div>
        <!-- 名词解释 -->
        <div class="varity" v-if="$v.collectType >= 4">
          <a :href="'/noun/detail/' + $v.attrid + '?num=' + ($v.collectType - 4)">
            <h3 class="varity-head">{{ $v.title }}</h3>
            <div class="varity-bk">
              <div class="varity-bk_in" v-lazy:background-image="$v.bgimg"></div>
            </div>
            <!-- <div class="varity-article" v-html='$v.summary'></div> -->
            <div class="varity-foot">
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

export default {
  name: '',

  layout: 'page-with-user',

  components: { Tab, userLab },

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
      console.log(data)
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
