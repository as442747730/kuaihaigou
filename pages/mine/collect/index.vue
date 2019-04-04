<template>
  <div class="u-collect">
    <div class="tab">
      <span :class="{'cur': type === 1}" @click='chooseType(1)'>商品</span>
      <span :class="{'cur': type === 2}" @click='chooseType(2)'>文章</span>
    </div>
    <div class="select">
      <span>{{ pageTotal }}条</span>
      <span @click='selectShow = true'>{{ orderTxt }}</span>
    </div>
    <div class="u-collect-content">
      <!-- 商品 -->
      <ul class="u-collect-item" v-if='type === 1'>
        <li class="u-collect-list" v-for='($v, $k) in goodsData' :key='$k'>
          <a :href="'/detail/' + $v.goodsId">
            <div class="pro">
              <img v-lazy="$v.goodsImg">
            </div>
            <div class="desc">
              <h3>{{ $v.goodsName }}</h3>
              <p v-if='$v.tagListJson'>
                <span v-for='($v2, $k2) in customArray($v.tagListJson)' :key='$k2'>
                  <template v-if='$k2 === customArray($v.tagListJson).length - 1'>
                    {{ $v2 }}
                  </template>
                  <template v-else>
                    {{ $v2 + ' | ' }}
                  </template>
                </span>
              </p>
              <strong>¥ {{ $v.actualPrice }}</strong>
            </div>
          </a>
        </li>
      </ul>

      <!-- 文章 -->
      <ul class="u-collect-item c-article" v-if='type === 2'>
        <li class="u-collect-article" v-for='($v, $k) in goodsData' :key='$k'>
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
                  <span v-if='$v.sourceAddress || $v.sourceAuthor'>来源：
                    <a v-if='$v.sourceAddress && $v.sourceAuthor' :href="$v.sourceAddress">{{ $v.sourceAuthor }}</a>
                    <a v-if='$v.sourceAddress && !$v.sourceAuthor' :href="$v.sourceAddress">链接</a>
                    <a v-if='!$v.sourceAddress && $v.sourceAuthor' href="javascript:void(0)">{{ $v.sourceAuthor }}</a>
                  </span>
                  <span v-if="$v.classificationId >= 0">分类：{{circlenavList[$v.classificationId]}}</span>
                </div>
                <div class="content-time">{{$v.createdAt}}</div>
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
                      <div class="ib-middle goods-info-img" v-lazy:background-image="$v.goodsMinimalResp.cover"></div>
                      <div class="ib-middle goods-info-detail">
                        <p class="u-ellipsis">{{ $v.goodsMinimalResp.goodsName }}</p>
                        <em class="ib-middle">¥{{ $v.goodsMinimalResp.actualPrice }}</em>
                        <del class="ib-middle">市场价：¥{{ $v.goodsMinimalResp.marketPrice }}</del>
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
          
        </li>
      </ul>

      <div class='more-loading' v-show='pageLoding'>
        <van-loading type="spinner" />
        <p>正在加载更多</p>
      </div>

      <div class="no-more" v-show='pageEmpty'>
        <p>没有更多内容了！</p>
      </div>
    </div>

    <!-- 类别选择框 -->
    <van-popup v-model="selectShow" position="bottom">
      <van-picker ref="reasonPicker" :columns="type === 1 ? orderList : orderArticle" show-toolbar @cancel="handleCancel" @confirm="handleSelect" />
    </van-popup>

  </div>
</template>
<script>
import { userApi } from '~/api/users'
export default {
  head () {
    return {
      title: '我的收藏_商品',
      meta: [
        { hid: 'title', name: 'title', content: '我的收藏_商品' }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await userApi.serveClts(1, false, false, req)
    console.log(data.array)
    if (code === 200) {
      let pageEmpty = false
      pageEmpty = data.total <= 5
      data.array.forEach(item => {
        if (item.personalInfoResp) {
          item.userResp = item.personalInfoResp
        }
      })
      return {
        goodsData: data.array || {},
        pageEmpty: pageEmpty,
        pageTotal: data.total
      }
    } else if (code === 506) {
      req.redirect('/account/login')
    }
  },

  data () {
    return {
      goodsData: [],

      pageEmpty: false,
      page: 1, // 当前页
      pageLoding: false, // 加载ing

      selectShow: false,
      orderList: [
        { sort: 0, text: '全部' },
        { sort: 1, text: '热卖' },
        { sort: 2, text: '已售罄' }
      ],
      orderArticle: [
        { sort: '', text: '全部' },
        { sort: 1, text: '分享' },
        { sort: 2, text: '热点' },
        { sort: 3, text: '甄选' },
        { sort: 4, text: '名词' }
      ],
      channelName: ['经验/知识', '美食/周边'],
      circlenavList: ['这些圈子都在看', '行业热点', '培训讲座', '企业招商'],
      orderTxt: '全部',
      pageTotal: 0,
      type: 1,
      articleType: ''
    }
  },

  async mounted () {
    const content = document.querySelector('.u-collect-content')
    content.addEventListener('scroll', this.handleScroll(() => {
      this.eleHeight = content.clientHeight
      this.scrollHeight = content.scrollHeight
      let scrollTop = content.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.eleHeight >= this.scrollHeight - 200 && !this.pageLoding && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    }))
  },
  methods: {
    async getData (page, needClear = false) {
      this.pageLoding = true
      const { code, data } = this.type === 1 ? await userApi.getClts(page, this.ifPopular, this.ifSellOut) : await userApi.collect({ page: page, count: 5, type: this.articleType })
      if (code === 200) {
        console.log(data)
        data.array.forEach(item => {
          if (item.personalInfoResp) {
            item.userResp = item.personalInfoResp
          }
        })
        if (needClear) {
          this.goodsData = data.array
        } else {
          this.goodsData.push(...data.array)
        }
        this.pageTotal = data.total
        this.pageEmpty = this.page * 5 >= data.total
      } else {
        this.pageEmpty = true
      }
      this.pageLoding = false
    },
    chooseType (type) {
      if (this.type === type) return
      this.type = type
      this.page = 1
      this.orderTxt = '全部'
      this.pageEmpty = false
      this.getData(this.page, true)
    },
    handleCancel () {
      this.selectShow = false
    },
    handleSelect (val) {
      if (this.type === 1) {
        switch (val.sort) {
          case 0:
            this.ifPopular = false
            this.ifSellOut = false
            break
          case 1:
            this.ifPopular = true
            this.ifSellOut = false
            break
          case 2:
            this.ifSellOut = true
            this.ifPopular = false
            break
        }
      } else {
        this.articleType = val.sort
      }
      this.selectShow = false
      this.pageEmpty = false
      this.page = 1
      this.orderTxt = val.text
      this.getData(this.page, true)
    },
    customArray (arr) {
      return JSON.parse(arr)
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 250)
      }
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
@import '../../user/common.less';
.u-collect {
  .tab {
    background: #f5f5f5;
    padding: 13px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 14px;
      display: inline-block;
      padding: 0 76px;
      color: #666;
      &:first-child {
        border-right: 1px solid #dadada;
      }
      &.cur {
        color: #333;
        font-weight: bolder;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          width: 20px;
          height: 2PX;
          bottom: -13px;
          left: 50%;
          margin-left: -10px;
          background: #333;
        }
      }
    }
  }
  .select {
    padding: 10px 20px;
    color: #999;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;
    span {
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
  }
  &-content {
    overflow: scroll;
    height: calc(100vh - 76px)
  }
  &-item {
    padding: 0 20px;
    font-size: 0;
  }
  &-list {
    padding: 20px 0;
    border-bottom: 1px solid #f1f1f1;
    // display: flex;
    // justify-content: space-between;
    .pro {
      display: inline-block;
      vertical-align: middle;
      width: 120px;
      height: 120px;
      border: 1px solid #eaeaea;
      box-sizing: border-box;
      border-radius: 4px;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      img {
        max-width: 100%;
      }
    }
    .desc {
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 120px);
      height: 120px;
      box-sizing: border-box;
      padding-left: 15px;
      h3 {
        color: #333;
        font-size: 15px;
        line-height: 21px;
      }
      p {
        font-size: 12px;
        color: #999;
        margin-top: 15px;
        line-height: 18px;
      }
      strong {
        position: absolute;
        bottom: 0;
        left: 20px;
        font-size: 17px;
        color: #f99c00;
        font-family: 'Impact'
      }
    }
  }
  &-article {
    margin-bottom: 20px;
    &:first-child {
      margin-top: 20px;
    }
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
          background-image: url('~/assets/img/Icons/ic_time_g_14x14@2x.png');
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
  padding: 0!important;
}
.hot-list-box {
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
    box-sizing: border-box;
    bottom: 10px;
    left: 16px;
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
}
.news-content {
  font-size: 13px!important;
  line-height: 23px!important;
}
</style>

