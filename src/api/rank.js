/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-04 19:17:59
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-04 19:39:37
 */
// 排行榜的歌曲请求
// import jsonp from 'common/js/jsonp'
// import { options } from './config'
import axios from 'axios'

export function getTopList() {
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  // const data = Object.assign({}, {
  //   '-': 1572866041104,
  //   data: `{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0},"topList":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}}`
  // })

  // return jsonp(url, data, options)

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