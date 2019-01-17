<template>
  <div class="noundetail">
    <header class="noun-head">
      <div class="ic_back" @click="goback"></div>
      <div class="title">百科详情</div>
      <div class="zy_btn">我要质疑</div>
    </header>
    <!-- 详情 start -->
    <section class="noun-main">
      <div class="top">
        <div class="topinfo">
          <h2>{{objDetail.chineseName}}（{{objDetail.englishName}}）</h2>
          <p>作者：{{objDetail.auth}}</p>
          <div class="btn">
            <span>名词解释</span>
          </div>
        </div>
      </div>
      <div class="lynav">
        <div class="lynav_item" :class="{active: lynavIndex === 0}" @click="lynavFn(0)">{{getType}}介绍</div>
        <div class="lynav_item" :class="{active: lynavIndex === 1}" @click="lynavFn(1)">{{getType}}图片
          <span>（{{imagesArr.length}}）</span>
        </div>
      </div>
      <section v-if="lynavIndex === 0">
        <div class="introduce" v-if="objDetail.baikeMessageList">
          <div class="introduce-item" v-for="(bakeMes, index) in objDetail.baikeMessageList" :key="index">
            <span>{{bakeMes.name}}:</span>
            <p>
              {{bakeMes.content}}
            </p>
          </div>
        </div>
        <div class="featcontent" v-if="objDetail.content">
          <div class="cont content-wrapper" v-html="objDetail.content"></div>
        </div>
      </section>
      <section class="picture" v-if="lynavIndex === 1">
        <ul class="picture-uls">
          <li
            class="uls_li"
            ref="liImg"
            v-for="(image, index) in imgsArray"
            :style="{'height': image._height + 'px'}"
            @click="opImage(index)"
            :key="index">
            <img v-lazy="image.src" />
          </li>
        </ul>
      </section>
      <!--
        文章评论
        type -> 文章类型
        articelId -> 文章id
        ifLike -> 是否喜欢
        ifCollect -> 是否收藏
      -->
      <articel-comment :type='articelType' :articelId='objDetail.id' :ifLike='objDetail.ifLike' :ifCollect='objDetail.ifCollect'></articel-comment>
    </section>
    <!-- 详情 end -->
  </div>
</template>
<script>
import { encyApi } from '~/api/encys'
import { ImagePreview } from 'vant'
import tools from '~/utils/tools'
import articelComment from '@/components/articel/Comment'
export default {
  head () {
    return {
      title: '名词解释',
      meta: [
        { hid: 'title', name: 'title', content: '名词解释' }
      ]
    }
  },
  components: {
    articelComment
  },
  async asyncData (req) {
    const encyId = req.params.id
    const queryNum = req.query.num
    let objDet = {}
    let _imgArr = []
    let encyType
    if (queryNum === '0') {
      encyType = '4'
      const { code, data } = await encyApi.serverVarietyList(encyId, req)
      if (code === 200) {
        objDet = data
        _imgArr = data.imgs
      }
    } else if (queryNum === '1') {
      encyType = '5'
      const { code, data } = await encyApi.serverAreaDetail(encyId, req)
      if (code === 200) {
        objDet = data
        _imgArr = data.imgs
      }
    } else if (queryNum === '2') {
      encyType = '6'
      const { code, data } = await encyApi.serverWineryDetail(encyId, req)
      if (code === 200) {
        objDet = data
        _imgArr = data.imgs
      }
    }
    console.log(objDet)
    return { objDetail: objDet, imagesArr: _imgArr, articelType: encyType, navIndex: queryNum }
  },
  data () {
    return {
      objDetail: {}, // 页面详情
      articelType: '4', // 文章类型
      imagesArr: [],
      imgsArray: [],
      lynavIndex: 0,
      navIndex: null
    }
  },
  computed: {
    getType () {
      if (this.navIndex === 0) {
        return '品种'
      } else if (this.navIndex === 1) {
        return '产区'
      } else if (this.navIndex === 2) {
        return '酒庄'
      } else {
        return '品种'
      }
    }
  },
  methods: {
    goback () {
      let num = this.navIndex
      window.location.href = '/noun?num=' + num
    },
    lynavFn (index) {
      // 介绍 图片
      if (index === 1) {
        this.adjustImage()
      }
      this.lynavIndex = index
    },
    opImage (position, timer) {
      // 展示大图
      let images = this.imagesArr
      const instance = ImagePreview({
        images,
        asyncClose: !!timer,
        startPosition: typeof position === 'number' ? position : 0
      })
      if (timer) {
        setTimeout(() => {
          instance.close()
        }, timer)
      }
    },
    adjustImage () {
      // 图片高度 宽度 105
      let _promises = this.imagesArr.map(path => {
        return tools.getImgInfos(path, 105)
      })
      Promise.all(_promises).then(res => {
        console.log('res', res)
        this.imgsArray = res
        this.$nextTick(() => {
          tools.waterFall('.uls_li', '.picture-uls', 3)
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
</script>
<style lang="less">
@bgcor1: #fff;
.noundetail {
  width: 100%;
  height: 100vh;
  background: #F5F5F5;
  overflow: auto;
  .noun-head {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 20px;
    background: #fff;
    border-bottom: 1PX solid @cor_border;
    .title {
      font-size:17px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .ic_back {
      padding: 10px 15px;
      width: 8px;
      height: 14px;
      background-size: 8px 14px;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url('~/assets/img/Icons/ic_return_b_30x30@2x.png');
    }
    .zy_btn {
      font-size:13px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(102,102,102,1);
    }
  }
  .noun-main {
    max-height: calc(100vh - 45px);
    overflow-y: scroll;
  }
  // 上部
  .top {
     background:  @bgcor1;
    .topinfo {
      .padlr20;
      padding-top: 20px;
      padding-bottom: 15px;

      &>h2 {
        font-size: 19px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }

      &>p {
        padding: 10px 0;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 12px;
      }

      .btn {
        &>span {
          padding: 4px 4px 4px 6px;
          background: rgba(89, 195, 225, 1);
          border-radius: 2px;
          color: #fff;
          font-size: 12px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
        }
      }
    }
  }

  // 左右两栏切换
  .lynav {
    height: 40px;
    .flex_between;

    &_item {
      width: 50%;
      font-size: 14px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 14px;
      text-align: center;
    }

    &_item:first-child {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -7px;
        width: 1PX;
        height: 14px;
        background: #CCCCCC;
      }
    }

    &_item.active {
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }

  // 介绍
  .introduce {
    margin-bottom: 10px;
    background: @bgcor1;
    overflow: hidden;
    .padlr20;

    &-item {
      margin: 10px 0;
      padding-left: 75px;
      font-size: 14px;
      &:first-child {
        margin-top: 25px;
      }
      &:last-child {
        margin-bottom: 25px;        
      }
      &>span {
        float: left;
        margin-left: -75px;
        font-family: PingFang-SC-Regular;
        color: rgba(153, 153, 153, 1);
        font-weight: 400;
        display: inline-block;
        width: 70px;
        line-height: 24px;
        word-wrap: break-word;
        .u-ellipsis;
      }

      &>p {
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        word-wrap: break-word;
      }
    }
  }
  .introduce:empty {
    margin-bottom: 0;
  }
  .featcontent {
    width: 100vw;
    .cont {
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      background: @bgcor1;
      font-size:14px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:28px;
      p {
        width: 100%;
      }
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }

  // 图片集合
  .picture {
    padding: 0 20px;
    background: #fff;
    &-uls {
      // display: flex;
      // flex-wrap: wrap;
      // align-items: center;
      // align-content: top;
      margin-left: -10px;
      border-bottom: 20px solid transparent;
      position: relative;
      .uls_li {
        display: inline-block;
        vertical-align: top;
        width: 33.3%;
        box-sizing: border-box;
        border-left: 10px solid transparent;
        border-top: 15px solid transparent;
        &>img {
          display: inline-block;
          width: 100%;
          height: auto;
        }
      }
    }

  }
}
</style>