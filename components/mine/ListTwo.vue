<template>
  <div class="list" @click="listFn">
    <div class="list_one">
    	<div class="list_one-title">{{title}}</div>
    	<i class="ic_arrow"></i>
    </div>
    <div class="list_two">{{content}}</div>
  </div>
</template>
<style lang="less" scoped>
.list {
  background: #fff;
  padding: 27px 20px 25px;
  border-bottom: 1PX solid @cor_border;

  &_one {
    .flex_between;
    &-title {
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: bold;
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

  &_two {
  	margin-top: 8px;
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
}
</style>
<script>
export default {
  props: {
    title: String,
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    listFn () {
      this.$emit('ltwoFn')
    },
    editFn (tit, content) {
      /**
      * ltit => 昵称
      * value => 当前值
      */
      let configs = {
        isshow: true,
        type: 'oterinfo',
        model: content
      }
      this.$bus.emit('getConfigs', configs)
      window.location.hash = '#editinfo'
    }
  }
}
</script>