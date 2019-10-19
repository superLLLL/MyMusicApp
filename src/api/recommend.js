/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:55:06
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-18 20:11:56
 */
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getRecommend(){
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 1729792587,
    needNewCode: 1
  })


  return jsonp(url, data, options)
}


