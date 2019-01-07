<template>
  <div class="u-prove">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="u-prove-info" :class="{'provePass': provePass}">
      <div class="title font_hight" v-if='!provePass'>
        <h2>我的荣誉</h2>
        <i @click='proveIntro = true'></i>
      </div>
      <template v-else>
        <div class="title">
          <h2>
            我的荣誉
            <span>解除认证</span>
          </h2>
          <p>选择1个展示在头像的右侧</p>
        </div>
        <ul class="honor-item">
          <li class="honor-list" v-for='($v, $k) in userInfo.professionTypeResps' :class="{'cur': honorActive === $k}">
            <div class="icon u-profess" :class='$v.code' @click='chooseIcon($v.id, $k)'></div>
            <p>
              {{ $v.name }}
            </p>
          </li>
        </ul>
        <div class="depart-line"></div>
      </template>
      <!-- 未认证 -->
      <div class="pro" v-if='proveMethod === 0'>
        <h3 class="font_hight">您还没有被认证哦</h3>
        <p>请选择以下1个身份快速认证</p>
        <span class="font_hight">未认证</span>
      </div>
      <!-- 审核中 -->
      <div class="pro auditing" v-if='proveMethod === 11'>
        <h3 class="font_hight">您申请的【{{ referTxt }}】</h3>
        <p>正在审核，2个工作日以内回复</p>
        <span class="font_hight">审核中</span>
      </div>
      <!-- 被拒绝 -->
      <div class="pro refuse" v-if='proveMethod === 5'>
        <h3 class="font_hight">您的申请认证</h3>
        <p>抱歉，您的认证审核未通过</p>
        <span class="font_hight">
          未通过
          <i @click='failIntro = true'>查看失败原因 ></i>
        </span>
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
      <major v-if='showMajor'></major>
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
      <div class="prove-intro">
        <div class="intro-title font_hight">
          您的认证未通过
          <van-icon name='cross' @click='closeFail' />
        </div>
        <div class="intro-content">
          <p style="text-align: center">失败原因：{{ userInfo.latestCertificationFailureReason || '' }}</p>
        </div>
        <div class="u-button noradius" @click='failIntro = false'>知道了</div>
      </div>
    </van-dialog>

  </div>  
</template>
<script>
import api from '~/utils/request'
import { userApi } from '~/api/users'
import { proveApi } from '~/api/prove'

import comHead from '~/components/com-head'
import major from '~/components/prove/Major'

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
    comHead,
    major
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
      let majorAudit = false
      let provePass = false
      let honorActive = null
      if (res1.code === 200 && res2.code === 200) {
        userInfo = res1.data
        powerList = res2.data
        let { certCategory, certStage, professionTypeResps } = res1.data
        if (certCategory === 1 && certStage === 1) {
          // 专业认证审核中
          proveMethod = 11
          referTxt = '专业认证'
          majorAudit = true
        }
        if (certCategory === 1 && certStage === 2) {
          // 专业认证通过
          proveMethod = 12
          provePass = true
          // 获取默认认证
          professionTypeResps.find((v, index) => {
            if (v.code === res1.data.professionTypeCode) {
              honorActive = index
            }
          })
        }
        if (certCategory === 1 && certStage === 3) {
          // 专业认证二次提交审核中
          proveMethod = 13
          majorAudit = true
          provePass = true
        }
        if (certCategory === 1 && certStage === 4) {
          // 专业认证二次认证被拒绝
          proveMethod = 14
          referTxt = '专业认证'
          provePass = true
        }
        if (certStage === 5) {
          // 申请未通过
          proveMethod = 5
        }
        return {
          userInfo: userInfo,
          powerList: powerList,
          proveMethod: proveMethod,
          referTxt: referTxt,
          certCategory: certCategory,
          majorAudit: majorAudit,
          provePass: provePass,
          honorActive: honorActive
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

      showMajor: false,

      userInfo: {},
      powerList: [],

      certStage: 0, // 当前认证状态
      certCategory: 0, // 当前认证类型
      proveMethod: 0, // 认证类型以及状态
      referTxt: '',
      majorAudit: false, // 专业认证审核中
      provePass: false, // 认证是否通过

      honorActive: null
    }
  },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.$dialog.confirm({
          message: '你的认证资料还未提交<br>确定退出吗？'
        }).then(() => {
          this.showMajor = false
        }).catch(() => {
          window.location.hash = '#major'
        })
      } else if (to.hash === '#major') {
        this.showMajor = true
      }
      if (to.hash === '#major') {
      }
    }
  },

  created () {
    console.log('userInfo', this.userInfo)
  },

  methods: {
    majorClick () {
      if ((this.certCategory !== 1 && this.certCategory !== 0) || this.majorAudit) return
      this.showMajor = true
      window.location.hash = 'major'
    },
    mediaClick () {
      if ((this.certCategory !== 2 && this.certCategory !== 0)) return
      console.log(2)
    },
    professClick () {
      if ((this.certCategory !== 3 && this.certCategory !== 0)) return
      console.log(3)
    },
    async chooseIcon (id, index) {
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
          background: url('~/assets/img/prove/ic_wenti_g_15x15@2x.png') no-repeat center/contain;
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
        background: url('~/assets/img/prove/ic_wenti_g_15x15@2x.png') no-repeat center/contain;
      }
    }
    .pro {
      margin-top: 15px;
      width: 100%;
      height: 147px;
      box-sizing: border-box;
      background: url('~/assets/img/prove/bg_glory_weirenz@2x.png') no-repeat center/contain;
      padding: 20px;
      color: #fff;
      &.auditing {
        background: url('~/assets/img/prove/bg_glory_shenhezhong@2x.png') no-repeat center/contain;
        span {
          color: #FFF3DF;
          background: #EDC37F
        }
      }
      &.refuse {
        background: url('~/assets/img/prove/bg_glory_weitongguo@2x.png') no-repeat center/contain;
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
          content: "\F0AF";
          position: absolute;
          display: inline-block;
          width: 16px;
          height: 16px;
          font-family: "vant-icon";
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
        background: url('~/assets/img/prove/ic_profession_100x100copy@2x.png') no-repeat center/contain;
      }
      &_media {
        background: url('~/assets/img/prove/ic_self_media_100x100@2x.png') no-repeat center/contain;
      }
      &_office {
        background: url('~/assets/img/prove/ic_official_100x100@2x.png') no-repeat center/contain;
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
  .u-button {
    margin: 0 auto;
    margin-top: 25px;
    width: 190px;
    height: 42px;
  }
}
.mb-15 {
  margin-bottom: 15px;
}
</style>
<style lang='less'>
  .van-dialog__message {
    font-size: 17px;
    color: #333;
    text-align: center;
    font-family: 'PingFangSC-Semibold';
    font-weight: bold;
  }
</style>