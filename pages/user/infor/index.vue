<template>
  <div class="m-page-user">
    <tab :uid='uid' :index='3'></tab>
    <div class="user-infor">
      <div class="user-infor-item">
        <span class="ib-middle">昵称</span>
        <div class="ib-middle">
          <p>{{ inforData.nickname }}</p>
        </div>
      </div>
      <div class="user-infor-item" v-if='inforData.name || professTitle'>
        <span class="ib-middle">{{ proveTxt[inforData.certCategory - 1] }}</span>
        <div class="ib-middle">
          <p>{{ inforData.name || professTitle }}</p>
        </div>
      </div>
      <div class="user-infor-item">
        <span class="ib-middle">性别</span>
        <div class="ib-middle">
          <p>{{ inforData.userInfo.sexName }}</p>
        </div>
      </div>
      <div class="user-infor-item">
        <span class="ib-middle">生日</span>
        <div class="ib-middle">
          <p>{{ inforData.userInfo.birhday }}</p>
        </div>
      </div>
      <div class="user-infor-item">
        <span class="ib-middle">居住地</span>
        <div class="ib-middle">
          <p>{{ inforData.userInfo.residenceProvince + inforData.userInfo.residenceCity === '保密' ? '' : inforData.userInfo.residenceCity }}</p>
        </div>
      </div>
      <div class="user-infor-item">
        <span class="ib-middle">微信号</span>
        <div class="ib-middle">
          <p>{{ inforData.userInfo.wechat }}</p>
        </div>
      </div>
      <div class="user-infor-item">
        <span class="ib-middle">QQ号</span>
        <div class="ib-middle">
          <p>{{ inforData.userInfo.qq }}</p>
        </div>
      </div>
      <div class="user-infor-item">
        <span class="ib-middle">个性签名</span>
        <div class="ib-middle">
          <p>{{ inforData.signature }}</p>
        </div>
      </div>
    </div>
    <div class="depart-line"></div>
    <div class="user-infor-other">
      <span>什么时候开始喝葡萄酒</span>
      <strong class="font_hight">{{ inforData.userInfo.wineWhen || '暂无信息' }}</strong>
    </div>
    <div class="user-infor-other">
      <span>最喜欢什么产区的葡萄酒</span>
      <strong>{{ inforData.userInfo.wineArea || '暂无信息' }}</strong>
    </div>
    <div class="user-infor-other">
      <span>最喜欢什么品种的葡萄酒</span>
      <strong>{{ inforData.userInfo.wineVariety || '暂无信息' }}</strong>
    </div>
    <div class="user-infor-other">
      <span>每个月喝多少瓶葡萄酒</span>
      <strong>{{ inforData.userInfo.wineHowMany || '暂无信息' }}</strong>
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
      title: '个人主页_个人信息',
      meta: [
        { hid: 'title', name: 'title', content: '个人主页_个人信息' }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await personApi.serverUserInfo(req.query.uid, req)
    if (code === 200) {
      return {
        uid: req.query.uid || null,
        inforData: data
      }
    }
  },

  data () {
    return {
      uid: null, // 用户id
      inforData: [],
      proveTxt: ['专业认证', '自媒体认证', '官方认证'],
      professTxt: [
        {key: 'CMS_IS', title: 'CMS一级(IS)'},
        {key: 'CMS_CS', title: 'CMS二级(CS)'},
        {key: 'CMS_AS', title: 'CMS三级(AS)'},
        {key: 'CMS_MS', title: 'MS'},
        {key: 'WSRT_2ND', title: 'WSET二级'},
        {key: 'WSRT_3TH', title: 'WSET三级'},
        {key: 'WSRT_DIP', title: 'WSET Diploma'},
        {key: 'WSRT_MW', title: 'MW'},
        {key: 'ISG_2ND', title: 'ISG二级侍酒师'},
        {key: 'ISG_3TH', title: 'ISG三级侍酒师'},
        {key: 'ISG_DIP', title: 'ISG Diploma'},
        {key: 'STATE_3TH', title: '国家三级品酒师'},
        {key: 'STATE_2ND', title: '国家二级品酒师'},
        {key: 'STATE_1ST', title: '国家一级品酒师'},
        {key: 'OTHER', title: '其他'}
      ],
      professTitle: ''
    }
  },

  mounted () {
    console.log(this.inforData)
    if (this.professTxt.find(v => v.key === this.inforData.category)) {
      this.professTitle = this.professTxt.find(v => v.key === this.inforData.category).title
    }
  },

  methods: {
  }
}
</script>

<style lang="less" scoped>
.user-infor {
  padding: 0 20px;
  &-item {
    padding: 25px 0px;
    font-size: 13px;
    border-bottom: 1PX solid #f1f1f1;
    &:last-child {
      border-bottom: 0;
    }
    span {
      color: #666;
      width: 70px;
      text-align: left;
      margin-right: 30px;
    }
    div {
      max-width: 240px;
    }
    p {
      max-width: 230px;
      color: #333;
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  &-other {
    padding: 0 20px;
    overflow: hidden;
    &:last-child {
      margin-bottom: 40px;
    }
    span {
      font-size: 13px;
      color: #999;
      display: block;
      margin-top: 25px;
    }
    strong {
      font-size: 13px;
      display: block;
      color: #333;
      padding: 10px 0 25px;
      border-bottom: 1PX solid #f1f1f1;
    }
  }
}
</style>
