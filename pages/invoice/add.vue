<template>
  <div class="m-invoice-add">
    <div class="m-invoice-add-cell">
      <div class="title">发票类型</div>
      <div class="checkbox-wrapper">
        <div :class="['checkbox-box', invoiceType === 2 ? 'active' : '']" @click="handleSelectInvoiceType(2)">电子普通发票</div>
        <div :class="['checkbox-box', invoiceType === 1 ? 'active' : '']" @click="handleSelectInvoiceType(1)">纸质普通发票</div>
      </div>
      <transition name="nav-fade">
        <p class="tip" v-if="invoiceType === 2">电子发票即电子增值税发票，是税局认可的有效凭证，其法律效力、基本用途及使用规定同纸质发票。</p>
      </transition>
    </div>

    <div class="m-invoice-add-cell">
      <div class="title">抬头类型</div>
      <div class="checkbox-wrapper">
        <div :class="['checkbox-box', headType === 1 ? 'active' : '']" @click="handleSelectHeadType(1)">个人</div>
        <div :class="['checkbox-box', headType === 2 ? 'active' : '']" @click="handleSelectHeadType(2)">单位</div>
      </div>
    </div>

    <div class="m-invoice-add-form">
      <div class="m-invoice-add-form-item">
        <div class="item-label">发票抬头</div>
        <div class="item-content">
          <input v-model="head" placeholder="请输入发票抬头"></input>
        </div>
      </div>
      <transition name="nav-fade">
        <div class="m-invoice-add-form-item" v-if="headType === 2">
          <div class="item-label">单位税号</div>
          <div class="item-content">
            <input v-model="taxIdentify" placeholder="请输入单位税号"></input>
          </div>
        </div>
      </transition>
      <div class="m-invoice-add-form-item">
        <div class="item-label">发票内容</div>
        <div class="item-content">
          <input v-model="contentText" readonly placeholder="请选择发票内容" @click="handleSelect"></input>
          <i class="icon-arrow"></i>
        </div>
      </div>
    </div>

    <transition name="nav-fade">
      <div class="m-invoice-add-form" v-if="invoiceType === 2">
          <div class="m-invoice-add-form-item" >
            <div class="item-label">收票邮箱</div>
            <div class="item-content">
              <input v-model="email" placeholder="请输入收票邮箱"></input>
            </div>
          </div>
        <div class="m-invoice-add-form-item small"></div>
      </div>
    </transition>

    <div class="m-invoice-add-tip">
      <p>发票须知</p>
      <p>1. 开票金额为用户实际支付金额(不含礼品卡)</p><p>2. 电子发票可在确认收货后，在“订单详情“查看</p><p>3. 未随箱寄出的纸质发票会在发货后15-30个工作日单独寄出</p><p>4. 单笔订单只支持开具一种发票类型，如需增值税专用发票请联系客服处理</p><p>5. 年购订单发票随每期子单寄出</p>
    </div>

    <div :class="['m-invoice-add-btn', saveDisabled ? 'disabled' : 'active-status']" @click="createInvoice">保存</div>

    <van-popup v-model="selectContentShow" position="bottom">
      <van-picker ref="contentPicker" :columns="columns" show-toolbar @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>

  </div>
</template>
<script>
import api from '~/utils/request'

export default {
  name: 'addInvoice',
  head () {
    return {
      title: '添加发票信息',
      meta: [
        { hid: 'title', name: 'title', content: '添加发票信息' }
      ]
    }
  },
  data () {
    return {
      selectContentShow: false,

      headType: 1,
      invoiceType: 2,
      head: '',
      taxIdentify: '',
      contentType: '',
      contentText: '',
      email: '',
      configtitle: '发票信息',
      columns: [
        { text: '酒水/饮料', value: 1 },
        { text: '商品明细', value: 2 }
      ]
    }
  },

  computed: {
    saveDisabled () {
      if (this.head === '' || this.contentType === '') {
        return true
      }
      if (this.invoiceType === 2 && this.email === '') {
        return true
      }
      if (this.headType === 2 && this.taxIdentify === '') {
        return true
      }
      return false
    }
  },

  methods: {

    handleSelectInvoiceType (val) {
      if (this.invoiceType === val) return
      this.invoiceType = val
    },
    handleSelectHeadType (val) {
      if (this.headType === val) return
      this.headType = val
    },

    handleSelect () {
      this.selectContentShow = true
    },
    onCancel () {
      this.selectContentShow = false
    },
    onConfirm (val, index) {
      this.contentText = val.text
      this.contentType = val.value
      this.selectContentShow = false
    },

    async createInvoice () {
      const req = {}
      if (this.invoiceType === 2) {
        req.email = this.email
      }
      if (this.headType === 2) {
        req.taxIdentify = this.taxIdentify
      }
      const { code, data } = await api.clientPostJson('/api/invoice/create', {
        invoiceType: this.invoiceType,
        headType: this.headType,
        contentType: this.contentType,
        head: this.head,
        ...req
      })
      if (code === 200) {
        this.$toast.success('添加成功')
        if (this.$route.query.from === 'submit') {
          window.location.href = '/invoice/manage?from=submit'
        } else {
          window.location.href = '/invoice/manage'
        }
      } else {
        this.$toast(data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.m-invoice-add {
  min-height: 100vh;
  background: @cor_border;
  position: relative;
  padding-bottom: 50px;
  box-sizing: border-box;
  &-cell {
    background: white;
    padding: 20px 20px 25px 20px;
    margin-bottom: 10px;
    .title {
      font-size: 15px;
      color: @cor_333;
      font-weight: 500;
    }
    .checkbox-wrapper {
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
    }
    .checkbox-box {
      width: 160px;
      font-size: 13px;
      color: @cor_333;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border: 1PX solid @cor_border;
      font-weight: 500;
      transition: .3s;
      &.active {
        background: #DEF3F9;
        color: #03A1CD;
        border-color: #DEF3F9;
      }
    }
    .tip {
      margin-top: 10px;
      font-size: 13px;
      line-height: 23px;
      color: #BBBBBB;
    }
  }
  &-form {
    background: white;
    padding-left: 20px;
    margin-bottom: 10px;
    &-item {
      height: 60px;
      display: flex;
      align-items: center;
      &:not(:last-child) {
        border-bottom: 1PX solid @cor_border;
      }
      &.small {
        height: 30px;
      }
      .item-label {
        font-size: 15px;
        font-weight: 500;
        padding-right: 25px;
      }
      .item-content {
        font-size: 15px;
        flex: 1;
        position: relative;
        input {
          width: 100%;
          height: 60px;
          &::-webkit-input-placeholder {
            color: #CCCCCC;
          }
        }
        .icon-arrow {
          content: "";
          display: block;
          position: absolute;
          width: 6px;
          height: 9px;
          background-image: url('../../assets/img/order/icon-arrow-right.png');
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          right: 20px;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
    }
  }
  &-tip {
    padding: 25px 20px;
    font-size: 13px;
    color: @cor_999;
    line-height: 23px;
    p:first-child {
      margin-bottom: 10px;
    }
  }
  &-btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: white;
    font-size: 15px;
    background: #03A1CD;
    position: absolute;
    bottom: 0;
    &.disabled {
      background: #CCCCCC;
    }
  }
}
</style>
