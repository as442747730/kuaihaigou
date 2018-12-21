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
  },
  money (value) {
    const val = (value / 1).toFixed(2)
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  /**
   * 格式化时间(刚刚、几分钟前、几小时前、几天前)
   */
  timeago (dateTimeStamp, type = 1) { // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    var minute = 1000 * 60 // 把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60
    var day = hour * 24
    // var week = day * 7
    // var halfamonth = day * 15
    // var month = day * 30
    var now = new Date().getTime() // 获取当前时间毫秒
    var result = ''
    var diffValue = now - dateTimeStamp // 时间差
    if (diffValue < 0) {
      return
    }
    var minC = diffValue / minute // 计算时间差的分，时，天，周，月
    var hourC = diffValue / hour
    var dayC = diffValue / day
    // var weekC = diffValue / week
    // var monthC = diffValue / month
    // if (monthC >= 1 && monthC <= 3) {
    //   result = ' ' + parseInt(monthC) + '月前'
    // } else if (weekC >= 1 && weekC <= 3) {
    //   result = ' ' + parseInt(weekC) + '周前'
    // } else if (dayC >= 1 && dayC <= 6) {
    if (dayC >= 1 && dayC <= 6) {
      result = ' ' + parseInt(dayC) + '天前'
    } else if (hourC >= 1 && hourC <= 23) {
      result = ' ' + parseInt(hourC) + '小时前'
    } else if (minC >= 1 && minC <= 59) {
      result = ' ' + parseInt(minC) + '分钟前'
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = '刚刚'
    } else {
      var datetime = new Date()
      datetime.setTime(dateTimeStamp)
      var Nyear = datetime.getFullYear()
      var Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      var Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
      var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
      // var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
      if (type === 1) {
        result = Nyear + '/' + Nmonth + '/' + Ndate + ' ' + Nhour + ':' + Nminute
      } else {
        result = Nyear + '/' + Nmonth + '/' + Ndate
      }
    }
    return result
  },
  /**
   * 获取地址栏参数
   * @params 传入需要获取的参数
   * @return 参数值
  **/
  getUrlQues (que) {
    let webUrl = window.location.href
    console.log(webUrl)
    if (webUrl.includes('?')) {
      let dealUrl = webUrl.split('?')[1]
      let queArr = dealUrl.split('&')
      let ewArr = queArr.map(v => {
        v = v.split('=')
        return v
      })
      return new Map(ewArr).get(que)
    } else {
      console.log('该地址没有参数')
    }
  }
}
