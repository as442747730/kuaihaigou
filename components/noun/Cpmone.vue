<template>
  <van-popup v-model="isShow" position="top" overlay-class="vanmb" @click-overlay="closeFn" :close-on-click-overlay="false">
    <section class="secone">
      <div class="sectitle">综合</div>
      <ul class="uls">
        <li
          class="lithree"
          v-for="(cors, index) in corList"
          :class="{active: varityIndex.corIndex === index}"
          @click="corsFn(index)"
          :key="index">{{cors}}</li>
      </ul>
    </section>
    <section class="Initials" v-if="isInitials">
      <div class="Initials-head">
        <div class="head_title">综合</div>
        <div
          class="head_btn"
          :class="{active: varityIndex.enzhIndex === index}"
          v-for="(enzhs, index) in enZhList"
          @click="enzhFn(index)"
          :key="index">{{enzhs}}</div>
      </div>
      <ul class="Initials-uls">
        <li
          v-for="(letter, index) in letters"
          :class="{active: letterIndex === index}"
          @click="letterFn(letter, index)"
          :key="index">{{letter.firstWord}} ({{letter.num}})</li>
      </ul>
    </section>
    <section class="breed" v-else>
      <div class="breed-head">
        <div class="head_title">综合</div>
        <div class="head_btn" @click="restWorld">
          <span>{{letterworld}}</span>
          <i class="ic_close"></i>
        </div>
      </div>
      <div class="breed-select" v-if="elGrape.name">
        <p class="select-btn" @click="restGrape">
          <span class="select_name">{{elGrape.name}}</span>
          <i class="select_close"></i>
        </p>
      </div>
      <div class="breed-list">
        <ul class="list-uls">
          <li
            v-for="(grape, index) in grapeList"
            @click="grapeDetail(grape)"
            :key="index">{{grape.name}}</li>
        </ul>
      </div>
    </section>
    <footer class="footerbox">
      <div class="footbtns">
        <div class="btn" @click="btnRest">重置</div>
        <div class="btn btn_ok" @click="btnOk">确认</div>
      </div>
    </footer>
  </van-popup>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    letters: {
      type: Array,
      default: function () {
        return []
      }
    },
    varityIndex: {
      type: Object,
      default: function () {
        return { corIndex: 0, enzhIndex: 0 }
      }
    },
    grapeList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      corList: ['红葡萄酒', '白葡萄酒'],
      enZhList: ['英文首字母', '中文首字母'],
      isInitials: true,
      letterIndex: null,
      letterworld: '',
      grapeIndex: null,
      elGrape: {}
    }
  },
  methods: {
    corsFn (index) {
      // 选择葡萄颜色
      this.$emit('corsFn', index)
      this.restWorld()
    },
    enzhFn (index) {
      // 选中葡萄中英文
      this.$emit('enzhFn', index)
    },
    letterFn (event, index) {
      // 选择首字母
      this.isInitials = false
      this.letterworld = event.firstWord
      this.$emit('letterFn', event.firstWord)
    },
    restWorld () {
      // 删除选中字母
      this.isInitials = true
      this.letterIndex = null
      this.letterworld = ''
      this.restGrape()
    },
    restGrape () {
      // 删除选中品种
      this.elGrape = {}
      this.grapeIndex = null
    },
    grapeDetail (event) {
      this.elGrape = event
    },
    closeFn () {
      this.$emit('closeFn')
    },
    btnRest () {
      // 重置
      this.restWorld()
      this.$emit('btnRest')
    },
    btnOk () {
      // 确认
      this.$emit('btnOk', this.elGrape)
    }
  }
}
</script>
<style lang="less" scoped>
@plr: 19px;
@mlr: 19px;
.van-popup--top {
  top: 85px;
}
.secone {
  padding: 0 @plr;

  .sectitle {
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    padding: 20px 0;
  }

  .uls {
    margin-bottom: 37px;
    display: flex;
    align-items: center;
    margin-left: -19px;

    .lithree {
      width: 100px;
      height: 30px;
      margin-left: @mlr;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      border: 1PX solid @cor_border;
      border-radius: 4px;
      .flex_allCenter;
    }
    .active {
      color: #333;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      border: 1PX solid #333;
    }
  }
}

.Initials {
  padding: 0 @plr;

  &-head {
    display: flex;
    align-items: center;

    .head_title {
      font-size: 15px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }

    .head_btn {
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      padding: 4px 6px 3px 7px;
      border-radius: 4px;
      border: 1PX solid @cor_border;
      margin-left: 10px;
    }

    .active {
      background: rgba(89, 195, 225, 1);
      font-size: 12px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }

  &-uls {
    margin-bottom: 40px;
    margin-left: -19px;
    margin-right: -19px;
    padding-top: 8px;
    flex-wrap: wrap;
    display: flex;
    align-items: center;

    &>li {
      width: 20%;
      height: 40px;
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      .flex_allCenter;
    }
    .active {
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(89,195,225,1);
    }
  }
}

.breed {
  padding: 0 @plr;
  margin-bottom: 20px;

  &-head {
    display: flex;
    align-items: center;
    margin-bottom: 23px;

    .head_title {
      font-size: 15px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }

    .head_btn {
      width: 50px;
      height: 20px;
      margin-left: 10px;
      background: #59C3E1;
      border-radius: 2px;
      .flex_around;

      &>span {
        font-size: 12px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }

      .ic_close {
        width: 14px;
        height: 14px;
        background-image: url('~/assets/img/Icons/ic_shanchu_w_14x14@2x.png');
        .bg_cover;
      }
    }
  }

  &-select {
    display: inline-block;
    background: #F8F8F8;
    border-radius: 4px;
    padding: 7px 10px;

    .select-btn {
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);

      .select_close {
        display: inline-block;
        margin-left: 17px;
        width: 12px;
        height: 12px;
        vertical-align: middle;
        background-image: url('~/assets/img/Icons/ic_off_g_14x14@2x.png');
        .bg_cover;
      }
    }
  }

  &-list {
    margin-top: 23px;
    padding: 10px 0;
    background: #FCFCFC;
    border: 1PX solid @cor_border;
    border-radius: 10px;
    max-height: 200px;
    overflow-y: scroll;
    .list-uls {
      padding-left: 13px;
      &>li {
        margin: 17px 0;
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height:13px;
      }
    }
  }
}

.footerbox {
  height: 50px;

  .footbtns {
    .u-footbtns;

    .btn_ok {
      background: #03A1CD;
      color: #fff;
    }
  }
}
</style>