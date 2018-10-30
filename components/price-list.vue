<template>
  <div class="prices" ref="prices">
    <div class="prices-in" ref="pricesIn">
      <section class="pricemdl" v-if="postPrice === 0">
        <h2>¥700</h2>
        <div class="slider">
          <van-slider v-model="stepvalue" :step="10" bar-height="4px" @change="changeValue" />
          <div class="slider-items">
            <span>¥0</span>
            <span>¥300</span>
            <span>¥600</span>
            <span>¥900</span>
            <span>不限</span>
          </div>
        </div>
        <div class="type">
          <div class="type-head">葡萄酒类型</div>
          <ul class="type-content">
            <li :class="{active: index===2}" v-for="(item, index) in liLength" :key="index">干红</li>
            <li class="empty" v-for="(item, index) in addEmpty(liLength)" :key="index+10"></li>
          </ul>
        </div>
      </section>
      <section class="scenemdl" v-if="postPrice === 1">
        <div class="type">
          <div class="type-head">喝酒场景</div>
          <ul class="type-content">
            <li :class="{active: index===2}" v-for="(item, index) in liLength" :key="index">干红</li>
            <li class="empty" v-for="(item, index) in addEmpty(liLength)" :key="index+10"></li>
          </ul>
        </div>
        <div class="type">
          <div class="type-head">特色</div>
          <ul class="type-content">
            <li :class="{active: index===2}" v-for="(item, index) in liLength" :key="index">干红</li>
            <li class="empty" v-for="(item, index) in addEmpty(liLength)" :key="index+10"></li>
          </ul>
        </div>
      </section>
      <footer class="footbtns">
        <div class="btn" @click="resetFn">重置</div>
        <div class="btn">确认</div>
      </footer>
    </div>
  </div>
</template>
<style lang="scoped" lang="less">
  @import '../assets/css/var.less';
  .prices {
    position: fixed;
    top: 0;
    width: 100vW;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, .8);
    z-index: 100;
    opacity: 0;
    transition: opacity ease .5s;
    &-in {
      height: 60vh;
      background: #fff;
      position: relative;
      margin-top: 90px;
      transition: transform ease 1s;
      transform: translateY(-100%);
      overflow: hidden;
      &>section {
        height: calc(60vh - 50px);
        -webkit-overflow-scrolling: touch;
			  overflow: auto;
        .padlr20;
        .type {
          &-head {
            font-size:15px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            padding-top: 10px;
          }
          &-content {
            margin-right: -10px;
            flex-wrap: wrap;
            .flex_between;
            &>li {
              width: 70px;
              height: 30px;
              border-radius:4px;
              border: 1px solid;
              border-color: #EEEEEE;
              color: @cor_666;
              margin-right: 10px;
              margin-top: 10px;
              margin-bottom: 10px;
              .flex_allCenter;
            }
            .empty {
              border-color: transparent;
            }
            .active {
              border-color: @cor_333;
              color: @cor_333;
            }
          }
        }
      }
      .pricemdl {
        &>h2 {
          font-size:19px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          text-align: center;
          .padtb20;
        }
        .slider {
          &-items {
            .padtb20;
            .flex_between;
            &>span {
              font-size:12px;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              color: @cor_666;
            }
          }
        }
      }
      .footbtns {
        .u-footbtns;
      }
    }
  }
  .trans {
    transform: translateY(0);
  }
  .opa {
    opacity: 1;
  }
</style>
<script>
export default {
  name: 'priceList',
  props: ['postPrice'],
  data() {
    return {
      boolPrice: this.postPrice,
      stepvalue: 0,
      liLength: 40
    }
  },
  methods: {
    changeValue(value) {
      console.log(this.boolPrice)
    },
    addClass() {
      this.$refs.prices.classList.add('opa')
      this.$refs.pricesIn.classList.add('trans')
    },
    addEmpty(len) {
      return len < 4 ? (4- len % 4) : len % 4
    },
    resetFn() {
      this.$refs.prices.classList.remove('opa')
      this.$refs.pricesIn.classList.remove('trans')
      this.$emit('shut')
    }
  }
}
</script>


