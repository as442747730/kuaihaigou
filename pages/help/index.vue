<template>
  <div class="help-center">
    <div class="background">
      <div class="bar">
        <van-nav-bar
          title="服务中心"
          left-arrow
          @click-left="onClickLeft"
        />
        <u></u>
      </div>
    </div>
    <div class="help-center-tab">
      <div class="wrap">
        <div>
          <i class="kefu"></i>
          <span>在线客服</span>
        </div>
        <div>
          <a href="tel:400-100-****">
            <i class="phone"></i>
            <span>电话客服</span>
          </a>
        </div>
      </div>
    </div>
    <div class="help-center-item" v-for='($v, $k) in helpData' :key='$k'>
      <div class="box">
        <h3 class="font_hight">{{ $v.helpName }}</h3>
        <div class="help-center-list" v-for='(item, index) in $v.helpResps'>
          <a :href=" !item.type ? '/help/detail/' + item.id : item.url">
            <p>{{ item.helpName }}</p>
          </a>
        </div>
      </div>
      <div class="depart-line"></div>
    </div>
  </div>
</template>

<script>
import { helpApi } from '@/api/help'
export default {
  name: '',
  layout: 'default',

  components: {
  },

  head () {
    return {
      title: '服务中心',
      meta: [
        { hid: 'title', name: 'title', content: '服务中心' }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await helpApi.getList() // 帮助中心列表
    if (code === 200) {
      return {
        helpData: data
      }
    } else {
      req.redirect('/error')
    }
  },

  data () {
    return {
      helpData: []
    }
  },

  created () {
    console.log(this.helpData)
  },

  methods: {
    onClickLeft () {
      window.location.href = '/mine'
    }
  }
}
</script>

<style lang="less">
.help-center {
  font-size: 0;
  .background {
    height: 160px;
    background: -o-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: -o-linear-gradient(135deg, #4FEDEF, #00A1F0);
    background: linear-gradient(-45deg, #4FEDEF, #00A1F0);
    .bar {
      .van-nav-bar {
        background: transparent;
        &:after {
          display: none;
        }
        i, .van-nav-bar__title {
          color: #fff!important;
          font-weight: normal!important;
        }
      }
      .title {
        font-size: 16px;
        color: white;
      }
      u {
        width: 100%;
        height: 35px;
        background: url('~/assets/img/user/img_wave_375x35@2x.png') no-repeat center/cover;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
  &-tab {
    padding: 0px 20px;
    background: transparent;
    margin-bottom: 20px;
    .wrap {
      display: flex;
      justify-content: center;
      align-items: center;    
      padding: 16px 0 19px;
      box-shadow:0px 0px 12px 0px rgba(0,0,0,0.06);
      background: #fff;
      border-radius: 7px;
      margin-top: -46px;
      &>div {
        flex: 1;
        text-align: center;
        &:first-child {
          border-right: 1px solid #f5f5f5;
        }
      }
    }
    i.kefu {
      background: url('~/assets/img/Icons/ic_zaixiankefu_30x30@2x.png') no-repeat center/contain;
    }
    i.phone {
      background: url('~/assets/img/Icons/ic_dianhuakefu_30x30@2x.png') no-repeat center/contain;
    }
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-bottom: 8px;
    }
    span {
      font-size: 12px;
      color: #333;
      display: block;
      text-align: center;
    }
  }
  &-item {
    .box {
      padding: 0 20px;
    }
    h3 {
      font-size: 15px;
      color: #333;
      margin-bottom: 5px;
    }
    .depart-line {
      margin-bottom: 20px;
    }
    &:last-child {
      .depart-line {
        display: none;
      }
    }
  }
  &-list {
    font-size: 13px;
    color: #666;
    padding: 15px 0;
    border-bottom: 1px solid #f5f5f5;
    p {
      &:after {
        content: '\F007';
        font: normal normal normal 8px/1 "vant-icon";
        float: right;
        color: #bbb;
        font-weight: bolder;
        transform: rotate(180deg);
      }
    }
    &:last-child {
      padding-bottom: 20px;
      border-bottom: 0;
    }
  }
}
</style>
