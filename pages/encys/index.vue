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
          <div class="head_enter">进入频道</div>
        </div>
        <div v-swiper:mySwiper2="shareSwiper">
          <div class="mdl-lists swiper-wrapper">
            <div class="list swiper-slide" v-for="(item, index) in shareList" :key="index">
              <div class="users">
                <div class="avater" :style="'background-image: url('+ (item.userResp.headimgurl ? item.userResp.headimgurl : require('~/assets/img/defaultImg.png')) +')'"></div>
                <div class="infos">
                  <div class="person">
                    <p>{{ item.userResp.nickname }}</p>
                  </div>
                  <div class="time">{{ item.createdAt }}</div>
                </div>
              </div>
              <div class="content">
                <div class="content-head">
                  <p>{{ item.title }}</p>
                </div>
                <div class="content-other">
                  <span>频道：{{ item.channelName }}</span>
                  <span>话题：{{ item.topicName }}</span>
                </div>
                <div class="article" v-if="item.articleType === 1" style="-webkit-box-orient: vertical;" v-html="item.summary"></div>
                <div class="imgs" v-if="item.articleType === 1">
                  <div v-if="item.imgsPaht" class="imgone" v-lazy:background-image="item.imgsPaht[0]"></div>
                  <!-- <div v-else class="imgone" v-lazy:background-image="require('~/assets/img/001.jpg')"></div> -->
                </div>
                <!-- 视频 -->
                <div class="video-box" v-if="item.articleType === 2">
                  <video class="video-player" controls :src="item.videoPath"></video>
                </div>
              </div>
              <div class="bottoms">
                <div class="btns">
                  <span class="sub good">{{ item.likeNumber }}</span>
                  <span class="sub msg">{{ item.commentNumber }}</span>
                  <span class="sub look">{{ item.readNumber }}</span>
                </div>
                <div class="more"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 知识分享 end -->
      <section class="mdl hotnews">
        <div class="mdl-head">
          <h1>行业热点</h1>
          <div class="head_enter">进入频道</div>
        </div>
        <div v-swiper:mySwiper3="swiperNews">
          <div class="mdl-lists swiper-wrapper">
            <div class="list swiper-slide" v-for="(item, index) in hotnewList" :key="index">
              <div class="content">
                <div class="content-head">
                  <p>{{ item.title }}</p>
                </div>
                <div class="content-time">{{ item.createdAt }}</div>
                <div class="content-other">
                  <span>作者：{{ item.author }}</span>
                  <span>来源：{{ item.sourceAddress }}</span>
                </div>
                <div class="imgs">
                  <div v-if="item.imgPath" class="imgone" v-lazy:background-image="item.imgPath"></div>
                  <div v-else class="imgone" v-lazy:background-image="require('~/assets/img/001.jpg')"></div>
                </div>
                <div class="article">{{item.summary}}</div>
              </div>
              <div class="bottoms">
                <div class="btns">
                  <span class="sub good">{{ item.likeNumber }}</span>
                  <span class="sub msg">{{ item.commentNumber }}</span>
                  <span class="sub look">{{ item.readNumber }}</span>
                </div>
                <!-- <div class="more"></div> -->
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { encyApi } from '~/api/encys'
export default {
  asyncData (req) {
    let par1 = { page: 1, count: 10 }
    let par2 = { page: 1, count: 10 }
    let sharefn = encyApi.encyclopediaHomePage(par1, req)
    let homefn = encyApi.paginate(par2, req)
    // 需要 return 才能为 data 绑上数据
    return Promise.all([sharefn, homefn]).then(([share, home]) => {
      console.log(share)
      if (home.code !== 200 || share.code !== 200) {
        req.redirect('/error')
      }
      return {
        shareList: share.data.array,
        hotnewList: home.data.array
      }
    })
  },
  data () {
    return {
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
          font-weight:600;
          color:rgba(187,187,187,1);
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
            background-image: url('~/assets/img/Icons/ic_more_right_gray_12x12@2x.png');
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
          margin-right: 15px;
        }
        // & + .list {
        //   margin-left: 15px;
        // }
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
              &>p {
                font-size:16px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(51,51,51,1);
              }
            }
            .time {
              font-size:12px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(153,153,153,1);
              height: 14px;
              line-height:14px;
              padding-left: 18px;
              background-image: url('~/assets/img/Icons/ic_time_g_14x14@2x.png');
              background-position: left center;
              background-repeat: no-repeat;
              background-size: 14px 14px;
            }
          }
        }
        .content {
          padding: 20px 20px 0;
          &-head {
            height: 44px;
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
            background-image: url('~/assets/img/Icons/ic_time_g_14x14@2x.png');
            background-position: left center;
            background-repeat: no-repeat;
            background-size: 14px 14px;
          }
          &-other {
            display: flex;
            align-items: center;
            margin-top: 10px;
            &>span {
              font-size:12px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(153,153,153,1);
              & + span {
                margin-left: 20px;
              }
            }
          }
          .article {
            margin-top: 15px;
            font-size:14px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(153,153,153,1);
            line-height:24px;
            
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
                background-image: url(~/assets/img/knowledge/icon-like.png);
              }
              &.msg {
                background-image: url(~/assets/img/knowledge/icon-msg.png);
              }
              &.look {
                background-image: url(~/assets/img/knowledge/icon-view.png);
              }
            }
          }
          .more {
            width: 30px;
            height: 30px;
            background-image: url('~/assets/img/knowledge/icon-more.png');
            .bg_cover;
          }
        }
      }
    }
    .shares {
      .list {
        height: 443px;
        .article {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
    .hotnews {
      margin-top: 10px;
      margin-bottom: 10px;
      .list {
        height: 365px;
        .article {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
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
    background-image: url('~/assets/img/encys/img_baike_335x70@2x.png');
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
        background-image: url('~/assets/img/encys/ic_putaopinz_55x55@2x.png');
      }

      .bk2 {
        background-image: url('~/assets/img/encys/ic_chanqu_55x55@2x.png');
      }

      .bk3 {
        background-image: url('~/assets/img/encys/ic_jiuzhuang_55x55@2x.png');
      }

    }
  }
}
</style>