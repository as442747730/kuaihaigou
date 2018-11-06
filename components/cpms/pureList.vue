<template>
  <!-- 
    @ 纯粹单行列表
    @params postObj 接受父组件数据
    @params postCls purlist-in 添加对应的类
   -->
  <div class="u-cpms purlist" ref="purlist" @click.self.prevent="resetFn">
    <div class="u-cpms-in purlist-in" ref="purlistIn" :class="postCls">
      <section>
        <ul  class="listone">
          <li v-for="(list, index) in postObj.list">{{list}}</li>
        </ul>
      </section>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'purlist',
  props: {
    postObj: Object,
    postCls: {
      type: String,
      default: ''
    }
  },
  methods: {
    addClass () {
      this.$refs.purlist.classList.add('u_zIndex100')
      this.$refs.purlist.classList.add('u-cpms_opa')
      this.$refs.purlistIn.classList.add('u-cpms_trans')
    },
    resetFn () {
      this.$refs.purlist.classList.remove('u-cpms_opa')
      this.$refs.purlistIn.classList.remove('u-cpms_trans')
      this.$emit('shut')
      let timer = setTimeout(() => {
        this.$refs.purlist.classList.remove('u_zIndex100')
        window.clearTimeout(timer)
      }, 600)
    }
  }
}
</script>
<style lang="less" scoped>
.purlist {
  &-in {
    margin-top: 90px;
    &>section {
      max-height: 60vh;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
    }
    .listone {
      padding: 10px 0;
      .ucpms-listone;
    }
  }
  &-in.mart86 {
    margin-top: 86px;
  }
}
</style>