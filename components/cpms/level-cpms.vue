<template>
  <div class="u-cpms levelcpm" ref="levels" @click.self.stop="resetFn">
    <div class="u-cpms-in levelcpm-in" :class="{noviceH: postLevel === 3}" ref="levelsIn">
      <section class="rank" v-if="postLevel === 0">
        <div class="type">
          <div class="type-head">站内等级</div>
          <ul class="u-list4">
            <li class="u-list4_item" v-for="(n, index) in 4" :key="index">入门级</li>
          </ul>
        </div>
        <div class="type">
          <div class="type-head">国际级别</div>
          <ul class="u-list4">
            <li class="u-list4_item" v-for="(n, index) in 12" :key="index">AOC/AOP</li>
          </ul>
        </div>
      </section>
      <section class="variety" v-if="postLevel === 1">
        <ul class="u-list4">
          <li class="u-list4_item" v-for="(vary, index) in 20" :key="index">混酿型</li>
        </ul>
      </section>
      <section class="spirit" v-if="postLevel === 2">
        <div class="type">
          <div class="type-head">酒精度</div>
          <ul class="u-list3">
            <li class="u-list3_item" v-for="(spir, index) in 12" :key="index">11%以下</li>
          </ul>
        </div>
        <div class="type">
          <div class="type-head">净含量</div>
          <ul class="u-list2">
            <li class="u-list2_item" v-for="(item, index) in 2" :key="index">300mL以下</li>
          </ul>
        </div>
      </section>
      <section class="novice">
        <ul>
          <li class="active">
            <span>新手选酒</span>
          </li>
          <li>
            <span>高手选酒</span>
          </li>
        </ul>
      </section>
      <footer class="footbtns" v-if="postLevel !== 3">
        <div class="btn">重置</div>
        <div class="btn">确认</div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {

  name: 'levelCpms',

  props: ['postLevel'],

  methods: {

    addClass() {

      this.$refs.levels.classList.add('u_zIndex50')

      this.$refs.levels.classList.add('u-cpms_opa')

      this.$refs.levelsIn.classList.add('u-cpms_trans')

    },

    resetFn() {

      this.$refs.levels.classList.remove('u-cpms_opa')

      this.$refs.levelsIn.classList.remove('u-cpms_trans')


      setTimeout(() => {
        this.$refs.levels.classList.remove('u_zIndex50')
        this.$emit('shut')
      }, 600)

    }

  }

}
</script>
<style lang="less" scoped>
@import '../../assets/css/var.less';

.levelcpm {

  &-in {

    height: 60vh;

    margin-top: 136px;

    .type {

      &-head {

        font-size: 15px;

        font-family: PingFangSC-Semibold;

        font-weight: 600;

        padding-top: 10px;

      }

    }

    .rank,

    .variety,

    .spirit {

      height: calc(60vh - 50px);

      -webkit-overflow-scrolling: touch;

      overflow: auto;

      .padlr20;

    }

    .footbtns {

      .u-footbtns;

    }

  }

  .noviceH {
    height: 110px;
  }

  .novice {
    width: 100%;
    height: 100%;
    &>ul {
      width: 100%;
      height: 100%;
      &>li {
        width: 100%;
        height: 50%;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color: @cor_999;
        .flex_allCenter;
      }
      .active {
        font-family:PingFangSC-Medium;
        color: @cor_333;
      }
    }
  }

}
</style>