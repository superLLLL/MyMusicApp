/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:55:06
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-04 14:31:39
 */
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 1729792587,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  // const url = 'https://v1.itooi.cn/tencent/songList/category'
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {// 将所有的参数放入data
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  // return jsonp(url, data, options)

  // Promise 请求
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 推荐歌单的歌曲列表
export function getSongList(disstid) {
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const url = '/api/getSongList'

  const data = Object.assign({}, commonParams, {// 将所有的参数放入data
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: disstid,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    newdNewCode: 0
  })

  // Promise 请求
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
