/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-20 20:04:04
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-30 14:18:26
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
export function getSingerDetail(SingerId) {
  // 做个‘假’数据求歌手的详细数据，主要原因是没找到接口
  let id = [
    {
      info: `getSingerSong0787374812110675`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"0025NhlN2yWrP4","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    },
    {
      no: `getSingerSong35798460168901736`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"001fNHEf1SFEFN","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    },
    {
      no: `getSingerSong8756571711650025`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"002J4UUk29y8BY","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    },
    {
      no: `getSingerSong1355237444170898`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"000CK5xN3yZDJt","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    },
    {
      no: `getSingerSong29277003040162497`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"001BLpXF2DyJe2","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    },
    {
      no: `getSingerSong4434121623535807`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"002vALgR3hRRlv","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    },
    {
      no: `getSingerSong6430463659541157`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"000aHmbL2aPXWH","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    },
    {
      no: `getSingerSong9856942762633942`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"004V53Ga0bV65j","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    },
    {
      no: `getSingerSong6984505321813435`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"001JDzPT3JdvqK","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    },
    {
      no: `getSingerSong696461180859741`,
      data: `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"003Nz2So3XXYek","begin":0,"num":10},"module":"musichall.song_list_server"}}`
    }
  ]
  const url = '/api/getSingerDetail'
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    '-': id[SingerId].info,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: id[SingerId].data
  })

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取歌曲的信息，v-key axios请求代理接口
// export function getMusicKey(songMid) {
//   const url = `/api/getMusicKey`
//   const data = Object.assign({}, commonParams, {
//     songmid: songMid,
//     guid: 3110397877,
//     fromtag: 38,
//     uid: 2635,
//     data: `{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"9244517832","songmid":["001Qu4I30eVFYb"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`
//   })

//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }

// h5版本qq音乐jsonp接口 v-key
export function getMusicKey(songMid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
    loginUin: 3051522991,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 3051522991,
    guid: 5931742855,
    songmid: songMid,
    filename: `C400${songMid}.m4a`
  })
  return jsonp(url, data, options)
}

export function getLocalMusic(songMid) {
  const url = 'http://localhost:3000/getLocalMusic'
  const data = {
    mid: '123'
  }
  return jsonp(url, data, options)
}