<template>
  <div class="u-after" v-html='viewdata.afterSaleServiceMobile'>
  </div>
</template>
<script>

export default {
  name: 'u-after',

  props: {
    viewdata: Object
  },

  data () {
    return {
    }
  },

  mounted () {
  },

  methods: {
  }

}
</script>
<style lang="less">
.u-after {
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
