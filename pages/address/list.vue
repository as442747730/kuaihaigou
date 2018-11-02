<template>
  <div class="m-address">

    <div class="m-address-ul">

      <div class="m-address-li" v-for="(item, index) in addressList">
        <div class="top">
          <div class="top-title">{{ item.name }} <span>{{ item.phone }}</span></div>
          <div class="top-desc">{{ String(item.province).split(',')[0] + String(item.city).split(',')[0] + String(item.district).split(',')[0] + String(item.street).split(',')[0] + item.address }}</div>
        </div>
        <div class="bottom">
          <div :class="['u-checkbox', item.ifDefault ? 'active' : '']" @click="setDefault(item)"></div>
          <span @click="setDefault(item)">默认地址</span>
          <div class="icon-label icon-edit active-status" @click="editAddress(item)">编辑</div>
          <div class="icon-label icon-delete active-status" @click="deleteAddress(item)">删除</div>
        </div>
      </div>

    </div>

    <div class="m-address-btn active-status" @click="addAddress">新增收货人</div>

  </div>
</template>

<script>
import api from '~/utils/request'

export default {
  name: 'addressList',
  layout: 'default',

  async asyncData (req) {
    return api.serverGet('/api/shippingAddress/listAll', {}, req).then((res) => {
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

  data () {
    return {
      addressList: []
    }
  },

  methods: {

    async getAddressList () {
      const { code, data } = await api.clientGet('/api/shippingAddress/listAll')
      if (code === 200) {
        this.addressList = data
      }
    },

    async setDefault (val) {
      if (val.ifDefault) return
      const { code, data } = await api.clientPost('/api/shippingAddress/setDefault/' + val.id)
      if (code === 200) {
        this.$toast('设置默认收货地址成功')
        this.getAddressList()
      } else {
        this.$toast(data)
      }
    },

    addAddress () {
      window.location.href = '/address/add'
    },

    editAddress (val) {
      window.location.href = '/address/' + val.id
    },

    deleteAddress (val) {
      this.$dialog.confirm({
        message: '确定删除该收货地址吗？'
      }).then(async () => {
        const { code, data } = await api.clientPost('/api/shippingAddress/delete/' + val.id)
        if (code === 200) {
          this.$toast.success('删除成功')
          this.getAddressList()
        } else {
          this.$toast(data)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/var.less');
.m-address {
  min-height: 100vh;
  background: #F5F5F5;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 50px;
  &-ul {
    padding-bottom: 50px;
  }
  &-li {
    padding-top: 20px;
    padding-left: 20px;
    font-size: 0;
    margin-bottom: 10px;
    background: white;
    .top {
      padding-bottom: 20px;
      border-bottom: 1px solid #F5F5F5;
      &-title {
        font-size: 17px;
        color: @cor_333;
        margin-bottom: 10px;
        font-weight: 500;
        span {
          padding-left: 15px;
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
  &-btn {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #03A1CD;
    color: white;
    font-size: 15px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
