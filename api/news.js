import request from '~/utils/request'

export default newApi = {
	/* ----------------- server ----------------- */
	// 本周 true /本月 false
	serverHot (hottest, req) {
		return request.serverGet('/api/news/listNewsHottest?hottest=' + hottest, req)
	},
	serverPage(parame, req) {
    return request.serverGet('/api/news/paginateClassificationNews/', parame, req)
  },
  // 轮播图（左侧热点）
  serverBanner(classificationId, req) {
    return request.serverGet('/api/news/listBanners', { classificationId: classificationId }, req)
  },
  // 新闻标签列表
  serverTags(parame, req) {
    return request.serverGet('/api/news/paginateLabelNews/', parame, req)
  }
	/* ----------------- client ----------------- */
}