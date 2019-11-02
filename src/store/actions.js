/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 16:06:26
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-02 13:56:17
 */
// 异步操作/ 对mutations的操作
// 对一系列的提交做封装
import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

function findindex(list, song) { // 返回对应的下标
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function({commit, state}, {list, index}) { // 正常点击接收歌曲数据，完成参数的设置
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) { // 如果是以random进来的，那么就需要改变歌曲的下标，以获取点击的正确的歌曲
    let randomlist = shuffle(list)
    commit(types.SET_PLAY_LIST, randomlist)
    index = findindex(randomlist, list[index])
  } else { // 正常进入模式
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const randomPlay = function ({commit}, {list}) { // 页面随机播放action
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomlist = shuffle(list) // 重新洗牌
  commit(types.SET_PLAY_LIST, randomlist) // 放入播放列表
  commit(types.SET_CURRENT_INDEX, 0) // 从随机列表的下标0开始播放
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
}