<template>
  <div class="question">
    <div class="type">
      <div class="type-item" v-for="(reason, index) in reasonlist" :key="index" @click="elReason(reason.id)">
        <div class="type_l">{{ reason.name }}</div>
        <div class="type_r" :class="{active: reason.id === reasonId}"></div>
      </div>
    </div>
    <div class="descript">
      <div class="comhead">问题描述</div>
      <textarea :class="['descript-textarea', {cor: questext !== ''}]" v-model="questext" :maxlength="500" rows="6" placeholder="请输入问题的描述"></textarea>
    </div>
    <div class="addpics">
      <div class="comhead">
        添加图片证据
        <span class="subtip">不超过7张</span>
      </div>
      <div class="addpics-list">
        <div class="list-item list-img" v-for="(imgs, index) in imgList" :key="index" :style="{backgroundImage: 'url(' + imgs + ')'}">
          <span class="img-close-btn" @click.stop="removeImg(index)">
            <van-icon size="20px" color="#03A0CB" name="clear" />
          </span>
        </div>
        <div class="list-item list-bk" v-if="imgList.length < maxNum">
          <Upload @on-success="handleUploadSuccess" :max="maxNum">
            <div class="addbtn"></div>
          </Upload>
        </div>
      </div>
    </div>
    <div :class="['submit', {active: isok}]" @click="submitFn">提交</div>
    <!-- 质疑成功弹窗 -->

    <transition name="slide-bottom">
      <div class="quecpm" v-show="showcpm"  @touchmove.prevent>
        <div class="quecpm-tip">您的质疑反馈提交成功 <br> 我们会尽快处理！</div>
        <div class="quecpm-btn" @click="knowfn">知道了</div>
      </div>
    </transition>

    <transition name="fade">
      <div class="modal" @touchmove.prevent v-show="showcpm"></div>
    </transition>

  </div>
</template>
<script>
  import Upload from '~/components/Upload'
  import { encyApi } from '~/api/encys'
  import wechatLogin from '~/utils/wechatLogin'
  export default {
    head () {
      return {
        title: '百科质疑',
        meta: [
          { hid: 'title', name: 'title', content: '百科质疑' }
        ]
      }
    },
    components: {
      Upload
    },
    asyncData (req) {
      const ua = req.req.headers['user-agent']
      let env = 0
      if (/MicroMessenger/.test(ua)) {
        // 检测用户环境是否为微信浏览器,0为非微信,1为微信
        env = 1
      }
      let { encyid, baikeid, type } = req.query
      return { encyid: encyid, baikeid: baikeid, type: type, env: env }
    },
    data () {
      return {
        env: null,
        maxNum: 7,
        encyid: null,
        baikeid: null,
        type: null,
        reasonlist: [
          {name: '图文不符', id: 1},
          {name: '基础信息栏错误', id: 2},
          {name: '信息错误', id: 3},
          {name: '错别字', id: 4},
          {name: '其他', id: 5}
        ],
        reasonId: 0,
        questext: '',
        imgList: [],
        showcpm: false
      }
    },
    computed: {
      isok () {
        return this.reasonId !== 0 && this.questext !== ''
      }
    },
    methods: {
      async submitFn () {
        if (!this.reasonId) {
          this.$toast('请选择质疑原因')
          return
        }
        if (this.questext === '') {
          this.$toast('问题描述不能为空')
          return
        }
        let truetype = Number(this.type) + 1
        let strImg = JSON.stringify(this.imgList)
        let params = {
          baikeid: this.baikeid,
          type: truetype,
          reason: this.reasonId,
          description: this.questext,
          imgs: strImg
        }
        const { code } = await encyApi.questEncy(params)
        if (code === 200) {
          this.showcpm = true
        } else if (code === 506) {
          if (this.env === 1) {
            setTimeout(() => { wechatLogin.wxLoginWithNoCheck(window.location.href) }, 500)
          } else {
            setTimeout(() => {
              window.location.href = '/account/login'
            }, 1000)
          }
        }
      },
      elReason (id) {
        this.reasonId = id
      },
      handleUploadSuccess (data) {
        console.log('data', data)
        this.imgList.push(data)
      },
      logContent () {
        console.log(123456)
      },
      removeImg (index) {
        this.imgList.splice(index, 1)
      },
      knowfn () {
        window.location.href = '/noun/detail/' + this.encyid + '?num=' + this.type
      },
      hidefn () {
        this.showcpm = false
      }
    }
  }
</script>
<style lang="less" scoped>
.question {
  background: #F5F5F5;
  padding-bottom: 50px;
  .type {
    background: #FFFFFF;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 30px 17px 20px;
      border-bottom: 1PX solid #F1F1F1;
      background: #fff;
    }

    &_l {
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }

    &_r {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2PX solid #CCCCCC;
      box-sizing: border-box;

      &.active {
        border: none;
        background-image: url('~/assets/img/Icons/ic_check_bule_20x20@2x.png');
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: center center;

      }
    }
  }

  .comhead {
    position: relative;
    padding: 15px 0 15px 10px;
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 15px;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -6px;
      width: 3PX;
      height: 12px;
      border-radius: 2px;
      background: rgba(3, 161, 205, 1);
    }

    .subtip {
      font-size:12px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:13px;
    }
  }

  .descript {
    margin: 10px 0;
    padding: 0 20px;
    background: #fff;

    &-textarea {
      width: 100%;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(199, 199, 199, 1);
      line-height: 20px;

      &.cor {
        font-size:15px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
    }
  }

  .addpics {
    margin: 10px 0;
    padding: 0 20px;
    background: #fff;
    &-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-left: -15px;
      .list-item {
        width: 70px;
        height: 70px;
        border-radius:4px;
        margin-bottom: 15px;
        margin-left: 15px;
        position: relative;
        transition: 0.2s;
        &.list-img {
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          .img-close-btn {
            position: absolute;
            left: -7px;
            top: -5px;
            width: 20px;
            height: 20px;
            display: block;
            border-radius: 100%;
            background: white;
            font-size: 0;
          }
        }
        &.list-bk {
          background:rgba(245,245,245,1);
        }
        .addbtn {
          width: 70px;
          height: 70px;
          background-size: 30px 30px;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url('~/assets/img/Icons/ic_add_to_out_g_30x30@2x.png');
        }
      }
    }

  }

  .submit {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:15px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:15px;
    background: #D8D8D8;
    box-shadow:0px -2px 12px 0px rgba(103,103,103,0.09);
    &.active {
      background: #03A1CD;
    }
  }

  .quecpm {
    width: 270px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 6px;
    z-index: 60;
    &-tip {
      text-align: center;
      font-size:17px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      line-height: 24px;
      padding: 20px 0;
      color:rgba(51,51,51,1);
    }
    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      font-size:17px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(3,161,205,1);
      border-top: 1PX solid #CDCED2;
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background: rgba(0,0,0,0.6);
    width: 100%;
    height: 100vh;
    z-index: 40;
  }
}
</style>