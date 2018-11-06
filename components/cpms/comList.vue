<template>
  <!-- 
      @多样式列表弹窗
      @slot name="headSild"
      @postObj  父组件数据
      @slot name="foot" 
      @postType 控制 limitCls 是否显示
      @chagneCls 根据父类添加对应的子类
      @addEmpty 多行填充
   -->
  <div class="u-cpms comlist" ref="comlist" @click.self.prevent="resetFn">
    <div class="u-cpms-in comlist-in" :class="{mart136: martop}" ref="comlistIn">
      <section :class="{limitCls: postType}">
        <slot name="headSild"></slot>
        <div class="type" v-for="(items, index) in postObj.list">
          <div class="type-head" v-if="items.title">{{items.title}}</div>
          <ul :class="items.clsType">
            <li :class="changeCls(items.clsType)" v-for="(item, ind) in items.list" :key="ind">{{item}}</li>
            <li class="empty" :class="changeCls(items.clsType)" v-for="(item, $ind) in addEmpty(items.clsType, items.list.length)" :key="$ind + 10"></li>
          </ul>
        </div>
      </section>
      <slot name="foot">
        <footer class="footbtns">
          <div class="btn">重置</div>
          <div class="btn">确认</div>
        </footer>
      </slot>  
    </div>
 </div>
</template>
<script>
export default {
  name: 'comlist',
  props: {
    postObj: Object, // 接受数据
    postType: Boolean, // 设置 section padding
    martop: Boolean // 设置 comlist-in 的 martop
  },
  methods: {
    changeCls (cls) {
      return cls + '_item'
    },
    addEmpty (cls, len) {
      // 当最后一行不能整除，为其补到证书
      if (cls === 'listone') return []
      let num = cls.slice(-1)
      let qyNum = len % num
      return qyNum > 0 ? (num - qyNum) : 0
    },
    addClsType1 () {
      this.$refs.comlist.classList.remove('u_zIndex100')
      this.$refs.comlist.classList.add('u_zIndex50')
      this.$refs.comlist.classList.add('u-cpms_opa')
      this.$refs.comlistIn.classList.add('u-cpms_trans')
    },
    addClsType2 () {
      this.$refs.comlist.classList.remove('u_zIndex50')
      this.$refs.comlist.classList.add('u_zIndex100')
      this.$refs.comlist.classList.add('u-cpms_opa')
      this.$refs.comlistIn.classList.add('u-cpms_trans')
    },
    resetFn () {
      this.$refs.comlist.classList.remove('u-cpms_opa')
      this.$refs.comlistIn.classList.remove('u-cpms_trans')
      let timer = setTimeout(() => {
        this.$refs.comlist.classList.remove('u_zIndex50')
        this.$refs.comlist.classList.remove('u_zIndex100')
        this.$emit('shut')
        window.clearTimeout(timer)
      }, 600)
    }
  }
}
</script>
<style lang="scoped" lang="less">
.comlist {
  &-in {
    margin-top: 90px;
    .padb50 {
      padding-bottom: 50px;
    }
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
    .headprice {
      font-size: 19px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      text-align: center;
      .padtb20;
    }
    .limitCls {
      padding-bottom: 50px;
      .padlr20;
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
    .listone {
      padding: 10px 0;
      .ucpms-listone;
    }
    .footbtns {
      .u-footbtns;
    }
  }
  &-in.mart136 {
    margin-top: 136px;
  }
}
</style>
