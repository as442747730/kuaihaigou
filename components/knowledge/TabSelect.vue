<template>
  <div class="u-tab-select">
    <div class="select-wrapper">
      <div :class="['select-item', tabActive === 'channel' ? 'active' : '']" @click="handleTab('channel')">频道</div>
      <div :class="['select-item', tabActive === 'topic' ? 'active' : '']" @click="handleTab('topic')">话题</div>
      <div :class="['select-item', tabActive === 'type' ? 'active' : '']" @click="handleTab('type')">葡萄酒类型</div>
      <div :class="['select-item', tabActive === 'breed' ? 'active' : '']" @click="handleTab('breed')">葡萄品种</div>
    </div>
    <div class="filter-wrapper">
      <span>2038条</span>
      <span>最新</span>
    </div>

    <transition name="slide-bottom">
      <div class="drop-wrapper-select" v-show="tabActive !== ''">
        <div class="drop-wrapper-body">
          <div :class="{'label': true, 'small': tabActive === 'type' || tabActive === 'breed' }" v-for="(item, index) in labelList" :key="index" @click="selectLabel()">{{ item.name }}</div>
        </div>
        <div class="drop-wrapper-bottom">
          <div class="btn">重置</div>
          <div class="btn co">确认</div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="modal" v-show="tabActive !== ''" @click="hide"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'TabSelect',

    props: {},

    data () {
      return {
        tabActive: '',

        channelActive: '',
        topicActive: '',
        typeActive: '',
        breedActive: '',

        channelList: [
          { id: 1, name: '经验/知识' },
          { id: 2, name: '美食/周边' }
        ],
        topicList: [],
        typeList: [],
        breedList: [],

        labelList: ['方法', '圣诞', '按时']
      }
    },

    methods: {
      handleTab (val) {
        this.tabActive = this.tabActive === val ? '' : val
        this.labelList = this[`${val}List`]
      },
      hide () {
        this.tabActive = ''
      },

      selectLabel () {

      }
    }
  }
</script>

<style lang="less" scoped>
.u-tab-select {
  .select-wrapper {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    background: white;
    .select-item {
      font-size: 13px;
      color: @cor_999;
      line-height: 1;
      padding: 15px 0;
      &:after {
        content: '';
        margin-left: 5px;
        display: inline-block;
        width: 12px;
        height: 13px;
        vertical-align: top;
        background-image: url("~/assets/img/Icons/ic_triangle_bt_12x12@2x.png");
        background-size: 80% auto;
        background-position: center;
        background-repeat: no-repeat;
        opacity: 0.5;
        transition: .2s;
      }
      &.active {
        color: @cor_333;
        font-weight: bold;
        &:after {
          opacity: 1;
          transform: rotate(180deg);
        }
      }
    }
  }
  .filter-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: @cor_border;
    font-size: 13px;
    color: @cor_999;
  }
  .drop-wrapper-select {
    width: 100%;
    position: fixed;
    z-index: 31;
    top: 43px;
    .drop-wrapper-body {
      background: white;
      padding: 20px 20px 45px 20px;
      display: flex;
      flex-wrap: wrap;
      .label {
        width: 100px;
        &.small {
          width: 70px;
        }
        border: 1PX solid #EEEEEE;
        color: @cor_999;
        text-align: center;
        font-size: 13px;
        border-radius: 4px;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.active {
          border-color: @cor_333;
          color: @cor_333;
          font-weight: bold;
        }
      }
    }
    .drop-wrapper-bottom {
      box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
      display: flex;
      .btn {
        flex: 1;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        font-weight: bold;
        color: @nice-blue;
        background: white;
        text-align: center;
        &.co {
          background: @nice-blue;
          color: white;
        }
      }
    }
  }

  .modal {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background: rgba(0,0,0,0.6);
    width: 100%;
    height: 100vh;
  }
}
</style>
