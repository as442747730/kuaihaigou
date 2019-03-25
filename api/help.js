import request from '~/utils/request'
export const helpApi = {
  /* ---------------- serve ------------------ */
  // 页面底部管理
  listBottomManagements (req) {
    return request.serverGet('/api/bottommanagement/listBottomManagements')
  },
  // 帮助中心列表
  getList () {
    return request.serverGet('/api/helpcenter/listHelpCenters')
  },
  // 内容
  getContent (id) {
    return request.serverGet('/api/helpcenter/getHelpCenter/' + id, { id: id })
  }
}
