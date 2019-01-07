import request from '~/utils/request'

export const newApi = {
  /* ----------------- server ----------------- */
  // 本周 true /本月 false
  serverHot (hottest, req) {
    return request.serverGet('/api/news/listNewsHottest', { hottest: hottest }, req)
  },
  serverPage (parame, req) {
    return request.serverGet('/api/news/paginateClassificationNews/', parame, req)
  },
  // 轮播图
  serverBanner (classificationId, req) {
    return request.serverGet('/api/news/listBanners', { classificationId: classificationId }, req)
  },
  // 新闻标签列表
  serverTags (parame, req) {
    return request.serverGet('/api/news/paginateLabelNews/', parame, req)
  },
  /* ----------------- client ----------------- */
  clientHot (hottest) {
    return request.clientGet('/api/news/listNewsHottest', { hottest: hottest })
  },
  clientPage (params) {
    return request.clientGet('/api/news/paginateClassificationNews/', params)
  },
  clientBanner (classificationId) {
    return request.clientGet('/api/news/listBanners', { classificationId: classificationId })
  },
  clientTags (params) {
    return request.clientGet('/api/news/paginateLabelNews/', params)
  }
}
