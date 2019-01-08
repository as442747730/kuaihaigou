<template>
  <div class="m-layout">
    <nuxt :class="{'blur': $store.state.blurOpen}" />
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

  computed: {
    blurState () {
      return this.$store.state.blurOpen
    }
  },

  watch: {
    blurState (val) {
      console.log(val)
      if (val) {
        this.touchAble()
      } else {
        this.touchEnable()
      }
    }
  },

  mounted () {
    this.activePath = this.$route.path
  },

  components: {
    uFooter
  },

  methods: {
    touchAble () {
      document.body.addEventListener('touchmove', this.bodyScroll, { passive: false })
    },
    touchEnable () {
      document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false })
    },
    bodyScroll (event) {
      event.preventDefault()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
