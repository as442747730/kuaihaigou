<template>
  <div class="u-prove" :class="{'fullScreen': fullScreen}">
    <div class="u-prove-info" :class="{'provePass': provePass}">
      <div class="title font_hight" v-if='!provePass'>
        <h2>我的荣誉</h2>
        <i @click='proveIntro = true'></i>
      </div>
      <template v-else>
        <div class="title">
          <h2>
            我的荣誉
            <span @click="cancel()">解除认证</span>
          </h2>
          <p>选择1个展示在头像的右侧</p>
        </div>
        <!-- 专业认证的icon显示 -->
        <ul class="honor-item" v-if='userInfo.professionTypeResps'>
          <li class="honor-list" v-for='($v, $k) in userInfo.professionTypeResps' :class="{'cur': honorActive === $k}">
            <div class="icon u-profess" :class='$v.code' @click='chooseIcon($v.id, $k)'></div>
            <p>
              {{ $v.name }}
            </p>
          </li>
        </ul>
        <!-- 媒体认证的icon显示 -->
        <div v-if='userInfo.selfMediaPlatformResps' class="media-item">
          <div :class="'icon u-self_' + userInfo.selfMediaType"></div>
          <span>{{ userInfo.selfMediaType === 0 ? '企业媒体' : '个人自媒体' }}</span>
          <div class="media-item-list" v-for='($v, $k) in userInfo.selfMediaPlatformResps'>
            <p @click="cancelMedia($v.id)">
              {{ $v.platformName }}
              <i v-if='deletEnable'></i>
            </p>
          </div>
        </div>
        <!-- 官方认证的icon显示 -->
        <div v-if='proveMethod === 32' class="office-item">
          <div class="icon u-office"></div>
          <span>官方认证</span>
          <p>{{ userInfo.certificationName }}</p>
        </div>

        <div class="depart-line"></div>
      </template>
      <!-- 未认证 -->
      <div class="pro" v-if='proveMethod === 0'>
        <div class="pro-box">
          <h3 class="font_hight">您还没有被认证哦</h3>
          <p>请选择以下1个身份快速认证</p>
          <span class="font_hight">未认证</span>
        </div>
      </div>
      <!-- 审核中 -->
      <div class="pro auditing" v-if='isAudit'>
        <div class="pro-box">
          <h3 class="font_hight">您申请的【{{ referTxt }}】</h3>
          <p>正在审核，2个工作日以内回复</p>
          <span class="font_hight">审核中</span>
        </div>
      </div>
      <!-- 被拒绝 -->
      <div class="pro refuse" v-if='proveMethod === 5'>
        <div class="pro-box">
          <h3 class="font_hight">您的申请认证</h3>
          <p>抱歉，您的认证审核未通过</p>
          <span class="font_hight">
            未通过
            <i @click='failIntro = true'>查看失败原因 ></i>
          </span>
        </div>
      </div>
      <div class="desc" v-if='!provePass'>
        <h4>选择认证身份，立即获得荣耀</h4>
        <p>专业认证、自媒体认证或者官方认证，只可三选其一进行认证。</p>
      </div>
      <div class="desc" v-else>
        <h2>
          我的认证
          <span>{{ certCategory === 1 ? '专业认证' : 2 ? '媒体认证' : '企业认证' }}</span>
        </h2>
        <i @click='proveIntro = true'></i>
      </div>
      <ul class="u-prove-item">
        <li class="u-prove-list" :class="{'disable': certCategory !== 1 && certCategory !== 0 }" @click='majorClick'>
          <i class="icon_major"></i>
          <span>专业认证</span>
          <p>持有职业资格证书的 专业级别认证</p>
        </li>
        <li class="u-prove-list" :class="{'disable': certCategory !== 2 && certCategory !== 0 }" @click='mediaClick'>
          <i class="icon_media"></i>
          <span>媒体认证</span>
          <p>红酒领域 相关媒体认证</p>
        </li>
        <li class="u-prove-list" :class="{'disable': certCategory !== 3 && certCategory !== 0 }" @click='professClick'>
          <i class="icon_office"></i>
          <span>企业认证</span>
          <p>红酒领域企业 红酒内容相关机构</p>
        </li>
      </ul>
    </div>
    <div class="depart-line"></div>
    <div class="u-prove-power">
      <h3 class="font_hight">选择后可获得特权</h3>
      <ul>
        <li class="u-prove-power-list" v-for='$v in powerList'>
          <div class="pro" :style="'background:url(' + $v.imgurl + ') no-repeat center/contain'"></div>
          <p>{{ $v.title }}</p>
          <span>{{ $v.content }}</span>
        </li>
      </ul>
    </div>

    <!-- 专业认证 -->
    <transition name="slide">
      <major v-if='showMajor' :professionTypeResps='userInfo.professionTypeResps || []'></major>
    </transition>

    <!-- 媒体认证 -->
    <transition name="slide">
      <media v-if='showMedia' :selfMediaType='userInfo.selfMediaType'></media>
    </transition>

    <!-- 企业认证 -->
    <transition name="slide" >
      <office v-if='showOffice'></office>
    </transition>

    <!-- 说明弹窗 -->
    <van-dialog v-model="proveIntro" :show-confirm-button="false" :closeOnClickOverlay='false' >
      <div class="prove-intro">
        <div class="intro-title font_hight">
          关于“资质认证”
          <van-icon name='cross' @click='close' />
        </div>
        <div class="intro-content">
          <p>快海购是葡萄酒爱好者与业内人士聚焦地，因以下原因部分酒款不在线公开销售；</p>
          <em>1. 酒庄要求不可线上公开销售；</em>
          <em class="mb-15">2. 年产量稀少；</em>
          <p>所以此类酒款，我们只在快海购线下实体店销售，以及线上专业认证人士限量购买品鉴；请提交相关资质，通过认证后，便可在商家专区查看和购买相关商品。</p>
          <span>注：对于在本站分享“精彩绝伦”高质量文章等内容的资深葡萄酒爱好者，快海购官方除了会奖励现金稿酬以外，还会赠送认证资质。</span>
        </div>
        <div class="u-button noradius" @click='proveIntro = false'>知道了</div>
      </div>
    </van-dialog>

    <!-- 认证失败文案 -->
    <van-dialog v-model="failIntro" :show-confirm-button="false" :closeOnClickOverlay='false' >
      <div class="prove-intro faild">
        <div class="intro-title font_hight">
          {{ userInfo.latestCertificationFailureReason || '' }}
        </div>
        <div class="i-known font_medium" @click='failIntro = false'>
          知道了
        </div>
      </div>
    </van-dialog>

  </div>  
</template>
<script>
import api from '~/utils/request'
import { userApi } from '~/api/users'
import { proveApi } from '~/api/prove'

import major from '~/components/prove/Major'
import media from '~/components/prove/Media'
import office from '~/components/prove/Office'

export default {
  head () {
    return {
      title: '资质认证',
      meta: [
        { hid: 'title', name: 'title', content: '资质认证' }
      ]
    }
  },

  components: {
    major,
    media,
    office
  },

  async asyncData (req) {
    return api.all([
      userApi.serverPostInfo(req),
      proveApi.powerList()
    ]).then(api.spread(function (res1, res2) {
      if (res1.code === 506) {
        req.redirect('/account/login')
      }
      let userInfo = {}
      let powerList = []
      let proveMethod = 0
      let referTxt = ''
      let isAudit = false
      let provePass = false
      let mediaPass = false
      let honorActive = null
      let majorId = null
      if (res1.code === 200 && res2.code === 200) {
        userInfo = res1.data
        powerList = res2.data
        let { certCategory, certStage, professionTypeResps } = res1.data
        //  --- 专业认证 ---
        if (certCategory === 1 && certStage === 1) {
          // 专业认证审核中
          proveMethod = 11
          referTxt = '专业认证'
          isAudit = true
        }
        if (certCategory === 1 && certStage === 2) {
          // 专业认证通过
          proveMethod = 12
          provePass = true
        }
        if (certCategory === 1 && certStage === 3) {
          // 专业认证二次提交审核中
          proveMethod = 11
          isAudit = true
          referTxt = '专业认证'
          provePass = true
        }
        if (certCategory === 1 && certStage === 4) {
          // 专业认证二次认证被拒绝
          proveMethod = 14
          referTxt = '专业认证'
          provePass = true
        }
        //  --- 自媒体认证 ---
        if (certCategory === 2 && certStage === 1) {
          // 自媒体认证审核中
          proveMethod = 21
          referTxt = '媒体认证'
          isAudit = true
        }
        if (certCategory === 2 && certStage === 2) {
          // 自媒体认证通过
          proveMethod = 22
          provePass = true
        }
        if (certCategory === 2 && certStage === 3) {
          // 自媒体认证二次审核中
          proveMethod = 21
          isAudit = true
          referTxt = '媒体认证'
          provePass = true
        }
        if (certCategory === 2 && certStage === 4) {
          // 自媒体认证二次审核中
          proveMethod = 24
          referTxt = '媒体认证'
          provePass = true
        }
        //  --- 官方认证 ---
        if (certCategory === 3 && certStage === 1) {
          // 官方认证审核中
          proveMethod = 31
          referTxt = '官方认证'
          isAudit = true
        }
        if (certCategory === 3 && certStage === 2) {
          // 官方认证通过
          proveMethod = 32
          provePass = true
        }
        if (certStage === 5) {
          // 申请未通过
          proveMethod = 5
        }
        if (provePass && professionTypeResps) {
          // 获取默认认证
          professionTypeResps.find((v, index) => {
            if (v.code === res1.data.professionTypeCode) {
              honorActive = index
              majorId = v.id
            }
          })
        }
        return {
          userInfo: userInfo,
          powerList: powerList,
          proveMethod: proveMethod,
          referTxt: referTxt,
          certCategory: certCategory,
          isAudit: isAudit,
          // mediaAudit: mediaAudit,
          provePass: provePass,
          mediaPass: mediaPass,
          honorActive: honorActive,
          majorId: majorId
        }
      } else {
        req.redirect('/error')
      }
    }))
  },

  data () {
    return {
      configtitle: '资质认证',
      proveIntro: false, // 认证说明弹窗
      failIntro: false, // 认证失败说明

      showMajor: false, // 显示专业认证
      showMedia: false, // 显示媒体认证
      showOffice: false, // 显示官方认证

      userInfo: {},
      powerList: [],

      certStage: 0, // 当前认证状态
      certCategory: 0, // 当前认证类型
      proveMethod: 0, // 认证类型以及状态
      referTxt: '',
      isAudit: false, // xx认证审核中
      provePass: false, // 专业认证是否通过
      mediaPass: false, // 自媒体认证是否通过

      honorActive: null,
      majorId: null,

      deletEnable: false,
      fullScreen: false
    }
  },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.$dialog.confirm({
          message: '你的认证资料还未提交<br>确定退出吗？'
        }).then(() => {
          window.location.replace('/prove')
        }).catch(() => {
          let hash = ''
          if (this.showMajor) hash = '#major'
          if (this.showMeida) hash = '#media'
          if (this.showMeida) hash = '#office'
          this.fullScreen = false
          window.location.hash = hash
        })
      } else if (to.hash === '#major') {
        this.showMajor = true
        this.fullScreen = true
      } else if (to.hash === '#media') {
        this.showMedia = true
        this.fullScreen = true
      } else if (to.hash === '#office') {
        this.showOffice = true
        this.fullScreen = true
      }
    }
  },

  mounted () {
    console.log('userInfo', this.userInfo)
  },

  methods: {
    majorClick () {
      if ((this.certCategory !== 1 && this.certCategory !== 0) || this.isAudit) return
      this.showMajor = true
      window.location.hash = 'major'
    },
    mediaClick () {
      if ((this.certCategory !== 2 && this.certCategory !== 0) || this.isAudit) return
      this.showMedia = true
      window.location.hash = 'media'
    },
    professClick () {
      if ((this.certCategory !== 3 && this.certCategory !== 0) || this.isAudit || this.provePass) return
      this.showOffice = true
      window.location.hash = 'office'
    },
    async chooseIcon (id, index) {
      this.majorId = id
      if (this.honorActive === index) return
      this.honorActive = index
      const { code, data } = await proveApi.certDefault(id)
      if (code === 200) {
        this.$toast('修改成功')
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        this.$toast(data)
      }
    },
    cancel (id) {
      if (this.proveMethod === 11 || this.proveMethod === 21 || this.proveMethod === 31) return this.$toast('当前正处于认证审核状态，请等待审核完毕后再执行相关操作')
      let fn = null
      // 自媒体
      if (this.userInfo.selfMediaPlatformResps) {
        this.deletEnable = !this.deletEnable
        return
      }
      this.$dialog.confirm({
        message: '确定解除当前选中认证吗？'
      }).then(async () => {
        if (this.userInfo.professionTypeResps) {
          fn = proveApi.cancelMajor(this.majorId)
        } else if (this.proveMethod === 32) {
          fn = proveApi.cancelOffice()
        }
        const { code, data } = await fn
        if (code === 200) {
          this.$toast('解绑成功')
          window.location.reload()
        } else {
          this.$toast(data)
        }
      })
    },
    cancelMedia (id) {
      if (!this.deletEnable) return
      this.$dialog.confirm({
        message: '确定解除当前选中认证吗？'
      }).then(async () => {
        const { code, data } = await proveApi.cancelMedia(id)
        if (code === 200) {
          this.$toast('解绑成功')
          window.location.reload()
        } else {
          this.$toast(data)
        }
      })
    },
    close () {
      this.proveIntro = false
    },
    closeFail () {
      this.failIntro = false
    }
  }
}
</script>
<style lang="less" scoped>
.u-prove {
  &.fullScreen {
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
  }
  &-info {
    &.provePass {
      .title {
        display: block;        
        span {
          float: right;
          font-weight: normal;
          color: #666;
          font-size: 13px;
        }
        p {
          font-size: 11px;
          color: #666;
          margin: 10px 0 15px;
        }
      }
      .desc {
        margin-left: 20px;
        margin-bottom: 15px;
        padding: 15px 20px 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;
        h2 {
          font-size: 15px;
          color: #333;
          position: relative;
          span {
            position: absolute;
            font-size: 11px;
            font-weight: normal;
            color: #333;
            left: 72px;
            top: 2px;
            width: 50px;
          }
        }
        i {
          display: inline-block;
          color: #999;
          width: 15px;
          height: 15px;
          background: url('~assets/img/prove/ic_wenti_g_15x15@2x.png') no-repeat center/contain;
        }
      }
    }
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px 20px 0;
      h2 {
        font-size: 15px;
        color: #333;
      }
      i {
        display: inline-block;
        color: #999;
        width: 15px;
        height: 15px;
        background: url('~assets/img/prove/ic_wenti_g_15x15@2x.png') no-repeat center/contain;
      }
    }
    .pro {
      margin-top: 15px;
      width: 100%;
      height: 147px;
      box-sizing: border-box;
      background: url('~assets/img/prove/bg_glory_weirenz@2x.png') no-repeat center/contain;
      padding: 20px;
      color: #fff;
      &.auditing {
        background: url('~assets/img/prove/bg_glory_shenhezhong@2x.png') no-repeat center/contain;
        span {
          color: #FFF3DF;
          background: #EDC37F;
        }  
      }
      &.refuse {
        background: url('~assets/img/prove/bg_glory_weitongguo@2x.png') no-repeat center/contain;
        span {
          background: #ff8091;
          color: #fbb8c1;
          position: relative;
          i {
            box-sizing: border-box;
            width: 100px;
            position: absolute;
            color: #F2586D;
            font-size: 11px;
            padding: 5px 0px 6px 9px;
            background: #fff;
            display: inline-block;
            border-radius: 6px 12px 12px 0;
            left: 75px;
            top: -16px;
          }
        }
      }
      .pro-box {
        padding: 0 20px;
      }
      h3 {
        font-size: 15px;
      }
      p {
        font-size: 11px;
        margin: 10px 0 20px;
      }
      span {
        font-size: 13px;
        color: #E6EEFF;
        padding: 6px 15px;
        border-radius: 4px;
        background: rgba(89,153,255,1);
      }
    }
    .desc {
      padding: 0 20px;
      margin-top: 8px;
      h4 {
        font-size: 11px;
        color: #333;
        font-weight: normal;
        text-align: center;
        position: relative;
        &:before,
        &:after {
          position: absolute;
          content: '';
          width: 86px;
          height: 1PX;
          background: #f1f1f1;
          top: 4px;
        }
        &:before {
          left: 0;
        }
        &:after {
          right: 0;
        }
      }
      p {
        font-size: 10px;
        color: #999;
        text-align: center;
        margin: 6px 0 13px;
      }
    }
    // 专业认证icon显示
    .honor-item {
      font-size: 0;
      border-top: 1px solid #eee;
    }
    .honor-list {
      display: inline-block;
      text-align: center;
      width: 33.33%;
      padding: 16px 0 20px;
      box-sizing: border-box;
      border-right: 1px solid #f1f1f1;
      filter: grayscale(100%);
      position: relative;
      &.cur {
        filter: grayscale(0%);
        &:before {
          content: "\F014";
          position: absolute;
          display: inline-block;
          font: 0.37333rem/1 "vant-icon";
          font-size: inherit;
          text-rendering: auto;
          width: 16px;
          height: 16px;
          font-size: 16px;
          color: #03a1cd;
          right: 10px;
          top: 10px;
        }
      }
      .icon {
        display: inline-block;
        width: 50px;
        height: 50px;
      }
      p {
        margin-top: 9px;
        color: #333;
        font-size: 11px;
      }
    }
    // 自媒体认证icon显示
    .media-item {
      font-size: 0;
      text-align: center;
      margin-bottom: 20px;
      .icon {
        display: block;
        margin: 0 auto; 
        width: 57px;
        height: 57px;
      }
      span {
        color: #333;
        font-size: 11px;
        display: block;
        margin: 7px 0 15px;
      }
      &-list {
        display: inline-block;
        p {
          display: inline-block;
          color: #fff;
          font-size: 11px;
          margin: 0px 10px 0;
          padding: 6px 10px;
          background: #03A1CD;
          border-radius: 3px;
          position: relative;
        }
        i {
          background: url('~assets/img/prove/ic_off_red_20x20@2x.png') no-repeat center/contain;
          width: 20px;
          height: 20px;
          position: absolute;
          right: -12px;
          top: -8px
        }
      }
    }
    // 官方认证icon显示
    .office-item {
      font-size: 0;
      text-align: center;
      .icon {
        width: 57px;
        height: 57px;
        margin: 13px auto 0;
      }
      span {
        color: #333;
        font-size: 11px;
        display: block;
        margin: 15px 0 7px;
      }
      p {
        display: inline-block;
        color: #fff;
        font-size: 12px;
        padding: 6px 10px;
        background: #03A1CD;
        border-radius: 3px;
        margin-bottom: 15px;
      }
    }
  }
  &-item {
    font-size: 0;
    padding: 0 20px 30px;
  }
  &-list {
    display: inline-block;
    text-align: center;
    width: 33.33%;
    vertical-align: top;
    &.disable {
      filter: grayscale(100%);
    }
    &>i {
      display: inline-block;
      width: 64px;
      height: 64px;
    }
    .icon {
      &_major {
        background: url('~assets/img/prove/ic_profession_100x100copy@2x.png') no-repeat center/contain;
      }
      &_media {
        background: url('~assets/img/prove/ic_self_media_100x100@2x.png') no-repeat center/contain;
      }
      &_office {
        background: url('~assets/img/prove/ic_official_100x100@2x.png') no-repeat center/contain;
      }
    }
    span {
      margin: 5px 0;
      display: inline-block;
      font-size: 13px;
      color: #333;
      font-weight: bold;
      font-family: 'PingFangSC-Semibold';
    }
    p {
      width: 90px;
      margin: 0 auto; 
      font-size: 10px;
      color: #666;
      line-height: 18px;
    }
  }
  &-power {
    ul {
      font-size: 0;
      padding: 0 20px;
    }
    h3 {
      color: #333;
      font-size: 15px;
      padding: 20px 0;
      margin-left: 20px;
      border-bottom: 1PX solid #f1f1f1;
      margin-bottom: 15px;
    }
    &-list {
      box-sizing: border-box;
      padding: 0 10px;
      margin-bottom: 25px;
      display: inline-block;
      vertical-align: top;
      width: 33.33%;
      text-align: center;
      .pro {
        display: inline-block;
        width: 50px;
        height: 50px;
      }
      p {
        font-size: 12px;
        margin: 10px 0 5px;
      }
      span {
        font-size: 10px;
        color: #999;
        line-height: 16px;
      }
    }
  }
}
.prove-intro {
  padding: 30px 20px;
  &.faild {
    padding: 0px;
    .intro-title {
      padding: 20px 0;
      margin-bottom: 0;
      font-size: 17px;
      line-height: 24px;
    }
    .i-known {
      font-size: 17px;
      color: #03A1CD;
      padding: 15px 0;
      text-align: center;
      border-top: 1px solid #CDCED2;
    }
  }
  .intro-title {
    text-align: center;
    color: #333;
    font-size: 19px;
    margin-bottom: 20px;
    i {
      float: right;
    }
  }
  .intro-content {
    p {
      line-height: 22px;
      font-size: 12px;
      color: #666;
      padding-bottom: 15px;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 15px;
    }
    em {
      display: block;
      font-size: 15px;
      color: #333;
      line-height: 25px;
      font-size: 15px;
    }
    span {
      color: #999;
      font-size: 12px;
      line-height: 22px;
    }
  }
}
</style>
<style lang='less'>
  .u-prove-common {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 100vh;
    box-sizing: border-box;
    overflow: scroll;
   .title {
      font-size: 15px;
      color: #333;
      padding: 20px 0;
    }
    .step {
      padding: 0 20px;
      font-size: 0;
    }
    .van-radio-group {
      text-align: left;
      margin-bottom: 25px;
    }
    .van-radio {
      display: inline-block;
      &.checked {
        .van-radio__label {
          background: #03A1CD;
          color: #fff;
          border-color: #03A1CD;
        }
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
      .van-radio__input {
        display: none;
      }
      .van-radio__label {
        margin-left: 0;
        margin-right: 15px;
        width: 160px;
        line-height: 40px;
        height: 40px;
        text-align: center;
        color: #999;
        border-radius: 3px;
        box-sizing: border-box;
        border: 1px solid #F1F1F1;
        background: #FCFCFC;
        font-size: 13px;
      }
    }
    .upload-box {
      width: 160px;
      height: 110px;
      text-align: center;
      padding-top: 30px;
      box-sizing: border-box;
      position: relative;
      margin-bottom: 20px;
      &.success {
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: rgba(0,0,0,.2);
          z-index: -1
        }
        i {
          background: url('~assets/img/prove/ic_recamera_blue_30x30@2x.png') no-repeat center/contain;
        }
        p {
          color: #fff
        }
      }
      i {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url('~assets/img/prove/ic_camera_blue_30x30@2x.png') no-repeat center/contain;
      }
      p {
        margin-top: 10px;
        color: #333;
        font-size: 13px;
      }
    }
    .textarea-item {
      textarea {
        font-size: 15px;
        width: 100%;
        line-height: 25px;
        color: #666;
      }
      .words {
        font-size: 15px;
        color: #C7C7C7;
        display: block;
        text-align: right;
        padding: 20px 0 25px;
      }
    }
    .prove-submit {
      margin-top: 42px;
      text-align: center;
      background: #03A1CD;
      color: #fff;
      line-height: 48px;
      height: 48px;
      font-size: 15px;
    }
    .prove-input {
      width: 100%;
      font-size: 15px;
      color: #666;
      padding-bottom: 18px;
      border-bottom: 1px solid #f1f1f1;
    }
  }
  .van-dialog__message {
    font-size: 17px;
    color: #333;
    text-align: center;
    font-family: 'PingFangSC-Semibold';
    font-weight: bold;
  }
  .mb-15 {
    margin-bottom: 15px;
  }
  .mt-20 {
    margin-top: 20px;
  }

.step2{
   .textarea-item{
        textarea{
            padding-bottom: 18px;
        }
   }
}


</style>