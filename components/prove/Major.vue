<template>
  <div class="u-major">
    <div class="step step-1">
      <h3 class="title font_hight">请选择要认证的专业类型（可多选）：</h3>
      <div class="major-item">
        <p class="font_hight">英国（CMS）</p>
        <van-checkbox-group v-model="form.cms">
          <van-checkbox
            v-for="($v, $k) in cmsOptions"
            :key="$k"
            :name="$v.val"
          >
            {{ $v.title }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="major-item">
        <p class="font_hight">英国（WSET）</p>
        <van-checkbox-group v-model="form.wset">
          <van-checkbox
            v-for="($v, $k) in wsetOption"
            :key="$k"
            :name="$v.val"
          >
            {{ $v.title }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="major-item">
        <p class="font_hight">美国</p>
        <van-checkbox-group v-model="form.same">
          <van-checkbox
            v-for="($v, $k) in sameOption"
            :key="$k"
            :name="$v.val"
          >
            {{ $v.title }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="major-item">
        <p class="font_hight">中国</p>
        <van-checkbox-group v-model="form.china">
          <van-checkbox
            v-for="($v, $k) in chinaOption"
            :key="$k"
            :name="$v.val"
          >
            {{ $v.title }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="major-item">
        <p class="font_hight">其他</p>
        <van-checkbox-group v-model="form.other">
          <van-checkbox
            v-for="($v, $k) in otherOption"
            :key="$k"
            :name="$v.val"
          >
            {{ $v.title }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </div>
    <div class="depart-line"></div>
    <div class="step step-2">
      <h3 class="title font_hight">上传身份证照片</h3>
      <Upload class='front' @on-success="uploadFront" :max="1">
        <div class="upload-box" :class="{'success': form.frontImg}" :style="'background: url(' + (form.frontImg || frontDefault ) + ') no-repeat center/contain'">
          <i></i>
          <p>{{ form.frontImg ? '重新上传' : '上传人像面' }}</p>
        </div>
      </Upload>
      <Upload class='back' @on-success="uploadBack" :max="1">
        <div class="upload-box" :class="{'success': form.backImg}" :style="'background: url(' + (form.backImg || backDefault ) + ') no-repeat center/contain'">
          <i></i>
          <p>{{ form.backImg ? '重新上传' : '上传国徽面' }}</p>
        </div>
      </Upload>
    </div>
    <div class="depart-line"></div>
    <div class="step step-3">
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
import { proveApi } from '~/api/prove'
import frontDefault from '~/assets/img/prove/pic_id_card_positive_200x138@2x.png'
import backDefault from '~/assets/img/prove/pic_id_card_back_200x138@2x.png'
export default {
  name: 'm-major',

  components: { Upload, uImghandler },

  data () {
    return {
      cmsOptions: [
        { title: 'CMS一级(IS)', val: 'CMS_IS', disabled: false },
        { title: 'CMS二级(CS)', val: 'CMS_CS', disabled: false },
        { title: 'CMS三级(AS)', val: 'CMS_AS', disabled: false },
        { title: 'MS', val: 'CMS_MS', disabled: false }
      ],
      wsetOption: [
        { title: 'WSET二级', val: 'WSRT_2ND', disabled: false },
        { title: 'WSET三级', val: 'WSRT_3TH', disabled: false },
        { title: 'WSET Diploma', val: 'WSRT_DIP', disabled: false },
        { title: 'MW', val: 'WSRT_MW', disabled: false }
      ],
      sameOption: [
        { title: 'ISG二级侍酒师', val: 'ISG_2ND', disabled: false },
        { title: 'ISG三级侍酒师', val: 'ISG_3TH', disabled: false },
        { title: 'ISG Diploma', val: 'ISG_DIP', disabled: false }
      ],
      chinaOption: [
        { title: '国家三级品酒师', val: 'STATE_3TH', disabled: false },
        { title: '国家二级品酒师', val: 'STATE_2ND', disabled: false },
        { title: '国家一级品酒师', val: 'STATE_1ST', disabled: false }
      ],
      otherOption: [
        { title: '其他', val: 'OTHER', disabled: false }
      ],

      frontDefault: frontDefault, // 人像面
      backDefault: backDefault, // 国徽面

      form: {
        cms: [],
        wset: [],
        frontImg: null,
        frontKey: null,
        backImg: null,
        backKey: null,
        imgList: []
      }
    }
  },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
      }
    }
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
    async submit () {
      let typeCodes = []
      typeCodes = this.clearArray(typeCodes.concat(this.form.cms, this.form.wset, this.form.same, this.form.china, this.form.other))
      if (this.validate(typeCodes, '请选择认证类型') || this.validate(this.form.frontImg, '请上传身份证人面像照片') || this.validate(this.form.backImg, '请上传身份证国徽面照片') || this.validate(this.form.imgList, '请上传资格证相关照片')) {
        return
      }
      let obj = {
        typeCodes: typeCodes,
        idCardBack: this.form.backKey,
        idCardFacade: this.form.frontKey,
        certificateList: this.form.imgList.map(v => v.key)
      }
      console.log(obj)
      const { code } = await proveApi.certMajor(obj)
      if (code === 200) {
        this.$toast('提交成功')
        setTimeout(() => {
          window.location.replace('/prove')
        }, 500)
      }
    },
    clearArray (array) {
      let newArray = []
      array.forEach(($v, $k) => {
        if ($v !== undefined) {
          newArray.push($v)
        }
      })
      return newArray
    },
    validate (val, msg) {
      if (Array.isArray(val)) {
        if (val.length === 0) {
          this.$toast(msg)
          return true
        }
        // if (val.some(n => !n)) {
        //   this.$toast(msg)
        // }
        // return val.some(n => !n)
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

<style lang='less'>
.u-major {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  overflow: scroll;
  .step {
    padding: 0 20px;
    font-size: 0;
  }
  .title {
    font-size: 15px;
    color: #333;
    padding: 20px 0;
  }
  .major-item {
    &:not(:first-child) {
      margin-top: 10px;
    }
    p {
      font-size: 12px;
      color: #666;
      margin-bottom: 15px;
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
        background: url('~/assets/img/prove/ic_recamera_blue_30x30@2x.png') no-repeat center/contain;
      }
      p {
        color: #fff
      }
    }
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url('~/assets/img/prove/ic_camera_blue_30x30@2x.png') no-repeat center/contain;
    }
    p {
      margin-top: 10px;
      color: #333;
      font-size: 13px;
    }
  }
  .step-2 {
    .front {
      margin-right: 13px;
    }
  }
  .step-3 {
    h3 {
      padding-bottom: 10px;
    }
    p {
      font-size: 13px;
      color: #999;
    }
    .multigraph {
      margin: 20px 0 5px; 
    }
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
}
.van-checkbox {
  display: inline-block;
  margin-right: 11px;
  margin-bottom: 10px;
  width: 162px;
  &:nth-child(2n) {
    margin-right: 0;
  }
  .van-checkbox__icon--checked + span{
    color: #fff;
    background: #03A1CD;
    border-color: #03A1CD;
  }
  &>div {
    display: none;
  }
  span {
    width: 100%;
    height: 37px;
    text-align: center;
    line-height: 37px;
    box-sizing: border-box;
    border-radius: 3px;
    background: #fcfcfc;
    border: 1px solid #f1f1f1;
    display: inline-block;
    margin-left: 0;
    font-size: 13px;
    color: #999;
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
</style>
