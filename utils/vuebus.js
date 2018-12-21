import defaulthead from '~/assets/img/defaultImg.png'
const install = (Vue) => {
  const Bus = new Vue({
    methods: {
      emit (event, ...arts) {
        this.$emit(event, ...arts)
      },
      on (event, callback) {
        this.$on(event, callback)
      },
      off (event, callback) {
        this.$off(event, callback)
      }
    }
  })
  // 默认头像
  Vue.prototype.defaulthead = defaulthead
  Vue.prototype.$bus = Bus
}
export default install
