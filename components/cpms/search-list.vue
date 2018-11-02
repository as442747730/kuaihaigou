<template>
  <div class="u-cpms searchcpm" ref="refsearch" @click.self.stop="closeFn">
    <div class="u-cpms-in searchcpm-in" ref="refsearchIn">
      <section class="selectList">
        <ul>
          <li :class="{active: index === 1}" v-for="(searach, index) in listSearch" :key="index">{{searach}}</li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'searchList',
  data () {
    return {
      listSearch: ['最新', '最热门', '评论最多', '点赞最多']
    }
  },
  methods: {
    addClass () {
      this.$refs.refsearch.classList.add('u_zIndex100')
      this.$refs.refsearch.classList.add('u-cpms_opa')
      this.$refs.refsearchIn.classList.add('u-cpms_trans')
    },
    resetFn () {
      this.$refs.refsearchIn.classList.remove('u-cpms_trans')
      this.$refs.refsearch.classList.remove('u-cpms_opa')
      setTimeout(() => {
        this.$refs.refsearch.classList.remove('u_zIndex100')
      }, 600)
    },
    closeFn () {
      this.$emit('shut')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/var.less';

.searchcpm {
  &-in {
    margin-top: 85px;
    &>section {
      max-height: 60vh;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
    }

    .selectList {
      &>ul {
        padding: 10px 0;
        .ucpms-listone;
      }
    }
  }
}
</style>