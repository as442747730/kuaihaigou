<template>
  <div class="manage">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="mange-in">
    	<section class="manage_sec">
	      <list-one @click.native="updPhone" list_left="手机号" :list_right="userInfo.phone"></list-one>
	      <list-one list_left="修改密码" @click.native='toComfim'></list-one>
    	</section>
      <div class="manage_title">账号绑定</div>
      <section class="manage_sec">
        <list-two @okSwitch="okSwitch" @noSwitch="noSwitch" l_one="微信" type="wx" :l_two="userInfo.wxNickname" :vsw="bindWx"></list-two>
        <list-two @okSwitch="okSwitch" @noSwitch="noSwitch" l_one="QQ" type="qq" :l_two="userInfo.qqNickname" :vsw="bindQQ"></list-two>
      	<list-two @okSwitch="okSwitch" @noSwitch="noSwitch" l_one="微博" type="wb" :l_two="userInfo.wbNickname" :vsw="bindWb"></list-two>
        <div class="depart-line"></div>
        <div class="login-out" @click='loginOut'>
          退出登录
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
import ListOne from '~/components/list/ListOne'
import ListTwo from '~/components/list/ListTwo'
import { userApi } from '~/api/users'
export default {
  components: {
    comHead,
    ListOne,
    ListTwo
  },
  async asyncData (req) {
    let personInfo = userApi.serverPostInfo(req)
    const { code: detCode, data: detData } = await personInfo
    if (detCode === 506) {
      req.redirect('/account/login')
    } else if (detCode === 200) {
      let { wxNickname, qqNickname, wbNickname } = detData
      let bindWx = false
      let bindQQ = false
      let bindWb = false
      if (wxNickname) {
        bindWx = true
      }
      if (qqNickname) {
        bindQQ = true
      }
      if (wbNickname) {
        bindWb = true
      }
      return {
        userInfo: detData,
        bindWx: bindWx,
        bindQQ: bindQQ,
        bindWb: bindWb
      }
    } else {
      req.redirect('/error')
    }
  },
  data () {
    return {
      configtitle: '账号管理',
      vanshow: true,
      userInfo: {},
      bindWx: false,
      bindQQ: false,
      bindWb: false
    }
  },
  methods: {
    updPhone () {
      let _phone = this.userInfo.phone
      window.location.href = '/account/mgphone?phone=' + _phone
    },
    async getInfo () {
      // 获取用户信息
      const { code: detCode, data: detData } = await userApi.userDetail()
      if (detCode === 200) {
        let { wxNickname, qqNickname, wbNickname } = detData
        let bindWx = false
        let bindQQ = false
        let bindWb = false
        if (wxNickname) {
          bindWx = true
        }
        if (qqNickname) {
          bindQQ = true
        }
        if (wbNickname) {
          bindWb = true
        }
        return {
          userInfo: detData,
          bindWx: bindWx,
          bindQQ: bindQQ,
          bindWb: bindWb
        }
      }
    },
    okSwitch (type) {
      this.bindMethod(type)
    },
    noSwitch (type) {
      this.unbindMethod(type)
    },
    bindMethod (type) {
      // 绑定
      let sameurl = 'http://' + window.location.host + 'account/mgnumber'
      let diffurl = ''
      switch (type) {
        case 'wx':
          diffurl = 'wx'
          break
        case 'qq':
          diffurl = 'qq'
          break
        case 'wb':
          diffurl = 'wb'
          break
      }
      let newurl = '/api/authorize/' + diffurl + '?returnUrl=' + sameurl
      console.log('newurl', newurl)
      window.location.href = newurl
    },
    async unbindMethod (type) {
      // 解绑
      const { code, data } = await userApi.dsunbind(type)
      if (code === 200) {
        console.log(data)
        this.getInfo()
        sessionStorage.setItem('key', '')
        this.$toast('解绑成功')
        setTimeout(() => {
          window.location.href = '/mine'
        }, 500)
      }
    },
    loginOut () {
      this.$dialog.confirm({
        message: '确定要退出吗？'
      }).then(async () => {
        const { code } = await userApi.loginOut()
        if (code === 200) {
          this.$toast('登出成功')
          setTimeout(() => {
            window.location.href = '/home'
            // window.location.reload()
          }, 1000)
        }
      })
    },
    // 去修改密码
    toComfim () {
      window.location.href = '/account/forget?type=modify'
    }
  }
}
</script>
<style lang="less" scope>
.manage {
  &_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F6F6F6;
    font-size: 13px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(153, 153, 153, 1);
    padding: 0 20px;
  }
  .mange-in {
    font-size: 0;
  }
  .login-out {
    display: flex;
    align-items: center;
    height: 67px;
    padding: 0 20px;
    font-size: 15px;
    border-bottom: 1px solid #F5F5F5;
  }
}
</style>