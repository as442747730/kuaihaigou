import request from '~/utils/request'
export const munityApi = {
  /* ----------- server ------------ */
  // 分页查询活动列表
  serverActiveList (params, req) {
    return request.serverGet('/api/activity/paginateActivity', params, req)
  },
  // 活动详情
  serverDetail (id, req) {
    return request.serverGet('/api/activity/getActivity/' + id, { activityId: id }, req)
  }
}
