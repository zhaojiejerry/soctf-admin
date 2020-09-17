'use strict'

const path = require('path')
const devEnv = require('./dev.env')
const prodEnv = require('./prod.env')

module.exports = {
  dev: {
    env: devEnv,
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: devEnv.BASE_URL,
    proxyTable: {
      // 本地模拟数据接口
      // '/api': {
      //   target: 'http://localhost:3000/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/api' // /api or /
      //   }
      // }
      //李政接口
      // '/api': {
      //   target: 'http://192.168.11.58:8097/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/api' // /api or /
      //   }
      // }
      // 测试环境接口 账号admin 密码123456
      // '/api': {
      //   target: 'http://172.16.1.145:8097/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/'
      //   }
      // }

      // 孙松接口 账号admin 密码123456
      // '/api': {
      //   target: 'http://192.168.10.110:8097/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/'
      //   }
      // }
      // 少宇接口 账号admin 密码123456
      // '/api': {
      //   target: 'http://192.168.11.142:8097/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/'
      //   }
      // }
      //开发测试环境接口 账号admin 密码123456
      '/api': {
        target: 'http://192.168.11.111:8097/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
      //马辉接口
      // '/api': {
      //   target: 'http://192.168.11.126:8097/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/'
      //   }
      // }
    },

    // Various Dev Server settings
    // host: '0.0.0.0', // can be overwritten by process.env.HOST
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9528, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development [cheap-module-source-map]
    devtool: 'source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    env: prodEnv,
    // Template for index.html
    index: path.resolve(__dirname, '..' + prodEnv.BASE_URL + 'index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '..' + prodEnv.BASE_URL.slice(0, -1)),
    assetsSubDirectory: 'static',
    assetsPublicPath: prodEnv.BASE_URL,

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
