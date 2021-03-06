/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-21 20:17:58
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-08 12:13:36
 */
// export default class Singer {
//   constructor({id, name}) {
//     this.id = id
//     this.name = name
//     this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
//   }
// }

export default class Singer {
  constructor({id, name, index, mid}) {
    this.id = id
    this.name = name
    this.no = index
    this.mid = mid
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`
  }
}