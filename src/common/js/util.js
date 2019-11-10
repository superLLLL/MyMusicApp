/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-02 10:02:52
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-08 20:11:48
 */
// 洗牌函数
function getRandomInt(min, max) { // 获得范围内的随机数
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 随机交换位置
export function shuffle(arr) {
  // 快捷创建副本，以免影响arr的地址内容
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 节流函数
// 利用carry，没进行一次函数的调用都会先判断是否有计时器，有就先清除计时器；所以在执行中，只会存在一个计时器，即只会有一次fun被正常执行，触发delay时间比你触发它的时间要短
export function onbounce(fun, delay) {
  // 绑定计时器
  let timer

  return function (...args) {
    // 只要上一次计时还在，就清除
    if (timer) {
      clearTimeout(timer)
    }
    // 每次都会先执行计时
    timer = setTimeout(() => {
      fun.call(this, ...args)
    }, delay)
  }
}