/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:47:32
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-06 12:16:26
 */
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const axios = require('axios')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {   //新版本添加代理 
      app.get('/api/getDiscList', function(req, res){  // 歌单数据代理请求
        // let url = 'https://v1.itooi.cn/tencent/songList/hot'
        let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url, {  
          headers: {
            referer: 'https://y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e);
        })
      })

      // 歌手数据代理请求
      app.get('/api/getSingerList', function(req, res) {
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/portal/singer_list.html',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e);
        })
      })

      // 歌手详情代理请求
      app.get('/api/getSingerDetail', function(req, res) {
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/n/yqq/singer/',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e);
        })
      })

      // 歌曲信息请求代理
      app.get('/api/getMusicKey', function (req, res) {
        var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          var ret4 = response.data
          if (typeof ret4 === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var matche = ret4.match(reg)
            if (matche) {
              ret4 = JSON.parse(matche[1])
            }
          }
          res.json(ret4)
        }).catch((e) => {
          console.log(e)
        })
      }) 

      // 歌词请求
      app.get('/api/lyric', function(req, res) {
        let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        // let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            // referer: 'https://i.y.qq.com/v8/playsong.html?songmid=004dFFPd4JNv8q/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          // 防止返回的数据仍为jsonp
          // var ret = response.data
          // if (typeof ret === 'string') { // 如果返回的是string 即 jsonp 的数据
          //   var reg = /^\w+\(({[^()]+)\)}$/ // 使用正则只取出有用的信息
          //   var matches = ret.match(reg)
          //   if (matches) {
          //     ret = JSON.parse(matches[1])
          //   }
          // }
          // res.json(ret)
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      
      // 推荐页歌单歌曲请求
      app.get('/api/getSongList', function(req, res) {
        let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/n/yqq/playlist/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 排行榜信息请求
      app.get('/api/getTopList', function(req, res) {
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/m/index.html?tab=toplist/',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 排行榜歌曲信息
      app.get('/api/getTopListSong', function(req, res) {
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/n/yqq/toplist/',
            host: 'u.y.qq.com',
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 获取歌曲vkey
      app.get('/api/getSongVkey', function(req, res) {
        let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/portal/player.html/',
            host: 'u.y.qq.com',
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e);
        })
      })
      
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
