/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-20 20:04:04
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-22 13:39:57
 */

//  获取歌手名单
import jsonp from 'common/js/jsonp'
import { commonParams, options} from './config'
import axios from 'axios'

export function getSingerList() {
  // const url = "https://c.y.qq.com/v8/fcg-bin/v8.fcg"
  // const url = "/api/getSingerListTwo"
  const url = '/api/getSingerList'

  // const data = Object.assign({}, commonParams, {
  //   channel: 'singer',
  //   page: 'list',
  //   key: 'all_all_all',
  //   pagesize: 100,
  //   pagenum: 1,
  //   g_tk: 5381,
  //   loginUin: 0,
  //   hostUin: 0,
  //   format: 'json',
  //   notice: 0,
  //   platform: 'yqq',
  //   needNewCode: 0
  // })
  // return jsonp(url, data, options)
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    notice: 0,
    needNewCode: 0,
    data: {"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
