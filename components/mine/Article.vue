<template>
	<div>
	  <article v-for="(art, index) in artlist" :key="index">
	    <h1>{{ art.title }}</h1>
	    <div class="time">{{ art.createdAt }}</div>
	    <div class="tips">
	      <span class="tips_one">频道：{{ art.channelName }}</span>
	      <span>话题：{{ art.topicName }}</span>
	    </div>
	    <div class="artcon">{{ art.summary }}</div>
	    <div class="imglist" >
	      <div class="imgitem" v-for="(imgs, index) in art.imgsPaht" :key="index">
         <div class="imgitem_bk" :style="{background: `url(${ imgs }) no-repeat center/cover`}"></div>
        </div>
	    </div>
	    <div class="ctrls">
	      <div class="ctrl">
	        <img src="~/assets/img/Icons/ic_dianzan_g_18x18@2x.png" />
	        <span>{{ art.likeNumber }}</span>
	      </div>
	      <div class="ctrl">
	        <img src="~/assets/img/Icons/ic_pinglun_g_18x18@2x.png" />
					<span>{{ art.commentNumber }}</span>
	      </div>
	      <div class="ctrl">
	        <img src="~/assets/img/Icons/ic_liulang_g_18x18@2x.png" />
	      	<span>{{ art.readNumber }}</span>
	      </div>
	    </div>
	  </article>
	</div>
</template>
<script>
import { userApi } from '~/api/users'
export default {
  props: {
    artlist: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      artArr: []
    }
  },
  mounted () {
  },
  methods: {
    async getArts () {
      let params = { page: 1, count: 10 }
      const { code, data } = await userApi.getArticle(params)
      if (code === 200) {
        console.log('data', data)
        if (data && data.array) {
          this.artArr = data.array
        }
      }
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

  &>h1 {
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
      width: 88px;
      height: 88px;
      border-radius: 8px;
      background: #60aff5;
      &>div {
        width: 100%;
        height: 100%;
      }
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