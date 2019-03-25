<template>
	<div>
	  <article v-for="(art, index) in artlist" :key="index">
      <a :href="'/knowledge/detail/' + art.id + '?type=' + art.articleType">
  	    <h3>{{ art.title }}</h3>
  	    <div class="time">{{ art.createdAt }}</div>
  	    <div class="tips">
  	      <span class="tips_one">频道：{{ art.channelName }}</span>
  	      <span>话题：{{ art.topicName }}</span>
  	    </div>
  	    <div class="artcon" v-if='art.articleType === 1' v-html='art.summary'></div>
  	    <div class="imglist" v-if='art.articleType === 1 && art.imgsPaht'>
  	      <div v-for="(item, index) in art.imgsPaht" :key="index" :class="['imgitem', art.imgsPaht.length === 1 ? 'big' : '' , art.imgsPaht.length % 3 === 0 ? 'small' : '', art.imgsPaht.length === 8 ? 'small' : '', (art.imgsPaht.length === 5 && index === 4) ? 'big' : '']" v-lazy:background-image='setImgUrl(item)'>
          </div>
          <div class="imgitem small" v-if="art.imgsPaht.length === 8"></div>
  	    </div>
        <!-- 视频 -->
        <div class="video-box" v-if="art.articleType === 2">
          <video class="video-player" controls :src="art.videoPath"></video>
        </div>
  	    <div class="ctrls">
  	      <div class="ctrl">
  	        <img class="ib-middle" src="~/assets/img/Icons/ic_dianzan_g_18x18@2x.png" />
  	        <span class="ib-middle">{{ art.likeNumber }}</span>
  	      </div>
  	      <div class="ctrl">
  	        <img class="ib-middle" src="~/assets/img/Icons/ic_pinglun_g_18x18@2x.png" />
  					<span class="ib-middle">{{ art.commentNumber }}</span>
  	      </div>
  	      <div class="ctrl">
  	        <img class="ib-middle" src="~/assets/img/Icons/ic_liulang_g_18x18@2x.png" />
  	      	<span class="ib-middle">{{ art.readNumber }}</span>
  	      </div>
  	    </div>
      </a>
	  </article>
	</div>
</template>
<script>
export default {
  props: {
    artlist: {
      type: Array,
      default: []
    }
  },
  methods: {
    setImgUrl (url) {
      return url.indexOf('imageslim') !== -1 ? url.split('?')[0] + '?imageView2/5/w/480/h/480' : url + '?imageView2/5/w/480/h/480'
    }
  }
}
</script>
<style lang="less" scoped>
article {
  background: #FBFBFB;
  border-radius: 8px;
  min-height: 50px;
  border: 1PX solid #EAEAEA;
  padding: 15px 20px 20px;
  overflow: hidden;
  margin-bottom: 30px;
  font-size: 0;

  h3 {
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }

  .time {
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 12px;
    margin: 10px 0;
    position: relative;
    padding-left: 20px;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 14px;
      height: 14px;
      margin-top: -7px;
      background-image: url('~/assets/img/Icons/ic_time_g_14x14@2x.png');
      .bg_cover;
    }
  }

  .tips {
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 12px;
    margin: 10px 0;
    &_one {
      margin-right: 10px;
    }
  }

  .artcon {
    margin: 10px 0;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    &>p {
      width: 100%;
    }
    img {
      display: inline-block;
      max-width: 100%;
    }
  }

  .imglist {
    margin: 10px 0;
    .flex_between;

    .imgitem {
      border-radius: 8px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      overflow: hidden;
      width: 140px;
      height: 140px;
      margin-bottom: 18px;
      &.big {
        width: 100%;
        height: 150px;
      }
      &.small {
        width: 88px;
        height: 88px;
      }
    }
  }

  .video-box {
    position: relative;
    .video-player {
      width: 100%;
      max-height: 180px;
      border-radius: 5px;
      margin: 10px 0;
    }
  }

  .ctrls {
    display: flex;
    margin-left: -25px;

    .ctrl {
      margin-left: 25px;

      &>img {
      	display: inline-flex;
        width: 18px;
        height: 18px;
      }

      &>span {
      	padding-left: 3px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>