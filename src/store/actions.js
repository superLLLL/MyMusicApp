/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 16:06:26
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-08 19:28:56
 */
// 异步操作/ 对mutations的操作
// 对一系列的提交做封装
import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

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
export const insertSong = function ({ commit, state }, song) {
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