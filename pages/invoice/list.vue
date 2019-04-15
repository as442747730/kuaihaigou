<template>
  <div class="m-invoice">
    <div class="m-invoice-ul">

      <div class="m-invoice-li" v-for="(item, index) in invoiceList">
        <div class="top">
          <div class="top-title font_medium">{{ (item.invoiceType === 1 ? '纸质' : '电子') + (item.headType === 1 ? '个人' : '单位') + '发票' }}<span class="default" v-if="item.ifDefault">默认</span></div>
          <div class="top-desc">抬头：{{ item.head }}</div>
          <div class="top-desc" v-if="item.headType === 2">单位税号：{{ item.taxIdentify }}</div>
          <div class="top-desc">内容：{{ item.contentType === 1 ? '酒水/饮料' : '购物明细' }}</div>
          <div class="top-desc"  v-if="item.invoiceType === 2">收票邮箱：{{ item.email }}</div>
        </div>
      </div>

    </div>

    <div class="bottom-section f-bottom-btn">
      <p class="instruction" @click="gotoInstruction"><van-icon name="info-o" />发票说明</p>
      <div class="m-invoice-btn active-status" @click="getManage">管理</div>
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
      configtitle: '发票信息'
    }
  },

  mounted () {
    console.log(this.invoiceList)
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
    getManage () {
      window.location.href = '/invoice/manage'
    },
    gotoInstruction () {
      window.location.href = '/invoice/instructions'
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
  position: relative;
  box-sizing: border-box;
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
        display: flex;
        align-items: center;
      }
      .default {
        display: block;
        height: 14px;
        box-sizing: border-box;
        font-size: 8px;
        color: #FF5B1F;
        border: 1PX solid #FF5B1F;
        border-radius: 2px;
        margin-left: 10px;
        line-height: 14px;
        padding: 0 3px;
      }
      .type {
        margin-left: 5px;
        display: inline-block;
        font-size: 8px;
        font-weight: 400;
        color: #59C3E1;
        border: 1PX solid #59C3E1;
        border-radius: 2px;
        height: 14px;
        box-sizing: border-box;
        line-height: 14px;
        padding: 0 3px;
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
  .bottom-section {
    border-top: 1PX solid @cor_border;
    width: 100%;
    box-sizing: border-box;
    background: white;
    padding: 15px 20px;
    .instruction {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 13px;
      margin-bottom: 15px;
      color: @nice-blue;
      .van-icon {
        margin-right: 6px;
      }
    }
  }
  &-btn {
    height: 45px;
    border: 1PX solid @nice-blue;
    border-radius: 6px;
    box-sizing: border-box;
    text-align: center;
    line-height: 45px;
    font-size: 15px;
    color: @nice-blue;
    margin-bottom: 15px;
    &:active {
      opacity: 0.8;
    }
  }
}
</style>
