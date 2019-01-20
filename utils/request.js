/*
 * API 封装(供服务端使用)
//  * 参考资料
 *   1. http://vue2.mmxiaowu.com/article/589af8cde9be1c5b21ef8e9c
 */

import axios from 'axios'
import qs from 'qs'
// import { Toast } from 'vant'
import config from '../private.config'
import { Toast } from 'vant'
const _ = require('lodash')

// API 服务器地址
const target = config.target

// 请求时的拦截器
axios.interceptors.request.use(config => {
  // Toast.loading({ forbidClick: true, message: '拼命加载中...' })
  // config.token = 123
  return config
}, error => {
  return Promise.reject(error)
})

// 请求完成后的拦截器
axios.interceptors.response.use(response => {
  // Toast.clear()
  return Promise.resolve(response)
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // NProgress.done()
  // 如果 http 状态码正常, 则直接返回数据
  if (response.status === 200 || response.status === 304) {
    // 这里, 如果不需要除 data 外的其他数据, 可以直接 return response.data, 这样可以让后面的代码精简一些
    // return {
    //   code: response.data.status.errCode,
    //   data: response.data.data
    // }
    if (response.data.status.errCode === 200) {
      return {
        code: response.data.status.errCode,
        data: response.data.data
      }
    }
    return {
      code: response.data.status.errCode,
      data: response.data.status.message
    }
  }
  // 异常状态下, 把错误信息返回去
  return {
    code: response.status,
    data: response.statusText
  }
}

// 处理来自后端的错误
function checkCode (res) {
  // console.log('res:', res)
  if (res.code === 506) {
    // router.push('/login')
  } else if (res.code !== 200) {
    console.log('fail')
    Toast.fail(res.data)
  }
  return res
}

export default {
  serverPost (url, data, req) {
    const options = {
      method: 'post',
      url: target + url,
      data: qs.stringify(data),
      timeout: 30000,
      withCredentials: false,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    if (req && req.req.headers.cookie) {
      var cookies = []
      _.each(req.req.headers.cookie, function (value, key) {
        cookies.push(`${value}`)
      })
      options.headers.Cookie = cookies.join('')
    }
    return axios(options).then(checkStatus).then(checkCode)
  },
  serverPostJson (url, data, req) {
    const options = {
      method: 'post',
      url: target + url,
      data: data,
      timeout: 30000,
      withCredentials: false,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    if (req && req.req.headers.cookie) {
      var cookies = []
      _.each(req.req.headers.cookie, function (value, key) {
        cookies.push(`${value}`)
      })
      options.headers.Cookie = cookies.join('')
    }
    return axios(options).then(checkStatus).then(checkCode)
  },
  serverGet (url, params, req) {
    const options = {
      method: 'get',
      url: target + url,
      params,
      timeout: 30000,
      withCredentials: false,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
    if (req && req.req.headers.cookie) {
      var cookies = []
      _.each(req.req.headers.cookie, function (value, key) {
        cookies.push(`${value}`)
      })
      options.headers.Cookie = cookies.join('')
    }
    return axios(options).then(checkStatus).then(checkCode)
  },
  clientPost (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      withCredentials: false,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(checkStatus).then(checkCode)
  },
  clientPostJson (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: data,
      timeout: 30000,
      withCredentials: false,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(checkStatus).then(checkCode)
  },
  clientGet (url, params) {
    return axios({
      method: 'get',
      url: url,
      params,
      timeout: 30000,
      withCredentials: false,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(checkStatus).then(checkCode)
  },
  all (array) {
    return axios.all(array)
  },
  spread (func) {
    return axios.spread(func)
  },
  judgeDevice (req, link) {
    const agent = req.req.headers['user-agent'].toLocaleLowerCase()
    if (!agent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      req.redirect(302, link)
      return false
    }
  }
}
