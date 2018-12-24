<template>
  <div class="m-address-list">
    <com-head :titleConfig="configtitle" @headRigfn="goManage">
      <div>管理</div>
    </com-head>
    <van-pull-refresh v-model="refresing" @refresh="getRefresh">

      <div class="address-ul">
        <div class="address-item" v-for="item in list" :key="item.id">
          <div class="title">
            <span class="contxt">{{ item.name }}</span><span class="contxt">{{ item.phone }}</span><span class="default" v-if="item.ifDefault">默认</span>
          </div>
          <p class="address">{{item.province | formatPlace }}{{item.city | formatPlace }}{{item.district | formatPlace }}{{item.street | formatPlace }}{{item.address}}</p>
        </div>
      </div>

    </van-pull-refresh>

    <!-- <div class="btn-section">
      <div class="btn-manage" @click="goManage">管理</div>
    </div> -->

  </div>
</template>

<script>
import { addressApi } from '~/api/address'
import comHead from '~/components/com-head'

export default {
  name: 'addressList',

  layout: 'default',

  head () {
    return {
      title: '收货地址',
      meta: [
        { hid: 'title', name: 'title', content: '收货地址' }
      ]
    }
  },
  components: {
    comHead
  },
  async asyncData (req) {
    return addressApi.getAddressList(req).then((res) => {
      console.log(res)
      if (res.code === 506) {
        req.redirect('/account/login')
      }
      if (res.code === 200) {
        return { list: res.data }
      } else {
        req.redirect('/error')
      }
    })
  },

  data () {
    return {
      refresing: false,
      list: [],
      configtitle: '收货地址'
    }
  },

  methods: {
    async getRefresh () {
      this.refresing = true
      const { code, data } = await addressApi.getAddressListClient()
      if (code === 200) {
        this.list = data
        this.refresing = false
      }
    },
    goManage () {
      window.location.href = '/address/manage'
    }
  }
}
</script>

<style lang="less" scoped>
.m-address-list {
  min-height: 100vh;
  .address-ul {
    min-height: 100vh;
  }
  .address-item {
    padding: 25px 20px 15px 20px;
    .title {
      display: flex;
      align-items: center;
      .contxt {
        font-size: 17px;
        color: @cor_333;
        font-weight: bold;
        line-height: 1;
        margin-right: 15px;
      }
      .default {
        display: inline-block;
        font-size: 9px;
        font-weight: 400;
        color: #FF5B1F;
        border: 1PX solid #FF5B1F;
        border-radius: 2px;
        height: 14px;
        box-sizing: border-box;
        line-height: 14px;
        padding: 0 3px;
      }
    }
    & + .address-item {
      border-top: 1PX solid @cor_border;
    }
    .address {
      margin-top: 10px;
      font-size: 13px;
      color: @cor_666;
      line-height: 23px;
    }
  }
  .btn-section {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    background: white;
    left: 0;
    padding: 15px 20px;
    .btn-manage {
      height: 45px;
      border: 1PX solid @nice-blue;
      border-radius: 6px;
      box-sizing: border-box;
      text-align: center;
      line-height: 45px;
      font-size: 15px;
      color: @nice-blue;
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
