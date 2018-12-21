<template>
  <div class="m-address-add">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="m-address-add-form">
      <div class="m-address-add-form-item">
        <div class="item-label">姓名</div>
        <div class="item-content">
          <input v-model="name" placeholder="请输入收货人姓名"></input>
        </div>
      </div>
      <div class="m-address-add-form-item">
        <div class="item-label">手机号码</div>
        <div class="item-content">
          <input v-model="phone" placeholder="请输入手机号码"></input>
        </div>
      </div>
      <div class="m-address-add-form-item">
        <div class="item-label">备用电话</div>
        <div class="item-content">
          <input v-model="alternatePhone" placeholder="请输入备用电话"></input>
        </div>
      </div>
      <div class="m-address-add-form-item">
        <div class="item-label">所在区域</div>
        <div class="item-content" @click="openAreaSelect">
          <input v-model="areaTxt" readonly placeholder="请选择所在省份、城市、区县"></input>
          <i class="icon-arrow"></i>
        </div>
      </div>
      <div class="m-address-add-form-item">
        <div class="item-label">详细地址</div>
        <div class="item-content">
          <input v-model="address" placeholder="请输入详细地址"></input>
        </div>
      </div>
    </div>

    <van-popup v-model="popupShow" position="bottom">
      <van-picker ref="areaPicker" :columns="columns" show-toolbar @change="handleChange" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>

    <div class="btn-wrapper fit">
      <van-button class="submit-btn" @click="createInfo">保存</van-button>
    </div>

  </div>
</template>
<script>
import { addressApi } from '~/api/address'
import comHead from '~/components/com-head'

export default {
  name: 'addressAdd',
  laytou: 'default',
  head () {
    return {
      title: '新增收货人',
      meta: [
        { hid: 'title', name: 'title', content: '新增收货人' }
      ]
    }
  },
  components: {
    comHead
  },

  async asyncData (req) {
    return addressApi.getAreaList(86, req).then((res) => {
      if (res.code === 200) {
        return { provinceList: res.data.map((n) => { return { text: n.areaName, id: n.id } }), provinceId: res.data[0].id }
      }
    })
  },

  data () {
    return {
      configtitle: '新增收货人',
      name: '',
      phone: '',
      alternatePhone: '',
      areaTxt: '',
      address: '',

      // 省市区的id
      provinceId: '',
      cityId: '',
      districtId: '',
      // 省市区的中文
      provinceTxt: '',
      cityTxt: '',
      districtTxt: '',
      // 所选的省市区在选择组件中对应列表的索引，每次打开时使用 van-picker 的 setColumnIndex 方法设置选中的省市区
      provinceIndex: 0,
      cityIndex: 0,
      districtIndex: 0,
      // 省市区
      provinceList: [],
      cityList: [],
      districtList: [],

      popupShow: false,
      columns: [{ values: [] }, { values: [] }, { values: [] }]
    }
  },

  async created () {
    await this.getArea(this.provinceList[0].id, 'city')
    await this.getArea(this.cityList[0].id, 'district')
    this.cityId = this.cityList[0].id
    this.districtId = this.districtList[0].id
  },

  methods: {
    /* 根据上级去获取 列表
    ** @params id: 上级id
    ** @params val: 传 city || district
    */
    async getArea (id, val) {
      const { code, data } = await addressApi.getAreaListClient(id)
      if (code === 200) {
        this[`${val}List`] = data.map((n) => { return { text: n.areaName, id: n.id } })
      }
    },
    // 每次打开时根据是否有选择的省市 id 去获取下级列表，并根据保存的选中索引 设置 选中的项
    openAreaSelect () {
      this.getArea(this.provinceId, 'city')
      this.getArea(this.cityId, 'district')
      if (this.$refs.areaPicker) {
        this.$refs.areaPicker.setColumnValues(1, this.cityList)
        this.$refs.areaPicker.setColumnValues(2, this.districtList)
        this.$refs.areaPicker.setColumnIndex(0, this.provinceIndex)
        this.$refs.areaPicker.setColumnIndex(1, this.cityIndex)
        this.$refs.areaPicker.setColumnIndex(2, this.districtIndex)
      } else {
        this.columns[0].values = this.provinceList
        this.columns[1].values = this.cityList
        this.columns[2].values = this.districtList
      }
      this.popupShow = true
    },
    // 当手动去拖动数据的时候，去获取
    async handleChange (instance, val, column) {
      if (column === 0) {
        await this.getArea(val[column].id, 'city')
        await this.getArea(this.cityList[0].id, 'district')
        instance.setColumnValues(1, this.cityList)
        instance.setColumnValues(2, this.districtList)
      } else if (column === 1) {
        await this.getArea(val[column].id, 'district')
        instance.setColumnValues(2, this.districtList)
      }
    },
    onCancel () {
      this.popupShow = false
    },
    // 保存选中的项的 索引、id、中文
    onConfirm (val, idx) {
      console.log(val)
      this.provinceId = val[0].id
      this.cityId = val[1].id
      this.districtId = val[2] ? val[2].id : ''
      this.provinceTxt = val[0].text
      this.cityTxt = val[1].text
      this.districtTxt = val[2] ? val[2].text : ''
      this.provinceIndex = idx[0]
      this.cityIndex = idx[1]
      this.districtIndex = idx[2] ? idx[2] : ''
      this.popupShow = false
      this.areaTxt = this.provinceTxt + this.cityTxt + this.districtTxt
    },

    async createInfo () {
      // todo validate
      const req = {
        address: this.address,
        // addressType:
        alternatePhone: this.alternatePhone,
        province: `${this.provinceTxt},${this.provinceId}`,
        city: `${this.cityTxt},${this.cityId}`,
        district: `${this.districtTxt},${this.districtId}`,
        name: this.name,
        phone: this.phone
      }
      const { code } = await addressApi.createAddress(req)
      if (code === 200) {
        this.$toast.success('新增成功')
        window.location.href = '/address/manage'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.m-address-add {
  min-height: 100vh;
  background: @cor_border;
  position: relative;
  padding-bottom: 50px;
  box-sizing: border-box;
  &-form {
    background: white;
    padding-left: 20px;
    margin-bottom: 10px;
    &-item {
      height: 65px;
      display: flex;
      align-items: center;
      &:not(:last-child) {
        border-bottom: 1PX solid #F1F1F1;
      }
      &.small {
        height: 30px;
      }
      .item-label {
        width: 60px;
        font-size: 15px;
        font-weight: 500;
        padding-right: 25px;
      }
      .item-content {
        font-size: 15px;
        flex: 1;
        position: relative;
        input {
          width: 100%;
          height: 60px;
          &::-webkit-input-placeholder {
            color: #CCCCCC;
          }
        }
        .icon-arrow {
          content: '';
          display: block;
          position: absolute;
          width: 6px;
          height: 9px;
          background-image: url('../../assets/img/order/icon-arrow-right.png');
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          right: 20px;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
    }
  }
  .btn-wrapper {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    &.fit {
      padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
      padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    }
    .submit-btn {
      width: 100%;
      height: 50px;
      display: block;
      background: #03A1CD;
      border: none;
      color: white;
    }
  }
}
</style>
