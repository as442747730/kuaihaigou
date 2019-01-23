<template>
  <van-popup v-model="isopen" position="bottom">
    <van-datetime-picker show-toolbar v-model="curdate" type="date" :min-date="mindate" :max-date="maxdate" @confirm="confirmfn" @cancel="canclefn"></van-datetime-picker>
  </van-popup>
</template>
<script>
import tools from '~/utils/tools'
export default {
  props: {
    isopen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mindate: new Date('1949-01-01'),
      maxdate: new Date(),
      curdate: new Date()
    }
  },
  methods: {
    confirmfn (value) {
      let adjustdate = tools.formatDate(value)
      console.log('adjustdate', adjustdate)
      this.$emit('transTime', adjustdate)
    },
    canclefn () {
      this.isopen = false
    }
  }
}
</script>