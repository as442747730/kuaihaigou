<template>
  <div class="m-address">
    <com-head :titleConfig="configtitle"></com-head>
    <van-pull-refresh class="van-pull" v-model="refresing" @refresh="getRefresh">
      <div class="m-address-ul">

        <div class="m-address-li" v-for="(item, index) in addressList" :key="item.id">
          <div class="top">
            <div class="top-title">{{ item.name }} <span>{{ item.phone }}</span><span class="default" v-if="item.ifDefault">默认</span><span class="type">{{ item.addressType === 1 ? '家' : item.addressType === 2 ? '公司' : '其他' }}</span></div>
            <div class="top-desc">{{item.province | formatPlace }}{{item.city | formatPlace }}{{item.district | formatPlace }}{{item.street | formatPlace }}{{item.address}}</div>
          </div>
          <div class="bottom">
            <div :class="['u-checkbox', item.ifDefault ? 'active' : '']" @click="setDefault(item.id)"></div>
            <span @click="setDefault(item)">默认地址</span>
            <div class="icon-label icon-edit active-status" @click="editAddress(item)">编辑</div>
            <div class="icon-label icon-delete active-status" @click="deleteAddress(item.id)">删除</div>
          </div>
        </div>

        <div class="placeholder" v-if="addressList.length === 0">尚无收货地址</div>

      </div>
    </van-pull-refresh>

    <div class="f-bottom-btn">
      <div class="m-address-btn active-status" @click="addAddress">新增收货地址</div>
    </div>

  </div>
</template>

<script>
import { addressApi } from '~/api/address'
import comHead from '~/components/com-head'

export default {
  name: 'addressList',
  layout: 'default',

  async asyncData (req) {
    return addressApi.getAddressList(req).then((res) => {
      console.log(res)
      if (res.code === 506) {
        req.redirect('/account/login')
      }
      if (res.code === 200) {
        return { addressList: res.data }
      } else {
        req.redirect('/error')
      }
    })
  },

  head () {
    return {
      title: '收货地址管理',
      meta: [
        { hid: 'title', name: 'title', content: '收货地址管理' }
      ]
    }
  },

  components: {
    comHead
  },

  data () {
    return {
      refresing: false,
      addressList: [],
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

    async getAddressList () {
      const { code, data } = await addressApi.getAddressListClient('/api/shippingAddress/listAll')
      if (code === 200) {
        this.addressList = data
      }
    },

    async setDefault (val) {
      if (val.ifDefault) return
      const { code, data } = await addressApi.setDefault(val)
      if (code === 200) {
        this.$toast('设置默认收货地址成功')
        this.getAddressList()
      } else {
        this.$toast(data)
      }
    },

    addAddress () {
      if (this.$route.query.from === 'submit') {
        window.location.href = '/address/add?from=submit'
      } else {
        window.location.href = '/address/add'
      }
    },

    editAddress (val) {
      if (this.$route.query.from === 'submit') {
        window.location.href = '/address/' + val.id + '?from=submit'
      } else {
        window.location.href = '/address/' + val.id
      }
    },

    deleteAddress (val) {
      this.$dialog.confirm({
        message: '确定删除该收货地址吗？'
      }).then(async () => {
        const { code, data } = await addressApi.deleteAddress(val)
        if (code === 200) {
          this.$toast.success('删除成功')
          this.getAddressList()
        } else {
          this.$toast(data)
        }
      })
    },
    successFn () {
      if (this.$route.query.from === 'submit') {
        window.location.href = '/order/submit'
      } else {
        window.location.href = '/address/list'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-address {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: @cor_border;
  position: relative;
  box-sizing: border-box;
  .van-pull {
    flex: 1;
  }
  &-ul {
    padding-bottom: 50px;
    box-sizing: border-box;
    overflow: scroll;
    height: ~'calc(100vh - 46px)'
  }
  &-li {
    padding-top: 20px;
    padding-left: 20px;
    font-size: 0;
    margin-bottom: 10px;
    background: white;
    .top {
      padding-bottom: 20px;
      border-bottom: 1PX solid @cor_border;
      &-title {
        font-size: 17px;
        color: @cor_333;
        margin-bottom: 10px;
        font-weight: 500;
        span {
          vertical-align: middle;
          padding-left: 15px;
          &:nth-child(2) {
            margin-left: 10px;
          }
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
        .type {
          margin-left: 5px;
          display: inline-block;
          font-size: 0.24rem;
          font-weight: 400;
          color: #59C3E1;
          border: 1PX solid #59C3E1;
          border-radius: 0.05333rem;
          height: 0.37333rem;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          line-height: 0.37333rem;
          padding: 0 0.08rem;
        }
      }
      &-desc {
        font-size: 13px;
        color: @cor_666;
        line-height: 23px;
      }
    }
    .bottom {
      padding: 15px 0;
      display: flex;
      align-items: center;
      color: @cor_999;
      font-size: 13px;
      padding-right: 20px;
      span {
        flex: 1;
        padding-left: 10px
      }
      .icon-label {
        height: 22px;
        line-height: 22px;
        background-position: left center;
        background-repeat: no-repeat;
        background-size: contain;
        padding-left: 24px;
        &.icon-edit {
          background-image: url('../../assets/img/order/icon-edit.png');
        }
        &.icon-delete {
          background-image: url('../../assets/img/order/icon-delete.png');
          margin-left: 25px;
        }
      }
    }
  }
  .placeholder {
    font-size: 14px;
    color: @cor_999;
    text-align: center;
    padding-top: 60px;
    padding-bottom: 30px;
  }
  &-btn {
    height: 50px;
    width: 100%;
    background: #03A1CD;
    color: white;
    font-size: 15px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
