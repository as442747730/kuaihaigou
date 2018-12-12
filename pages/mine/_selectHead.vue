<template>
  <div class="person-vant">
    <van-popup v-model="showHead" position="bottom" @click-overlay="cancleFn">
      <div class="vant-items pics">
        <div class="vant-item camera">拍照</div>
        <div class="vant-item photos">从相册中选取</div>
      </div>
      <div class="vant-items">
        <div class="vant-item">取消</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showHead: false
    }
  },
  mounted () {
    this.$bus.on('headStatus', v => {
      this.showHead = v
    })
  },
  methods: {
    cancleFn () {
      this.showHead = false
    }
  },
  beforeDestroy () {
    this.$bus.off('headStatus')
  }
}
</script>
<style lang="less">
.person-vant {
  .van-popup {
    background: transparent;
  }

  .vant-items {
    margin: 10px;
    background: #fff;
    border-radius: 10px;

    .vant-item {
      width: 100%;
      height: 58px;
      font-size: 19px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(0, 122, 255, 1);
      .flex_allCenter;
    }

    .camera {
      border-bottom: 1PX solid @cor_border;
    }
  }
}
</style>