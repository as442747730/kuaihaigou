<template>
  <div class="list">
    <div class="list-l">
      <span class="l_before">{{ l_one }}</span>
      <span class="l_name">{{ l_two }}</span>
    </div>
    <div class="list-r">
      <van-switch active-color="#03A1CD" size="24px" v-model="vswch" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    l_one: String,
    l_two: String
  },
  data () {
    return {
      vswch: false
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
      width: 30px;
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