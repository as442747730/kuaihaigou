<template>
  <van-popup class="vpCountry" overlay-class="ovCls" v-model="showcountry" position="left">
    <div class="countrys">
      <header>
        <h1>
        <span class="icon_del" @click="delCountry"></span> 国家产区
      </h1>
      </header>
      <section>
        <div class="sec-l rollList">
          <ul class="countrylist">
            <!-- <li>所有国家</li> -->
            <li :class="{active: countryIndex === index}" v-for="(country, index) in countryList" :key="index" @click="elCounrty(country, index)">{{country.name}}</li>
          </ul>
        </div>
        <div class="sec-r rollList">
          <ul class="areaList">
            <!-- <li class="one">所有产区</li> -->
            <li :class="{one: areaIndex === index}" v-for="(area, index) in areaList" :key="index" @click="elArea(area, index)">{{area.name}}</li>
          </ul>
        </div>
      </section>
      <footer>
        <div class="btn" @click="btnRest">重置</div>
        <div class="btn active" @click="btnOk">确认</div>
      </footer>
    </div>
  </van-popup>
</template>
<script>
export default {
  props: {
    showcountry: {
      type: Boolean,
      default: false
    },
    countryIndex: {
      type: Number,
      default: 0
    },
    countryList: {
      type: Array,
      default: []
    },
    areaList: {
      type: Array,
      default: []
    },
    areaIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    delCountry () {
      // 关闭弹窗
      this.$emit('delCountry')
    },
    elCounrty (country, index) {
      // 选择国家
      let retdata = { elIndex: index }
      Object.assign(retdata, country)
      this.$emit('selectCountry', retdata)
    },
    elArea (area, index) {
      // 选择地区
      let retdata = { elIndex: index }
      Object.assign(retdata, area)
      this.$emit('selectArea', retdata)
    },
    btnRest () {
      // 重置
      this.$emit('countryRest')
    },
    btnOk () {
      // 确认
      this.$emit('countryOk')
    }
  }
}
</script>
<style lang="less" scoped>
.vpCountry {
  width: 100vw;
  height: 100vh;
  z-index: 6000!important;
}
.countrys {

  position: fixed;

  top: 0;

  left: 0;

  width: 100%;

  height: 100vh;

  z-index: 110;

  background: #fff;

  &>header {

    padding: 8px 12px;
    border-bottom: 1px solid #F1F1F1;

    &>h1 {

      font-size: 17px;

      font-family: PingFangSC-Medium;

      font-weight: 500;

      color: @cor_333;

      text-align: center;

      height: 30px;

      line-height: 30px;

      .icon_del {

        float: left;

        width: 30px;

        height: 30px;

        background-image: url('~/assets/img/Icons/ic_off_g_30x30.png');

        .bg_cover;

      }

    }

  }

  &>section {

    height: calc(100vh - 96px);

    background: #fff;

    .rollList {

      height: 100%;

      -webkit-overflow-scrolling: touch;

      overflow: auto;

    }

    .sec-l,

    .sec-r {

      float: left;

    }

    .sec-l {

      width: 128px;

      background: #F5F5F5;

      .countrylist {

        &>li {

          height: 45px;

          line-height: 45px;

          overflow: hidden;

          text-align: center;

          font-size: 13px;

          font-family: PingFang-SC-Medium;

          font-weight: 500;

          color: #999999;

        }

        .active {

          font-family: PingFangSC-Semibold;

          font-weight: 600;

          background: #fff;

        }

      }

    }

    .sec-r {

      width: calc(100vw - 128px);

      .areaList {
        &>li {
          margin: 15px 0;
          padding: 6px 0;
          font-size: 13px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: @cor_999;
          text-align: center;
        }

        .one {
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: @cor_333;
        }
      }
    }
  }

  &>footer {

    position: absolute;

    bottom: 0;

    left: 0;

    background: #fff;

    width: 100%;

    height: 50px;

    z-index: 100;

    box-shadow: 0 0 20px rgba(0,0,0,0.1);

    .flex_between;

    .btn {

      width: 50%;

      height: 100%;

      font-size: 15px;

      font-family: PingFangSC-Medium;

      font-weight: 500;

      .flex_allCenter;

      color: #03A1CD;

    }

    .active {

      background: #03A1CD;

      color: #fff;

    }

  }

}

.transx {
  transform: translateX(0);
}
</style>