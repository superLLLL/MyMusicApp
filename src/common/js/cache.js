/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-09 08:45:25
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-09 09:46:26
 */
// storage相关缓存逻辑

import storage from 'good-storage'
// 为每一个存储都定义一个key
const SEARCH_KEY = '__search__' // 双下划线，与外部冲突很小，一般内部使用
const MAX_LENGTH = 15 // 历史记录的最大长度

function insertArray(arr, val, compare, maxlen) {
  // findIndex可以使用函数字面量当回调函数使用；这样从外部传来的函数大大提高了函数的复用性
  const index = arr.findIndex(compare)
  // 如果找到了，且在第一个位置,则正常返回
  if (index === 0) {
    return
  }
  // 如果找到了，且在中间部分，则删除
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 将val从头插入
  arr.unshift(val)
  // 保证arr的长度小于限制长度
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}
export function saveSearch(query) {
  // 获得 search的缓存数组，没有的话就为[]
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, MAX_LENGTH)
  // 再存进去
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadStorage() {
  return storage.get(SEARCH_KEY, [])
}