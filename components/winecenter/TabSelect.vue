<style lang="less" scoped>
.tab-select {
  .select-wrapper {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    background: #fff;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 34;

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

  .modal {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background: rgba(0, 0, 0, .6);
    width: 100%;
    height: 100vh;
  }
}
</style>
<template>
  <div class="tab-select">
    <div class="select-wrapper">
      <div :class="['select-item', tabActive === 'channel' ? 'active' : '']" @click="handleTab('channel')">频道</div>
    </div>
    <div class="filter-wrapper">
      <span>{{ total }}条</span>
      <span class="new" @click="expanNew">{{ newTxt }}</span>
    </div>
    <transition name="slide-bottom">
      <div class="drop-wrapper-select">
        <div class="drop-wrapper-body">
          <div :class="{
							'label': true,
							'small': tabActive === 'type' || tabActive === 'breed',
							'active': item.id === $data[`${tabActive}Active`]
						}" v-for="(item, index) in labelList" :key="index" @click="selectLabel(item.id)">{{ item.name }}</div>
        </div>
        <div class="drop-wrapper-bottom">
          <div class="btn" @click="reset">重置</div>
          <div class="btn" @click="submit">确认</div>
        </div>
      </div>
    </transition>
    <transiton name="slide-bottom">
      <div class="drop-wrapper-option">
        <div class="drop-wrapper-body">
          <div :class="['option-item', optionActive === item.type ? 'active' : '']" @click="selectNew(item.type)" v-for="item in optionList" :key="item.type">{{ item.name }}</div>
        </div>
      </div>
    </transiton>
    <transition name="fade">
      <div class="modal"></div>
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
    newTxt() {
      return this.optionList.filter(n => n.type === this.optionList)[0].name
    }
  },

  data() {
    return {
      tabActive: '',

      channelActive: '',
      topicActive: '',
      typeActive: '',
      breedActive: '',

      channlList: [
        { id: 1, name: '经验/知识' },
        { id: 2, name: '美食/周边' }
      ],

      labelList: [],
      expanded: false,

      optionsActive: 1,
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
    restt () {
      this[`${this.tabActive}Active`] = ''
    },
    submit () {
      let emitObj = {
        channelId: this.channelActive,
        topicId: this.topicActive,
        typeId: this.typeActive,
        vareity: this.breedActive,
        order: this.optionsActive
      }
      this.$emit('getFilterData', emitObj)
      this.tabActive = ''
    },
    expanNew () {
      this.expanded = !this.expanded
    },
    selectNew (type) {
      if (type === this.optionsActive) return
      this.optionsActive = type
      let emitObj = {
        channelId: this.channelActive,
        topicId: this.topicActive,
        typeId: this.typeActive,
        vareity: this.breedActive,
        order: this.optionsActive
      }
      this.$emit('getFilterData', emitObj)
      this.expanded = false
    },
    setSelect (obj) {
      this.channelActive = obj.channelId
      this.topicActive = obj.topicId
      this.typeActive = obj.typeId
      this.breedActive = obj.vareity
      this.optionsActive = obj.order
    }
  }
}
</script>