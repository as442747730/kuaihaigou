<template>
  <div class="cpmone" v-show="isShow">
    <transition name="slide-bottom">
      <div class="sizer">
        <!-- 品种 start -->
        <section class="variety" v-if="navIndex === 0">
          <div class="secone">
            <div class="sectitle">综合</div>
            <ul class="uls">
              <li
                class="lithree"
                v-for="(cors, index) in corList"
                :class="{active: varityIndex.corIndex === index}"
                @click="corsFn(index)"
                :key="index">{{cors}}</li>
            </ul>
          </div>
          <div class="Initials" v-if="isInitials">
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
          </div>
          <div class="breed" v-else>
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
          </div>
        </section>
        <!-- 品种 end -->
        <!-- 产区 start -->
        <section class="areas" v-else-if="navIndex === 1 || navIndex === 2">
          <div class="areas-world">
            <div class="world_tip">综合</div>
            <div
              class="world_one"
              v-for="(world, index) in worlds"
              :class="{active: elAreas.classify === world.id}"
              @click="worldFn(world)"
              :key="index"><span>{{world.name}}</span></div>
          </div>
          <div :data-counId="elAreas.countryid" :class="['areas-country', {maxhight: elAreas.countryid || elAreas.countryid === -1}]">
            <ul class="country-l" :class="[{lb_ok: elAreas.countryid}]">
              <li
                :data-val="areaContryList.length"
                v-if="areaContryList.length > 0"
                :class="{active: elAreas.countryid === -1}"
                @click="countryFn(-1)">全部国家</li>
              <li
                v-for="(country, index) in areaContryList"
                :class="{active: elAreas.countryid === country.countryid}"
                @click="countryFn(country.countryid)"
                :key="index">{{country.countryName}}</li>
            </ul>
            <ul class="country-r" v-if="elAreas.countryid && bigList.length > 0">
              <li
                :class="{active: elAreas.oneAreaId === -1}"
                @click="bigFn(-1)">全部</li>
              <li
                v-for="(big, index) in bigList"
                :class="{active: elAreas.oneAreaId === big.areaid}"
                @click="bigFn(big.areaid)"
                :key="index">{{big.areaName}}</li>
            </ul>
          </div>
          <div class="areas-items" v-if="elAreas.oneAreaId && districtList.length > 0">
            <div class="items-head">地区级</div>
            <ul class="items_uls">
              <li
                :class="{active: elAreas.twoAreaId === -1}"
                @click="districtFn(-1)">
                  <span>全部</span>
                </li>
              <li
                v-for="(district, index) in districtList"
                :class="{active: elAreas.twoAreaId === district.areaid}"
                @click="districtFn(district.areaid)"
                :key="index">
                <span>{{district.areaName}}</span>
              </li>
            </ul>
          </div>
          <div class="areas-items" v-if="elAreas.twoAreaId && subList.length > 0">
            <div class="items-head">子区级</div>
            <ul class="items_uls">
              <li
                :class="{active: elAreas.threeAreaId === -1}"
                @click="subFn(-1)">
                  <span>全部</span>
                </li>
              <li
                v-for="(sub, index) in subList"
                :class="{active: elAreas.threeAreaId === sub.areaid}"
                @click="subFn(sub.areaid)"
                :key="index">
                <span>{{sub.areaName}}</span>
              </li>
            </ul>
          </div>
          <div class="areas-items" v-if="elAreas.threeAreaId && smallList.length > 0">
            <div class="items-head">小子区</div>
            <ul class="items_uls">
              <li
                v-if="navIndex === 2"
                :class="{active: elAreas.fourAreaId === -1}"
                @click="smallFn(-1)">
                  <span>全部</span>
                </li>
              <li
                v-for="(small, index) in smallList"
                :class="{active: elAreas.fourAreaId === small.areaid}"
                @click="smallFn(small.areaid)"
                :key="index">
                <span>{{small.areaName}}</span>
              </li>
            </ul>
          </div>
        </section>
        <!-- 产区 end -->
        <footer class="footerbox">
          <div class="footbtns">
            <div class="btn" @click="btnRest">重置</div>
            <div class="btn btn_ok" @click="btnOk">确认</div>
          </div>
        </footer>
      </div>
    </transition>
    <transition name="fade">
      <div class="smodal" v-show="navIndex || navIndex === 0"></div>
    </transition>
  </div>
</template>
<script>
import { encyApi } from '~/api/encys'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    navIndex: {
      type: Number,
      default: 0
    },
    letters: {
      type: Array,
      default: () => []
    },
    varityIndex: {
      type: Object,
      default: () => ({ corIndex: 0, enzhIndex: 0 })
    },
    grapeList: {
      type: Array,
      default: () => []
    },
    areaContryList: {
      type: Array,
      default: () => []
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
      elGrape: {},
      isVariey: false,
      elAreas: {
        classify: -1,
        countryid: null,
        oneAreaId: null,
        twoAreaId: null,
        threeAreaId: null,
        fourAreaId: null
      },
      worlds: [{name: '全部', id: -1}, {name: '新世界', id: 1}, {name: '旧世界', id: 2}],
      bigList: [], // 大产区
      districtList: [], // 地产区
      subList: [], // 子产区
      smallList: [] // 小子区
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
    worldFn (event) {
      // 世界 => 国家列表
      this.elAreas.classify = event.id
      this.$emit('areaWorldFn', event.id)
      this.restAreaId('world')
    },
    countryFn (countryid) {
      // 国家
      this.elAreas.countryid = countryid
      this.bigArea(countryid)
      this.restAreaId('country')
    },
    bigFn (areaid) {
      // 大区
      this.elAreas.oneAreaId = areaid
      this.restAreaId('big')
      this.nextArea(areaid, 1)
    },
    districtFn (areaid) {
      // 地区
      this.elAreas.twoAreaId = areaid
      this.restAreaId('district')
      this.nextArea(areaid, 2)
    },
    subFn (areaid) {
      // 子区
      this.elAreas.threeAreaId = areaid
      this.restAreaId()
      this.nextArea(areaid, 3)
    },
    smallFn (areaid) {
      // 小子区
      this.elAreas.fourAreaId = areaid
    },
    restAreaId (str) {
      // 重置 选中id
      this.elAreas.fourAreaId = null
      switch (str) {
        case 'world':
          this.elAreas.countryid = null
          this.elAreas.oneAreaId = null
          this.elAreas.twoAreaId = null
          this.elAreas.threeAreaId = null
          break
        case 'country':
          this.elAreas.oneAreaId = null
          this.elAreas.twoAreaId = null
          this.elAreas.threeAreaId = null
          break
        case 'big':
          this.elAreas.twoAreaId = null
          this.elAreas.threeAreaId = null
          break
        case 'district':
          this.elAreas.threeAreaId = null
          break
      }
    },
    async bigArea (countryid) {
      // 大产区
      let params = { ...this.elAreas }
      let bigAreaFn
      if (this.navIndex === 1) {
        bigAreaFn = encyApi.getAreaBig(params)
      } else if (this.navIndex === 2) {
        bigAreaFn = encyApi.getWineryBig(params)
      }
      const {code, data} = await bigAreaFn
      if (code === 200) {
        this.bigList = data
      }
    },
    async nextArea (areaid, num) {
      // 获取下级产区
      let { classify, countryid, oneAreaId, twoAreaId, threeAreaId, fourAreaId } = this.elAreas
      if (oneAreaId === null) oneAreaId = '-1'
      if (twoAreaId === null) twoAreaId = '-1'
      if (threeAreaId === null) threeAreaId = '-1'
      if (fourAreaId === null) fourAreaId = '-1'
      let areaLevel = num
      let params = {
        classify: classify,
        countryid: countryid,
        oneAreaId: oneAreaId,
        twoAreaId: twoAreaId,
        threeAreaId: threeAreaId,
        fourAreaId: fourAreaId,
        areaLevel: areaLevel
      }
      let nextAreaFn
      if (this.navIndex === 1) {
        nextAreaFn = encyApi.getAreaNext(params)
      } else if (this.navIndex === 2) {
        nextAreaFn = encyApi.getWineryNext(params)
      }
      const { code, data } = await nextAreaFn
      if (code === 200) {
        switch (num) {
          case 1:
            this.districtList = data
            break
          case 2:
            this.subList = data
            break
          case 3:
            this.smallList = data
            break
        }
      }
    },
    restAll () {
      // 重置为初始数据
      if (this.navIndex === 0) {
        this.restWorld()
      } else {
        this.elAreas.classify = -1
        this.restAreaId('world')
      }
    },
    btnRest () {
      // 重置
      this.restAll()
      this.$emit('btnRest')
    },
    btnOk () {
      // 确认
      if (this.navIndex === 0) {
        this.$emit('btnOk', this.elGrape)
      } else {
        this.$emit('btnOk', this.elAreas)
      }
    }
  },
  watch: {
    navIndex: function (value) {
      if (value === 1 || value === 2) {
        // 重置产区酒庄的初始数据
        this.elAreas.classify = '-1'
        this.restAreaId('world')
      }
    }
  }
}
</script>
<style lang="less" scoped>
@plr: 19px;
@mlr: 19px;
.cpmone {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}
.sizer {
  z-index: 60;
  position: relative;
  padding-top: 85px;
  height: 100vh;
  box-sizing: border-box;
}
.smodal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}
.variety {
  padding: 0 @plr;
  max-height: calc(100% - 50px);
  overflow: auto;
  background: #fff;

  .secone {
    .sectitle {
      font-size: 15px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      height: 55px;
      display: flex;
      align-items: center;
    }

    .uls {
      margin-bottom: 35px;
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
        box-sizing: border-box;
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
    margin-bottom: 20px;

    &-head {
      display: flex;
      align-items: center;
      height: 20px;
      margin-bottom: 20px;

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
          background-image: url('~assets/img/Icons/ic_shanchu_w_14x14@2x.png');
          .bg_cover;
        }
      }
    }

    &-select {
      display: inline-block;
      background: #F8F8F8;
      border-radius: 4px;
      line-height: 15px;
      padding: 5px 10px;
      margin-bottom: 20px;

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
          background-image: url('~assets/img/Icons/ic_off_g_14x14@2x.png');
          .bg_cover;
        }
      }
    }

    &-list {
      padding: 10px 0;
      background: #FCFCFC;
      border: 1PX solid @cor_border;
      border-radius: 10px;
      box-sizing: border-box;
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
}
.areas {
  max-height: calc(100% - 50px);
  overflow: auto;
  background: #fff;
  &-world {
    display: flex;
    padding: 18px @plr 30px;
    .world_tip {
      display: flex;
      height: 20px;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      font-size:15px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(51,51,51,1);
    }
    .world_one {
      width:80px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid @cor_border;
      text-align: center;
      margin-left: 10px;
      font-size:13px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(153,153,153,1);
    }
    .active {
      background:rgba(89,195,225,1);
      border-radius:2px;
      font-size:12px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(255,255,255,1);
      border: none;
    }
  }
  &-country {
    display: flex;
    border-top: 1PX solid #F1F1F1;
    border-bottom: 1PX solid #F1F1F1;
    &.maxhight {
      .country-l {
        max-height: 220px;
        overflow: auto;
      }
      .country-r {
        max-height: 220px;
        overflow: auto;
      }
    }
    .country-l {
      width: 100vw;
      &>li {
        line-height: 45px;
        font-size:13px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
        text-align: center;
        background: #F5F5F5;
      }
      .active {
        font-size:13px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
        background: #fff;
      }
    }
    .country-l.lb_ok {
      width: 128px;
    }
    .country-r {
      width: calc(100vw - 128px);
      &>li {
        background: #fff;
        line-height: 45px;
        text-align: center;
        font-size:13px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
      }
      .active {
        font-size:13px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
    }
  }
  &-items {
    padding: 0 @plr;
    margin: 30px 0;
    .items-head {
      font-size:15px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(51,51,51,1);
      padding-bottom: 20px;
    }
    .items_uls {
      display: flex;
      flex-wrap: wrap;
      margin-left: -19px;
      &>li {
        width:70px;
        height:30px;
        margin-left: 19px;
        margin-bottom: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(238,238,238,1);
        box-sizing: border-box;
        .flex_allCenter;
        span {
          font-size:13px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(153,153,153,1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .active {
        border:1px solid rgba(51,51,51,1);
        span  {
          font-size:13px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(51,51,51,1);
        }
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