// 本中间件用于检测授权登录后，用户账号是否已绑定，未绑定的，将会跳到login页面
export default function (context) {
  const ua = context.req.headers['user-agent']
  // 检测用户环境是否为微信浏览器,0为非微信,1为微信
  context.env = /MicroMessenger/.test(ua) ? 1 : 0 // 给上下文注入变量env，此变量可在asyncData中使用
  if (/MicroMessenger/.test(ua)) {
    // 微信浏览器时
    let status = context.query.status
    if (status === '1') {
      return context.redirect('/account/login?status=1')
    }
  }
}
