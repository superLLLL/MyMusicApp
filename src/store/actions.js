/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 16:06:26
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-13 19:57:42
 */
// 异步操作/ 对mutations的操作
// 对一系列的提交做封装
import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'

// 返回song在list中对应的下标
function findindex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

// 正常点击接收歌曲数据，完成参数的设置
export const selectPlay = function ({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  // 如果是以random进来的，那么就需要改变歌曲的下标，以获取点击的正确的歌曲
  if (state.mode === playMode.random) {
    let randomlist = shuffle(list)
    commit(types.SET_PLAY_LIST, randomlist)
    index = findindex(randomlist, list[index])
  } else { // 正常进入模式
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
  commit(types.SET_SONGMID, list[index])
}

// 页面随机播放action
export const randomPlay = function ({ commit }, { list }) {
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomlist = shuffle(list) // 重新洗牌
  // 放入播放列表
  commit(types.SET_PLAY_LIST, randomlist)
  // 从随机列表的下标0开始播放
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
}

// 为当前即将播放的歌曲排序
export const insertSong = function ({ commit, state }, song) { // song为当前歌曲
  // 如果是对象或者数组需要地址来应用内容的要使用副本，否则可以出现问题；之后都修改副本，就不会影响到原始数据
  let playList = state.playList
  let sequenceList = state.sequenceList
  let currentIndex = state.currentIndex
  // 记录当前歌曲(要被删除的歌曲)
  let currentSong = playList[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findindex(playList, song)
  // 因为是插入歌曲所以currentIndex + 1
  currentIndex++
  // 插入这首歌到当前索引位置
  playList.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌，那么就要把这首歌删除
  if (fpIndex > -1) {
    // 如果当前插入的序号大于我们之前列表中的序号
    if (currentIndex > fpIndex) {
      // 直接已有的歌曲删除
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      // 将已有歌曲的下标加1再删，所以插入新歌曲时，导致已有歌曲向后移动，所以加1
      playList.splice(fpIndex + 1, 1)
    }
  }

  // 获取当前歌曲需要插入到sequenceList中的索引

  // 找到要插入歌曲的下标，因为不改变正在播放的歌曲，所以加1
  let currentSIndex = findindex(sequenceList, currentSong) + 1
  // 查找是否存在歌曲
  let fsIndex = findindex(sequenceList, song)
  // 剩下的都差不多
  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  // 以下state值设置不能省略，是播放歌曲的关键信息
  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const saveSearchHistory = function ({commit}, query) { // query为当前搜索的内容
  // 将经过缓存的数据添加到searHistory中
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 先将query从storage中删除，再存入state中的searchHistory
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 先将storage中的内容清除,再存入state中的searchHistory
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// play-list中删除单个歌曲的action
export const deleteSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 将playList中的歌曲删除
  let pIndex = findindex(playList, song)
  playList.splice(pIndex, 1)
  // 将sequence中的歌曲删除
  let sIndex = findindex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  /* 有两种情况下，currentIndex是需要 -1 的；
    1： 当被删除歌曲下标是在currentIndex之前，则需要将currentIndex -1
    2： 当currentIndex就是数组的最后一个时，肯定会 -1，防止pindex === currentIndex的情况
  */
  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--
  }

  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  // 当列表中被删完时，需要将播放状态清空
  // if (!playList.length) {
  //   commit(types.SET_PLAYING, false)
  // } else {
  //   // 保证在删除时，歌曲是播放状态的
  //   commit(types.SET_PLAYING, true)
  // }
  // 简化
  let playingstate = playList.length > 0
  commit(types.SET_PLAYING, playingstate)
}

// play-list的清空列表
export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAY_LIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, [])
  commit(types.SET_PLAYING, false)
}

// 保存歌曲到playHistory中 （播放历史）
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

// 添加我的喜欢
export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}
// 从我的喜欢中删除
export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
