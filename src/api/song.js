/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-02 14:15:32
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-06 13:26:37
 */
// 获取歌词请求
import { commonParams } from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, { // 参数
    '-': `MusicJsonCallback_lrc`, // web端
    // '_': '1572679856468',    // h5端
    pcachetime: +new Date(), // 时间戳
    songmid: mid,
    g_tk: 687381041,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 歌曲的vkey实时请求
export function getSongVkey(songmid) {
  const url = '/api/getSongVkey'
  let json = `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"1655946504","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1655946504","songmid":["${songmid}"],"songtype":[0],"uin":"1729792587","loginflag":1,"platform":"20"}},"comm":{"uin":1729792587,"format":"json","ct":24,"cv":0}}`

  const data = Object.assign({}, commonParams, {
    // '-': 'getplaysongvkey4909493728860954',
    g_tk: 5381,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
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