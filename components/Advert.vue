<template>
  <div class="u-advert">
    <div class="bg cover" :style="'background-image:url(' + adv + ')'" @click="jump"></div>
  </div>
</template>
<script>
export default {
  name: 'm-advert',

  props: {
    advimg: String,
    href: String
  },

  data () {
    return {
      adv: this.advimg
    }
  },

  created () {
    console.log(this.advimg)
  },

  methods: {
    jump () {
      window.open(this.href)
    }
  }
}
</script>

<style lang='less'>
.u-advert{
  width: 335px;
  margin: 0 auto;
  max-width: 100%;
  height: 80px;
  cursor: pointer;
  .bg{
    width: 100%;
    height: 100%;
  }
}
</style>
