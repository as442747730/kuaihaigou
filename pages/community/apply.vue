<template>
  <div class="apply">
    <div class="apply-head">
      <div class="ic_back" @click="goback"></div>
      <div class="title">合作活动申请</div>
      <div class="ic_empty"></div>
    </div>
    <div class="apply-main">
      <div class="actname">
        <div class="actname-title">活动名称</div>
        <input :class="['actname-input', {cor: froms.name}]" v-model="froms.name" :maxlength="50" type="text" placeholder="输入活动名称" />
      </div>
      <div class="acttype">
        <div class="acttype-title">活动类型</div>
        <div class="acttype-items">
          <div :class="['acttype_item', {active: froms.activityType === 1}]" @click="wineparty(1)">个人酒会策划</div>
          <div :class="['acttype_item', {active: froms.activityType === 2}]" @click="wineparty(2)">企业酒会策划</div>
        </div>
      </div>
      <div class="actselect">
        <div :class="['actselect-top', {pbot: !froms.ifUndetermineSignUp}]">
          <div class="top_title">报名时间</div>
          <div class="top_radio">
            <div :class="['radio-item', 'radio-one', {active: !froms.ifUndetermineSignUp}]" @click="signupfn(false)">待定</div>
            <div :class="['radio-item', {active: froms.ifUndetermineSignUp}]" @click="signupfn(true)">指定时间</div>
          </div>
        </div>
        <div class="actselect-items" v-show="froms.ifUndetermineSignUp">
          <div class="actselect-item actselect-start">
            <p v-if="!froms.signUpStartTime"  @click="timetypefn(1)">选择开始时间</p>
            <p class="cor" v-else  @click="timetypefn(1)">{{ froms.signUpStartTime }}</p>
          </div>
          <div class="actselect-item">
            <p v-if="!froms.signUpEndTime" @click="timetypefn(2)">选择结束时间</p>
            <p class="cor" v-else  @click="timetypefn(2)">{{ froms.signUpEndTime }}</p>
          </div>
        </div>
      </div>
      <div class="actselect">
        <div :class="['actselect-top', {pbot: !froms.ifUndetermineTime}]">
          <div class="top_title">活动时间</div>
          <div class="top_radio">
            <div :class="['radio-item', 'radio-one', {active: !froms.ifUndetermineTime}]" @click="actTimefn(false)">待定</div>
            <div :class="['radio-item', {active: froms.ifUndetermineTime}]" @click="actTimefn(true)">指定时间</div>
          </div>
        </div>
        <div class="actselect-items" v-show="froms.ifUndetermineTime">
          <div class="actselect-item actselect-start" @click="timetypefn(3)">
            <p v-if="!froms.startTime">选择开始时间</p>
            <p v-else class="cor">{{ froms.startTime }}</p>
          </div>
          <div class="actselect-item" @click="timetypefn(4)">
            <p v-if="!froms.startTime">选择结束时间</p>
            <p v-else class="cor">{{ froms.endTime }}</p>
          </div>
        </div>
      </div>
      <div class="actselect">
        <div :class="['actselect-top', {pbot: !froms.ifUndetermineAddress}]">
          <div class="top_title">活动地点</div>
          <div class="top_radio">
            <div :class="['radio-item', 'radio-one', {active: !froms.ifUndetermineAddress}]" @click="addressFn(false)">待定</div>
            <div :class="['radio-item', {active: froms.ifUndetermineAddress}]" @click="addressFn(true)">指定地址</div>
          </div>
        </div>
        <div class="actslect-items" v-show="froms.ifUndetermineAddress">
          <div class="actselect-item actselect-start" @click="openAreaSelect">
            <p v-if="!areaTxt">省/市/区</p>
            <p v-else class="cor">{{areaTxt}}</p>
          </div>
          <div class="actselect-item">
            <input :class="['actselect_address', {cor: address !== ''}]" type="text" v-model="address" :maxlength="50" placeholder="详细地址">
          </div>
        </div>
      </div>
      <div class="actinstro">
        <div class="actinstro-title">活动简介</div>
        <textarea :class="['actinstro-textarea', {cor: froms.introduce}]" v-model="froms.introduce" :maxlength="500" rows="6" placeholder="请填写活动简介"></textarea>
        <div class="actinstro-tip">{{froms.introduce.length}}/500</div>
      </div>
      <div class="actperson">
        <div class="actperson-item">
          <div class="actperson_title">联系人</div>
          <input :class="['actperson_inp', {cor: froms.contact}]" type="text" v-model="froms.contact" :maxlength="25" placeholder="输入联系人称呼" />
        </div>
        <div class="actperson-item">
          <div class="actperson_title">联系电话</div>
          <input :class="['actperson_inp', {cor: froms.phone}]" type="tel" v-model="froms.phone" placeholder="输入联系人电话" />
        </div>
        <div class="actperson-item" v-if="froms.activityType === 2">
          <div class="actperson_title">企业名</div>
          <input :class="['actperson_inp', {cor: froms.company}]" type="text" v-model="froms.company" :maxlength="30" placeholder="输入您的企业名" />
        </div>
      </div>
    </div>
    <div class="apply-submit" v-if="!comoks" @click="notSubmit">确认提交</div>
    <div class="apply-submit oks" v-else @click="onSubmit">确认提交</div>

    <van-popup v-model="isopen" position="bottom">
      <van-datetime-picker show-toolbar v-model="curdate" type="date" :min-date="mindate" @confirm="dateConfirm" @cancel="dateCancel"></van-datetime-picker>
    </van-popup>
    <van-popup v-model="popupShow" position="bottom">
      <van-picker ref="areaPicker" :columns="columns" show-toolbar @change="handleChange" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>
<script>
  import { addressApi } from '~/api/address'
  import { munityApi } from '~/api/community'
  export default {
    async asyncData (req) {
      return addressApi.getAreaList(86, req).then((res) => {
        if (res.code === 200) {
          return { provinceList: res.data.map((n) => { return { text: n.areaName, id: n.id } }), provinceId: res.data[0].id }
        }
      })
    },
    data () {
      return {
        isopen: false,
        mindate: new Date(),
        curdate: new Date(),
        timetype: null,
        froms: {
          name: '',
          activityType: null,
          ifUndetermineSignUp: false,
          ifUndetermineTime: false,
          ifUndetermineAddress: false,
          signUpStartTime: null,
          signUpEndTime: null,
          startTime: null,
          endTime: null,
          introduce: '',
          contact: '',
          phone: '',
          company: ''
        },
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

    computed: {
      notempty () {
        let { name, introduce, contact } = this.froms
        return name !== '' && introduce !== '' && contact !== ''
      },
      isphone () {
        let { phone } = this.froms
        const myRe = /^1[34578]{1}\d{9}$/
        let isphone = myRe.test(phone)
        return isphone
      },
      actcompany () {
        let { activityType, company } = this.froms
        return (activityType === 1 && company === '') || (activityType === 2 && company !== '')
      },
      comsingup () {
        let { ifUndetermineSignUp, signUpStartTime, signUpEndTime } = this.froms
        return (!ifUndetermineSignUp && signUpStartTime === null && signUpEndTime === null) || (ifUndetermineSignUp && signUpStartTime !== null && signUpEndTime !== null)
      },
      comactive () {
        let { ifUndetermineTime, startTime, endTime } = this.froms
        return (!ifUndetermineTime && startTime === null && endTime === null) || (ifUndetermineTime && startTime !== null && endTime !== null)
      },
      comaddress () {
        let { ifUndetermineAddress } = this.froms
        let { areaTxt, address } = this
        return (!ifUndetermineAddress && areaTxt === '' && address === '') || (ifUndetermineAddress && areaTxt !== '' && address !== '')
      },
      comoks () {
        return this.notempty && this.isphone && this.actcompany && this.comsingup && this.comactive && this.comaddress
      }
    },

    async created () {
      await this.getArea(this.provinceList[0].id, 'city')
      await this.getArea(this.cityList[0].id, 'district')
      this.cityId = this.cityList[0].id
      this.districtId = this.districtList[0].id
    },
    methods: {
      dateConfirm (val) {
        let value = this.fromDate(val)
        console.log(value)
        let objtime = {}
        switch (this.timetype) {
          case 1:
            Object.assign(objtime, { signUpStartTime: value })
            break
          case 2:
            Object.assign(objtime, { signUpEndTime: value })
            break
          case 3:
            Object.assign(objtime, { startTime: value })
            break
          case 4:
            Object.assign(objtime, { endTime: value })
            break
        }
        Object.assign(this.froms, objtime)
        this.isopen = false
        this.timetype = null
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
      },
      dateCancel () {
        this.isopen = false
        this.timetype = null
      },
      signupfn (bol) {
        if (!bol) {
          this.froms.signUpStartTime = null
          this.froms.signUpEndTime = null
        }
        let objsing = { ifUndetermineSignUp: bol }
        Object.assign(this.froms, objsing)
      },
      actTimefn (bol) {
        if (!bol) {
          this.froms.startTime = null
          this.froms.endTime = null
        }
        let objact = { ifUndetermineTime: bol }
        Object.assign(this.froms, objact)
      },
      addressFn (bol) {
        if (!bol) {
          this.areaTxt = ''
          this.address = ''
        }
        let objaddress = { ifUndetermineAddress: bol }
        Object.assign(this.froms, objaddress)
      },
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
      timetypefn (num) {
        this.timetype = num
        this.isopen = true
      },
      wineparty (num) {
        if (num === 1) {
          const company = { company: '' }
          Object.assign(this.froms, company)
        }
        const acts = { activityType: num }
        Object.assign(this.froms, acts)
        console.log(this.froms, 'forms')
      },
      goback () {
        window.location.href = '/community?status=0'
      },
      notSubmit () {
        console.log('this.froms onSubmit', this.froms)
        if (!this.notempty) {
          let { name, introduce, contact } = this.froms
          let objCheck = { name, introduce, contact }
          this.tipsfn(objCheck)
          return
        }
        if (!this.actcompany) {
          let { activityType, company } = this.froms
          if (!activityType) {
            this.$toast('请选择活动类型')
          } else {
            if (activityType === 2 && company === '') {
              this.$toast('请填写公司名')
            }
          }
          return
        }
        if (!this.isphone) {
          this.$toast('请输入正确的手机号码')
          return
        }
        console.log(this.comsingup, 'comsingup')
        if (!this.comsingup) {
          console.log('aaaaaaaa')
          let { signUpStartTime, signUpEndTime } = this.froms
          let objCheck = { signUpStartTime, signUpEndTime }
          this.tipsfn(objCheck)
          return
        }
        if (!this.comactive) {
          let { startTime, endTime } = this.froms
          let objCheck = { startTime, endTime }
          this.tipsfn(objCheck)
          return
        }
        if (!this.comaddress) {
          let { areaTxt, address } = this
          let objCheck = { areaTxt, address }
          this.tipsfn(objCheck)
        }
      },
      tipsfn (obj) {
        let arrtips = {
          name: '请输入活动名称',
          activityType: '请选择活动类型',
          introduce: '活动简介不能为空',
          contact: '联系人不能为空',
          phone: '手机号码不能为空',
          signUpStartTime: '报名开始时间不能为空',
          signUpEndTime: '报名结束时间不能为空',
          startTime: '活动开始时间不能为空',
          endTime: '活动结束时间不能为空',
          areaTxt: '省市区不能为空',
          provinceTxt: '省份不能为空',
          cityTxt: '城市不能为空',
          districtTxt: '地区不能为空',
          address: '具体不能为空'
        }
        for (let [key, val] of Object.entries(obj)) {
          console.log(key)
          if (val === '' || val === null) {
            this.$toast(arrtips[key])
            return false
          }
        }
      },
      async onSubmit () {
        console.log('this.froms onSubmit', this.froms)
        let allparams = {}
        let { name, activityType, introduce, contact, phone } = this.froms
        let { ifUndetermineSignUp, ifUndetermineTime, ifUndetermineAddress } = this.froms
        let baesparams = { name, activityType, introduce, contact, phone, ifUndetermineSignUp, ifUndetermineTime, ifUndetermineAddress }
        let otherparams = {}
        if (activityType === 2) {
          let { company } = this.froms
          Object.assign(otherparams, company)
        }
        if (ifUndetermineSignUp) {
          let { signUpStartTime, signUpEndTime } = this.froms
          let _stime = signUpStartTime + ':00'
          let _etime = signUpEndTime + ':00'
          let objsign = { signUpStartTime: _stime, signUpEndTime: _etime }
          Object.assign(otherparams, objsign)
        }
        if (ifUndetermineTime) {
          let { startTime, endTime } = this.froms
          let _stime = startTime + ':00'
          let _etime = endTime + ':00'
          let objact = { startTime: _stime, endTime: _etime }
          Object.assign(otherparams, objact)
        }
        if (ifUndetermineAddress) {
          let { provinceTxt, cityTxt, districtTxt } = this
          let objaddress = { province: provinceTxt, city: cityTxt, district: districtTxt, address: this.address }
          Object.assign(otherparams, objaddress)
        }
        Object.assign(allparams, baesparams, otherparams)
        const {code, data} = await munityApi.clientApply(allparams)
        if (code === 200) {
          console.log(data)
          this.$toast.success('活动提交成功')
          this.clearFrom()
        }
      },
      clearFrom () {
        this.areaTxt = ''
        this.address = ''
        let restFrom = {
          name: '',
          activityType: null,
          ifUndetermineSignUp: false,
          ifUndetermineTime: false,
          ifUndetermineAddress: false,
          signUpStartTime: null,
          signUpEndTime: null,
          startTime: null,
          endTime: null,
          introduce: '',
          contact: '',
          phone: '',
          company: ''
        }
        Object.assign(this.froms, restFrom)
      }
    }
  }
</script>
<style lang="less" scoped>
.apply {
  height: 100vh;
  font-size: 14px;

  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    border-bottom: 1PX solid #F1F1F1;
    padding-left: 10px;
    padding-right: 10px;

    .ic_back {
      width: 30px;
      height: 30px;
      background-image: url('~/assets/img/Icons/ic_return_b_30x30@2x.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 8px 14px;
    }

    .ic_empty {
      width: 30px;
      height: 30px;
    }

    .title {
      font-size: 17px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }

  &-main {
    height: calc(100vh - 45px);
    padding-bottom: 50px;
    box-sizing: border-box;
    background: #F5F5F5;
    overflow: auto;

    .actname {
      background: #fff;
      padding: 0 20px;

      &-title {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        padding: 20px 0;
      }

      &-input {
        width: 100%;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        line-height: 15px;
        padding-bottom: 20px;
        &.cor {
          color: #000;
        }
      }
    }

    .acttype {
      padding: 0 20px;
      background: #fff;

      &-title {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        padding: 20px 0 15px;
      }

      &-items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 30px;
      }

      &_item {
        width: 160px;
        text-align: center;
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 13px;
        padding: 14px 0 13px;
        border: 1PX solid #F1F1F1;
        border-radius: 3px;

        &.active {
          background: #03A1CD;
          border: 1PX solid #03A1CD;
          font-size: 13px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .actselect {
      margin: 10px 0;
      padding-left: 20px;
      background: #fff;

      &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 20px 0 0;
        &.pbot {
          padding-bottom: 25px;
        }

        .top_title {
          font-size: 15px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }

        .top_radio {
          display: flex;
          align-items: center;

          .radio-one {
            margin-right: 30px;
          }

          .radio-item {
            font-size: 15px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            padding-left: 30px;
            position: relative;

            &:before {
              content: '';
              width: 20px;
              height: 20px;
              border: 2PX solid #CCCCCC;
              box-sizing: border-box;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
            }

            &.active {
              &:before {
                border: none;
                background-image: url('~/assets/img/Icons/ic_check_bule_20x20@2x.png');
                background-size: 20px;
                background-repeat: no-repeat;
                background-position: center center;
              }
            }
          }
        }
      }

      &-item {
        padding-top: 15px;
        padding-right: 20px;
        padding-bottom: 10px;

        &>p {
          position: relative;
          font-size: 15px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(204, 204, 204, 1);
          line-height: 15px;
          padding-top: 15px;
          padding-bottom: 10px;
          &.cor {
            color: #000;
          }

          &:after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 7px;
            height: 10px;
            background-image: url('~/assets/img/Icons/ic_more_right_gray_12x12@2x.png');
            background-repeat: no-repeat;
            background-position: center right;
            background-size: 7px 10px;
          }
        }

        .actselect_address {
          font-size:15px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(204,204,204,1);
          line-height:15px;
          width: 100%;
          &.cor {
            color: #000;
          }
        }
      }

      &-start {
        border-bottom: 1PX solid #F1F1F1;
      }
    }

    .actinstro {
      margin: 10px 0;
      padding: 25px 20px;
      background: #fff;

      &-title {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 15px;
        padding-bottom: 13px;
      }

      &-textarea {
        width: 100%;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(199, 199, 199, 1);
        line-height: 20px;
        &.cor {
          color: #000;
        }
      }

      &-tip {
        text-align: right;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(199, 199, 199, 1);
        line-height: 15px;
        padding-top: 15px;
      }

    }

    .actperson {
      margin: 10px 0;
      padding-left: 20px;
      padding-bottom: 20px;
      background: #fff;

      &-item {
        border-bottom: 1PX solid #F1F1F1;
      }

      &_title {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 15px;
        padding-top: 25px;
      }

      &_inp {
        padding-top: 20px;
        padding-bottom: 19px;
        font-size: 15px;
        line-height: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        &.cor {
          color: #000;
        }
      }
    }
  }

  &-submit {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    background: #CCCCCC;
    z-index: 20;
    &.oks {
      background: #03A1CD;
    }
  }
}
</style>