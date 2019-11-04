/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:55:06
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-04 19:27:19
 */

//  qq音乐公共接口参数
export const commonParams = {
  g_tk: 687381041,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp',
  uin: '1729792587'
}
// jsonp跨越用callback
export const options = {
  param: 'jsonpCallback'
}
// 公共接口真正使用返回参数
export const ERR_OK = 0