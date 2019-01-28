<template>
  <div class="u-media u-prove-common">
    <div class="step step-1">
      <div class="input-item">
        <h3 class="title font_hight">媒体类型</h3>
        <van-radio-group v-model="form.mediaType" @change='handlerMedia' style='margin-bottom: 0'>
          <van-radio name="0" :class="{'checked': form.mediaType === '0'}"><em>企业媒体</em></van-radio>
          <van-radio name="1" :class="{'checked': form.mediaType === '1'}"><em>个人自媒体</em></van-radio>
        </van-radio-group>
      </div>
      <div class="input-item">
        <h3 class="title font_hight">自媒体名称</h3>
        <input class="prove-input" type="text" v-model='form.mediaName' placeholder="请填写自媒体名称" maxlength="30">
      </div>
    </div>

    <div class="depart-tips">
        请至少填写一个媒体平台信息
    </div>

    <div class="step step-2">
      <div class="input-item">
        <h3 class="title font_hight">公众号</h3>
        <input class="prove-input" type="text" v-model='form.wechat' placeholder="请填写公众号名称" maxlength="30">
      </div>
      <div class="input-item">
        <h3 class="title font_hight">新浪微博</h3>
        <input class="prove-input" type="text" v-model='form.weibo' placeholder="请填写新浪微博名称" maxlength="30">
        <input class="prove-input mt-20" type="text" v-model='form.href' placeholder="请填微博主页链接（选填）">
      </div>
    </div>
    <!-- <div class="depart-line"></div> -->
    <div class="step step3">
      <div class="textarea-item">
        <h3 class="title font_hight">其他平台</h3>
        <textarea v-model="form.other" :maxlength="150" rows="6" placeholder="请填写平台请填写平台名称和媒体账号名称，例如：豆瓣（快海购），可填写多个"></textarea>
        <span class="words">{{ form.other.length }}/150</span>
      </div>
    </div>
    <div class="depart-line"></div>
    <div class="step step3">
      <div class="textarea-item">
        <h3 class="title font_hight">媒体描述</h3>
        <textarea v-model="form.desc" :maxlength="150" rows="6" placeholder="请描述一下您的媒体在红酒行业的成绩或者其他有 意义有影响力的经历……（必填）"></textarea>
        <span class="words">{{ form.desc.length }}/150</span>
      </div>
    </div>
    <div class="depart-line"></div>
    <div class="step step4">
      <h3 class="title font_hight">{{ form.mediaType === '0' ? '上传企业营业执照(最多两张)' : '上传身份证照片'}}</h3>
      <Upload class='front' @on-success="uploadFront" :max="1">
        <div v-if="form.mediaType !== '0'" class="upload-box" :class="{'success': form.frontImg}" :style="'background: url(' + (form.frontImg || frontDefault ) + ') no-repeat center/contain'">
          <i></i>
          <p>{{ form.frontImg ? '重新上传' : '上传人像面' }}</p>
        </div>
        <div v-else class="upload-box" :class="[{'success': form.frontImg, 'qiye': form.mediaType === '0'}]" :style="'background: url(' + (form.frontImg || updDefault ) + ') no-repeat center/contain'">
          <i v-show="form.mediaType !== '0'"></i>
          <p v-if="form.mediaType !== '0'">{{ form.frontImg ? '重新上传' : '上传人像面' }}</p>
          <p v-else class="scp">点击上传</p>
        </div>
      </Upload>
      <Upload class='back' @on-success="uploadBack" :max="1">
        <!-- <div class="upload-box" :class="{'success': form.backImg}" :style="'background: url(' + (form.backImg || backDefault ) + ') no-repeat center/contain'">
          <i></i>
          <p>{{ form.backImg ? '重新上传' : '上传国徽面' }}</p>
        </div> -->
        <div v-if="form.mediaType !== '0'" class="upload-box" :class="{'success': form.backImg}" :style="'background: url(' + (form.backImg || backDefault ) + ') no-repeat center/contain'">
          <i></i>
          <p>{{ form.backImg ? '重新上传' : '上传国徽面' }}</p>
        </div>
        <div v-else class="upload-box" :class="[{'success': form.backImg, 'qiye': form.mediaType === '0'}]" :style="'background: url(' + (form.backImg || updDefault ) + ') no-repeat center/contain'">
          <i v-show="form.mediaType !== '0'"></i>
          <p v-if="form.mediaType !== '0'">{{ form.backImg ? '重新上传' : '上传人像面' }}</p>
          <p v-else class="scp">点击上传</p>
        </div>
      </Upload>
    </div>
    <div class="depart-line"></div>
    <div class="step step5">
      <h3 class="title font_hight">上传资格证等相关照片（最多5张）</h3>
      <p>(仅支持JPG、PNG格式，且文件小于5M)</p>
      <u-imghandler class='multigraph' :maxNum="5" v-model="form.imgList"></u-imghandler>
      <span>认证即代表你已同意<em class="font_hight">《社区指导原则》</em></span>
    </div>
    <div class="prove-submit" @click='submit'>
      立即认证
    </div>
  </div>
</template>

<script>
import Upload from '~/components/UploadProve'
import uImghandler from '~/components/prove/ImageHandler'
import frontDefault from '~/assets/img/prove/pic_id_card_positive_200x138@2x.png'
import backDefault from '~/assets/img/prove/pic_id_card_back_200x138@2x.png'
import updDefault from '~/assets/img/prove/ic_upload.png'
import { proveApi } from '~/api/prove'

export default {
  name: 'm-media',

  props: {
    selfMediaType: Number
  },

  components: { Upload, uImghandler },

  data () {
    return {
      form: {
        mediaType: '0',
        mediaName: '',
        other: '',
        desc: '',
        wechat: '',
        weibo: '',
        href: '',
        frontImg: null,
        frontKey: null,
        backImg: null,
        backKey: null,
        imgList: []
      },

      frontDefault: frontDefault, // 人像面
      backDefault: backDefault, // 国徽面
      updDefault: updDefault // 上传默认
    }
  },

  created () {
    if (this.selfMediaType) this.form.mediaType = String(this.form.mediaType)
  },

  methods: {
    uploadFront (data) {
      this.form.frontImg = data.url
      this.form.frontKey = data.key
    },
    uploadBack (data) {
      this.form.backImg = data.url
      this.form.backKey = data.key
    },
    handlerMedia (val) {
      if (this.selfMediaType === 0 && val === '1') {
        this.form.mediaType = '0'
        this.$toast('您当前通过认证的媒体为企业媒体，无法进行个人自媒体认证')
      } else if (this.selfMediaType === 1 && val === '0') {
        this.form.mediaType = '1'
        this.$toast('您当前通过认证的媒体为个人自媒体，无法进行企业媒体认证')
      } else {
        this.form.frontImg = null
        this.form.frontKey = null
        this.form.backImg = null
        this.form.backKey = null
        this.form.imgList = []
      }
    },
    async submit () {
      if (this.validate(this.form.mediaName, '请填写自媒体名称')) {
        return
      } else if (this.form.wechat === '' && this.form.weibo === '' && this.form.other === '') {
        return this.$toast('请至少填写一个媒体平台信息')
      } else if (this.validate(this.form.desc, '请填写媒体描述') || this.validate(this.form.imgList, '请上传资格证相关照片')) {
        return
      }
      if (this.form.mediaType === '0') {
        if (this.validate(this.form.frontImg, '请上传营业执照')) return
      } else {
        if (this.validate(this.form.frontImg, '请上传身份证人面像照片') || this.validate(this.form.backImg, '请上传身份证国徽面照片')) return
      }
      let s = []
      let obj = {
        identificationList: this.form.backKey ? s.concat(this.form.frontKey, this.form.backKey) : this.form.frontKey,
        certificateList: this.form.imgList.map(v => v.key),
        mediaType: this.form.mediaType,
        description: this.form.desc,
        name: this.form.mediaName,
        other: this.form.other,
        wechatPublicAccount: this.form.wechat,
        weiboName: this.form.weibo,
        weiboUrl: this.form.href
      }
      console.log(obj)
      const toast1 = this.$toast.loading({
        mask: true,
        message: '认证提交中'
      })
      const { code, data } = await proveApi.certMedia(obj)
      if (code === 200) {
        toast1.clear()
        this.$toast('提交成功')
        setTimeout(() => {
          window.location.replace('/prove')
        }, 500)
      } else {
        toast1.clear()
        this.$toast(data)
      }
    },
    validate (val, msg) {
      if (Array.isArray(val)) {
        if (val.length === 0) {
          this.$toast(msg)
          return true
        }
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
.u-media {
  .title {
    padding-top: 25px;
  }
  .step {
    padding-right: 0;
  }
  .step3 {
    padding-right: 20px;
  }
  .step4 {
    .front {
      margin-right: 15px;
    }
    .upload-box.qiye {
      background-color: #FAFAFA!important;
      border-radius: 5px;
      border: 1px solid #D9D9D9;
      background-size: 34px 26px!important;
      background-position: center 30px!important;
      &.success {
        background-size: contain!important;
        background-position: center!important;
        .scp {
          color: #fff;
        }
      }
      .scp {
        font-size: 11px;
        color: #666;
        margin-top: 38px;
      }
    }
  }
  .step5 {
    padding-right: 20px;
    .upload-box {
      margin-bottom: 0;
    }
    span {
      font-size: 13px;
      color: #666;
      em {
        color: #333
      }
    }
  }
  .depart-tips {
    padding: 10px 20px;
    font-size: 14px;
    color: #666;
    background: #f5f5f5;
  }
}
</style>