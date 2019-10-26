/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-25 18:11:19
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-26 11:31:05
 */

// 封装一个Song类
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
}
// 工厂方法就是不直接调用new，而是返回一个方法来创建对象
// 扩展工厂方法创建实例, 以便方法复用   songid和ablum是必须要的
export function createSong(musicData, songVkey) {
  return new Song({ // 抽象一层，代码更少
    id: musicData.songInfo.ksong.id, // 歌的id
    // mid: musicData.songInfo.ksong.mid,
    mid: musicData.songInfo.file.media_mid, // 歌的mid
    singer: filterSinger(musicData.songInfo.singer), // 歌手名
    name: musicData.songInfo.name, // 歌名
    album: musicData.songInfo.album.name, // 专辑名
    duration: musicData.songInfo.interval, // 歌曲时长
    // 歌曲图片地址：300M000+musicData.songInfo.album.mid
    // 歌曲播放地址：C400+musicData.songInfo.file.media_mid 还有一个重要的token数据 v-key
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.songInfo.album.mid}.jpg?max_age=2592000`,
    // url: `https://thirdparty.gtimg.com/${musicData.songInfo.ksong.id}.m4a?fromtag=38`
    url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songInfo.file.media_mid}.m4a?guid=3110397877&vkey=${songVkey}&uin=2635&fromtag=38`
  })
}

// 取出singer名
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(element => {
    ret.push(element.name)
  })
  return ret.join('/')
}