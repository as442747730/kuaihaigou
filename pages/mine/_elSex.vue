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
// const citys = {
//   '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
//   '福建': ['福州', '厦门', '莆田', '三明', '泉州']
// }
export default {
  data () {
    return {
      isshow: false,
      postType: null,
      getName: '',
      columns: [],
      col1: ['男', '女'],
      proCitys: [],
      col2: [],
      cityList: []
    }
  },
  created () {
    let getmap = this.getCityData()
    let pros = [...getmap.keys()]
    this.cityList = [...getmap.values()]
    let citysone = this.cityList[0]
    console.log(citysone, 'citysone')
    this.col2 = [
      { values: pros, className: 'column1' },
      { values: citysone, className: 'column2' }
    ]
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
      let indArr = this.$refs.picker.getIndexes()
      let index = indArr[0]
      let citys = this.cityList[index]
      this.$refs.picker.setColumnValues(1, citys)
    },
    onCancel () {
      this.isshow = false
    },
    async onConfirm (vlaue, index) {
      // console.log('index', index)
      // console.log('vlaue', vlaue)
      let { postType, getName } = this
      let Ques = { nickname: getName }
      let otques = {}
      if (!isNaN(postType)) {
        let sexnum = index + 1
        otques = {
          sex: sexnum
        }
      } else if (postType === '_dz') {
        let adderss = vlaue
        let proname = adderss[0]
        let cityname = adderss[0] !== adderss[1] ? adderss[1] : ''
        otques = {
          residenceProvince: proname,
          residenceCity: cityname
        }
      }
      Object.assign(Ques, otques)
      const { code, data } = await userApi.upduserinfo(Ques)
      if (code === 200) {
        this.isshow = false
        this.$bus.emit('editinfoChange', true)
      } else {
        this.$toast(data)
      }
    },
    getCityData () {
      // 加载china省市数据
      // console.log(city2)
      let s = new Set()
      let maps = new Map()
      let arrs = []
      let pro = ''
      for (let item in city2) {
        let sym = item.substring(0, 2)
        if (s.has(sym)) {
          if (item.match(/00$/)) {
            // console.log(item, city2[item])
            arrs.push(city2[item])
          }
        } else {
          if (pro) {
            maps.set(pro, arrs)
            pro = ''
            arrs = []
          }
          s.add(sym)
          pro = city2[item]
        }
      }
      if (s.size === 34) {
        // console.log('arrs', arrs)
        maps.set(pro, arrs)
        pro = ''
        arrs = []
      }
      return maps
    }
  },
  beforeDestory () {
    this.columns = []
    this.$bus.off('elSexFn')
  }
}
</script>