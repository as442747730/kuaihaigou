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
  }
}
