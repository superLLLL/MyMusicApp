/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-20 20:04:04
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-08 12:10:36
 */

//  获取歌手名单 使用代理
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

// 获取歌手菜单
export function getSingerList() {
  // const url = "https://c.y.qq.com/v8/fcg-bin/v8.fcg"
  // const url = "/api/getSingerListTwo"
  const url = '/api/getSingerList'
  let little = `{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}`
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    notice: 0,
    needNewCode: 0,
    data: little
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 歌手详情
export function getSingerDetail(singermid) {

  let json = `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"${singermid}","begin":0,"num":10},"module":"musichall.song_list_server"}}`

  const url = '/api/getSingerDetail'
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    // '-': id[SingerId].info,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: encodeURIComponent(json)
  })

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getLocalMusic(songMid) {
  const url = 'http://localhost:3000/getLocalMusic'
  const data = {
    mid: '123'
  }
  return jsonp(url, data, options)
}