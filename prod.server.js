/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-15 10:25:13
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-15 11:03:42
 */
// 做一个node服务来启动 项目
var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var app = express()

app.use(express.static('./dist'))

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

// 获取搜索的热门推荐
app.get('/api/search', function(req, res) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/search.html/',
      host: 'c.y.qq.com',
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e);
  })
})

var port = process.env.PORT || config.build.port
module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return 
  }
  console.log('Listening at http:localhot:' + port +'\n');
})