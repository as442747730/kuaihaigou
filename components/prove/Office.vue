<template>
  <div class="u-office u-prove-common">
    <div class="office-in">
      <div class="step step-1">
        <div class="input-item">
          <h3 class="title font_hight">企业名称</h3>
          <input class="prove-input" type="text" v-model='form.officeName' placeholder="请填写企业名称（必填）" maxlength="30" @blur="ioskeyboard">
        </div>
        <div class="input-item">
          <h3 class="title font_hight">企业官网</h3>
          <input class="prove-input" type="text" v-model='form.href' placeholder="请填写官网名称（非必填）" maxlength="30" @blur="ioskeyboard">
        </div>
        <div class="input-item">
          <h3 class="title font_hight">企业类型</h3>
          <van-radio-group v-model="form.officeType">
            <van-radio name="1" :class="{'checked': form.officeType === '1'}"><em>红酒供应商</em></van-radio>
            <van-radio name="2" :class="{'checked': form.officeType === '2'}"><em>酒具供应商</em></van-radio>
            <van-radio name="4" :class="{'checked': form.officeType === '4'}"><em>红酒经销商</em></van-radio>
            <van-radio name="5" :class="{'checked': form.officeType === '5'}"><em>酒庄</em></van-radio>
            <van-radio name="3" :class="{'checked': form.officeType === '3'}"><em>其他</em></van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="depart-line"></div>
      <div class="step step2" v-if="form.officeType === '3'">
        <div class="textarea-item">
          <h3 class="title font_hight">其他平台</h3>
          <textarea v-model="form.other" :maxlength="150" rows="1" placeholder="请输入其他企业类型" @blur="ioskeyboard"></textarea>
        </div>
      </div>
      <div class="depart-line"></div>
      <div class="step">
        <div class="input-item">
          <h3 class="title font_hight">联系人</h3>
          <input class="prove-input" type="text" v-model='form.contact' placeholder="请输入姓名（非必填）" maxlength="30" @blur="ioskeyboard">
        </div>
        <div class="input-item">
          <h3 class="title font_hight">公司电话</h3>
          <input class="prove-input" type="text" v-model='form.phone' placeholder="请输入企业电话（非必填）" maxlength="30" @blur="ioskeyboard">
        </div>
      </div>
      <div class="depart-line"></div>
      <div class="step step3">
        <div class="textarea-item">
          <h3 class="title font_hight">认证描述</h3>
          <textarea v-model="form.desc" :maxlength="150" rows="6" placeholder="请描述一下您的媒体在红酒行业的成绩或者其他有 意义有影响力的经历……（必填）" @blur="ioskeyboard"></textarea>
          <span class="words">{{ form.desc.length }}/150</span>
        </div>
      </div>
      <div class="depart-line"></div>
      <div class="step step5">
        <h3 class="title font_hight">上传企业营业执照（最多2张）</h3>
        <!-- <Upload class='front' @on-success="uploadFront" :max="2">
          <div class="upload-box qiye" :class="{'success': form.frontImg}" :style="'background: url(' + (form.frontImg || updDefault ) + ') no-repeat center/contain'">
            <p class="scp">点击上传</p>
          </div>
        </Upload> -->
        <u-imghandler class='multigraph' :maxNum="2" v-model="form.businessList"></u-imghandler>
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

  components: { Upload, uImghandler },

  data () {
    return {
      form: {
        officeName: '',
        officeType: '1',
        other: '',
        href: '',
        desc: '',
        contact: '',
        phone: '',
        frontImg: null,
        frontKey: null,
        backImg: null,
        backKey: null,
        imgList: [],
        businessList: []
      },

      frontDefault: frontDefault, // 人像面
      backDefault: backDefault, // 国徽面
      updDefault: updDefault
    }
  },
  computed: {
    fromOfficeType () {
      return this.form.officeType
    }
  },

  methods: {
    uploadFront (data) {
      this.form.frontImg = data.url
      this.form.frontKey = data.key
    },
    ioskeyboard () {
      // ios 关闭键盘，回落空白
      window.scroll(0, 0)
    },
    async submit () {
      if (this.validate(this.form.officeName, '请填写企业名称') || this.validate(this.form.desc, '请填写认证描述') || this.validate(this.form.businessList, '请上传企业营业执照') || this.validate(this.form.imgList, '请上传资格证相关照片')) {
        return
      }
      if (this.form.officeType === '3' && this.validate(this.form.other, '请填写其他平台')) {
        return
      }
      let typeName = ''
      switch (this.form.officeType) {
        case '1':
          typeName = '红酒供应商'
          break
        case '2':
          typeName = '酒具供应商'
          break
        case '4':
          typeName = '红酒经销商'
          break
        case '5':
          typeName = '酒庄'
          break
        case '3':
          typeName = '其他'
          break
      }
      let obj = {
        certificateList: this.form.imgList.map(v => v.key),
        // businessLicences: this.form.frontKey,businessList
        businessLicences: this.form.businessList.map(v => v.key),
        description: this.form.desc,
        enterpriseName: this.form.officeName,
        typeCode: this.form.officeType,
        typeName: typeName,
        websiteUrl: this.form.href
      }
      console.log(obj)
      const toast1 = this.$toast.loading({
        mask: true,
        message: '认证提交中'
      })
      const { code, data } = await proveApi.certOffice(obj)
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
  },
  watch: {
    fromOfficeType (newval, oldval) {
      console.log('fromOfficeType change', newval, oldval)
    }
  }
}
</script>

<style lang="less">
.u-office {
  .office-in {
    min-height: 120vh;
  }
  .title {
    padding-top: 25px;
  }
  .step {
    padding-right: 0;
  }
  .step2,
  .step3,
  .step5 {
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
    .upload-box {
      margin-bottom: 0!important;
    }
    span {
      font-size: 13px;
      color: #666;
      em {
        color: #333
      }
    }
  }
  .van-radio {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>