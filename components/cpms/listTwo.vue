<template>
  <van-popup v-model="showtwo" position="top" @click-overlay="closeFn" :close-on-click-overlay="false">
    <div class="empty60" v-if="twotype"></div>
    <section class="secs" :class="{secs_ok: posttype}" :data-val="posttype">
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
  </van-popup>
</template>
<style lang="less" scoped>
.secs {
  padding: 0 20px;
  
  .type {
    &-head {
      font-size: 15px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      padding-top: 10px;
    }
  }

  .limitCls {
    padding-bottom: 50px;
    .padlr20;
  }

  .listone {
    padding: 10px 0;
    .ucpms-listone;
  }

}
.secs_ok {
  padding-bottom: 45px;
  min-height: 40vh;
}

.footbtns {
  .u-footbtns;
}

.van-popup--top {
  top: 90px;
}
.empty60{
  width: 100%;
  height: 60px;
}
</style>
<script>
export default {
  props: {
    showtwo: {
      type: Boolean,
      default: false
    },
    twotype: {
      type: Boolean,
      default: false
    },
    postObj: {
      type: Object,
      default: {}
    }, // 接受数据
    posttype: {
      type: Boolean,
      default: true
    } // 设置 section padding
  },
  methods: {
    closeFn () {
      this.$emit('closeFn', false)
    },
    changeCls (cls) {
      return cls + '_item'
    },
    addEmpty (cls, len) {
      // 当最后一行不能整除，为其补到整数
      if (cls === 'listone') return []
      let num = cls.slice(-1)
      let qyNum = len % num
      return qyNum > 0 ? (num - qyNum) : 0
    }
  }
}
</script>