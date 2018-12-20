<template>
  <!-- 售后记录 状态筛选器 -->
  <div class="u-filter">
    <div class="filter-wrapper">

      <div class="filter-title">售后状态</div>
      <div class="filter-ul">
        <div :class="['filter-li', m.key === status ? 'active' : '']" v-for="m in filterList" :key="m.key" @click="selectStatus(m.key)">{{ m.name }}</div>
      </div>

      <div class="filter-title">售后类型</div>
      <div class="filter-ul">
        <div :class="['filter-li', serviceType === 1 ? 'active' : '']" @click="selectType(1)">退货退款</div>
        <div :class="['filter-li', serviceType === 2 ? 'active' : '']" @click="selectType(2)">仅退款</div>
      </div>

      <div class="bottom-wrapper">
        <div class="button reset" @click="reset">重 置</div>
        <div class="button " @click="handleSubmit">确 定</div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'afterFilter',
    data () {
      return {
        filterList: [
          { name: '审核中', key: 1 },
          { name: '待寄回', key: 2 },
          { name: '待接收', key: 3 },
          { name: '退款中', key: 4 },
          { name: '已完成', key: 5 },
          { name: '已拒绝', key: 6 },
          { name: '已关闭', key: 7 }
        ],
        status: null,
        serviceType: null
      }
    },

    methods: {
      selectStatus (val) {
        if (this.status === val) {
          this.status = null
          return
        }
        this.status = val
      },
      selectType (val) {
        if (this.serviceType === val) {
          this.serviceType = null
          return
        }
        this.serviceType = val
      },
      reset () {
        this.status = null
        this.serviceType = null
      },
      handleSubmit () {
        this.$emit('getStatus', { status: this.status, serviceType: this.serviceType })
      },
      // 关闭时还原刚才选择的选项
      clear (obj) {
        this.status = obj.status
        this.serviceType = obj.serviceType
      }
    }
  }
</script>

<style lang="less" scoped>
.u-filter {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  .filter-wrapper {
    padding-top: 20px;
    width: 250px;
    height: 100vh;
    box-sizing: border-box;
    background: white;
    .filter-title {
      font-size: 15px;
      color: @cor_333;
      font-weight: bold;
      padding: 20px 15px;
    }
    .filter-ul {
      padding: 0 16px;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 15px;
      .filter-li {
        margin-bottom: 15px;
        width: 100px;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        font-size: 13px;
        color: @cor_999;
        border: 1PX solid #EEEEEE;
        border-radius: 6px;
        text-align: center;
        &.active {
          font-weight: bold;
          color: @cor_333;
          border-color: @cor_333;
        }
      }
    }
  }
  .bottom-wrapper {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    .button {
      flex: 1;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 15px;
      color: white;
      background: @nice-blue;
      &.reset {
        background: white;
        color: @nice-blue;
      }
    }
  }
}
</style>
