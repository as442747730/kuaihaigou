<template>
  <div class="u-cpms othercpms" ref="refOhter" @click.self.prevent="resetFn">
    <div class="u-cpms-in othercpms-in" ref="refOhterIn">
      <section class="list">
        <ul>
          <li :class="{active: index === 0}" v-for="(list, index) in lists">{{list}}</li>
        </ul>
      </section>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'othersList',
  props: ['postClsIndex', 'postlists'],
  data () {
    return {
      lists: ['酒具', '醒酒器', '餐具', '奶酪', '其他'],
      lists2: ['葡萄酒杯', '香槟酒杯', '威士忌杯', '鸡尾酒杯', '烈酒杯']
    }
  },
  computed: {
    myList: {
      get: function () {
        return this.myH
      }
    }
  },
  methods: {
    addClass () {
      this.$refs.refOhter.classList.add('u_zIndex100')
      this.$refs.refOhter.classList.add('u-cpms_opa')
      this.$refs.refOhterIn.classList.add('u-cpms_trans')
    },
    resetFn () {
      this.$refs.refOhter.classList.remove('u-cpms_opa')
      this.$refs.refOhterIn.classList.remove('u-cpms_trans')
      this.$emit('shut')
      setTimeout(() => {
        this.$refs.refOhter.classList.remove('u_zIndex100')
      }, 600)
    },
    getLen (str) {
      let arr = str.split(',')
      return 45 * arr.length
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/var.less";

.othercpms {
  &-in {
    margin-top: 90px;
    max-height: 60vh;
    height: 50vh;

    .list {
      height: 100%;
      -webkit-overflow-scrolling: touch;
      overflow: auto;

      &>ul {
        &>li {
          height: 45px;
          text-align: center;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: @cor_999;
          .flex_allCenter;
        }

        .active {
          color: @cor_333;
        }
      }
    }
  }
}
</style>