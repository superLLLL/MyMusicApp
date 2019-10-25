/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 16:05:38
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-24 16:52:38
 */
// 定义修改操作，mutation就是多个方法的集合
import * as types from './mutation-types'

const matutaions = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default matutaions
