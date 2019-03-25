import request from '~/utils/request'
// 酒坛诗社
export const poetApi = {
  /* ----------- server ----------- */
  // 首页列表
  serverSignlist (params, req) {
    return request.serverGet('/api/sign/paginateHomeUserSign', params, req)
  },
  /* ----------- client ----------- */
  // 签到（酒坛诗社）
  createUserSign (content) {
    return request.clientPost('/api/sign/createUserSign', { content: content })
  },
  zanPoet (id) {
    return request.clientPost('/api/sign/like/' + id)
  },
  // 判断当前用户今天是否签到
  adjustSign () {
    return request.clientGet('/api/sign/checkIfSign')
  }
}
