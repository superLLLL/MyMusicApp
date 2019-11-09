/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-02 14:15:32
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-02 16:00:10
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
    loginUin: 1729792587,
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