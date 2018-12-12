<template>
  <van-popup v-model="configs.isshow" position="right">
    <div class="editinfo">
      <com-head :titleConfig="configs.title"></com-head>
      <div class="edit-main">
        <div class="edit-one">
          <van-field v-model="configs.model" :placeholder="configs.plholder" />
        </div>
        <p class="edit-tip" v-if="configs.tips">{{ configs.tips }}</p>
        <!-- <p class="edit-tip">昵称由3-10位汉字/字母/符号组成，首位不能是符号</p> -->
      </div>
      <div class="edit-foot">
        <p class="foot-btn" @click="changeTite">确定</p>
      </div>
    </div>
  </van-popup>
</template>
<script>
import comHead from '~/components/com-head'
export default {
  components: {
    comHead
  },
  data () {
    return {
      configs: {
        isshow: false,
        title: '',
        model: '',
        plholder: '',
        tips: ''
      }
    }
  },
  mounted () {
    this.$bus.on('getConfigs', cfg => {
      console.log('cfg', cfg)
      this.configs = { ...cfg }
    })
    this.$bus.on('closeHead', ch => {
      this.configs.isshow = ch
    })
  },
  methods: {
    cancleFn () {
      this.configs.isshow = false
    },
    changeTite (title) {
      this.cftitle = title
    }
  },
  beforeDestory () {
    this.$bus.off('getConfigs')
  }
}
</script>
<style lang="less" scoped>
.van-popup--right {
  left: 0;
}
.editinfo {
  height: 100vh;
  background: #F3F3F3;
}

.edit-main {
  .edit-one {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 65px;
    background: #fff;
  }

  .edit-tip {
    padding: 15px 20px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}

.edit-foot {
  position: fixed;
  bottom: 15px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  .foot-btn {
    width: 100%;
    height: 45px;
    border-radius: 7px;
    background: #03A1CD;
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    .flex_allCenter;
  }
}
</style>