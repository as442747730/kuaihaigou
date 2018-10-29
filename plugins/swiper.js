// 轮播图插件
import Vue from 'vue'
import 'swiper/dist/css/swiper.css'

if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}
// Swiper.use({
//   name: 'pluginName',
//   params: {
//     pluginSwitch: false,
//   },
//   on: {
//     init() {
//       if (!this.params.pluginSwitch) return
//       console.log('init')
//     },
//     // swiper callback...
//   }
// })
