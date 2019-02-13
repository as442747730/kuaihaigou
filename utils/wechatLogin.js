import { userApi } from '~/api/users'
import { accountApi } from '~/api/account'

export default {
  async wxLogin () {
    const { code } = await userApi.userDetail()
    if (code === 200) {
      window.location.href = '/mine'
    } else if (code === 506) {
      console.log('未登录')
      const { code: wxCode, data: wxData } = await accountApi.loginWithWxJs({ returnUrl: 'http://' + window.location.host + '/account/login' })
      if (wxCode === 200) {
        sessionStorage.setItem('key', 'allow')
        window.location.href = wxData.authorizeJsUrl
      }
    }
  }
}
