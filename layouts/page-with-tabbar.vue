<template>
  <div class="m-layout">
    <nuxt />
    <u-footer :postIndex="0"></u-footer>
  </div>
</template>

<script>
import uFooter from '~/components/footer'

export default {
  data () {
    return {
    }
  },
  components: {
    uFooter
  }
}
</script>

<style lang="less" scoped>
</style>
