<template>
  <div class="m-knowledge">

    <tab-select></tab-select>

    <van-pull-refresh class="van-pull" v-model="refreshing">
      <div class="article-ul">

        <div class="article-item" v-for="item in articleList" :key="item.id">
          <div class="author-info">
            <div class="avatar" v-lazy:background-image="item.userResp.headimgurl"></div>
          </div>
          <div class="content">

          </div>
        </div>

      </div>
    </van-pull-refresh>

  </div>
</template>

<script>
import api from '~/utils/request'
import TabSelect from '@/components/knowledge/TabSelect.vue'

export default {
  name: 'knowledge',

  layout: 'page-with-tabbar',

  components: { TabSelect },

  head () {
    return {
      title: '知识分享',
      meta: [
        { hid: 'title', name: 'title', content: '知识分享' }
      ]
    }
  },

  async asyncData (req) {
    return api.serverGet('/api/sk/paginate', { page: 1, count: 10, channelNumber: req.query.channel, topicId: req.query.topic, typeId: req.query.type, varietyId: req.query.variety }, req).then(res => {
      console.log(res.data.array)
      if (res.code === 200) {
        return { articleList: res.data.array }
      } else {
        req.redirect('/error')
      }
    })
  },

  data () {
    return {
      refreshing: false,
      currentPage: 1,
      articleList: []
    }
  }
}
</script>

<style lang="less" scoped>
.m-knowledge {
  min-height: 100vh;
  background: @cor_border;
  -webkit-overflow-scrolling: touch;
  .van-pull {
    .article-ul {
      min-height: calc(100vh - 76px);
      box-sizing: border-box;
      background: white;
      padding: 20px;
      .article-item {
        border-radius: 8px;
        border: 1PX solid #EAEAEA;
        padding: 20px 20px 20px 0;
        .author-info {
          padding-left: 20px;
          padding-bottom: 20px;
          border-bottom: 1PX solid #EAEAEA;
          .avatar {
            width: 40px;
            height: 40px;
            border: 100%;
            overflow: hidden;
          }
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
