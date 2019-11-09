/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 16:04:51
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-09 10:23:45
 */
// vuex 状态

import { playMode } from 'common/js/config'
import { loadStorage } from 'common/js/cache'
const state = {
  singer: {}, // 歌手信息
  playing: false, // 播放器的播放和暂停
  fullScreen: false, // 播放器的展开和收起
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表/原始列表
  mode: playMode.sequence, // 语义化的方式去设置播放模式
  currentIndex: -1, // 当前播放的索引
  disc: {}, // 当前被点击的歌单的信息
  topList: {}, // 榜单详情数据
  songMid: 0, // 当前歌曲的编号
  searchHistory: loadStorage() // 搜索历史,从本地缓存获取
}

export default state