<template>
  <div class="m-page-user">
    <ul class="tab-item">
      <li class="tab-item-list cur">
        <a href="#">Ta的作品</a>
      </li>
      <li class="tab-item-list">
        <a href="#">Ta的收藏</a>
      </li>
      <li class="tab-item-list">
        <a href="#">给Ta的打赏</a>
      </li>
    </ul>
    
  </div>
</template>

<script>
// import { userApi, personApi } from '@/api/users'
// import api from '~/utils/request'
// import { userApi, personApi } from '@/api/users'
import Menu from '@/components/Menu.vue'

export default {
  name: '',

  layout: 'page-with-user',

  head () {
    return {
      title: '个人主页',
      meta: [
        { hid: 'title', name: 'title', content: '个人主页' }
      ]
    }
  },

  // async asyncData (req) {
  //   return api.all([
  //     personApi.serverUserInfo(req.params.uid, null, req), // 获取uid所有者的个人信息
  //     userApi.serverPostInfo() // 获取已登陆用户的个人信息
  //   ])
  //     .then(api.spread(function (res1, res2) {
  //       let uid = req.params.uid
  //       console.log(uid)
  //       console.log(res1)
  //       if (res1.code === 200) {
  //         console.log(res1.data)
  //         if (res2.code === 200) {
  //           if (res2.data.userId === uid) req.redirect('/mine')
  //         }
  //         return {
  //           userInfo: res1.data
  //         }
  //       }
  //     }))
  // },

  components: { Menu },

  data () {
    return {
      menuShow: false,
      articleType: 'article',

      loading: false,

      articleList: [{ id: 1, title: '2017雄狮，Decanter 97分好评，帕克眼中实力一级庄', createdAt: '2018-08-23 14:24:87', imgList: [require('@/assets/img/green_wine.jpg'), require('@/assets/img/green_wine.jpg'), require('@/assets/img/green_wine.jpg')], like: 100, comments: 29, views: 2743694 }],
      signinList: [{}, {}, {}],

      userInfo: {}
    }
  },

  mounted () {
    console.log(this.userInfo)
  },

  methods: {
    refreshArtilce () {
    }
  }
}
</script>

<style lang="less" scoped>
.m-page-user {
  .tab-item {
    font-size: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 0 20px;
    &-list {
      color: #ccc;
      font-size: 13px;
      position: relative;
      padding: 18px 0 14px;
      &.cur {
        color: #333;
        &:after {
          content: '';
          position: absolute;
          width: 20px;
          height: 2px;
          background: #333;
          margin-top: -1px;
          margin-left: -10px;
          left: 50%;
          bottom: 0;
        }
      }
    }
  }
}
</style>
