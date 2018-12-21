<template>
  <van-popup v-model="showlist" position="top" overlay-class="vanmb" @click-overlay="closeFn" :close-on-click-overlay="false">
    <section>
      <ul class="listone">
        <li v-for="(list, index) in 5" :key="index">单行列表</li>
      </ul>
    </section>
  </van-popup>
</template>
<style lang="less" scope>
section {
  max-height: 60vh;
  -webkit-overflow-scrolling: touch;
  overflow: auto;

  .listone {
    padding: 10px 0;
    .ucpms-listone;
  }
}
.van-popup--top {
  top: 85px;
}
</style>
<script>
export default {
  props: {
    showlist: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeFn () {
      this.$emit('closeFn', false)
    }
  }
}
</script>