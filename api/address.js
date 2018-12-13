import request from '~/utils/request'
// 地址接口
export const addressApi = {
  // server
  getAreaList (id, req) {
    return request.serverGet(`/api/area/${id}`, { parent_id: id }, req)
  },
  getAddressList (req) {
    return request.serverGet('/api/shippingAddress/listAll', {}, req)
  },
  getAddressDetail (id, req) {
    return request.serverGet(`/api/shippingAddress/get/${id}`, {}, req)
  },
  // client
  getAreaListClient (id) {
    return request.clientGet(`/api/area/${id}`)
  },
  getAddressListClient () {
    return request.clientGet('/api/shippingAddress/listAll')
  },
  setDefault (val) {
    return request.clientPost(`/api/shippingAddress/setDefault/${val}`, { shippingAddressId: val })
  },
  deleteAddress (val) {
    return request.clientPost(`/api/shippingAddress/delete/${val}`)
  },
  createAddress (obj) {
    return request.clientPost('/api/shippingAddress/create', obj)
  },
  updateAddress (obj) {
    return request.clientPost('/api/shippingAddress/update', obj)
  }
}
