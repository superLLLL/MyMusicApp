/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 16:04:51
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-28 13:14:21
 */
// vuex 状态

import {playMode} from 'common/js/config'
const state = {
  singer: {},
  playing: false, // 播放器的播放和暂停
  fullScreen: false, // 播放器的展开和收起
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 语义化的方式去设置播放模式
  currentIndex: -1 // 当前播放的索引
}

export default state