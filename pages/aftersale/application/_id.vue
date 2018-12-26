<template>
  <div class="m-aftersale-detail">

    <div class="product-wrapper g-product">
      <div class="cover" v-lazy:background-image="detailObj.cover"></div>
      <div class="info">
        <p class="title">{{ detailObj.goodsName }}</p>
        <p class="desc sku">{{ detailObj.skuName }}<span class="price">{{ detailObj.totalRefundAmount }}</span></p>
        <p class="desc">x{{ detailObj.remainNum }}</p>
      </div>
    </div>

    <div class="form-wrapper">
      <div class="title">申请售后类型</div>
      <div class="btn-box">
        <div :class="['btn', serviceType === 2 ? 'active' : '']" @click="handleType(2)">退货退款</div>
        <div :class="['btn', serviceType === 1 ? 'active' : '']" @click="handleType(1)">仅退款</div>
      </div>
      <div class="select-box">
        <div class="select-left">
          <p class="select-left-title">退货数量</p>
          <p class="select-left-desc">(您最多可以提交的的商品数量为{{ detailObj.remainNum }})</p>
        </div>
        <van-stepper v-model="num" :max="detailObj.remainNum" :min="1" />
      </div>
      <div class="select-box">
        <div class="select-left">
          <p class="select-left-title">退货金额</p>
          <p class="select-left-desc">(当前可退最大金额为¥{{ detailObj.totalRefundAmount }}元)</p>
        </div>
        <input class="select-right-input" v-model="amount" type="number"></input>
      </div>
    </div>

    <div class="reason-wrapper">
      <div class="reason-wrapper-title">退货原因
        <div class="reason-select" @click="openReasonPicker">{{reason ? reason : '请选择退货原因'}}</div>
      </div>
      <div class="reason-wrapper-desc">
        <div class="reason-title">问题描述</div>
        <textarea v-model="questionDesc" class="reason-content" :maxlength="500" rows="5" placeholder="请输入退货问题描述"></textarea>
        <span class="words">{{ questionDesc.length }}/500</span>
      </div>
    </div>

    <div class="upload-wrapper">
      <div class="upload-wrapper-title">上传凭证<span>（最多可上传4张）</span></div>
      <div class="image-box">
        <u-imghandler :maxNum="4" v-model="imgList"></u-imghandler>
      </div>
    </div>

    <div class="contact-wrapper">
      <div class="contact-wrapper-title">联系方式</div>
      <div class="contact-wrapper-cell">
        <div class="label">联系人</div>
        <div class="desc"><input v-model="name" class="contact-input"></input></div>
      </div>
      <div class="contact-wrapper-cell">
        <div class="label">联系电话</div>
        <div class="desc"><input v-model="phone" class="contact-input" type="number"></input></div>
      </div>
      <div class="contact-wrapper-cell">
        <div class="label">收货地址</div>
        <div class="desc">
          <input class="contact-select" v-model="areaTxt" readonly placeholder="请选择所在省份、城市、区县" @click="openAreaSelect"></input>
          <input class="contact-input" v-model="address" placeholder="请输入详细地址"></input>
        </div>
      </div>
    </div>

    <div class="tip-wrapper">
      <div class="tip-wrapper-title">温馨提示</div>
      <p>1.具体未定；</p>
      <p>2.提交服务单后，售后专员可能与您电话沟通，请保持手机畅通；</p>
      <p> 3.退货处理成功后退款金额将原路返回到您的支持账户中。</p>
    </div>

    <div class="btn-wrapper fit">
      <van-button class="submit-btn" @click="submit">提交</van-button>
    </div>
    <!-- <div class="btn-bottom">提交</div> -->


    <van-popup v-model="reasonShow" position="bottom">
      <van-picker ref="reasonPicker" :columns="reasonCol" show-toolbar @cancel="cacelReason" @confirm="confirmReason" />
    </van-popup>

    <van-popup v-model="popupShow" position="bottom">
      <van-picker ref="areaPicker" :columns="columns" show-toolbar @change="handleChange" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>

  </div>
</template>

<script>
import uImghandler from '~/components/evaluation/ImageHandler.vue'
import api from '~/utils/request'
import { addressApi } from '~/api/address'
import { afterSaleApi } from '~/api/order'

export default {
  name: '',

  layout: 'default',

  components: { uImghandler },

  head () {
    return {
      title: '申请售后',
      meta: [
        { hid: 'title', name: 'title', content: '申请售后' }
      ]
    }
  },

  data () {
    return {
      orderItemId: null,
      detailObj: {},

      serviceType: null, // 售后类型
      num: 1, // 售后数量
      reason: '', // 原因
      questionDesc: '', // 问题描述
      amount: '', // 退款金额
      maxAmount: 0, // 最大可退金额
      imgList: [],
      name: '', // 联系人
      phone: '', // 联系电话
      province: '',
      city: '',
      district: '',

      address: '',

      reasonShow: false,
      reasonCol: ['买错商品', '商品质量', '其他'],

      areaTxt: '',

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

  async asyncData (req) {
    return api.all([
      addressApi.getAreaList(86, req),
      afterSaleApi.getGoodAndPriceInfo(req.params.id, req)
    ])
      .then(api.spread(function (res1, res2) {
        if (res1.code === 506 || res2.code === 506) {
          req.redirect('/account/login')
        }
        console.log(res2.code)
        console.log(res2.data)
        if (res1.code === 200 && res2.code === 200) {
          return {
            orderItemId: req.params.id,
            provinceList: res1.data.map((n) => { return { text: n.areaName, id: n.id } }),
            detailObj: res2.data,
            provinceId: String(res2.data.province).split(',')[1],
            cityId: String(res2.data.city).split(',')[1],
            districtId: String(res2.data.district).split(',')[1],
            provinceTxt: String(res2.data.province).split(',')[0],
            cityTxt: String(res2.data.city).split(',')[0],
            districtTxt: String(res2.data.district).split(',')[0],
            areaTxt: String(res2.data.province).split(',')[0] + String(res2.data.city).split(',')[0] + String(res2.data.district).split(',')[0],
            address: res2.data.address,
            // provinceId: '1026342557216411649',
            // cityId: '1026342742638202881',
            // districtId: '1026342743196045313',
            // areaTxt: '广东省广州市海珠区'
            name: res2.data.name,
            phone: res2.data.phone
          }
        } else {
          req.redirect('/error')
        }
      }))
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
    openReasonPicker () {
      this.reasonShow = true
    },
    cacelReason () {
      this.reasonShow = false
    },
    confirmReason (val) {
      this.reason = val
      this.reasonShow = false
    },

    handleType (val) {
      if (val === this.serviceType) return
      this.serviceType = val
    },

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

    async submit () {
      if (!(/^\d+(\.\d+)?$/).test(this.amount)) {
        return this.$toast('请输入正确的价钱')
      }
      if (this.amount > this.detailObj.totalRefundAmount) {
        return this.$toast('退款金额不可大于最大可退金额')
      }
      if (this.validate(this.serviceType, '请选择售后类型') || this.validate(this.amount, '请填写退款金额') || this.validate(this.reason, '请选择退货原因') || this.validate(this.name, '请填写联系人') || this.validate(this.phone, '请填写联系人电话') || this.validate([this.address, this.provinceId, this.cityId, this.districtId], '请填写收货地址')) {
        return
      }
      const { code } = await afterSaleApi.createApplication({
        orderItemId: this.orderItemId,
        serviceType: this.serviceType,
        num: this.num,
        totalRefundAmount: this.amount,
        reason: this.reason,
        description: this.questionDesc,
        imgs: this.imgList,
        contact: this.name,
        phone: this.phone,
        province: this.provinceTxt,
        city: this.cityTxt,
        district: this.districtTxt,
        address: this.address
      })
      if (code === 200) {
        this.$toast.success('提交成功')
        window.location.href = '/aftersale/list'
      }
    },
    validate (val, msg) {
      if (Array.isArray(val)) {
        if (val.some(n => !n)) {
          this.$toast(msg)
        }
        return val.some(n => !n)
      }
      if (!val) {
        this.$toast(msg)
        return true
      }
      return false
    }
  }
}
</script>

<style lang="less">
.m-aftersale-detail {
  min-height: 100vh;
  background: @cor_border;
  .product-wrapper {
    background: white;
    padding: 20px;
    margin-bottom: 10px;
  }
  .form-wrapper {
    background: white;
    padding: 20px 20px 30px 20px;
    margin-bottom: 10px;
    .title {
      font-size: 15px;
      color: @cor_333;
    }
    .btn-box {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      padding-bottom: 5px;
      .btn {
        width: 160px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 13px;
        color: @cor_333;
        text-align: center;
        border: 1PX solid #F1F1F1;
        &.active {
          background: #DEF3F9;
          border-color: #DEF3F9;
          color: #03A1CD;
        }
      }
    }
    .select-box {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      .select-left {
        &-title {
          color: @cor_333;
          font-size: 15px;
          padding-bottom: 10px;
        }
        &-desc {
          color: @cor_999;
          font-size: 12px;
        }
      }
      .select-right-input {
        width: 80px;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 15px;
        // height: 37px;
        border: 1PX solid @cor_border;
      }
      .van-stepper {
        .van-stepper__minus {
          width: 26px;
          height: 37px;
          border-right: none;
          background: #FFFFFF;
        }
        .van-stepper__input {
          width: 26px;
          padding: 0;
          height: 35px;
          font-size: 13px
        }
        .van-stepper__plus {
          width: 26px;
          height: 37px;
          border-left: none;
          background: #FFFFFF;
        }
      }
    }
  }
  .reason-wrapper {
    background: white;
    padding: 30px 20px 20px 20px;
    margin-bottom: 10px;
    &-title {
      font-size: 15px;
      color: @cor_333;
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      border-bottom: 1PX solid @cor_border;
      .reason-select {
        font-size: 14px;
        color: @cor_666;
        padding-right: 20px;
        background-image: url('~/assets/img/order/icon-arrow.png');
        background-size: 14px 12px;
        background-position: right top;
        background-repeat: no-repeat;
      }
    }
    &-desc {
      padding-top: 30px;
      position: relative;
      .reason-title {
        font-size: 15px;
        color: @cor_333;
      }
      .reason-content {
        width: 100%;
        margin: 15px 0 20px 0;
        font-size: 15px;
        line-height: 1.5;
        &::placeholder {
          color: #C7C7C7;
        }
      }
      .words {
        color: #C7C7C7;
        font-size: 14px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
  .upload-wrapper {
    background: white;
    padding: 20px 20px 10px 20px;
    margin-bottom: 10px;
    &-title {
      font-size: 15px;
      color: @cor_333;
      span {
        font-size: 12px;
        color: @cor_999;
      }
    }
    .image-box {
      margin-top: 20px;
    }
  }
  .contact-wrapper {
    padding: 20px 20px 0 20px;
    background: white;
    &-title {
      font-size: 15px;
      color: @cor_333;
      margin-bottom: 8px;
    }
    &-cell {
      display: flex;
      padding: 20px 0;
      &:not(:last-child) {
        border-bottom: 1PX solid @cor_border;
      }
      .label {
        width: 60px;
        padding-right: 20px;
        font-size: 15px;
        line-height: 25px;
        color: @cor_333;
      }
      .desc {
        flex: 1;
        font-size: 15px;
        color: @cor_666;
        line-height: 25px;
        .contact-select {
          width: 100%;
          box-sizing: border-box;
          padding-right: 20px;
          margin-bottom: 15px;
          background-image: url('~/assets/img/order/icon-arrow.png');
          background-size: 14px 12px;
          background-position: right center;
          background-repeat: no-repeat;
        }
        .contact-input {
          width: 100%;
        }
      }
    }
  }
  .tip-wrapper {
    padding: 25px 20px 70px 20px;
    &-title {
      font-size: 13px;
      color: @cor_999;
      margin-bottom: 15px;
    }
    p {
      line-height: 23px;
      font-size: 13px;
      color: @cor_999;
    }
  }
  .btn-wrapper {
    width: 100%;
    // position: fixed;
    // bottom: 0;
    // left: 0;
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
