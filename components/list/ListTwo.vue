<template>
  <div class="list">
    <div class="list-l">
      <span class="l_before">{{ l_one }}</span>
      <span class="l_name">{{ l_two }}</span>
    </div>
    <div class="list-r">
      <van-switch active-color="#03A1CD" size="20px" :value="vswch" @input="onInput" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    l_one: String,
    l_two: String,
    type: String,
    vsw: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      vswch: this.vsw
    }
  },
  methods: {
    onInput () {
      if (!this.vswch) {
        this.$emit('okSwitch', this.type)
      } else {
        this.$emit('noSwitch', this.type)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.list {
  .flex_between;
  background: #fff;
  padding: 0 20px;
  height: 66px;
  border-bottom: 1PX solid @cor_border;
  &-l {
    .l_before {
      display: inline-flex;
      width: 40px;
      text-align: center;
      font-size:15px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      margin-right: 20px;
    }
    .l_name {
      font-size:15px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(153,153,153,1);
    }
  }
}
</style>