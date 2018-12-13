<template>
  <van-popup v-model="isshow" position="bottom">
    <van-picker show-toolbar :columns="columns" @change="onChange" />
  </van-popup>
</template>
<script>
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
}
export default {
  data () {
    return {
      isshow: false,
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
        },
        {
          values: citys['浙江'],
          className: 'column3',
          defaultIndex: 2
        }
      ]
    }
  },
  mounted () {
    this.$bus.on('elSexFn', objs => {
      let { isshow, type } = objs
      this.isshow = isshow
      if (type === 1) {
        this.columns = this.col1
      } else if (type === 2) {
        this.columns = this.col2
      }
    })
  },
  methods: {
    onChange (picker, vaules) {
      console.log('picker', picker)
      console.log('vaules', vaules)
    },
    onCancel () {
      console.log('onCancel')
    },
    onConfirm (vlaue, index) {
      console.log('vlaue', vlaue)
      console.log('index', index)
    }
  },
  beforeDestory () {
    this.columns = []
    this.$bus.off('elSexFn')
  }
}
</script>