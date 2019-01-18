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
                  <template v-if='$k2 === customArray($v.tagListJson).length -1'>
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
          <!-- 知识百科 -->
          <div class="u-share-articel-item" v-if='$v.collectType === 1'>
            <a :href="'/knowledge/detail/' + $v.id + '?type=' + $v.articleType">
              <h3 class="font_hight">{{ $v.title }}</h3>
              <div class="time">{{ $v.createdAt }}</div>
              <div class="tips">
                <span class="tips_one">频道：{{ channelName[$v.channelNumber - 1] }}</span>
                <span>话题：{{ $v.topicName }}</span>
              </div>
              <!-- 文章 -->
              <div class="artcon" v-if='$v.articleType === 1' v-html='$v.summary'></div>
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
                  <span v-if="$v.sourceAddress">来源：{{$v.sourceAddress}}</span>
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
    console.log(code)
    if (code === 200) {
      let pageEmpty = false
      pageEmpty = data.total <= 5
      return {
        goodsData: data.array || {},
        pageEmpty: pageEmpty,
        pageTotal: data.total
      }
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
</style>

