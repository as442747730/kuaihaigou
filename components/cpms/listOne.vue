<template>
  <van-popup v-model="isShow" position="top" overlay-class="vanmb" @click-overlay="closeFn" :close-on-click-overlay="false">
    <section class="listsecs">
      <ul class="listone" :data-post="postObjs.elIndex">
        <li
          v-for="(list, index) in postObjs.nowList"
          :key="index"
          :class="{active: index === postObjs.elIndex}"
          @click="elLi(list, index)">{{list.name}}</li>
      </ul>
    </section>
  </van-popup>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    postObjs: {
      type: Object,
      default: {}
    }
  },
  methods: {
    elLi (event, index) {
      // 选中li
      let evobj = { elIndex: index }
      Object.assign(evobj, event)
      console.log('evobj', evobj)
      this.$emit('selectOk', evobj)
    },
    closeFn () {
      this.$emit('closeFn')
    }
  }
}
</script>
<style lang="less" scope>
.listsecs {
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