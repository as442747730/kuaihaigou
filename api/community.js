import request from '~/utils/request'
export const munityApi = {
  /* ----------- server ------------ */
  // 分页查询活动列表
  serverActiveList (params, req) {
    return request.serverGet('/api/activity/paginateActivity', params, req)
  },
  serverMineactlist (params, req) {
    return request.serverGet('/api/activity/paginateMobileActivityForUser', params, req)
  },
  // 活动详情
  serverDetail (id, req) {
    return request.serverGet('/api/activity/getActivity/' + id, { activityId: id }, req)
  },
  // 查询主题
  serverTheme (type, req) {
    return request.serverGet('/api/activity/listThemeByType/' + type, null, req)
  },
  serverVote (id, req) {
    return request.serverGet('/api/activity/getBlindStatistics/' + id, { activityId: id }, req)
  },
  serverpersondetail (req) {
    // return request.serverGet('/api/user/detail', {}, req)
    return request.serverPost('/api/user/detail', null, req)
  },
  /* ----------- client ------------ */
  clientActList (params) {
    return request.clientGet('/api/activity/paginateActivity', params)
  },
  // 投票
  clicentVote (params) {
    return request.clientPostJson('/api/activity/vote', params)
  },
  // 报名
  clientSignup (params) {
    return request.clientPostJson('/api/activity/signUp', params)
  },
  clientApply (params) {
    return request.clientPostJson('/api/activity/activityApply', params)
  }
}
