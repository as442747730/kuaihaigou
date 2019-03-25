<template>
  <div class="hotspot-detail">
    <div class="details">
      <h1 class="head">{{articles.title}}</h1>
      <div class="infos">
        <div class="infos-sub">
          作者：<span class="sub_child">{{articles.author || '佚名'}}</span>
        </div>
        <div class="infos-sub" v-if="articles.sourceAddress || articles.sourceAuthor">来源：
          <a v-if='articles.sourceAddress && articles.sourceAuthor' :href="articles.sourceAddress">{{ articles.sourceAuthor }}</a>
          <a v-if='articles.sourceAddress && !articles.sourceAuthor' :href="articles.sourceAddress">链接</a>
          <a v-if='!articles.sourceAddress && articles.sourceAuthor' href="javascript:void(0)">{{ articles.sourceAuthor }}</a>
        </div>
        <div class="infos-sub" v-if="articles.classificationId >= 0">分类：{{circlenavList[articles.classificationId]}}</div>
      </div>
      <div class="labels">
        <span
          class="labels_item"
          v-for="(lab, labIndex) in articles.labels"
          :key="labIndex" @click="tolabel(lab)">{{lab.labelName}}</span>
      </div>
      <div class="summery">{{articles.summary}}</div>
      <div class="video-box" v-if="articles.videoSharingPath">
        <video class="video-player" controls :src="articles.videoSharingPath"></video>
      </div>
      <article class="article content-wrapper" v-html="articles.content"></article>
    </div>
    <!--
      文章评论
      type -> 文章类型
      articelId -> 文章id
      ifLike -> 是否喜欢
      ifCollect -> 是否收藏
    -->
    <articel-comment type='2' :articelId='id' :ifLike='ifLike' :ifCollect='ifCollect'></articel-comment>
  </div>
</template>
<script>
import { newApi } from '~/api/news'
import articelComment from '@/components/articel/Comment'
export default {
  head () {
    return {
      title: '行业热点',
      meta: [
        { hid: 'title', name: 'title', content: '行业热点' }
      ]
    }
  },

  components: { articelComment },

  async asyncData (req) {
    const detailId = req.params.id
    const articleFn = newApi.serverArticle(detailId)
    const { code: artcleCode, data: articleData } = await articleFn
    if (artcleCode === 200) {
      return { articles: articleData, id: detailId, ifLike: articleData.checkIfLike, ifCollect: articleData.checkIfCollect }
    }
  },
  data () {
    return {
      id: null,
      articles: {},
      ifLike: false,
      ifCollect: false,
      circlenavList: ['这些圈子都在看', '行业热点', '培训讲座', '企业招商']
    }
  },
  created () {
    console.log(this.articles)
  },
  methods: {
    tolabel (label) {
      window.location.href = `/hotspot/label/${label.id}`
    }
  }
}
</script>
<style lang="less">
.hotspot-detail {
  padding-bottom: 50px;
}
.details {
  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;

  .head {
    padding: 30px 0 10px;
    font-size: 19px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .infos {
    display: flex;
    align-items: center;
    padding-top: 10px;
    flex-wrap: wrap;

    &-sub {
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: #999999;
      line-height: 12px;
      max-width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-right: 20px;
      margin-top: 10px;
      line-height: 14px;
      & + .infos-sub + .infos-sub {
        padding-right: 0;
      }
      .sub_child {
        color: #999999;
      }
    }
  }

  .labels {
    margin-left: -10px;

    &_item {
      margin-top: 10px;
      display: inline-block;
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 12px;
      padding: 5px 10px;
      border-radius: 20px;
      border: 1PX solid #999999;
      margin-left: 10px;
    }
  }

  .summery {
    margin-top: 20px;
    padding: 15px;
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 25px;
    background: #FCFCFC;
    border: 1PX solid #F1F1F1;
    border-radius: 4px;
  }

  .video-box {
  	margin-top: 20px;
    position: relative;
    .video-player {
      width: 100%;
      height: auto;
      border-radius: 5px;
    }
  }

  .article {
    margin-top: 20px;
    // font-size: 12px;
    // font-weight: 500;
    // font-family: PingFang-SC-Medium;
    // color: rgba(153, 153, 153, 1);
    line-height: 25px;
    .fl {
    	float: none !important;
    }
    form {
    	display: block !important;
    }
    img {
    	display: inline-block;
    	max-width: 100%;
    	height: auto;
    }
  }

  .picture {
    margin-top: 20px;
    width: 100%;

    &_img {
      display: inline-block;
      width: 100%;
      height: auto;
      border-radius: 10px;
    }
  }
}
</style>