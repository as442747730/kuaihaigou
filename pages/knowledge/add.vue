<template>
  <main class="m-article-add">

    <div class="item-cell">
      <van-field
        v-model="title"
        class='input'
        type="textarea"
        placeholder="此处写下您的文章标题"
        rows="1"
        autosize
      />
    </div>

    <div class="item-cell" v-if="addType === 1">
      <Queditor @handleChange="getContent" @uploadSuccess="getUpload" :content='content'></Queditor>
    </div>

    <div class="item-cell" v-if="addType === 2">
      <div class="video-box">
        <el-upload
          v-if="!videoUrl"
          action="http://up-z2.qiniup.com"
          :data="uploadData"
          :show-file-list="false"
          accept="video/mp4"
          :before-upload="uploadBefore"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadErr"
          :on-progress="handleUploading"
          >
          <van-button v-if="!uploading">上传视频</van-button>
        </el-upload>

        <div class="upload-progress" v-if='uploading'>
          <van-circle v-model="percent" :text="progressTxt" />
        </div>

        <video v-if="videoUrl" class="video" controls :src="videoUrl"></video>

        <div class="delete-btn" v-if="videoUrl" @click="removeVideo"></div>

      </div>
    </div>

    <div class="item-cell">
      <p class="cell-title">请选择一个频道</p>
      <div class="channel">
        <div :class="['select-label', 'large', channelId === 1 ? 'active' : '']" @click="selectChannel(1)">美食/周边</div>
        <div :class="['select-label', 'large', channelId === 2 ? 'active' : '']" @click="selectChannel(2)">知识/经验</div>
      </div>
    </div>

    <div class="item-cell">
      <div class="popup">
        <span class="left">话题</span>
        <span class="right" @click="openTopic">{{ topicSelected ? topicSelected : '请选择一个话题'}}</span>
      </div>
    </div>

    <div class="item-cell" v-if="addType === 1">
      <p class="cell-title">文章中包含的葡萄酒类型</p>
      <div class="types wrap">
        <div :class="['select-label', typeIds.includes(item.id) ? 'active' : '']" v-for="item in typeList" :key="item.id" @click="handleLabel('type', item.id)">{{ item.name }}</div>
      </div>
    </div>

    <div class="item-cell" v-if="addType === 1">
      <p class="cell-title">文章中包含的葡萄品种</p>
      <div class="varieties wrap">
        <div :class="['select-label', varietyIds.includes(item.id) ? 'active' : '']" v-for="item in varietyList" :key="item.id" @click="handleLabel('variety', item.id)">{{ item.name }}</div>
      </div>
    </div>

    <div class="item-cell">
      <p class="cell-title">原作者/来源 （非原创文章必填）</p>
      <div class="input-box">
        <input v-model="auth" placeholder="原作者"></input>
      </div>
      <div class="input-box pt">
        <input v-model="url" placeholder="原地址"></input>
      </div>

      <div class="btn-box">
        <van-button class="btn" :loading="pLoading" @click="publish(true)">发布分享</van-button>
        <van-button class="btn light" :loading="dLoading" @click="publish(false)" v-if="addType === 1">存草稿</van-button>
      </div>
    </div>

    <van-popup v-model="topicShow" position="bottom">
      <van-picker ref="reasonPicker" :columns="topicList" show-toolbar @cancel="handleCancel" @confirm="handleSelect" />
    </van-popup>


  </main>
</template>

<script>
import api from '~/utils/request'
import { knowApi } from '~/api/knowledge'
import { cartApi } from '~/api/cart'
import Queditor from '@/components/QuillEditor.vue'

export default {
  name: '',

  layout: 'default',

  head () {
    return {
      title: '知识分享',
      meta: [
        { hid: 'title', name: 'title', content: '知识分享' }
      ]
    }
  },

  components: { Queditor },

  computed: {
    progressTxt () {
      return `${this.percent}%`
    }
  },

  async asyncData (req) {
    return api.all([
      knowApi.getTopicList(req),
      knowApi.getTypeList(req),
      knowApi.getVariety(req),
      cartApi.getCart(req),
      knowApi.draft(req) // 数据回显
    ])
      .then(api.spread(function (res1, res2, res3, res4, res5) {
        if (res1.code !== 200 || res2.code !== 200 || res3.code !== 200) {
          req.redirect('/error')
        }
        const hasLogin = res4.code !== 506
        let draftData = null
        if (res5.code === 200) {
          draftData = res5.data
        }
        return {
          addType: +req.query.type || 1,
          topicList: res1.data.map(n => { return { id: n.id, text: n.topicName } }),
          typeList: res2.data.map(n => { return { id: n.id, name: n.typeName } }),
          varietyList: res3.data.map(n => { return { id: n.id, name: n.varietyName } }),
          ifLogin: hasLogin,
          draftData: draftData
        }
      }))
  },

  data () {
    return {
      addType: 1, // 1 文章， 2 视频
      uploadData: {},

      videoUrl: '',
      percent: 0,
      uploading: false,

      title: '',
      content: '',

      topicList: [],
      typeList: [],
      varietyList: [],

      channelId: null,
      topicId: '',
      topicSelected: '',
      typeIds: [],
      varietyIds: [],

      imgs: [],
      auth: '',
      url: '',

      pLoading: false,
      dLoading: false,

      ifLogin: false,

      topicShow: false,
      topicCol: [],
      draftData: null
    }
  },

  created () {
    if (!this.ifLogin) {
      this.$notify({ message: '你尚未登录，请先登录', duration: 5000 })
    }
    if (!this.draftData) return
    this.title = this.draftData.title
    this.content = this.draftData.content
    this.channelId = +this.draftData.channelNumber
    this.topicSelected = this.draftData.topicName
    this.topicId = this.draftData.topicId
    this.typeIds = this.draftData.sharingKnowledgeContentTypeResps || []
    this.varietyIds = this.draftData.sharingKnowledgeContentVarietyResps || []
    this.auth = this.draftData.author
    this.url = this.draftData.address
  },

  methods: {
    getContent (val) {
      this.content = val
    },
    getUpload (val) {
      this.imgs.push(val)
      console.log(this.content)
    },
    openTopic () {
      this.topicShow = true
    },
    handleCancel () {
      this.topicShow = false
    },
    handleSelect (val) {
      this.topicId = val.id
      this.topicSelected = val.text
      this.topicShow = false
    },

    selectChannel (val) {
      this.channelId = val
    },
    handleLabel (t, val) {
      if (this[`${t}Ids`].includes(val)) {
        this[`${t}Ids`] = this[`${t}Ids`].filter(n => n !== val)
        return
      }
      this[`${t}Ids`].push(val)
    },

    async publish (ifPublish) {
      if (!this.ifLogin) {
        window.location.href = '/account/login'
        return
      }
      if (this.addType === 1) {
        // 传文章
        if (this.valid(this.title, '标题不可为空') || this.valid(this.content, '内容不可为空') || this.valid(this.channelId, '请选择频道') || this.valid(this.topicId, '请选择一个话题')) return
        this[ifPublish ? 'pLoading' : 'dLoading'] = true
        this.imgs = this.imgs.filter(m => this.content.includes(m))
        let obj = {}
        if (ifPublish) {
          // 发布
          obj = {
            id: this.draftId || null,
            varietys: this.varietyIds,
            types: this.typeIds,
            imgsPath: this.imgs,
            title: this.title,
            channelNumber: this.channelId,
            topicId: this.topicId,
            content: this.content,
            author: this.auth,
            address: this.url,
            summary: this.content.replace(/<.+?>/g, '').replace(/\n/g, '。').substring(0, 100),
            isDraft: false
          }
        } else {
          // 存草稿
          obj = {
            title: this.title,
            channelNumber: this.channelId,
            topicId: this.topicId,
            content: this.content,
            author: this.auth,
            varietys: this.varietyIds,
            types: this.typeIds,
            address: this.url,
            isDraft: true
          }
        }
        console.log(obj)
        const { code } = await knowApi.publishKnow(obj)
        if (code === 200) {
          this.$toast.success(ifPublish ? '发布成功' : '保存成功')
          ifPublish ? window.location.href = '/knowledge' : window.location.reload()
        }
        this[ifPublish ? 'pLoading' : 'dLoading'] = false
      } else {
        // 传视频
        if (this.valid(this.title, '标题不可为空') || this.valid(this.videoUrl, '请上传视频') || this.valid(this.channelId, '请选择频道') || this.valid(this.topicId, '请选择一个话题')) return
        this.pLoading = true
        const { code } = await knowApi.publishKnowVideo({
          title: this.title,
          channelNumber: this.channelId,
          topicId: this.topicId,
          videoPath: this.videoUrl,
          author: this.auth,
          address: this.url
        })
        if (code === 200) {
          this.$toast.success('发布成功')
          window.location.href = '/knowledge'
        }
        this.pLoading = false
      }
    },
    valid (v, msg) {
      if (!v) {
        this.$notify({ message: msg, duration: 1500 })
        return true
      }
      return false
    },

    async uploadBefore () {
      const { code, data } = await api.clientGet('/api/upload/getPublicToken')
      if (code === 200) {
        this.uploadData = { token: data.token }
      }
    },
    handleUploadSuccess (res) {
      console.log(res.data.url)
      this.uploading = false
      this.videoUrl = res.data.url
    },
    handleUploadErr () {
      this.uploading = false
    },
    handleUploading (event) {
      console.log(event.percent)
      this.uploading = true
      this.percent = Number(event.percent.toFixed(0))
    },
    removeVideo () {
      this.videoUrl = ''
    }
  }
}
</script>

<style lang="less">
.m-article-add {
  min-height: 100vh;
  background: @cor_border;
  .item-cell {
    background: white;
    margin-bottom: 10px;
  }
  .input {
    width: 100%;
    font-size: 17px;
    padding: 20px;
    box-sizing: border-box;
  }
  .cell-title {
    font-size: 15px;
    color: @cor_333;
    font-weight: bold;
    padding: 20px;
  }
  .select-label {
    text-align: center;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    border: 1PX solid #EEEEEE;
    border-radius: 4px;
    color: @cor_999;
    font-size: 13px;
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 18px;
    margin-bottom: 20px;
    &.large {
      width: 160px;
      margin: 0;
    }
    &.active {
      border-color: @cor_333;
      color: @cor_333;
      font-weight: bold;
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
  .wrap {
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
  }
  .popup {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 15px;
      color: @cor_333;
      font-weight: bold;
    }
    .right {
      font-size: 14px;
      color: @cor_666;
      padding-right: 22px;
      background-image: url(~/assets/img/order/icon-arrow.png);
      background-repeat: no-repeat;
      background-position: right center;
      background-size: contain;
    }
  }

  .channel {
    display: flex;
    justify-content: space-between;
    padding: 0 20px 25px 20px;
  }

  .input-box {
    font-size: 13px;
    margin: 0 20px;
    padding-bottom: 15px;
    border-bottom: 1PX solid @cor_border;
    &.pt {
      padding-top: 20px;
    }
    input {
      width: 100%;
    }
  }

  .video-box {
    padding: 20px;
    position: relative;
    .video {
      width: 200px;
      height: auto;
    }
    .upload-progress {
      font-size: 16px;
      text-align: center;
      .van-circle {
        width: 110px!important;
        .van-circle__text {
          padding-left: 4px;
        }
      }
    }
    .delete-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 16px;
      height: 16px;
      background-image: url(~/assets/img/knowledge/icon-delete.png);
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  .btn-box {
    padding: 18px 20px 5px 20px;
    display: flex;
    justify-content: space-between;
    .btn {
      background: @nice-blue;
      height: 50px;
      line-height: 50px;
      width: 162px;
      text-align: center;
      font-size: 15px;
      color: white;
      border-radius: 2px;
      box-sizing: border-box;
      &.light {
        background: white;
        color: @nice-blue;
        border: 1PX solid @nice-blue;
      }
      &:active {
      }
    }
  }

  .u-editor {
    .quill-editor {
      .ql-toolbar {
        border-top: none!important;
      }
      .ql-container {
        border-left: 0;
        border-right: 0;
      }
    }
  }
}
</style>
