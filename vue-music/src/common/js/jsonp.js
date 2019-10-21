/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:55:16
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-20 20:18:50
 */

/*jsonp跨越请求 */
import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  //为url加上?，并连接data
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (const key in data) {
    let value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }

  return url ? url.substring(1) : ''   //去&字符或直接返回一个空值
}