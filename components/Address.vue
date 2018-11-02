<template>
  <div class="u-address">

    <div class="u-address-ul">
      <div class="u-address-li" v-for="(item, index) in addressList" :key="index" @click="selectAddress(item)">
        <div class="head">
          <div class="title">{{ item.name }}</div>
          <div class="title">{{ item.phone }}</div>
          <div class="default-badge" v-if="item.ifDefault">默认</div>
        </div>
        <div class="content">{{ String(item.province).split(',')[0] + String(item.city).split(',')[0] + String(item.district).split(',')[0] + String(item.street).split(',')[0] + item.address }}</div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'uAddress',

    props: {
      addressList: {
        type: Array
      }
    },

    data () {
      return {
        selectAddress (val) {
          this.$emit('handleSelect', val)
        }
      }
    }

  }
</script>
<style lang="less" scoped>
@import url('../assets/css/var.less');
.u-address {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #F5F5F5;
  min-height: 100vh;
  &-ul {
    background: white;
    font-size: 0;
  }
  &-li {
    padding: 25px 20px 15px 20px;
    &:not(:last-child) {
      border-bottom: 1px solid #F5F5F5;
    }
    .head {
      display: flex;
      align-items: center;
      .title {
        font-size: 17px;
        color: @cor_333;
        padding-right: 15px;
        font-weight: bold;
      }
      .default-badge {
        color: #FF5B1F;
        font-size: 9px;
        padding: 2px;
        border: 1px solid #FF5B1F;
        border-radius: 2px;
      }
    }
    .content {
      margin-top: 10px;
      font-size: 13px;
      color: @cor_666;
      line-height: 23px;
    }
  }
}
</style>
