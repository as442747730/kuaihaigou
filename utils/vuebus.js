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
  Vue.prototype.$bus = Bus
}
export default install
