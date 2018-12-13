<template>
  <van-popup v-model="isshow" position="bottom">
    <van-picker
      ref="picker"
      show-toolbar
      :columns="columns"
      @change="onChange"
      @cancel="onCancel"
      @confirm="onConfirm" />
  </van-popup>
</template>
<script>
import { userApi } from '~/api/users'
import city2 from '~/utils/city2.json'
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
}
export default {
  data () {
    return {
      isshow: false,
      postType: null,
      getName: '',
      columns: [],
      col1: ['男', '女'],
      col2: [
        {
          values: Object.keys(citys),
          className: 'column1'
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2
        }
      ]
    }
  },
  created () {
    this.getCityData()
  },
  mounted () {
    this.$bus.on('elSexFn', objs => {
      let { isshow, type, nickname } = objs
      this.isshow = isshow
      this.postType = type
      console.log('type', type, isNaN(type))
      this.getName = nickname
      if (!isNaN(type)) {
        this.columns = this.col1
      } else if (type === '_dz') {
        this.columns = this.col2
      }
    })
  },
  methods: {
    onChange () {
    },
    onCancel () {
      this.isshow = false
    },
    async onConfirm (vlaue, index) {
      console.log('index', index)
      console.log('vlaue', vlaue)
      let { type, getName } = this
      if (!isNaN(type)) {
        let sexnum = index + 1
        let Ques = {
          nickname: getName,
          sex: sexnum
        }
        console.log(Ques, 'Ques')
        const { code, data } = await userApi.upduserinfo(Ques)
        if (code === 200) {
          this.isshow = false
          this.$bus.emit('editinfoChange', true)
        } else {
          this.$toast(data)
        }
      }
    },
    getCityData () {
      // 加载china省市数据
      for (let item in city2) {
        console.log(item.substring(0, 2))
      }
    }
  },
  beforeDestory () {
    this.columns = []
    this.$bus.off('elSexFn')
  }
}
</script>