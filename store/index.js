import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// window.fetch() 的 Polyfill
// require('whatwg-fetch')

const store = () => new Vuex.Store({

  state: {
    authUser: null,
    blurOpen: false // 设置模糊动画
  },

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
    },
    SET_BLUR: function (state, val) {
      state.blurOpen = val
    }
  },

  actions: {
  }

})

export default store
