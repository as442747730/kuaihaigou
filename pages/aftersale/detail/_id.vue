<template>
  <div class="m-aftersale-detail">

    <uTabs :list="tabList" @on-change="handleTab"></uTabs>

    <transition name="fade">
      <div :class="['info-section', status < 5 ? 'hasButton' : '']" v-if="section === 1">

        <div class="status-wrapper">
          <div :class="['status-title', status === 6 ? 'light-orange' : '']">{{ statusTxt }}</div>
          <div class="status-desc">{{ descTxt }}
            <span class="desc-link" v-if="status === 2" @click="openTransform">去填写</span>
            <span class="desc-link" v-if="status === 6" @click="showReason">查看具体原因</span>
          </div>
        </div>

        <div class="info-wrapper">
          <div class="info-top">
            <div class="info-top-item">
              <span>申请号：{{ detailObj.afterSaleIdentify }}</span>
              <span class="link" @click="getCredentials">查看申请凭证</span>
            </div>
            <div class="info-top-item">申请时间：{{ detailObj.createdAt }}</div>
          </div>
          <div class="info-content">
            <div class="g-product">
              <div class="cover" v-lazy:background-image="detailObj.cover"></div>
              <div class="info">
                <p class="title">{{ detailObj.goodsName }}</p>
                <p class="desc sku">{{ detailObj.skuName }}<span>x{{ detailObj.num }}</span></p>
                <p class="desc">
                  <span :class="{ 'light-orange': status !== 5 }">申请退款：¥{{ detailObj.totalRefundAmount }}</span>
                  <br>
                  <span class="light-orange mt10" v-if="status === 5">实际退款：￥{{ detailObj.actualRefundAmount }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-wrapper">
          <div class="wrapper-title">联系方式</div>
          <p class="cnotact-cell"><span class="label">联系人：</span><span class="subs">{{ detailObj.contact }}</span></p>
          <p class="cnotact-cell"><span class="label">联系电话：</span><span class="subs">{{ detailObj.phone }}</span></p>
          <p class="cnotact-cell"><span class="label">收货地址：</span><span class="subs">{{ `${detailObj.province}${detailObj.city}${detailObj.district}${detailObj.address}` }}</span></p>
        </div>

        <div class="courior-wrapper" v-if="detailObj.serviceType === 2 && detailObj.status > 2 && detailObj.status !== 7">
          <div class="wrapper-title">退货快递信息</div>
          <div class="wrapper-desc">快递公司：{{ detailObj.logistics }}</div>
          <div class="wrapper-desc">快递单号：{{ detailObj.logisticsIdentify }}</div>
        </div>

        <div class="btn-wrapper fit" v-if="status === 1 || status === 2">
          <van-button class="submit-btn" @click="handleCancel">取消售后</van-button>
        </div>

       <!--  <van-dialog v-model="reasonShow" :show-confirm-button="false" close-on-click-overlay >
          <div class="fail-reason">
            <div class="reason-title">您本次申请不符合退款条款，原因如下：</div>
            <div class="reason-detail">1、您的退回的商品并没在我们系统内查询到相应的识别信息；<br>2、寄回的商品有明显的外包装缺失和赠品缺失；<br>3、附带的发票并没有随商品一同寄回。</div>
          </div>
        </van-dialog> -->

        <van-dialog v-model="transfromShow" :show-confirm-button="false" close-on-click-overlay>
          <div class="dialog-title">货运单号</div>
          <div class="dialog-body">
            <van-field v-model="logiName" label="快递公司" placeholder="输入快递公司名称"></van-field>
            <van-field v-model="logiNum" label="快递单号" placeholder="输入快递单号"></van-field>
            <div class="confirm-btn" @click="sendTransform">确定</div>
          </div>
        </van-dialog>

        <transition name="slide-right">
          <div class="crendential-wrapper" v-if="crenShow">
            <div class="g-product">
              <div class="cover" v-lazy:background-image="require('~/assets/img/img2.png')"></div>
              <div class="info">
                <p class="title">{{ detailObj.goodsName }}</p>
                <p class="desc">{{ detailObj.skuName }}<span>x{{ detailObj.num }}</span></p>
              </div>
            </div>
            <div class="detail">
              <p><span class="label">申请退款：</span><span class="desc">￥{{ detailObj.totalRefundAmount }}</span></p>
              <p><span class="label">退货原因：</span><span class="desc">{{ detailObj.reason }}</span></p>
              <p><span class="label">问题描述：</span><span class="desc">{{ detailObj.description }}</span></p>
            </div>
            <div class="photo">
              <p class="title">凭证图片</p>
              <div class="photo-list">
                <div class="img" v-lazy:background-image="item" v-for="(item, index) in imgList" :key="index" @click="preview(index)"></div>
                <div class="placeholder" v-if="imgList.length === 2"></div>
                <div class="placeholder" v-if="imgList.length === 2 || imgList.length === 3"></div>
              </div>
            </div>
          </div>
        </transition>

      </div>
    </transition>

    <transition name="fade">
      <div class="record-section" v-if="section === 2">
        <div class="msg-box">

          <div :class="['msg-item', item.userid === '0' ? 'js' : '']" v-for="(item, index) in recordList" :key="index">
            <div class="time" v-if="index === 0 || getRecordTime(item.createdAt) - getRecordTime(recordList[index - 1].createdAt) > 120000">{{ item.createdAt }}</div>
            <div class="left avatar" v-if="item.userid === '0'" :style="`background-image: url(${require('~/assets/img/defaultImg.png')})`"></div>
            <div class="center">
              <span v-if="!item.ifImg">{{ item.content }}</span>
              <img v-else :src="item.content" alt="" @click="viewPhoto(item.content)">
            </div>
            <div class="right avatar" v-if="item.userid !== '0'"  :style="`background-image: url(${item.headimgurl || defaulthead})`"></div>
          </div>

        </div>
        <div class="input-box">
          <input class="input-select" v-model="content" placeholder="输入你的内容" @keyup.enter="sendMessage"></input>
          <Upload @on-success="sendImageRecord" :ifMult="false">
            <div class="image-select"></div>
          </Upload>
        </div>
      </div>
    </transition>


  </div>
</template>

<script>
import { afterSaleApi } from '~/api/order'
import { ImagePreview } from 'vant'
import uTabs from '@/components/Tabs'
import Upload from '@/components/Upload'
import api from '~/utils/request'

export default {
  name: '',

  components: { uTabs, Upload },

  head () {
    return {
      title: '售后详情',
      meta: [
        { hid: 'title', name: 'title', content: '售后详情' }
      ]
    }
  },

  async asyncData (req) {
    return api.serverGet(`/api/afterSale/getDetail/${req.params.id}`, { afterSaleId: req.params.id }, req).then(res => {
    // afterSaleApi.getAftersaleDetail(req.params.id, req).then(res => {
      console.log(res.data)
      if (res.code === 506) {
        req.redirect('/account/login')
      }
      if (res.code === 200) {
        return {
          id: req.params.id,
          status: res.data.status,
          imgList: res.data.imgs,
          detailObj: res.data
        }
      } else {
        req.redirect('/error')
      }
    })
  },

  watch: {
    '$nuxt.$route.hash' (val) {
      this.crenShow = val === '#credentials'
    }
  },

  data () {
    return {
      section: 1,

      defaulthead: this.defaulthead,
      // reasonShow: false,

      detailObj: {},

      id: null,
      status: 1,

      statusList: ['待审核', '审核中', '审核中', '退款中', '退款完成', '已拒绝', '已关闭'],
      descList: ['当前申请单已提交审核，我们会尽快处理', '等待您寄回货物，请提交退货运单号，', '等待接受您寄回的货物中', '正在走退款流程中，款项将原路返回您的账号', '款项已经原路退返至您的账号，请注意查收', '抱歉，您不符合退款条件，', '当前申请已经关闭'],

      crenShow: false,
      imgList: [],

      content: '',

      transfromShow: false,
      logiName: '',
      logiNum: '',

      recordList: [],

      tabList: [{ name: '申请信息', key: 1 }, { name: '协商记录', key: 2 }]
    }
  },

  computed: {
    statusTxt () {
      return this.statusList[this.status - 1]
    },
    descTxt () {
      return this.descList[this.status - 1]
    }
  },

  created () {
    console.log(this.detailObj)
    if (this.status === 2) {
      this.$dialog.confirm({
        title: '',
        message: '基础审核已通过 寄回货物请提交退货运单号',
        confirmButtonText: '去填写'
      }).then(() => {
        this.openTransform()
      }).catch(() => {
      })
    }
  },

  methods: {
    /* eslint-disable */
    getRecordTime (t) {
      const m = t.match(/(\d+)年(\d+)月(\d+)日 (\d+)\:(\d+)\:(\d+)/)
      m.splice(0, 1)
      m[1] = (m[1] - 1).toString()
      return new Date(...m).getTime()
    },
    /* eslint-disable */

    handleTab (val) {
      if (val === 2) {
        this.getRecord()
      }
      this.section = val
    },

    async getRecord () {
      const { code, data } = await afterSaleApi.getNegotiation(this.id)
      if (code === 200) {
        this.recordList = data
      }
    },

    showReason () {
      // this.reasonShow = true
      this.getRecord()
      this.section = 2
    },

    getCredentials () {
      window.location.hash = '#credentials'
    },
    preview (index) {
      ImagePreview({
        images: this.imgList,
        startPosition: index
      })
    },

    viewPhoto (val) {
      ImagePreview({
        images: [val]
      })
    },
    async sendMessage () {
      const { code } = await afterSaleApi.sendMessage({ content: this.content, id: this.id, ifImg: false })
      if (code === 200) {
        this.$toast.success('发送成功')
        this.content = ''
        this.getRecord()
        document.querySelectorAll('.input-select')[0].blur()
      }
    },
    async sendImageRecord (val) {
      const { code } = await afterSaleApi.sendMessage({ content: val, id: this.id, ifImg: true })
      if (code === 200) {
        this.$toast.success('发送成功')
        this.content = ''
        this.getRecord()
      }
    },

    openTransform () {
      this.logiName = ''
      this.logiNum = ''
      this.transfromShow = true
    },
    async sendTransform () {
      const { code } = await afterSaleApi.sendTransform({ id: this.id, logistics: this.logiName, logisticsIdendity: this.logiNum })
      if (code === 200) {
        this.$toast.success('填写成功')
        window.location.reload()
      }
      this.transfromShow = false
    },

    async handleCancel () {
      this.$dialog.confirm({
        message: '确定取消售后吗？'
      }).then(async () => {
        const { code } = await afterSaleApi.cancelAftersale(this.id)
        if (code === 200) {
          this.$toast.success('取消订单成功')
          window.location.reload()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.m-aftersale-detail {
  box-sizing: border-box;
  min-height: 100vh;
  background: @cor_border;
  .info-section {
    &.hasButton {
      box-sizing: border-box;
      margin-bottom: 50px;
    }
  }
  .status-wrapper {
    padding: 40px 15px;
    background: white;
    margin-bottom: 10px;
    .status-title {
      font-size: 15px;
      font-weight: bold;
      text-align: center;
      color: @nice-blue;
      padding-bottom: 10px;
    }
    .status-desc {
      font-size: 13px;
      color: @cor_999;
      text-align: center;
      .desc-link {
        color: #1376FB;
      }
    }
  }
  .info-wrapper {
    background: white;
    margin-bottom: 10px;
    .info-top {
      padding: 25px 20px 15px 20px;
      border-bottom: 1PX solid @cor_border;
      &-item {
        font-size: 13px;
        color: @cor_666;
        &:first-child {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }
        .link {
          display: block;
          padding-right: 16px;
          background-image: url('~/assets/img/order/icon-arrow.png');
          background-position: right center;
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
    }
    .info-content {
      padding: 20px;
    }
  }
  .contact-wrapper {
    padding: 20px;
    background: white;
    .wrapper-title {
      font-size: 15px;
      color: @cor_333;
      font-weight: bold;
      padding-bottom: 12px;
    }
    .cnotact-cell {
      display: flex;
      font-size: 14px;
      color: @cor_666;
      &:not(:last-child) {
        margin-bottom: 6px;
      }
      .label {
        width: 70px;
        line-height: 24px;
      }
      .subs {
        flex: 1;
        line-height: 24px;
      }
    }
  }
  .courior-wrapper {
    margin-top: 10px;
    padding: 20px 20px 50px 20px;
    background: white;
    .wrapper-title {
      font-size: 15px;
      color: @cor_333;
      font-weight: bold;
    }
    .wrapper-desc {
      font-size: 14px;
      color: @cor_666;
      margin-top: 12px;
    }
  }
  .btn-wrapper {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    .submit-btn {
      box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.08);
      width: 100%;
      height: 50px;
      display: block;
      background: white;
      border: none;
      color: @cor_666;
    }
  }
  .fail-reason {
    padding: 30px;
    .reason-title {
      font-size: 15px;
      color: @cor_333;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .reason-detail {
      font-size: 15px;
      color: @cor_666;
      line-height: 25px;
    }
  }
  .crendential-wrapper {
    width: 100%;
    height: 100vh;
    background: @cor_border;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    .g-product {
      background: white;
      padding: 20px 20px 30px 20px;
      margin-bottom: 10px;
      .cover {
        width: 80px;
        height: 80px;
      }
    }
    .detail {
      padding: 20px 25px;
      margin-bottom: 10px;
      background: white;
      p {
        display: flex;
        & + p {
          margin-top: 20px;
        }
        .label {
          width: 75px;
          font-size: 15px;
          color: @cor_333;
          line-height: 25px;
          white-space: nowrap;
          font-weight: bold;
        }
        .desc {
          color: @cor_666;
          font-size: 15px;
          line-height: 25px;
        }
      }
    }
    .photo {
      padding: 20px;
      background: white;
      flex: 1;
      .title {
        font-size: 15px;
        color: @cor_333;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .photo-list {
        display: flex;
        justify-content: space-between;
        .img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .placeholder {
          width: 70px;
        }
      }
    }
  }
  .light-orange {
    color: #FB6248!important;
    &.mt10 {
      display: inline-block;
      margin-top: 6px;
    }
  }

  .record-section {
    height: calc(100vh - 45px);
    .msg-box {
      box-sizing:border-box;
      padding: 20px 10px;
      overflow: scroll;
      height: calc(100vh - 101px);
      .msg-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        &.js {
          justify-content: flex-start;
          .content {
            margin-right: 45px;
            margin-left: 0;
          }
          .center {
            margin-right: 45px;
            margin-left: 0;
          }
        }
        &:not(:last-child) {
          margin-bottom: 30px;
        }
        .time {
          width: 100%;
          text-align: center;
          font-size: 13px;
          color: @cor_999;
          padding: 20px;
        }
        .avatar {
          width: 35px;
          height: 35px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border-radius: 50%;
          &.left {
            margin-right: 10px;
          }
          &.right {
            margin-left: 10px;
          }
        }
        .center {
          padding: 8px 10px;
          border-radius: 4px;
          background: #03A1CD;
          font-size: 15px;
          line-height: 25px;
          color: white;
          margin-left: 45px;
          margin-right: 0;
          max-width: 69%;
          img {
            width: 120px;
            height: auto;
          }
        }
      }
    }
    .input-box {
      background: white;
      padding: 18px;
      font-size: 14px;
      display: flex;
      align-items: center;
      .input-select {
        flex: 1;
        margin-right: 15px;
      }
      .image-select {
        width: 22px;
        height: 20px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(~/assets/img/aftersale/icon-image.png);
      }
    }
  }

  .dialog-title {
    padding: 20px 0;
    text-align: center;
    font-size: 17px;
    color: @cor_333;
    font-weight: bold;
  }
  .dialog-body {
    padding: 20px;
    .van-field {
      margin-bottom: 20px;
    }
    .confirm-btn {
      width: 100%;
      height: 50px;
      background: @nice-blue;
      line-height: 50px;
      color: white;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      margin-top: 35px;
    }
  }
}
</style>
<style type="text/css">
  .van-dialog__message {
    text-align: center;
    font-size: 17px;
    color: #333;
    font-family: 'PingFangSC-Semibold';
    font-weight: bold;
  }
  .van-dialog__confirm {
    color: #03A1CD
  }
</style>
