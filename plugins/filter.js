import Vue from 'vue'
import filters from '~/utils/filters'

filters.forEach(v => {
  Vue.filter(v.name, v.fun)
})
