<template>
  <div class="m-missing">
    <h2 class="info">
      抱歉，您访问的页面被风吹跑啦
    </h2>
    <!-- 返回首页 -->
    <span class="back" @click="toIndex">点击返回首页</span>
  </div>
</template>

<script>
  export default {
    name: '',
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

<style lang="" scoped>
  
</style>