/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:55:16
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-19 18:40:09
 */
export function addClass(el, classname){
  if(hasClass(el, classname)){
    return
  }
  /**打散classname 名，并加入新名*/
  let nameList = el.className.split(' ')   
  nameList.push(classname)
  el.className = nameList.join(' ')
}

export function hasClass(el, classname){
  let reg = new RegExp('(^|\\s)'+classname+'(\\s|$)')
  return reg.test(el.classname)
}
