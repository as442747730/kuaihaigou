<template>
  <van-popup v-model="configs.isshow" position="right">
    <div class="editinfo">
      <com-head :titleConfig="configs._title"></com-head>
      <div class="edit-main">
        <div class="edit-one">
          <van-field v-model="configs.model" :placeholder="configs._plholder" />
        </div>
        <p class="edit-tip" v-if="configs.tips">{{ configs.tips }}</p>
      </div>
      <div class="edit-foot">
        <p class="foot-btn" @click="updFn">确定</p>
      </div>
    </div>
  </van-popup>
</template>
<script>
import comHead from '~/components/com-head'
import { userApi } from '~/api/users'
export default {
  components: {
    comHead
  },
  data () {
    return {
      configs: {
        isshow: false,
        _title: '',
        model: '',
        _plholder: '',
        tips: ''
      }
    }
  },
  mounted () {
    this.$bus.on('getConfigs', cfg => {
      // console.log('cfgxx', cfg)
      let { type, model, isshow, nickname } = cfg
      let getobj = this.getInfos(type)
      // console.log(getobj, 'getobj')
      this.configs = { type, nickname, isshow, model, ...getobj }
    })
    this.$bus.on('closeHead', ch => {
      this.configs.isshow = ch
    })
  },
  methods: {
    cancleFn () {
      this.configs.isshow = false
    },
    async updFn () {
      let Ques = {}
      let { nickname, model, type } = this.configs
      switch (type) {
        case 'nickname':
          Ques = { nickname: model }
          break
        case 'qq':
          Ques = { qq: model }
          break
        case 'wechat':
          Ques = { wechat: model }
          break
        case 'signature':
          Ques = { signature: model }
          break
        case 'wineWhen':
          Ques = { wineWhen: model }
          break
        case 'wineArea':
          Ques = { wineArea: model }
          break
        case 'wineVariety':
          Ques = { wineVariety: model }
          break
        case 'wineHowMany':
          Ques = { wineHowMany: model }
          break
      }
      if (type !== 'nickname') {
        Object.assign(Ques, { nickname })
      }
      const { code, data } = await userApi.upduserinfo(Ques)
      if (code === 200) {
        // console.log(data)
        // this.$toast('修改成功')
        this.configs.isshow = false
        this.$router.go(-1)
        this.$bus.emit('editinfoChange', true)
      } else {
        this.$toast(data)
      }
    },
    getInfos (type) {
      let title
      let tips
      let _plholder
      switch (type) {
        case 'nickname':
          title = '昵称'
          _plholder = '请输入' + title
          tips = '昵称由3-10位汉字/字母/符号组成，首位不能是符号'
          break
        case 'qq':
          title = 'QQ号'
          _plholder = '请输入' + title
          break
        case 'wechat':
          title = '微信号'
          _plholder = '请输入' + title
          break
        case 'signature':
          title = '个性签名'
          _plholder = '请输入' + title
          break
        case 'wineWhen':
          title = '其它信息'
          _plholder = '请输入什么时候开始喝葡萄酒'
          break
        case 'wineArea':
          title = '其它信息'
          _plholder = '最喜欢什么产区的葡萄酒'
          break
        case 'wineVariety':
          title = '其它信息'
          _plholder = '最喜欢什么品种的葡萄酒'
          break
        case 'wineHowMany':
          title = '其它信息'
          _plholder = '每个月喝多少瓶葡萄酒'
          break
      }
      let _title = '编辑' + title
      let okObj = { _title, _plholder, tips }
      return okObj
    }
  },
  beforeDestory () {
    this.$bus.off('getConfigs')
  }
}
</script>
<style lang="less" scoped>
.van-popup--right {
  left: 0;
}
.editinfo {
  height: 100vh;
  background: #F3F3F3;
}

.edit-main {
  .edit-one {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 65px;
    background: #fff;
  }

  .edit-tip {
    padding: 15px 20px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}

.edit-foot {
  position: fixed;
  bottom: 15px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  .foot-btn {
    width: 100%;
    height: 45px;
    border-radius: 7px;
    background: #03A1CD;
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    .flex_allCenter;
  }
}
</style>