<template>
  <div class="m-invoice">
    <div class="m-invoice-ul">

      <div class="m-invoice-li" v-for="(item, index) in invoiceList">
        <div class="top">
          <div class="top-title font_medium">{{ (item.invoiceType === 1 ? '纸质' : '电子') + (item.headType === 1 ? '个人' : '单位') + '发票' }}</div>
          <div class="top-desc">抬头：{{ item.head }}</div>
          <div class="top-desc" v-if="item.headType === 2">单位税号：{{ item.taxIdentify }}</div>
          <div class="top-desc">内容：{{ item.contentType === 1 ? '酒水/饮料' : '购物明细' }}</div>
          <div class="top-desc"  v-if="item.invoiceType === 2">收票邮箱：{{ item.email }}</div>
        </div>
        <div class="bottom">
          <div :class="['u-checkbox', item.ifDefault ? 'active' : '']" @click="setDefault(item)"></div>
          <span>默认发票</span>
          <div class="icon-label icon-edit active-status" @click="editInvoice(item)">编辑</div>
          <div class="icon-label icon-delete active-status" @click="deleteInvoice(item)">删除</div>
        </div>
      </div>

    </div>

    <div class="f-bottom-btn" v-show='invoiceList.length <= 4'>
      <div class="m-invoice-btn active-status" @click="addInvoice">添加发票信息</div>
    </div>

  </div>
</template>
<script>
import api from '~/utils/request'

export default {
  name: 'invoice',
  layout: 'default',

  head () {
    return {
      title: '发票信息管理',
      meta: [
        { hid: 'title', name: 'title', content: '发票信息管理' }
      ]
    }
  },

  async asyncData (req) {
    return api.serverGet('/api/invoice/listAll', {}, req)
      .then((res) => {
        if (res.code === 506) {
          req.redirect('/account/login')
        }
        if (res.code === 200) {
          console.log(res.data)
          return { invoiceList: res.data }
        }
      })
  },

  data () {
    return {
      invoiceList: [],
      configtitle: '选择发票信息'
    }
  },

  methods: {
    async getInvoiceList () {
      const { code, data } = await api.clientGet('/api/invoice/listAll')
      if (code === 200) {
        this.invoiceList = data
      }
    },
    addInvoice () {
      if (this.$route.query.from === 'submit') {
        window.location.href = '/invoice/add?from=submit'
      } else {
        window.location.href = '/invoice/add'
      }
    },
    editInvoice (val) {
      if (this.$route.query.from === 'submit') {
        window.location.href = '/invoice/' + val.id + '?from=submit'
      } else {
        window.location.href = '/invoice/' + val.id
      }
    },

    async setDefault (val) {
      console.log(val)
      if (val.ifDefault) return
      const { code, data } = await api.clientPost('/api/invoice/setDefault/' + val.id, { shippingAddressId: val.id })
      if (code === 506) {
        window.location.href = '/account/login'
      }
      if (code === 200) {
        this.$toast('设置默认发票成功')
        this.getInvoiceList()
      } else {
        this.$toast(data)
      }
    },

    deleteInvoice (val) {
      this.$dialog.confirm({
        message: '确定删除该发票信息吗？'
      }).then(async () => {
        const { code, data } = await api.clientPost('/api/invoice/delete/' + val.id)
        if (code === 506) {
          window.location.href = '/account/login'
        }
        if (code === 200) {
          this.$toast.success('删除成功')
          this.getInvoiceList()
        } else {
          this.$toast(data)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.m-invoice {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: @cor_border;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 50px;
  padding-top: 45px;
  &-ul {
    flex: 1;
    overflow: scroll;
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
        font-weight: bold;
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
    position: fixed;
    bottom: 0;
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
