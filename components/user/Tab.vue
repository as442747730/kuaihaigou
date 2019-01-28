<template>
  <ul class="tab-item">
    <li class="tab-item-list" :class="{'cur': index === 0}">
      <a :href="'/user?uid=' + uid">Ta的作品</a>
    </li>
    <li class="tab-item-list" :class="{'cur': index === 1}">
      <a :href="'/user/collect?uid=' + uid">Ta的收藏</a>
    </li>
    <li class="tab-item-list" :class="{'cur': index === 2}">
      <a :href="'/user/reward?uid=' + uid">给Ta的打赏</a>
    </li>
    <li class="tab-item-list" :class="{'cur': index === 3}">
      <a :href="'/user/infor?uid=' + uid">Ta的信息</a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'u-user-tab',

  props: {
    uid: String,
    index: Number
  },

  data () {
    return {
      userInfo: {}
    }
  },

  methods: {
  }

}
</script>
