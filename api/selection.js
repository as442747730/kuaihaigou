import request from '~/utils/request'
// 地址接口
export const selectApi = {
  /* ------------------------------- server ------------------------ */
  // 首页推荐
  serverRecomlist (req) {
    return request.serverGet('/api/selection/listRecommend', null, req)
  },
  // 分页列表
  serverPagelist (params, req) {
    return request.serverGet('/api/selection/paginateMobile', params, req)
  },
  // 获取甄选详情
  serverArticle (id, req) {
    return request.serverGet('/api/selection/get/' + id, { selectionId: id }, req)
  },
  // 热门甄选
  serverHotArticle (req) {
    return request.serverGet('/api/selection/listHot', null, req)
  },
  /* ------------------------------- client ------------------------ */
  // 分页列表
  clientPagelist (params) {
    return request.clientGet('/api/selection/paginateMobile', params)
  }
}
