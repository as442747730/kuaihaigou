<template>
  <section class="share_home">
    <div class="title_home">
      <h2>知识分享</h2>
      <a class="to-channel">
        进入频道
        <i class="van-icon van-icon-arrow"></i>  
      </a>
    </div>
    <div v-swiper:mySwiper2="shareSwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide share-list"
          v-for="(item, index) in shareList"
          :key="index">
          <div class="share-list-box">
            <div class="share_home-user">
              <div class="avatar" :style="'background-image: url('+ (item.userResp.headimgurl ? item.userResp.headimgurl : require('~/assets/img/defaultImg.png'))+')'"></div>
              <div class="info">
                <span>{{ item.userResp.nickname }}</span>
                <p>{{ item.createdAt }}</p>
              </div>
            </div>
            <div class="content">
              <h3>{{ item.title }}</h3>
              <div class="tips">
                <span>频道：{{ item.channelName }}</span>
                <span>话题：{{ item.topicName }}</span>
              </div>
              <p class="content-article" v-if="item.articleType === 1"  style="-webkit-box-orient: vertical;" v-html="item.summary"></p>
              <div class="imgs" v-if="item.articleType === 1 && item.imgsPaht">
                <div :class="['img', 'big' ]" v-lazy:background-image="m" v-for="(m, index) in item.imgsPaht" v-if="index < 1" :key="index"></div>
              </div>
             <!--  <div class="imgs" v-if="item.articleType === 1 && item.imgsPaht">
                <div :class="['img', item.imgsPaht.length === 1 ? 'big' : '' , item.imgsPaht.length  >= 3 ? 'small' : '']" v-lazy:background-image="m" v-for="(m, index) in item.imgsPaht" v-if="index < 3" :key="index"></div>
              </div> -->
              <!-- 视频 -->
              <div class="video-box" v-if="item.articleType === 2">
                <video class="video-player" controls :src="item.videoPath"></video>
              </div>
              <div class="u-other">
                <span class="zan"><i></i>{{ item.likeNumber }}</span>
                <span class="chat"><i></i>{{ item.commentNumber }}</span>
                <span class="watch"><i></i>{{ item.readNumber }}</span>
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
</template>
<script>
export default {
  props: {
    shareList: Array
  },
  data () {
    return {
      shareSwiper: {
        speed: 800,
        slidesPerView: 'auto'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.share_home {
  // width: 100vw;
  .share-list {
    font-size: 0;
    margin-left: 15px;
    width: 320px;
    box-sizing: border-box;
    &:first-child {
    	margin-left: 0;
    }

    &:last-child {
      width: 340px;
    }

    &-box {
      border-radius: 8px;
      border: 1px solid #eaeaea;
      box-sizing: border-box;
    }
  }

  &-user {
    height: 80px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    border-bottom: 1PX solid #f5f5f5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin-right: 17px;
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
        background: url('~/assets/img/home/ic_time_g_14x14@2x.png') no-repeat center/contain
      }
    }
  }

  .content {
    padding: 15px 20px;
    padding-right: 20px;
    h3 {
      font-size: 16px;
      color: #333;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      line-height: 22px;
    }

    .tips {
      color: #999;
      font-size: 12px;
      margin: 10px 0 15px;

      span:first-child {
        margin-right: 20px;
      }
    }
    .article {
      display: flex;
      align-items: center;
      height: 70px;
      .article_p {
        font-size: 14px;
        color: @cor_999;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    &-article {
      font-size: 14px;
      color: @cor_999;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .video-box {
      position: relative;
      margin-bottom: 15px;
      .video-player {
        width: 100%;
        // height: auto;
        height: 130px;
        border-radius: 5px;
      }
    }
    .imgs {
      margin-top: 10px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .img {
        // 默认130px
        width: 130px;
        height: 130px;
        border-radius: 5px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        &.big {
          width: 100%;
          height: 130px;
        }
        &.small {
          width: 88px;
          height: 88px;
        }
      }
    }
  }
}

.u-other {
  margin-top: 15px;
}
// 通用
.title_home {
  position: relative;
  padding: 20px 0;
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
      background: url('~/assets/img/home/ic_huanyipi_g_18x18@2x.png') no-repeat center/contain;
      vertical-align: sub;
    }
  }
  .to-channel {
    position: absolute;
    right: 20px;
    top: 50%;
    color: #bbb;
    font-size: 14px;
    font-family: 'PingFangSC-Semibold';
    transform: translateY(-50%);
    i {
      font-size: 12px;
      font-weight: bold;
      transform: scale(.8);
      position: relative;
      top: 1px;
    }
  }
}
</style>