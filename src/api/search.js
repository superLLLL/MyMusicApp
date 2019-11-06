/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-06 15:27:36
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-06 19:36:23
 */
// 请求搜索热门
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 1729792587,
    inCharset: 'utf8',
    platform: 'yqq.json'
  })
  return jsonp(url, data, options)
}

// 获取搜索数据
// query: 搜索字段； page: 第几页； zhida：是否跳转到歌手
export function search(query, page, zhida) {
  // const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
  const url = '/api/search'

  const data = Object.assign({}, commonParams, {
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    remoteplace: 'txt.yqq.song',
    // searchid: 64541504417068611,
    t: 0,
    aggr: 1,
    cr: 1,
    catZhida: zhida ? 1 : 0, // 是否直达
    lossless: 0,
    flag_qc: 0,
    p: page, // 页号
    n: 10,
    w: query, // 请求字段
    g_tk: 5381,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json'
  })

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
