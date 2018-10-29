import 'vue2-toast/lib/toast.css'
import Vue from 'vue'
import Toast from 'vue2-toast'

Vue.use(Toast, {
  defaultType: 'center',
  duration: 3000,
  wordWrap: true,
  width: '150px'
})

const vue = new Vue()

const regexp = {
  phoneOrEmail: /(^1[34578]{1}\d{9}$)|(^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$)/,
  phone: /^1[34578]{1}\d{9}$/, // 手机号
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, // 邮箱地址
  integer: /^(0|[1-9][0-9]*)$/, // 是否整数
  floor: /^\d+(\.\d{1,4})?$/, //
  number: /^\d*$/, // 是否数字
  qq: /^[1-9][0-9]{4,9}$/gim,
  chinese: /[\u4e00-\u9fa5]/, // 是否中文
  code: /^[1-9]\d{5}$/g, // 邮政编码
  IdCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 身份证
  pwd: /^[_a-zA-Z0-9]+$/, // 密码(包含数字字母大小写下划线)
  ip: /(\d+)\.(\d+)\.(\d+)\.(\d+)/, // ip地址
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/ // 数字字母大小写 6-16位
}

// 辅助通用方法
export default {
  // 正则检测
  async validate (val, type, message) {
    if (!regexp[type].test(val)) {
      vue.$toast.center(message)
    }
    return regexp[type].test(val)
  },
  validateSame (val1, val2, message) {
    console.log('here')
    if (!(val1 === val2)) {
      vue.$toast.center(message)
    }
    return val1 === val2
  },
  // 空值检测
  validateEmpty (val, message) {
    if (!val) {
      vue.$toast.center(message)
    }
    return !val === false
  },
  // 时间格式化
  /**
    * @argument date * 时间对象
    * @argument options * 配置参数
    * dayDelimiter * 年月日分隔符，默认 -
    * timeDelimiter * 时分秒分隔符，默认 :
    * ifHaveTime * 是否需要时分秒，默认 false
   */
  formatDate (date, options) {
    if (!date || !date.getFullYear()) {
      throw new Error('请传入时间对象')
    }
    options = options || {}
    options.dayDelimiter = options.dayDelimiter || '-'
    options.timeDelimiter = options.timeDelimiter || ':'
    options.ifHaveTime = options.ifHaveTime || false
    let str = ''
    str = date.getFullYear() + options.dayDelimiter + (date.getMonth() + 1) + options.dayDelimiter + date.getDate()
    if (options.ifHaveTime) {
      str += ' ' + date.getHours() + options.timeDelimiter + date.getMinutes() + options.timeDelimiter + date.getSeconds()
    }
    return str
  },
  // 数组去重
  deleteRepeat (array) {
    return [...new Set(array)]
  },
  // 数组排序
  rangeArray (array) {
    let allNumber = true
    array.forEach((item) => {
      if (typeof +item !== 'number') {
        allNumber = false
      }
    })
    if (!allNumber) {
      return false
    }
    return array.sort((a, b) => {
      return a - b
    })
  }
}
