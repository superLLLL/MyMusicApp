/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:47:32
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-15 18:24:11
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

import 'common/stylus/index.styl'
import Router from 'vue-router'
// 在移动端使用console.log()方法
/* eslint-disable no-unused-vars */
import VConsole from 'vconsole'

// let vconsole = new VConsole()
// Vue.use(vconsole)

// console.log('test')

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

fastclick.attach(document.body)// 取消原生点击300ms的延迟
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png') /** 此为默认未加载图片之前，显示的图片 */
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  // 路由表一定要放在最下面
  router

})
