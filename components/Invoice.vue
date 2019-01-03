<template>
  <div class="m-invoice">

    <div class="m-invoice-ul">
      <div class="m-invoice-li" v-for="(item, index) in invoiceList" :key="index" @click="handleSelectInvoice(item)">
        <div class="head">{{ (item.invoiceType === 1 ? '纸质' : '电子') + (item.headType === 1 ? '个人' : '单位') + '发票' }}<div class="badge" v-if="item.ifDefault">默认</div><div class="type">{{ item.addressType === 1 ? '家' : item.addressType === 2 ? '公司' : '其他' }}</div></div>
        <div class="content">抬头：{{ item.head }}</div>
        <div class="content" v-if="item.headType === 2">单位税号：{{ item.taxIdentify }}</div>
        <div class="content">内容：{{ item.contentType === 1 ? '酒水/饮料' : '购物明细' }}</div>
        <div class="content" v-if="item.invoiceType === 2">收票邮箱：{{ item.email }}</div>
      </div>
    </div>

    <!-- todo 发票说明跳转 -->
    <div class="m-invoice-bottom">
      <a href="/invoice/instructions" class="u-link">发票说明</a>
    </div>

  </div>
</template>
<script>
export default {
  name: 'uInvoice',

  props: {
    invoiceList: {
      type: Array
    }
  },

  data () {
    return {
      handleSelectInvoice (val) {
        this.$emit('selectInvoice', val)
      }
    }
  }

}
</script>
<style lang="less" scoped>
.m-invoice {
  background: @cor_border;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 50px;
  box-sizing: border-box;
  overflow: scroll;
  padding-top: 46px;
  &-ul {
    background: white;
    font-size: 0;
  }
  &-li {
    padding: 20px;
    &:not(:last-child) {
      border-bottom: 1PX solid @cor_border;
    }
    .head {
      font-size: 17px;
      color: @cor_333;
      font-weight: bold;
      margin-bottom: 10px;
      &>div:first-child {
        margin-left: 10px;
      }
      .badge {
        display: inline-block;
        padding: 2px;
        vertical-align: top;
        color: #FF5B1F;
        font-size: 9px;
        border: 1PX solid #FF5B1F;
        border-radius: 2px;
      }
      .type {
        margin-left: 5px;
        display: inline-block;
        vertical-align: top;
        font-size: 9px;
        font-weight: 400;
        color: #59C3E1;
        border: 1PX solid #59C3E1;
        border-radius: 2px;
        box-sizing: border-box;
        padding: 2px;
      }
    }
    .content {
      font-size: 13px;
      color: @cor_666;
      line-height: 23px;
    }
  }
  &-bottom {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
    a {
      color: #03A1CD
    }
  }
}
</style>