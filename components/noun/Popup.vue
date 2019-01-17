<template>
  <div class="u-tab-select">
    <div class="select-wrapper">
      <div :class="['select-item', tabActive === 'channel' ? 'active' : '']" @click="handleTab('channel')">葡萄品种</div>
      <div :class="['select-item', tabActive === 'type' ? 'active' : '']" @click="handleTab('type')">产区</div>
      <div :class="['select-item', tabActive === 'topic' ? 'active' : '']" @click="handleTab('topic')">酒庄</div>
    </div>
    <transition name="slide-bottom">
      <div class="drop-wrapper-select" v-show="tabActive !== ''">
        <div class="drop-wrapper-body">
         
        </div>
        <div class="drop-wrapper-bottom">
          <div class="btn" @click="reset">重置</div>
          <div class="btn co" @click="submit">确认</div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="modal" v-show="tabActive !== '' || expanded" @click="hide"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'TabSelect',

    props: {
      topicList: Array,
      typeList: Array,
      breedList: Array,
      total: Number
    },

    computed: {
      newTxt () {
        return this.optionList.filter(n => n.type === this.optionActive)[0].name
      }
    },

    data () {
      return {
        // drop select
        tabActive: '',

        channelActive: '',
        topicActive: '',
        typeActive: '',
        breedActive: '',

        channelList: [
          { id: 1, name: '经验/知识' },
          { id: 2, name: '美食/周边' }
        ],

        labelList: [],
        // drop option
        expanded: false,

        optionActive: 1,
        optionList: [
          { name: '最新', type: 1 },
          { name: '最热', type: 2 },
          { name: '评论', type: 3 },
          { name: '点赞', type: 4 },
          { name: '收藏', type: 5 }
        ]
      }
    },

    methods: {
      handleTab (val) {
        this.tabActive = this.tabActive === val ? '' : val
        this.labelList = this[`${val}List`]
        this.expanded = false
      },
      hide () {
        this.tabActive = ''
        this.expanded = false
      },

      selectLabel (id) {
        this[`${this.tabActive}Active`] = id
      },

      reset () {
        this[`${this.tabActive}Active`] = ''
      },
      submit () {
        this.$emit('getFilterData', { channelId: this.channelActive, topicId: this.topicActive, typeId: this.typeActive, vareity: this.breedActive, order: this.optionActive })
        this.tabActive = ''
      },

      expanNew () {
        this.expanded = !this.expanded
      },
      selectNew (type) {
        if (type === this.optionActive) return
        this.optionActive = type
        this.$emit('getFilterData', { channelId: this.channelActive, topicId: this.topicActive, typeId: this.typeActive, vareity: this.breedActive, order: this.optionActive })
        this.expanded = false
      },

      setSelect (obj) {
        this.channelActive = obj.channelId
        this.topicActive = obj.topicId
        this.typeActive = obj.typeId
        this.breedActive = obj.varietyId
        this.optionActive = obj.order
      }
    }
  }
</script>

<style lang="less" scoped>
.u-tab-select {
  height: 76px;
  .select-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: white;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 34;
    height: 40px;
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
  
  .drop-wrapper-select {
    width: 100%;
    position: fixed;
    z-index: 33;
    top: 43px;
    .drop-wrapper-body {
      background: white;
      padding: 20px 10px 20px 10px;
      display: flex;
      flex-wrap: wrap;
      
    }
    .drop-wrapper-bottom {
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
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
