<template>
  <div class="u-tabs">

    <div class="u-tab-ul">
      <div :class="{'u-tab-item': true, 'active': item.key === activeTab }" v-for="(item, index) in list" :key="index" @click="handleTab(item)">{{ item.name }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'uTabs',

  props: {
    list: {
      type: Array,
      default: []
    }
  },

  data () {
    return {
      activeTab: ''
    }
  },

  created () {
    this.activeTab = this.list[0].key
  },

  methods: {
    handleTab (val) {
      this.activeTab = val.key
      this.$emit('on-change', val.key)
    }
  }
}
</script>

<style lang="less" scoped>
.u-tabs {
  background: white;
  .u-tab-ul {
    border-bottom: 1PX solid #F5F5F5;
    height: 45px;
    display: flex;
    box-sizing: border-box;
    // align-items: center;
    padding-top: 14px;
    justify-content: space-around;
    .u-tab-item {
      color: @cor_999;
      font-size: 13px;
      transition: 0.2s;
      &.active {
        color: @cor_333;
        font-weight: bold;
        position: relative;
        &:after {
          content: '';
          display: inline-block;
          width: 50%;
          height: 3px;
          border-radius: 3px;
          background: @cor_333;
          position: absolute;
          left: 50%;
          bottom: 8px;
          margin-left: -25%;
        }
      }
    }
  }
}
</style>
