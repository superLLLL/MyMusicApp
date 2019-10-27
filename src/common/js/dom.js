/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:55:16
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-27 20:02:52
 */
export function addClass(el, classname) {
  if (hasClass(el, classname)) {
    return
  }
  /* 打散classname 名，并加入新名 */
  let nameList = el.className.split(' ')
  nameList.push(classname)
  el.className = nameList.join(' ')
}

export function hasClass(el, classname) {
  let reg = new RegExp('(^|\\s)' + classname + '(\\s|$)')
  return reg.test(el.classname)
}

// 浏览器检测： 能力检测
let elementstyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    standard: 'transform',
    webkit: 'webkitTransform',
    ms: 'msTransform',
    o: 'OTransform',
    Moz: 'MozTransform'
  }

  for (const key in transformNames) { // 判断是否有满足的方法
    if (elementstyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) { // 暴露方法
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }

  // 正则css属性转驼峰
  style = style.replace(/-(\w)/g, ($1, $0) => {
    return $1.toUpperCase()
  }).replace('-', '')
  // 字符串的拼接
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
