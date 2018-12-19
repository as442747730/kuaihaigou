<template>
  <div :class="['m-aftersale-detail', status < 5 ? 'hasButton' : '']">

    <uTabs :list="tabList" @on-change="handleTab"></uTabs>

    <transition name="fade">
      <div class="info-section" v-if="section === 1">

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
              <span>申请号：198014266</span>
              <span class="link" @click="getCredentials">查看申请凭证</span>
            </div>
            <div class="info-top-item">申请时间：2017-05-01 16:00</div>
          </div>
          <div class="info-content">
            <div class="g-product">
              <div class="cover" v-lazy:background-image="require('~/assets/img/img2.png')"></div>
              <div class="info">
                <p class="title">法国1982拉菲法国1982拉菲传奇Lafite</p>
                <p class="desc sku">单瓶/普通装<span>x1</span></p>
                <p class="desc"><span :class="{ 'light-orange': status !== 5 }">申请退款：¥199</span>
                  <span class="light-orange" v-if="status === 5">实际退款： ￥392</span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-wrapper">
          <div class="wrapper-title">联系方式</div>
          <p class="cnotact-cell"><span class="label">联系人：</span><span class="subs">刘德华</span></p>
          <p class="cnotact-cell"><span class="label">联系电话：</span><span class="subs">18272637263</span></p>
          <p class="cnotact-cell"><span class="label">收货地址：</span><span class="subs">广东广州市海珠区新港东路(黄埔村北码头28号)M创工场1号楼210</span></p>
        </div>

        <div class="courior-wrapper" v-if="serviceType === 2 && status > 2">
          <div class="wrapper-title">退货快递信息</div>
          <div class="wrapper-desc">快递公司：顺丰快递</div>
          <div class="wrapper-desc">快递单号：382994802475927530</div>
        </div>

        <div class="btn-wrapper fit" v-if="status < 5">
          <van-button class="submit-btn" @click="handleCancel">取消售后</van-button>
        </div>

        <van-dialog v-model="reasonShow" :show-confirm-button="false" close-on-click-overlay >
          <div class="fail-reason">
            <div class="reason-title">您本次申请不符合退款条款，原因如下：</div>
            <div class="reason-detail">1、您的退回的商品并没在我们系统内查询到相应的识别信息；<br>2、寄回的商品有明显的外包装缺失和赠品缺失；<br>3、附带的发票并没有随商品一同寄回。</div>
          </div>
        </van-dialog>

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
                <p class="title">法国1982拉菲法国1982拉菲传奇Lafite</p>
                <p class="desc">单瓶/普通装<span>x1</span></p>
              </div>
            </div>
            <div class="detail">
              <p><span class="label">申请退款：</span><span class="desc">￥399</span></p>
              <p><span class="label">退货原因：</span><span class="desc">与商品描述不符</span></p>
              <p><span class="label">问题描述：</span><span class="desc">怎么送过来的旧的描述和你们商品界面的描述不一致，而且查了下价格也差很多，你们怎么搞的？</span></p>
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
      </div>
    </transition>


  </div>
</template>

<script>
import uTabs from '@/components/Tabs'
import { aftersaleApi } from '~/api/order'
import { ImagePreview } from 'vant'

export default {
  name: '',

  components: { uTabs },

  head () {
    return {
      title: '售后详情',
      meta: [
        { hid: 'title', name: 'title', content: '售后详情' }
      ]
    }
  },

  async asyncData (req) {
    aftersaleApi.getAftersaleDetail(req.params.id, req).then(res => {
      if (res.code === 506) {
        req.redirect('/account/login')
      }
      if (res.code === 200) {
        return {
          id: req.params.id
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

      reasonShow: false,

      id: null,
      status: 1,
      serviceType: 2, // 1 仅退款 2 退货退款
      statusList: ['待审核', '审核中', '审核中', '退款中', '退款完成', '已拒绝', '已关闭'],
      descList: ['当前申请单已提交审核，我们会尽快处理', '等待您寄回货物，请提交退货运单号，', '等待接受您寄回的货物中', '正在走退款流程中，款项将原路返回您的账号', '款项已经原路退返至您的账号，请注意查收', '抱歉，您不符合退款条件，', '当前申请已经关闭'],

      crenShow: false,
      imgList: [require('~/assets/img/img2.png'), require('~/assets/img/img2.png'), require('~/assets/img/img2.png')],

      transfromShow: false,
      logiName: '',
      logiNum: '',

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

  methods: {
    handleTab (val) {
      this.section = val
    },

    showReason () {
      this.reasonShow = true
    },

    getCredentials () {
      window.location.hash = '#credentials'
      // console.log(this.$nuxt._route)
      // console.log(this.$nuxt.$route)
      // this.crenShow = true
    },
    preview (index) {
      ImagePreview({
        images: this.imgList,
        startPosition: index
      })
    },

    openTransform () {
      this.transfromShow = true
    },
    sendTransform () {

    },

    async handleCancel () {
      this.$dialog.confirm({
        message: '确定取消售后吗？'
      }).then(async () => {
        const { code } = await aftersaleApi.cancelAftersale(this.id)
        if (code === 200) {
          this.$toast.success('取消订单成功')
          this.fetchData()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.m-aftersale-detail {
  min-height: 100vh;
  background: @cor_border;
  // todo
  &.hasButton {
    box-sizing: border-box;
    margin-bottom: 50px;
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
    &.fit {
      padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
      padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    }
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
    color: #FB6248;
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
