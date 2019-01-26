<template>
  <div class="m-address-add">

    <div class="m-address-add-form">
      <div class="m-address-add-form-item">
        <div class="item-label">姓名</div>
        <div class="item-content">
          <input v-model.trim="name" placeholder="请输入收货人姓名"></input>
        </div>
      </div>
      <div class="m-address-add-form-item">
        <div class="item-label">手机号码</div>
        <div class="item-content">
          <input v-model.trim="phone" placeholder="请输入手机号码"></input>
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
          <input v-model.trim="address" placeholder="请输入详细地址"></input>
        </div>
      </div>
      <div class="m-address-add-form-item">
        <div class="item-label">地址分类</div>
        <div class="item-type">
          <span @click='addressType = 1' :class="{'cur': addressType === 1}">家</span>
          <span @click='addressType = 2' :class="{'cur': addressType === 2}">公司</span>
          <span @click='addressType = 3' :class="{'cur': addressType === 3}">其他</span>
        </div>
      </div>
      <div class="m-address-add-form-item">
        <div class="item-label">邮政编号</div>
        <div class="item-content">
          <input v-model.trim="alternatePhone" placeholder="请输入邮政编号"></input>
        </div>
      </div>
    </div>

    <!-- <div class="set-default">
      <span>设为默认地址</span>
      <van-switch v-model="ifDefault" size="19px" active-color="#03A1CD" />
    </div> -->

    <van-popup v-model="popupShow" position="bottom">
      <van-picker ref="areaPicker" :columns="columns" show-toolbar @change="handleChange" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>

    <div class="btn-wrapper f-bottom-btn">
      <van-button class="submit-btn" @click="updateInfo">保存</van-button>
    </div>

  </div>
</template>
<script>
import api from '~/utils/request'
import { addressApi } from '~/api/address'

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

  async asyncData (req) {
    return api.all([
      addressApi.getAreaList(86, req),
      addressApi.getAddressDetail(req.params.edit, req)
    ])
      .then(api.spread(function (res1, res2) {
        if (res1.code === 200 && res2.code === 200) {
          return {
            provinceList: res1.data.map((n) => { return { text: n.areaName, id: n.id } }),
            addressId: req.params.edit,
            name: res2.data.name,
            phone: res2.data.phone,
            alternatePhone: res2.data.alternatePhone,
            address: res2.data.address,
            addressType: res2.data.addressType,
            provinceId: res2.data.province.split(',')[1],
            cityId: res2.data.city.split(',')[1],
            districtId: res2.data.district.split(',')[1],
            areaTxt: res2.data.province.split(',')[0] + res2.data.city.split(',')[0] + res2.data.district.split(',')[0] + res2.data.street.split(',')[0]
          }
        } else {
          req.redirect('/error')
        }
      }))
  },

  data () {
    return {
      addressId: null,
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
      // 地址分类
      addressType: 1,
      ifDefault: false,

      popupShow: false,
      columns: [{ values: [] }, { values: [] }, { values: [] }]
    }
  },

  async created () {
    await this.getArea(this.provinceId, 'city')
    await this.getArea(this.cityId, 'district')
    // 计算 每一列的 索引
    this.provinceIndex = this.provinceList.findIndex(n => n.id === this.provinceId)
    this.cityIndex = this.cityList.findIndex(n => n.id === this.cityId)
    this.districtIndex = this.districtList.findIndex(n => n.id === this.districtId)
  },

  methods: {
    /* 根据上级去获取 列表
    ** @params id: 上级id
    ** @params val: 传 city || district
    */
    async getArea (id, val) {
      const { code, data } = await addressApi.getAreaListClient(id)
      if (code === 200) {
        this[val + 'List'] = data.map((n) => { return { text: n.areaName, id: n.id } })
      }
    },
    // 每次打开时根据是否有选择的省市 id 去获取下级列表，并根据保存的选中索引 设置 选中的项
    async openAreaSelect () {
      await this.getArea(this.provinceId, 'city')
      await this.getArea(this.cityId, 'district')
      this.popupShow = true
      this.$nextTick(() => {
        this.$refs.areaPicker.setColumnValues(0, this.provinceList)
        this.$refs.areaPicker.setColumnValues(1, this.cityList)
        this.$refs.areaPicker.setColumnValues(2, this.districtList)
        this.$refs.areaPicker.setColumnIndex(0, this.provinceIndex)
        this.$refs.areaPicker.setColumnIndex(1, this.cityIndex)
        this.$refs.areaPicker.setColumnIndex(2, this.districtIndex)
      })
      // this.popupShow = true
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

    async updateInfo () {
      const obj = {
        ifDefault: this.ifDefault,
        id: this.addressId,
        address: this.address,
        addressType: this.addressType,
        alternatePhone: this.alternatePhone,
        province: `${this.provinceTxt},${this.provinceId}`,
        city: `${this.cityTxt},${this.cityId}`,
        district: `${this.districtTxt},${this.districtId}`,
        name: this.name,
        phone: this.phone
      }
      console.log(obj)
      const { code } = await addressApi.updateAddress(obj)
      if (code === 200) {
        this.$toast.success('保存成功')
        if (this.$route.query.from === 'submit') {
          window.location.href = '/address/manage?from=submit'
        } else {
          window.location.href = '/address/manage'
        }
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
      .item-type {
        span {
          display: inline-block;
          vertical-align: middle;
          width: 54px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 12px;
          border: 1px solid #f1f1f1;
          margin-right: 10px;
          font-size: 13px;
          color: #333;
          background: #FCFCFC;
          &.cur {
            border-color: #03A1CD;
            color: #03A1CD;
          }
        }
      }
    }
  }
  .set-default {
    padding: 0 20px;
    span {
      font-size: 13px;
      color: #999;
    }
    .van-switch {
      float: right;
      margin-top: 14px;
    }
  }
  .btn-wrapper {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
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
