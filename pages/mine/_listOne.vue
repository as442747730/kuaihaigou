<template>
  <div class="list">
    <div class="list-l">
      <p class="list-l_name">{{list_left}}</p>
      <slot class="list-l_switch" name="sl_l"></slot>
    </div>
    <div class="list-r">
      <p>{{list_right}}</p>
      <i class="ic_arrow"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list_left: String,
    list_right: String,
    checked: Boolean
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
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  &-r {
    .flex_between;
    &>p {
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
    .ic_arrow {
      width: 7px;
      height: 10px;
      margin-left: 10px;
      background: url('~/assets/img/Icons/ic_more_right_gray_12x12@2x.png');
      .bg_cover;
    }
  }
}
</style>