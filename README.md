# khg-mobile

> 快海购移动端 Nuxt SSR

## Build Setup

``` bash
# 复制配置文件
$ cp private.config.js.example private.config.js

# 依赖安装
$ npm install

# 开发环境
$ npm run dev

# 生产环境
$ npm run build
$ pm2 delete nuxt-start
$ npm start

```

## 项目结构

```
.
|-- README.md
|-- api -- 接口文件（前后端请求均定义在此）
|   |-- account.js
|   |-- address.js
|   |-- cart.js
|   |-- comment.js
|   |-- community.js
|   |-- coupon.js
|   |-- encys.js
|   |-- goods.js
|   |-- help.js
|   |-- knowledge.js
|   |-- message.js
|   |-- news.js
|   |-- order.js
|   |-- other.js
|   |-- poets.js
|   |-- prove.js
|   |-- quiz.js
|   |-- reward.js
|   |-- search.js
|   |-- selection.js
|   |-- users.js
|   `-- wine.js
|-- assets -- 静态资源文件
|   |-- css
|   |   |-- main.less -- 全局样式
|   |   |-- normalize.css
|   |   |-- transition.css
|   |   |-- var.css
|   |   `-- var.less -- less变量
|   |-- font
|   `-- img
|-- backpack.config.js
|-- build
|   |-- main.js
|   `-- main.map
|-- components -- 组件库
|   |-- Address.vue
|   |-- Advert.vue
|   |-- Coupon.vue
|   |-- Invoice.vue
|   |-- Keyboard.vue
|   |-- Login-captcha.vue
|   |-- Menu.vue -- 会员中心目录
|   |-- Pay-reward.vue
|   |-- Pay.vue
|   |-- QuillEditor.vue -- 富文本编辑器
|   |-- Tabs.vue
|   |-- Upload.vue
|   |-- UploadProve.vue
|   |-- Usericon.vue
|   |-- articel -- 文章类通用模块
|   |   |-- Comment.vue -- 评论列表
|   |   |-- Operation.vue -- 操作行为
|   |   `-- Reply.vue -- 回复
|   |-- com-head.vue -- 顶栏
|   |-- community
|   |-- detail -- 商品详情
|   |   |-- After.vue -- 售后
|   |   |-- Comment.vue -- 评价
|   |   |-- Evaluation.vue -- 推荐
|   |   |-- Graphic.vue -- 图文详情
|   |   |-- Parame.vue -- 参数
|   |   |-- Question.vue -- 问题
|   |   `-- Replylist.vue -- 回复
|   |-- evaluation -- 售后
|   |-- footer.vue -- 底部浮层
|   |-- knowledge
|   |-- list
|   |-- mine -- 会员中心组件
|   |   |-- Article.vue -- 我的文章
|   |   |-- CommentGoods.vue -- 我的商品评论
|   |   |-- CommentGoodsReply.vue -- 回复
|   |   |-- CommentOrdinary.vue -- 我的文章评论
|   |   |-- Editinfo.vue
|   |   |-- ElSex.vue
|   |   |-- Jarsclub.vue -- 酒坛诗社
|   |   |-- ListOne.vue
|   |   |-- ListTwo.vue
|   |   |-- SelectHead.vue
|   |   `-- elDate.vue
|   |-- noun
|   |-- nullData.vue
|   |-- order
|   |-- prove -- 认证组件
|   |   |-- ImageHandler.vue
|   |   |-- Major.vue -- 专业认证
|   |   |-- Media.vue -- 自媒体认证
|   |   `-- Office.vue -- 官方认证
|   |-- templates
|   |-- user
|   `-- winecenter
|-- layouts -- 布局文件
|   |-- default.vue -- 默认
|   |-- page-with-tabbar.vue -- 含有底部浮层页面
|   `-- page-with-user.vue -- 个人用户页面专用
|-- middleware -- 中间件（用于微信浏览器登录拦截）
|   `-- checkWxStatus.js
|-- nuxt.config.js -- 配置文件
|-- package-lock.json
|-- package.json
|-- pages -- view视图页面
|   |-- account
|   |-- address
|   |-- aftersale
|   |-- community
|   |-- compare
|   |-- coupon
|   |-- demo.vue
|   |-- detail -- 商品详情
|   |-- encys
|   |-- error.vue
|   |-- help
|   |-- home.vue -- 首页
|   |-- hotspot
|   |-- invoice
|   |-- knowledge
|   |-- message
|   |-- mine -- 会员中心
|   |-- missing.vue
|   |-- noun
|   |-- order -- 订单
|   |   |-- cart.vue -- 购物车
|   |   |-- detail.vue 订单详情
|   |   |-- evaluation -- 评价
|   |   |-- list.vue -- 列表
|   |   |-- logistics -- 物流
|   |   |-- result.vue -- 支付结果页
|   |   `-- submit.vue -- 下单页
|   |-- poetryedit
|   |-- product
|   |-- prove -- 会员认证页面
|   |-- search
|   |-- selection
|   |-- user -- 用户个人主页
|   `-- winecenter
|-- plugins -- 插件库
|   |-- axios.js
|   |-- common.js -- 通用
|   |-- filter.js
|   |-- lazyload.js
|   |-- nuxt-quill.js
|   |-- swiper.js
|   |-- toast.js
|   |-- upload.js
|   |-- vant.js
|   |-- vconsole.js
|   |-- vue-bus.js
|   `-- wechat.js
|-- private.config.js
|-- private.config.js - \270\261\261\276.example
|-- server
|   `-- index.js
|-- static
|   |-- favicon.ico
|   |-- flexible.js
|   `-- inertia.js
|-- store -- 状态管理
|   `-- index.js
`-- utils -- 工具库
    |-- city2.json
    |-- filters.js
    |-- middleware.js
    |-- request.js -- 请求封装
    |-- tools.js -- 工具函数
    |-- vuebus.js
    |-- wechat.js
    `-- wechatLogin.js -- 微信授权登录方法封装

```

## 关于nuxt服务端数据获取

```javascript

// nuxt定义了asyncData方法用于获取服务端数据
asyncData(req) {
  // 接口请求code...
  return {
    // 此处对象与vue中data()定义的对象一致
  }
}

```
其他写法就和vue一样，没什么区别，注意`asyncData()`方法只在`page`（视图页面）有效，组件无效

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## 接下来要做的事

```
1、移动端ui改版,让设计拉你进入蓝湖
  * 目前已改版的内容有：首页、消息中心页、选就中心列表页（部分）
  * 石墨文档有设计的排期 `https://shimo.im/sheet/LCfnIVSaHq8MNwjQ/njkv4`，开发计划是接上设计的排期进度，整体时间延后一周左右
2、与后端同事处理以及优化一些尚未发现的bug
3、接下来的二期工作

```
