/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-04 19:17:59
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-05 21:56:00
 */
// 排行榜的歌曲请求
// import jsonp from 'common/js/jsonp'
import { commonParams } from './config'
import axios from 'axios'

export function getTopList() {
  const url = '/api/getTopList'

  const data = Object.assign({}, {
    '-': 1572866041104,
    data: `{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0},"topList":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}}`
  })
  // Promise 请求
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getTopListSong(topId, time) {
  const url = '/api/getTopListSong'
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  let json = `{"detail":{"module":"musicToplist.ToplistInfoServer","method":"GetDetail","param":{"topId":"${topId}","offset":0,"num":20,"period":"${time}"}},"comm":{"ct":24,"cv":0}}`

  // json = json.replace(/\:/g, '%3A').replace(/\,/g, '%2C')

  const data = Object.assign({}, commonParams, {
    '-': 'getUCGI9036582388927192',
    g_tk: 5381,
    hostUin: 0,
    loginUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: json
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}