<template>
  <div class="m-page-user">
    <tab :uid='uid' :index='0'></tab>
    <div class="model-item">
      <a :href="'/user?uid=' + uid">知识分享</a>
      <a :href="'/user/drink?uid=' + uid" class="cur">酒坛诗社</a>
      <a href="javascript:void(0)"></a>
    </div>
    
    <div class="jarsclub">
      <div class="jars" v-for="(item, index) in signData" :key="index">
        <div class="jars-l">
          <p class="jars-l_d">{{ item.dd }}</p>
          <div class="jars-l_ym">{{ item.yymm }}</div>
        </div>
        <div class="jars-r">
          <div class="tip font_hight" v-if='item.checkSign'>酒坛诗社</div>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>

    <div class='more-loading' v-show='pageLoding'>
      <van-loading type="spinner" />
      <p>正在加载更多</p>
    </div>

    <div class="no-more" v-show='pageEmpty'>
      <p>没有更多内容了！</p>
    </div>

  </div>
</template>

<script>
import { personApi } from '@/api/users'
import Tab from '@/components/user/Tab.vue'

export default {
  name: '',

  layout: 'page-with-user',

  components: { Tab },

  head () {
    return {
      title: '个人主页_酒坛诗社',
      meta: [
        { hid: 'title', name: 'title', content: '个人主页_酒坛诗社' }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await personApi.serverUserSign({ page: 1, count: 5, userId: req.query.uid, flag: false })
    if (code === 200) {
      console.log(data)
      let pageEmpty = false
      pageEmpty = data.total <= 5
      let s = {}
      if (data.array) {
        s = data.array.map(v => {
          let { content, createdAt, checkSign } = v
          let date = new Date(createdAt)
          let yy = date.getFullYear()
          let mm = date.getMonth() + 1
          let dd = date.getDate()
          let yymm = yy + '/' + mm
          return { checkSign, content, yymm, dd }
        })
      }
      return {
        uid: req.query.uid || null,
        signData: s,
        pageEmpty: pageEmpty
      }
    }
  },

  data () {
    return {
      uid: null, // 用户id
      signData: [],

      pageEmpty: false,
      page: 1, // 当前页
      pageLoding: false // 加载ing
    }
  },

  mounted () {
    console.log(this.signData)
    window.addEventListener('scroll', this.handleScroll(() => {
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.windowHeight >= this.scrollHeight - 200 && !this.pageLoding && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    }))
  },

  methods: {
    async getData (page, needClear = false) {
      this.pageLoding = true
      const { code, data } = await personApi.paginateUserSign({ page: page, count: 5, userId: this.uid, flag: false })
      if (code === 200 && data.array) {
        let s = data.array.map(v => {
          let { content, createdAt, checkSign } = v
          let date = new Date(createdAt)
          let yy = date.getFullYear()
          let mm = date.getMonth() + 1
          let dd = date.getDate()
          let yymm = yy + '/' + mm
          return { checkSign, content, yymm, dd }
        })
        if (needClear) {
          this.signData = s
        } else {
          this.signData.push(...s)
        }
        this.pageEmpty = this.page * 5 >= data.total
      } else {
        this.pageEmpty = true
      }
      this.pageLoding = false
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 150)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.model-item {
  padding: 15px 20px!important;
  background: #F5F5F5;
  display: block!important;
  a:first-child {
    margin-right: 35px;
  }
}
.jars {
  display: flex;
  padding: 25px 20px;
  border-bottom: 1px solid @cor_border;

  .jars-l {
    display: flex;
    flex-direction: column;
    width: 65px;
    height: 73px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    // background: -webkit-linear-gradient(135deg, #4FEDEF, #00A1F0);
    // background: -o-linear-gradient(135deg, #4FEDEF, #00A1F0);
    // background: -moz-linear-gradient(135deg, #4FEDEF, #00A1F0);
    // background: linear-gradient(135deg, #4FEDEF, #00A1F0);
    background:linear-gradient(334deg,rgba(0,161,240,1) 0%,rgba(79,237,239,1) 100%);

    &_d {
      font-size: 30px;
      color: #fff;
      line-height: 30px;
      text-align: center;
    }

    &_ym {
      font-size: 12px;
      color: #fff;
      line-height: 12px;
      text-align: center;
      padding-top: 7px;
      margin-top: 3px;
      border-top: 1PX solid #fff;
    }
  }

  .jars-r {
    flex: 1;
    padding-left: 15px;
    height: 73px;
    .tip {
      width: 60px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #03A1CD;
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 4px;
      border-radius: 2PX;
    }

    &>p {
      width: 100%;
      font-size: 14px;
      color:#666;
      line-height: 24px;
      word-break: break-all;
      overflow : hidden;
      text-overflow: ellipsis;
      display:-webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
