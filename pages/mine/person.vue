<template>
  <div class="person">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="person-main">
      <div class="person-head" @click="elheadFn">
        <img v-if="infos.headimgurl" class="headimg" :src="infos.headimgurl" />
        <img v-else class="headimg" src="~/assets/img/Icons/ic_dashangtongzhi_40x40@2x.png" />
        <i class="ic_arrow"></i>
      </div>
      <div class="person-listone">
        <div class="lists">
          <list-one  @rFn="editFn('nickname')" list_left="昵称" :list_right="infos.nickname"></list-one>
          <list-one @rFn="editSex(infos.sex)" list_left="性别" :list_right="infos.strSex"></list-one>
           <list-one v-if="birshow" @rFn="changeBirhday" list_left="生日" :list_right="infos.birhday">
            <div class="list-switch" slot="sl_l">
              <van-switch @input="switchOpen('birst', birshow)" active-color="#03A1CD" size="24px" :value="birshow" />
            </div>
          </list-one>
          <list-one v-else list_left="生日">
            <div class="list-switch" slot="sl_l">
              <van-switch @input="switchOpen('birst', birshow)" active-color="#03A1CD" size="24px" :value="birshow" />
            </div>
          </list-one>
          <list-one v-if="addrshow" @rFn="editSex('_dz')" list_left="居住地" :list_right="infos._dz">
            <div class="list-switch" slot="sl_l">
              <van-switch @input="switchOpen('address', addrshow)" active-color="#03A1CD" size="24px" :value="addrshow" />
            </div>
          </list-one>
          <list-one v-else list_left="居住地">
            <div class="list-switch" slot="sl_l">
              <van-switch @input="switchOpen('address', addrshow)" active-color="#03A1CD" size="24px" :value="addrshow" />
            </div>
          </list-one>
          <list-one v-if="wxshow" @rFn="editFn('wechat')" list_left="微信号" :list_right="infos.wechat">
            <div class="list-switch" slot="sl_l">
              <van-switch @input="switchOpen('wechat', wxshow)" active-color="#03A1CD" size="24px" :value="wxshow" />
            </div>
          </list-one>
          <list-one v-else list_left="微信号">
            <div class="list-switch" slot="sl_l">
              <van-switch @input="switchOpen('wechat', wxshow)" active-color="#03A1CD" size="24px" :value="wxshow" />
            </div>
          </list-one>
          <list-one v-if="qqshow" @rFn="editFn('qq')" list_left="QQ" :list_right="infos.qq">
            <div class="list-switch" slot="sl_l">
              <van-switch @input="switchOpen('qq', qqshow)" active-color="#03A1CD" size="24px" :value="qqshow" />
            </div>
          </list-one>
          <list-one v-else list_left="QQ">
            <div class="list-switch" slot="sl_l">
              <van-switch @input="switchOpen('qq', qqshow)" active-color="#03A1CD" size="24px" :value="qqshow" />
            </div>
          </list-one>
          <list-one @rFn="editFn('signature')" list_left="个性签名" :list_right="infos.signature"></list-one>
        </div>
        <div class="otherinfo">
          <h3>其他信息</h3>
          <p>让别的酒友更了解您</p>
        </div>
      </div>
      <div class="person-listtwo">
        <list-two @ltwoFn="editFn('wineWhen')" title="什么时候开始喝葡萄酒" :content="infos.wineWhen"></list-two>
        <list-two @ltwoFn="editFn('wineArea')" title="最喜欢什么产区的葡萄酒" :content="infos.wineArea"></list-two>
        <list-two @ltwoFn="editFn('wineVariety')" title="最喜欢什么品种的葡萄酒" :content="infos.wineVariety"></list-two>
        <list-two @ltwoFn="editFn('wineHowMany')" title="每个月喝多少瓶葡萄酒" :content="infos.wineHowMany"></list-two>
      </div>
    </div>
    <selectHead></selectHead>
    <editinfo></editinfo>
    <el-sex></el-sex>
    <el-date></el-date>

  </div>
</template>
<script>
import { userApi } from '~/api/users'
import comHead from '~/components/com-head'
import listOne from './_listOne'
import listTwo from './_listTwo'
import selectHead from './_selectHead'
import editinfo from './_editinfo'
import elSex from './_elSex'
import elDate from './elDate'
export default {
  components: {
    comHead,
    listOne,
    listTwo,
    selectHead,
    editinfo,
    elSex,
    elDate
  },
  data () {
    return {
      configtitle: '个人信息',
      birshow: false,
      wxshow: false,
      qqshow: false,
      addrshow: false,
      infos: {}
    }
  },
  mounted () {
    this.getDetail()
    this.$bus.on('editinfoChange', v => {
      if (v) {
        this.getDetail()
      }
    })
  },
  methods: {
    onChange (picker, values) {
    },
    async getDetail () {
      const { code, data } = await userApi.userDetail()
      if (code === 200) {
        console.log(data)
        let { headimgurl, nickname, birhday, birhdayCanSee } = data
        this.birshow = birhdayCanSee
        let obj1 = { headimgurl, nickname, birhday }
        let { wechat, wechatCanSee, qq, qqCanSee } = data
        this.wxshow = wechatCanSee
        this.qqshow = qqCanSee
        let obj2 = { wechat, wechatCanSee, qq, qqCanSee }
        let { signature, sex } = data
        let strSex = sex === 1 ? '男' : sex === 2 ? '女' : '未知/保密'
        let obj3 = { signature, sex, strSex }
        let { wineWhen, wineArea, wineVariety, wineHowMany } = data
        let wineObj = { wineWhen, wineArea, wineVariety, wineHowMany }
        // 地址
        let { residenceProvince, residenceCity, residenceCanSee } = data
        this.addrshow = residenceCanSee
        let _dz = ''
        if (residenceProvince) _dz += residenceProvince
        if (residenceCity) _dz += residenceCity
        console.log('_dz', _dz, typeof _dz)
        console.log(_dz.toString())
        this.infos = { _dz, ...obj1, ...obj2, ...obj3, ...wineObj }
        console.log(this.infos, 'infos')
      }
    },
    elheadFn () {
      // 选择头像
      this.$bus.emit('headStatus', true)
    },
    editFn (type) {
      /**
      * type => 类型
      */
      let value
      let { nickname, qq, wechat, signature } = this.infos
      let { wineWhen, wineArea, wineVariety, wineHowMany } = this.infos
      switch (type) {
        case 'nickname':
          value = nickname
          break
        case 'qq':
          value = qq
          break
        case 'wechat':
          value = wechat
          break
        case 'signature':
          value = signature
          break
        case 'wineWhen':
          value = wineWhen
          break
        case 'wineArea':
          value = wineArea
          break
        case 'wineVariety':
          value = wineVariety
          break
        case 'wineHowMany':
          value = wineHowMany
          break
      }
      let configs = {
        isshow: true,
        type: type,
        model: value,
        nickname: nickname
      }
      this.$bus.emit('getConfigs', configs)
      window.location.hash = '#editinfo'
    },
    async switchOpen (type, bol) {
      // 切换显示与否
      let { nickname } = this.infos
      if (!nickname) {
        this.$toast('用户名不能为空')
        return
      }
      let dol = !bol
      // console.log('dol', dol)
      // console.log('bol', bol)
      let toTip = dol ? '已开启' : '已关闭'
      let otObj = {}
      switch (type) {
        case 'birst':
          otObj = { birhdayCanSee: dol }
          break
        case 'address':
          otObj = { residenceCanSee: dol }
          break
        case 'qq':
          otObj = { qqCanSee: dol }
          break
        case 'wechat':
          otObj = { wechatCanSee: dol }
          break
      }
      let Ques = { nickname, ...otObj }
      console.log(Ques, 'Ques')
      const { code, data } = await userApi.upduserinfo(Ques)
      if (code === 200) {
        this.$toast(toTip)
        switch (type) {
          case 'birst':
            this.birshow = dol
            break
          case 'address':
            this.addrshow = dol
            break
          case 'qq':
            this.qqshow = dol
            break
          case 'wechat':
            this.wxshow = dol
            break
        }
      } else {
        this.$toast(data)
      }
    },
    editSex (num) {
      let { nickname } = this.infos
      let objs = {
        type: num,
        nickname: nickname,
        isshow: true
      }
      this.$bus.emit('elSexFn', objs)
    },
    changeBirhday () {
      console.log('changeBirhday changeBirhday')
      let { nickname } = this.infos
      let objs = {
        nickname: nickname,
        isshow: true
      }
      this.$bus.emit('elDateFn', objs)
    }
  },
  beforeDestory () {
    this.$bus.off('editinfoChange', true)
  }
}
</script>
<style lang="less" scoped>
.person {
  &-main {
    background: #F6F6F6;
  }

  &-head {
    height: 94px;
    background: #fff;
    padding: 0 20px;
    .flex_between;

    .headimg {
      width: 50px;
      width: 50px;
    }

    .ic_arrow {
      width: 7px;
      height: 10px;
      background: url('~/assets/img/Icons/ic_more_right_gray_12x12@2x.png');
      .bg_cover;
    }
  }

  &-listone {
    margin-top: 10px;

    .list-switch {
      margin-left: 30px;
      .van-switch--on {
        background-color: #03A1CD;
      }
    }
  }

  .otherinfo {
    padding: 18px 20px;

    h3 {
      font-size: 15px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 8px;
    }

    p {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 12px;
    }
  }
}
</style>