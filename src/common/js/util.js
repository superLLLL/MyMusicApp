/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-02 10:02:52
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-02 13:55:19
 */
// 洗牌函数
function getRandomInt(min, max) { // 获得范围内的随机数
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr) { // 随机交换位置
  let _arr = arr.slice() // 快捷创建副本，以免影响arr的地址内容
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}