<template>
  <div class="u-cpms prices" ref="prices" @click.self.prevent="resetFn">
    <div class="u-cpms-in prices-in" ref="pricesIn">
      <section class="pricemdl" v-if="postPrice === 0">
        <h2>¥700</h2>
        <div class="slider">
          <van-slider v-model="stepvalue" :step="10" bar-height="4px" @change="changeValue" />
          <div class="slider-items">
            <span>¥0</span>
            <span>¥300</span>
            <span>¥900</span>
            <span>不限</span>
          </div>
        </div>
        <div class="type">
          <div class="type-head">葡萄酒类型</div>
          <ul class="u-list4">
            <li class="u-list4_item" :class="{active: index===2}" v-for="(item, index) in liLength" :key="index">干红</li>
            <li class="u-list4_item empty" v-for="(item, index) in addEmpty(liLength)" :key="index+10"></li>
          </ul>
        </div>
      </section>
      <section class="scenemdl" v-if="postPrice === 1">
        <div class="type">
          <div class="type-head">喝酒场景</div>
          <ul class="u-list4">
            <li class="u-list4_item" :class="{active: index===2}" v-for="(item, index) in liLength" :key="index">干红</li>
            <li class="u-list4 empty" v-for="(item, index) in addEmpty(liLength)" :key="index+10"></li>
          </ul>
        </div>
        <div class="type">
          <div class="type-head">特色</div>
          <ul class="u-list4">
            <li class="u-list4_item" :class="{active: index===2}" v-for="(item, index) in liLength" :key="index">干红</li>
            <li class="u-list4_item empty" v-for="(item, index) in addEmpty(liLength)" :key="index+10"></li>
          </ul>
        </div>
      </section>
      <section class="recommendmdl" v-if='postPrice === 2'>
        <ul class="list">
          <li :class="{active: index === 0}" v-for="(recom, index) in recommendList" :key="index">{{recom}}</li>
        </ul>
      </section>
      <footer class="footbtns" v-if="postPrice === 0 || postPrice === 1">
        <div class="btn" @click="resetFn">重置</div>
        <div class="btn">确认</div>
      </footer>
    </div>

 </div>
</template>
<style lang="scoped" lang="less">
.prices {
  &-in {
    margin-top: 90px;
    .type {
      &-head {
        font-size: 15px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        padding-top: 10px;
      }
    }
    
    &>section {
      max-height: 60vh;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
    }
    .pricemdl,
    .scenemdl {
      padding-bottom: 50px;
      .padlr20;
    }
    
    .pricemdl {

      &>h2 {
        font-size: 19px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        text-align: center;
        .padtb20;
      }

      .slider {
        &-items {
          .padtb20;
          .flex_between;
          &>span {
            font-size: 12px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: @cor_666;
          }
        }
      }
    }

    .recommendmdl {
      .list {
        padding: 10px 0;
        .ucpms-listone;
      }
    }

    .footbtns {
      .u-footbtns;
    }
  }
}
</style>
<script>
export default {
  name: 'priceList',
  props: ['postPrice'],
  data () {
    return {
      boolPrice: this.postPrice,
      stepvalue: 0,
      liLength: 40,
      recommendList: ['全部', '最新', '最便宜', '最贵', '仅看往期']
    }
  },
  methods: {
    changeValue (value) {
      console.log(this.boolPrice)
    },
    addClass () {
      this.$refs.prices.classList.add('u_zIndex100')
      this.$refs.prices.classList.add('u-cpms_opa')
      this.$refs.pricesIn.classList.add('u-cpms_trans')
    },
    addEmpty (len) {
      return len < 4 ? (4 - len % 4) : len % 4
    },
    resetFn () {
      this.$refs.prices.classList.remove('u-cpms_opa')
      this.$refs.pricesIn.classList.remove('u-cpms_trans')
      setTimeout(() => {
        this.$refs.prices.classList.remove('u_zIndex100')
        this.$emit('shut')
      }, 600)
    }
  }
}
</script>