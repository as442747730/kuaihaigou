const webpack = require('webpack')
const config = require('./private.config')
const resolve = require('path').resolve

module.exports = {
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
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      { rel: 'icon', type: 'image/x-icon', href: '' }
    ],
    script: [
      {src: '/flexible.js'}
    ]
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
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
    { src: './plugins/filter.js', ssr: true }
  ],
  css: [
    { src: './assets/css/normalize.css', lang: 'css' },
    { src: './assets/css/main.less', lang: 'less' },
    { src: './assets/css/transition.css', lang: 'css' }
  ],
  router: {
    // base: config.baseUrl,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes (routes) {
      routes.push({
        path: '/',
        component: resolve(__dirname, 'pages/home.vue')
      })
    }
  },
  env: {
    pcDomain: config.pcDomain
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets: ['es2015', 'stage-0'],
      plugins: [['transform-runtime', {
        'helpers': false,
        'polyfill': true,
        'regenerator': true,
        'moduleName': 'babel-runtime'
      }]]
    },
    /*
    ** 生产环节去除控制台信息
    */
    // plugins: [
    //   new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //       warnings: false,
    //       drop_debugger: true,
    //       drop_console: true
    //     }
    //   })
    // ],
    /*
    ** Run ESLint on save
    */

    // 引入全局 less 变量文件， 详细参见 https://github.com/nuxt/nuxt.js/tree/dev/examples/style-resources
    styleResources: {
      less: './assets/css/var.less'
    },

    extend (config, ctx) {
      if (ctx.isClient) {
        config.resolve.alias['vue'] = 'vue/dist/vue.js'
      }
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (!ctx.isDev && !ctx.isClient) {
        config.plugins.push(
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          })
        )
      }
    },
    vendor: ['axios', './utils/request.js', './static/flexible.js'],
    // flexible结合使用，px2rem
    postcss: [
      require('postcss')(),
      require('postcss-pxtorem')({
        rootValue: 37.5,
        propList: ['*']
      }),
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    // 过渡动画
    transition: {
      name: 'page',
      mode: 'out-in',
      beforeEnter (el) {
        console.log('Before enter...')
      }
    },
    cache: true, // 设置缓存
    // publicPath: 'https://cdn.nuxtjs.org', // 当运行 nuxt build 时，.nuxt/dist/ 目录内的内容会被上传至指定的 CDN 路径。
    loaders: [
      [
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'url-loader',
          query: {
            limit: 1000, // 1KO
            name: 'img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 1000, // 1 KO
            name: 'fonts/[name].[hash:7].[ext]'
          }
        },
        // {
        //   test: /\.scss$/,
        //   use: [
        //     { loader: "style-loader" }, // creates style nodes from JS strings
        //     { loader: "css-loader" }, // translates CSS into CommonJS
        //     { loader: 'sass-loader', options: { sourceMap: true } } // compiles Sass to CSS
        //   ]
        // },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' }, // creates style nodes from JS strings
            { loader: 'css-loader' }, // translates CSS into CommonJS
            { loader: 'less-loader' } // compiles Less to CSS
          ]
        }
      ]
    ]
  },
  render: {
    resourceHints: false // 解决 nuxt 加载 prefetch js
  }
}
