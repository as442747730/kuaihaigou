<template>
  <div class="encys">
    <div class="top">
      <div class="topbanner">
        <h2>查询工具</h2>
        <p>收好这本词典，助你深入了解葡萄酒</p>
      </div>
      <div class="topnav">
        <div class="topnav-item">
          <div class="item" @click="toNoun(0)">
            <div class="item_bk bk1"></div>
            <div class="item_word">葡萄品种</div>
          </div>
        </div>
        <div class="topnav-item">
          <div class="item" @click="toNoun(1)">
            <div class="item_bk bk2"></div>
            <div class="item_word">产区</div>
          </div>
        </div>
        <div class="topnav-item">
          <div class="item" @click="toNoun(2)">
            <div class="item_bk bk3"></div>
            <div class="item_word">酒庄</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mdls">
      <!-- 知识分享 start -->
      <section class="mdl shares">
        <div class="mdl-head">
          <h1>知识分享</h1>
          <div class="head_enter">
            <a href="/knowledge">进入频道</a>
          </div>
        </div>
        <div v-swiper:mySwiper2="shareSwiper">
          <div class="mdl-lists swiper-wrapper">
            <div class="list no-border share-item swiper-slide" v-for="(item, index) in shareList" :key="index">
              <div class="item-top">
                <div class="avatar" :style="'background-image: url('+ (item.userResp.headimgurl ? item.userResp.headimgurl : require('~/assets/img/defaultImg.png')) +')'"></div>
                <span class="nickname">{{ item.userResp.nickname }}</span>
                <user-lab :level='String(item.userResp.userGradeNumber)' type='1' :profess='String(item.userResp.category)'></user-lab>
              </div>
              <img v-if="item.articleType === 1" class="item-cover" :src="item.articleType === 1 && item.imgsPaht && item.imgsPaht.length !== 0 ? (item.imgsPaht[0] + '?imageView2/2/w/320/h/200') : require('~/assets/img/shareDefault.png')" alt="">
              <div class="round-bottom">
                <video v-if="item.articleType === 2" class="item-cover" controls :src="item.videoPath"></video>
              </div>
              <div class="content">
                <a :href="'/knowledge/detail/' + item.id + '?type=' + item.articleType">
                  <p class="content-title">{{ item.title }}</p>
                  <div class="content-other">
                    <span>频道：{{ item.channelName }}</span>
                    <span>话题：{{ item.topicName }}</span>
                  </div>
                  <div class="time">{{ item.createdAt }}</div>
                </a>
              </div>
              <div class="bottoms">
                <div class="btns">
                  <span class="sub good">{{ item.likeNumber }}</span>
                  <span class="sub msg">{{ item.commentNumber }}</span>
                  <span class="sub look">{{ item.readNumber }}</span>
                </div>
                <a :href="'/knowledge/detail/' + item.id + '?type=' + item.articleType"><div class="more"></div></a>
              </div>
            </div>

          </div>
        </div>
      </section>
      <!-- 知识分享 end -->
      <section class="mdl hotnews">
        <div class="mdl-head">
          <h1>行业热点</h1>
          <div class="head_enter">
            <a href="/hotspot">进入频道</a>
          </div>
        </div>
        <div v-swiper:mySwiper3="swiperNews">
          <div class="mdl-lists swiper-wrapper">
            <div class="list swiper-slide" v-for="(item, index) in hotnewList" :key="index">
              <a :href="'/hotspot/detail/' + item.id">
                <div class="content">
                  <div class="content-head">
                    <p>{{ item.title }}</p>
                  </div>
                  <div class="content-other">
                    <span v-if='item.author'>作者：{{ item.author }}</span>
                    <span v-if='item.sourceAddress'>来源：{{ item.sourceAddress }}</span>
                  </div>
                  <div class="content-time">{{ item.createdAt }}</div>
                  <div class="imgs">
                    <div v-if="item.imgPath" class="imgone" v-lazy:background-image="item.imgPath + '?imageView2/2/w/560/h/300'"></div>
                    <div v-else class="imgone" v-lazy:background-image="require('~/assets/img/001.jpg')"></div>
                  </div>
                  <div class="article">{{item.summary}}</div>
                </div>
                <!-- <div class="bottoms">
                  <div class="btns">
                    <span class="sub good">{{ item.likeNumber }}</span>
                    <span class="sub msg">{{ item.commentNumber }}</span>
                    <span class="sub look">{{ item.readNumber }}</span>
                  </div>
                </div> -->
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { encyApi } from '~/api/encys'
import userLab from '@/components/Usericon.vue'
export default {
  asyncData (req) {
    let par1 = { page: 1, count: 10 }
    let par2 = { page: 1, count: 10 }
    let sharefn = encyApi.encyclopediaHomePage(par1, req)
    let homefn = encyApi.paginate(par2, req)
    // 需要 return 才能为 data 绑上数据
    return Promise.all([sharefn, homefn]).then(([share, home]) => {
      console.log(home.data.array)
      if (home.code !== 200 || share.code !== 200) {
        req.redirect('/error')
      }
      return {
        shareList: share.data.array,
        hotnewList: home.data.array
      }
    })
  },
  components: {
    userLab
  },
  data () {
    return {
      configtitle: '红酒百科',
      hotnewList: [],
      shareList: [],
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
  mounted () {
    console.log(this.shareList)
  },
  methods: {
    toNoun (index) {
      window.location.href = '/noun?num=' + index
    }
  }
}
</script>
<style lang="less" scoped>
.encys {
  .mdls {
    border-top: 10px solid #F5F5F5;
    // padding-left: 20px;
    padding-bottom: 10px;
    background: #fff;
    .mdl {
      width: 100%;
      &-head {
        padding-left: 20px;
        height: 60px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
          font-size:22px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(51,51,51,1);
          line-height:22px;
        }
        .head_enter {
          position: relative;
          font-size:14px;
          font-family:PingFangSC-Semibold;
          color: rgba(187,187,187,1);
          line-height:14px;
          padding-right: 20px;
          &:after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: -4px;
            width: 9px;
            height: 9px;
            background-image: url('~assets/img/Icons/ic_more_right_gray_12x12@2x.png');
            .bg_contain;
          }
        }
      }
      .list {
        border-radius: 8px;
        border: 1PX solid #eaeaea;
        box-sizing: border-box;
        width: 320px;
        margin-left: 15px;
        &:last-child {
          margin-right: 20px;
        }
        &.no-border {
          border:none;
        }
        .users {
          padding: 0 20px;
          height: 80px;
          display: flex;
          align-items: center;
          border-bottom: 1PX solid @cor_border;
          .avater {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 17px;
            .bg_cover;
          }
          .infos {
            .person {
              display: flex;
              align-items: center;
              height: 30px;
              font-size: 0;
              &>p {
                font-size:16px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(51,51,51,1);
                margin-right: 5px;
              }
            }
          }
        }
        .content {
          padding: 20px;
          &-head {
            display: flex;
            align-items: center;
            &>p {
              font-size:16px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:rgba(51,51,51,1);
              line-height:22px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          &-time {
            margin-top: 10px;
            line-height: 14px;
            height: 14px;
            font-size:12px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            padding-left: 18px;
            background-image: url('~assets/img/Icons/ic_time_g_14x14@2x.png');
            background-position: left center;
            background-repeat: no-repeat;
            background-size: 14px 14px;
          }
          &-other {
            display: flex;
            align-items: center;
            &>span {
              font-size:12px;
              color:rgba(153,153,153,1);
              box-sizing: border-box;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              padding-right: 20px;
              margin-top: 10px;
              &:first-child {
                flex-shrink: 0;
              }
              &+span {
                padding-right: 0;
              }
            }
          }
          .article {
            margin-top: 15px;
            font-size: 13px;
            color: #666;
            line-height: 23px;
            max-height: 115px;
          }
          .imgs {
            margin-top: 10px;
            height: 150px;
            .imgone {
              width: 280px;
              height: 150px;
              border-radius: 5px;
              .bg_cover;
            }
          }
          .video-box {
            position: relative;
            margin-top: 10px;
            margin-bottom: 15px;
            .video-player {
              width: 100%;
              // height: 130px;
              height: auto;
              border-radius: 5px;
            }
          }
        }
        .bottoms {
          padding: 0 20px;
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          width: 100%;
          bottom: 6px;
          box-sizing: border-box;
          .btns {
            display: flex;
            align-items: center;
            .sub {
              line-height: 18px;
              padding-left: 21px;
              font-size:12px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(153,153,153,1);
              background-position: left center;
              background-repeat: no-repeat;
              background-size: 18px 18px;
              & + .sub {
                margin-left: 25px;
              }
              &.good {
                background-image: url(~assets/img/knowledge/icon-like.png);
              }
              &.msg {
                background-image: url(~assets/img/knowledge/icon-msg.png);
              }
              &.look {
                background-image: url(~assets/img/knowledge/icon-view.png);
              }
            }
          }
          .more {
            width: 30px;
            height: 30px;
            background-image: url('~assets/img/knowledge/icon-more.png');
            .bg_cover;
          }
        }
      }
    }
    .hotnews {
      margin-top: 10px;
      margin-bottom: 10px;
      .list {
        height: 417px;
        .article {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }
    }

    .share-item {
      .item-top {
        display: flex;
        align-items: center;
        padding: 10px 15px 10px 10px;
        border: 1Px solid #EAEAEA;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        .avatar {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          overflow: hidden;
          .bg_cover;
        }
        .nickname {
          flex: 1;
          padding: 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          color: #666;
        }
      }
      .item-cover {
        width: 320px;
        height: 200px;
        object-fit: cover;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      .round-bottom {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        overflow: hidden;
      }
      .content {
        padding: 15px 0 0 0!important;
        &-title {
          font-size: 15px;
          color: #333;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time {
          margin-top: 10px;
          font-size:12px;
          height: 14px;
          color: #999;
          line-height:14px;
          padding-left: 18px;
          background-image: url('~assets/img/Icons/ic_time_g_14x14@2x.png');
          background-position: left center;
          background-repeat: no-repeat;
          background-size: 14px 14px;
        }
      }
      .bottoms {
        position: static!important;
        padding: 0!important;
      }
    }

  }
}

// 上部
.top {
  padding-top: 20px;
  .padlr20;

  .topbanner {
    height: 70px;
    background-image: url('~assets/img/encys/img_baike_335x70@2x.png');
    .bg_cover;

    &>h2 {
      padding-top: 15px;
      height: 17px;
      font-size: 17px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      text-align: center;
    }

    &>p {
      padding-top: 10px;
      height: 13px;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 13px;
      text-align: center;
    }
  }

  .topnav {
    padding: 20px 0;
    .flex_around;

    .item {

      &_bk {
        width: 55px;
        height: 55px;
        .bg_cover;
      }

      &_word {
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 14px;
        text-align: center;
        padding-top: 15px;
      }

      .bk1 {
        background-image: url('~assets/img/encys/ic_putaopinz_55x55@2x.png');
      }

      .bk2 {
        background-image: url('~assets/img/encys/ic_chanqu_55x55@2x.png');
      }

      .bk3 {
        background-image: url('~assets/img/encys/ic_jiuzhuang_55x55@2x.png');
      }

    }
  }
}
</style>