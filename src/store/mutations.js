/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 16:05:38
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-13 19:47:21
 */
// 定义修改操作，mutation就是多个方法的集合
import * as types from './mutation-types'

// 播放器
// const player = new QMplayer()
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, list) {
    state.disc = list
  },
  [types.SET_TOPLIST](state, toplist) {
    state.topList = toplist
  },
  [types.SET_SONGMID](state, list) {
    state.songMid = list.mid
  },
  [types.SET_SEARCH_HISTORY](state, list) {
    state.searchHistory = list
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  }
}

export default mutations
