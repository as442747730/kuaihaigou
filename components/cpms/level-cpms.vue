<template>
  <div class="u-cpms levelcpm" ref="levels" @click.self.stop="resetFn">
    <div class="u-cpms-in levelcpm-in" ref="levelsIn">
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
      <section class="novice" v-if="postLevel === 3">
        <ul>
          <li :class="{active: noviceMater.elIndex === index}" v-for="(novice, index) in noviceMater.list" :key="index" @click="ctralNovice(index)">
            <span>{{novice}}</span>
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
  data () {
    return {
      noviceMater: {
        list: ['新手选酒', '高手选酒'],
        elIndex: 0
      }
    }
  },
  methods: {
    addClass () {
      this.$refs.levels.classList.add('u_zIndex50')
      this.$refs.levels.classList.add('u-cpms_opa')
      this.$refs.levelsIn.classList.add('u-cpms_trans')
    },
    resetFn () {
      this.$refs.levels.classList.remove('u-cpms_opa')
      this.$refs.levelsIn.classList.remove('u-cpms_trans')
      setTimeout(() => {
        this.$refs.levels.classList.remove('u_zIndex50')
        this.$emit('shut')
      }, 600)
    },
    ctralNovice (index) {
      this.noviceMater.elIndex = index
      this.$emit('shutNovice', index)
      this.resetFn()
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/var.less';

.levelcpm {
  &-in {
    margin-top: 136px;
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

    .rank,
    .variety,
    .spirit {
      padding-bottom: 50px;
      .padlr20;
    }

    .novice {
      &>ul {
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