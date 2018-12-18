<template>
  <div class="u-address">

    <div class="u-address-ul">
      <div class="u-address-li" v-for="(item, $k) in addressList" :key="$k" @click="selectAddress(item)">
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
.u-address {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: @cor_border;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 46px;
  &-ul {
    background: white;
    font-size: 0;
  }
  &-li {
    padding: 20px 20px 15px 20px;
    &:not(:last-child) {
      border-bottom: 1PX solid @cor_border;
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
        border: 1PX solid #FF5B1F;
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
