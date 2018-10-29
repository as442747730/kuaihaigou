<template>
  <div class="m-error">
    <h2 class="info">
      抱歉，页面加载出错
    </h2>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      <!-- 返回首页 -->
      <span @click="toIndex">返回首页</span>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    data() {
      return {
        
      }
    },
    methods: {
      toIndex () {
        window.location.href = '/home'
      }
    }
  }
</script>

<style lang="less" scoped>
.m-error {
  text-align: center;
}
</style>