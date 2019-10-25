/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-20 20:04:04
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-25 16:42:57
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
  console.log(id[SingerId])
  const url = '/api/getSingerDetail'
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    "-": id[SingerId].info,
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