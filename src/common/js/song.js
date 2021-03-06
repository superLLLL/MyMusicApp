/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-25 18:11:19
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-14 21:36:23
 */

// 封装一个Song类
import { getLyric, getSongVkey} from 'api/song' // 歌词请求
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

export default class Song { // 创建一个Song对象
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getSongVkey() {
    if (this.songKey) {
      return Promise().resolve(this.songKey)
    }
    return new Promise ((resolve, reject) => {
      getSongVkey(this.mid).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
          // this.songKey = res.req.data.
        }
      })
    })
  }
  getLyric() { // 将获取歌词方法封装在song中，不在构造函数中，而是作为公共方法
    if (this.lyric) { // 如果有歌词的就不在重新请求了，返回promise对象
      return Promise().resolve(this.lyric) // getLyrc本身就返回的是promise所以这个函数的返回值都要是promise
    }
    return new Promise((resolve, reject) => { // getLric就是个异步回调，所以也要promise
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric) // Base64解析json数据
          resolve(this.lyric)
        } else {
          reject("no lyric")
        }
      })
    })
  }
}
// 工厂方法就是不直接调用new，而是返回一个方法来创建对象
// 扩展工厂方法创建实例, 以便方法复用   songid和ablum是必须要的
export function createSong(musicData) {
  return new Song({ // 抽象一层，代码更少
    id: musicData.ksong.id, // 歌的id
    mid: musicData.mid,
    // mid: musicData.file.media_mid, // 歌的mid
    singer: filterSinger(musicData.singer), // 歌手名
    name: musicData.name, // 歌名
    album: musicData.album.name, // 专辑名
    duration: musicData.interval, // 歌曲时长
    // 歌曲图片地址：300M000+musicData.album.mid
    // 歌曲播放地址：C400+musicData.file.media_mid 还有一个重要的token数据 v-key
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    // url: `http://isure.stream.qqmusic.qq.com/C400${musicData.mid}.m4a?${songkey}`
    url: `http://isure.stream.qqmusic.qq.com/C400${musicData.mid}.m4a?guid=1655946504&vkey=7F17DD5D8E3F28CFD7C3BAE2E6A043430E36542DEEB8B86F7351206B7E2590B0A291763A227EAEE8F05A2F7B534EC7BC8F79EAFFF72FD156&uin=2635&fromtag=66`
  })
}
export function createSongAddSong(musicData) {
  return new Song({ // 抽象一层，代码更少
    id: musicData.id, // 歌的id
    mid: musicData.mid,
    // mid: musicData.file.media_mid, // 歌的mid
    singer: musicData.singer, // 歌手名
    name: musicData.name, // 歌名
    album: musicData.album, // 专辑名
    duration: musicData.duration, // 歌曲时长
    // 歌曲图片地址：300M000+musicData.album.mid
    // 歌曲播放地址：C400+musicData.file.media_mid 还有一个重要的token数据 v-key
    image: musicData.image,
    url: musicData.url
  })
}

// 取出singer名
export function filterSinger(singer) { // 将singer数组转换成字符串
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(element => {
    ret.push(element.name)
  })
  return ret.join('/')
}