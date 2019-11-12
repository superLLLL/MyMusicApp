/*
//  * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 16:07:04
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-12 11:10:26
 */
// 包装state的数据，可以去出去
export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => { // 返回歌曲，如果没有就返回空
  return state.playList[state.currentIndex] || {}
}
export const disc = state => state.disc
export const topList = state => state.topList
export const songMid = state => state.songMid
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory