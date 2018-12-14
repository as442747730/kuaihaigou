<template>
  <van-popup v-model="isshow" position="bottom">
    <van-datetime-picker
      show-toolbar
      v-model="currentDate"
      type="date"
      @confirm="onConfirm"
      @cancel="onCancle" />
  </van-popup>
</template>
<script>
import tools from '~/utils/tools'
import { userApi } from '~/api/users'
export default {
  data () {
    return {
      getName: '',
      isshow: false,
      minDate: new Date(),
      currentDate: new Date()
    }
  },
  mounted () {
    this.$bus.on('elDateFn', obj => {
      let { isshow, nickname } = obj
      this.isshow = isshow
      this.getName = nickname
    })
  },
  methods: {
    async onConfirm (value) {
      let formdate = tools.formatDate(value)
      console.log('formdate', formdate)
      let Ques = {
        birhday: formdate,
        nickname: this.getName
      }
      const { code, data } = await userApi.upduserinfo(Ques)
      if (code === 200) {
        // console.log(data)
        // this.$toast('修改成功')
        this.isshow = false
        this.$bus.emit('editinfoChange', true)
      } else {
        this.$toast(data)
      }
    },
    onCancle () {
      this.isshow = false
    }
  }
}
</script>