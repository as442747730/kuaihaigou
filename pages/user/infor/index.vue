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
      <div class="user-infor-item">
        <span class="ib-middle">XX认证</span>
        <div class="ib-middle">
          <p>广州XX公司</p>
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
          <p>{{ inforData.userInfo.residenceProvince + inforData.userInfo.residenceCity }}</p>
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
      inforData: []
    }
  },

  mounted () {
    console.log(this.inforData)
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
    font-size: 15px;
    border-bottom: 1px solid #f1f1f1;
    &:last-child {
      border-bottom: 0;
    }
    span {
      color: #666;
      width: 60px;
      text-align: left;
      margin-right: 30px;
    }
    div {
      max-width: 240px;
    }
    p {
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
      font-size: 15px;
      display: block;
      color: #333;
      padding: 5px 0 25px;
      border-bottom: 1px solid #f1f1f1;
    }
  }
}
</style>
