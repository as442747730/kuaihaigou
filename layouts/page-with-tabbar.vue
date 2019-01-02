<template>
  <div class="m-layout">
    <nuxt />
    <u-footer :postIndex="activePath"></u-footer>
  </div>
</template>

<script>
import uFooter from '~/components/footer'

export default {
  data () {
    return {
      activePath: ''
    }
  },

  mounted () {
    this.activePath = this.$route.path
  },

  components: {
    uFooter
  }
}
</script>

<style lang="less" scoped>
</style>
