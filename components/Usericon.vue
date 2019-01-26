<!-- 
   * 说明: 
      由于开发人员变动，icon信息分成两块，每块都有各自的联动内容，不好合并处理
      对传过来的值做了处理，统一为字符串类型，因为要处理pug的传值问题,pug只能传String
   1、 profess 包含全部icon信息，适用于非 会员中心头部，顶部头像hover下拉
   2、 official 适用于 会员中心头部，顶部头像hover下拉，为官方认证icon
   3、 selfmedia 适用于 会员中心头部，顶部头像hover下拉，为自媒体认证icon
 -->
<template>
  <div :class="'u-icon-type' + type">
    <i :class="'u-level_' + level"></i>
    <i v-if="profess !== ''" :class="'u-profess ' + profess" :title='title'></i>
    <i v-if="official !== 'undefined' && official !== ''" class="u-office" :title='official'></i>
    <i v-if="selfmedia !== 'undefined' && selfmedia !== ''" :class="'u-self_' + selfmedia" :title='title'></i>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    level: String,
    profess: String,
    official: {
      type: String,
      default: ''
    },
    selfmedia: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      title: '',

      professTxt: [
        {key: 'CMS_IS', title: 'CMS一级(IS)'},
        {key: 'CMS_CS', title: 'CMS二级(CS)'},
        {key: 'CMS_AS', title: 'CMS三级(AS)'},
        {key: 'CMS_MS', title: 'MS'},
        {key: 'WSRT_2ND', title: 'WSET二级'},
        {key: 'WSRT_3TH', title: 'WSET三级'},
        {key: 'WSRT_DIP', title: 'WSET Diploma'},
        {key: 'WSRT_MW', title: 'MW'},
        {key: 'ISG_2ND', title: 'ISG二级侍酒师'},
        {key: 'ISG_3TH', title: 'ISG三级侍酒师'},
        {key: 'ISG_DIP', title: 'ISG Diploma'},
        {key: 'STATE_3TH', title: '国家三级品酒师'},
        {key: 'STATE_2ND', title: '国家二级品酒师'},
        {key: 'STATE_1ST', title: '国家一级品酒师'},
        {key: 'OTHER', title: '其他'},
        {key: 'OFFICIAL_MEDIA', title: '企业媒体'},
        {key: 'PERSONAL_MEDIA', title: '个人媒体'},
        {key: 'OFFICIAL', title: '官方认证'}
      ]
    }
  },
  watch: {
    profess (val) {
      if (val !== '') {
        let vals = this.professTxt.find(v => v.key === val)
        if (vals) {
          this.title = vals.title
        }
      }
    },
    official (val) {
      let vals = this.professTxt.find(v => v.key === val)
      if (vals) {
        this.title = vals.title
      }
    },
    selfmedia (val) {
      if (val === '0') {
        this.title = '企业媒体'
      } else if (val === '1') {
        this.title = '个人媒体'
      }
    }
  },
  created () {
    if (this.professTxt.find(v => v.key === this.profess) !== undefined) {
      this.title = this.professTxt.find(v => v.key === this.profess).title
    }
  }
}
</script>

<style lang='less'>
  .u-icon-type1 {
    display: inline-block;
    &>i {
      width: 22px;
      height: 22px;
      display: inline-block;
      vertical-align: middle;
      &:first-child {
        margin-right: 5px;
      }
    }
  }
  .u-icon-type2 {
    position: absolute;
    right: -55px;
    top: -2px;
    width: 49px;
    text-align: left;
    &>i {
      width: 22px;
      height: 22px;
      display: inline-block;
      vertical-align: middle;
      &:first-child {
        margin-right: 5px;
      }
    }
  }
</style>
