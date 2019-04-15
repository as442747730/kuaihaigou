<template>
  <div class="article-item">
    <div class="author-info">
      <a :href="`/user?uid=${item.userResp.id}`" style="display: block;"><div class="avatar" :style="'background-image: url(' + (item.userResp.headimgurl ? item.userResp.headimgurl : require('~/assets/img/defaultImg.png')) + ')'"></div></a>
      <span class="nickname">{{ item.userResp.nickname }}</span>
      <user-lab :level='String(item.userResp.userGradeNumber)' type='1' :profess='String(item.userResp.category)'></user-lab>
    </div>
    <div class="article-cover">
      <img v-if="item.articleType === 1 && item.imgsPaht && item.imgsPaht.length !== 0" :src="item.imgsPaht[0]" class="cover-img" alt="">
      <img v-if="item.articleType === 1 && (!item.imgsPaht || item.imgsPaht.length === 0)" class="cover-img" :src="require('~/assets/img/shareDefault.png')" alt="">
      <video v-if="item.articleType === 2" class="cover-img" ref="refvideo" controls :src="item.videoPath">
        <source :src="item.videoPath" type="video/mp4">
      </video>
    </div>
    <div class="content" @click="gotodetail(item)">
      <p class="content-title" style="-webkit-box-orient: vertical;">{{ item.title }}</p>
      <p class="content-desc">
        <span>频道：{{ ['经验/知识', '美食/周边'][item.channelNumber - 1] }}</span>
        <span>话题：{{ item.topicName }}</span>
      </p>
      <p class="content-date">{{ item.createdAt }}</p>
      <div class="content-bottom">
        <div class="left">
          <span class="sub like">{{ item.likeNumber }}</span>
          <span class="sub msg">{{ item.commentNumber }}</span>
          <span class="sub view">{{ item.readNumber }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userLab from '@/components/Usericon.vue'

export default {
  components: { userLab },
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
    }
  },
  methods: {
    gotodetail (val) {
      window.location.href = `/knowledge/detail/${val.id}?type=${val.articleType}`
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  border-radius: 8px;
  .author-info {
    padding-left: 20px;
    padding-bottom: 20px;
    border: 1PX solid #EAEAEA;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 10px 15px 10px 10px;
    display: flex;
    align-items: center;
    .avatar {
      width: 25px;
      height: 25px;
      border-radius: 100%;
      overflow: hidden;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .nickname {
      flex: 1;
      font-size: 13px;
      font-weight: bold;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 10px;
    }
  }
  .article-cover {
    width: 335px;
    height: 200px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
    .cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    padding-top: 10px;
    &-title {
      font-size: 15px;
      color: @cor_333;
      font-weight: bold;
      line-height: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-desc {
      margin-top: 13px;
      font-size: 12px;
      color: @cor_666;
      span:first-child {
        margin-right: 20px;
      }
    }
    &-date {
      margin-top: 10px;
      font-size: 12px;
      color: @cor_999;
      padding-left: 18px;
      background-image: url(~assets/img/me/icon-clock.png);
      background-position: left center;
      background-size: 14px 14px;
      background-repeat: no-repeat;
    }
    &-bottom {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .sub {
          padding-left: 21px;
          font-size: 12px;
          line-height: 18px;
          color: @cor_999;
          background-position: left center;
          background-repeat: no-repeat;
          background-size: 18px 18px;
          & + .sub {
            margin-left: 25px;
          }
          &.like {
            background-image: url(~assets/img/knowledge/icon-like.png);
          }
          &.msg {
            background-image: url(~assets/img/knowledge/icon-msg.png);
          }
          &.view {
            background-image: url(~assets/img/knowledge/icon-view.png);
          }
        }
      }
      .more {
        width: 30px;
        height: 30px;
        background-image: url(~assets/img/knowledge/icon-more.png);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
  padding-bottom: 20px;
}
</style>