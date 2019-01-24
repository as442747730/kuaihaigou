<template>
  <van-popup v-model="isopen" position="bottom">
    <van-datetime-picker show-toolbar v-model="curdate" type="datetime" :min-date="mindate" @confirm="confirmfn" @cancel="canclefn"></van-datetime-picker>
  </van-popup>
</template>
<script>
export default {
  props: {
    isopen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mindate: new Date(),
      curdate: new Date()
    }
  },
  methods: {
    confirmfn (value) {
      let adjustdate = this.fromDate(value)
      console.log(adjustdate)
      this.$emit('transTime', adjustdate)
    },
    canclefn () {
      this.$emit('closeTime', false)
    },
    fromDate (objDate) {
      const date1 = new Date(objDate)
      const addZero = val => {
        if (+val < 10) {
          return '0' + val
        }
        return val
      }
      const y1 = date1.getFullYear()
      const m1 = addZero(date1.getMonth() + 1)
      const d1 = addZero(date1.getDate())
      const h1 = addZero(date1.getHours())
      const minut1 = addZero(date1.getMinutes())
      // 符号
      const [sep1, sep2] = ['-', ':']
      return y1 + sep1 + m1 + sep1 + d1 + ' ' + h1 + sep2 + minut1
    }
  }
}
</script>