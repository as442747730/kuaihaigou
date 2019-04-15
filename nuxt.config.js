const config = require('./private.config')
// const resolve = require('path').resolve

module.exports = {
  server: {
    host: '0.0.0.0'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'keyword', content: '' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
      { name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '' }
    ],
    script: [
      {src: '/flexible.js'}
    ]
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],
  axios: { proxy: true },
  proxy: {
    '/api': config.target
  },
  plugins: [
    { src: './plugins/swiper.js' },
    { src: './plugins/lazyload.js', ssr: false },
    // { src: './plugins/wechat.js', ssr: false },
    { src: './plugins/vant.js', ssr: true },
    { src: './plugins/vue-bus.js', ssr: true },
    { src: './plugins/vconsole.js', ssr: false },
    { src: './plugins/filter.js', ssr: true },
    { src: './plugins/upload.js', ssr: true },
    { src: './plugins/nuxt-quill.js', ssr: true },
    { src: './plugins/common.js', ssr: false }
  ],
  css: [
    { src: './assets/css/normalize.css', lang: 'css' },
    { src: './assets/css/main.less', lang: 'less' },
    { src: './assets/css/transition.css', lang: 'css' }
  ],
  styleResources: { less: './assets/css/var.less' },
  router: {
    // base: config.baseUrl,
    scrollBehavior (to, from, savedPosition) {
      // return { x: 0, y: 0 }
    }
    // extendRoutes (routes) {
    //   routes.push({
    //     path: '/',
    //     component: resolve(__dirname, 'pages/home.vue')
    //   })
    // }
  },
  env: {
    pcDomain: config.pcDomain
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['ios >= 8']
          },
          corejs: 2,
          useBuiltIns: 'usage'
        }]
      ],
      plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']
    },

    extend (config, ctx) {
      if (ctx.isClient) {
        config.resolve.alias['vue'] = 'vue/dist/vue.js'
      }
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
      // if (!ctx.isDev && !ctx.isClient) {
      //   config.plugins.push(
      //     new webpack.optimize.UglifyJsPlugin({
      //       compress: {
      //         warnings: false,
      //         drop_debugger: true,
      //         drop_console: true
      //       }
      //     })
      //   )
      // }
    },
    postcss: [
      require('postcss')(),
      require('postcss-pxtorem')({
        rootValue: 37.5,
        propList: ['*']
      }),
      require('autoprefixer')({
        browsers: [
          'last 4 versions',
          'ios >= 7',
          'android >= 4.1'
        ]
      })
    ]
  }
}
