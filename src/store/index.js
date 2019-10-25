/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 16:04:46
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-24 16:50:43
 */
// vuex 入口初始化
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import State from './state'
import Mutations from './mutations'
// Log跟git什么的差不多就是修改了state得到其修改日志
import createLogger from 'vuex/dist/logger'
// 注册vuex
Vue.use(Vuex)
// vuex内置调试工具，可以帮助检测对state的修改是不是通过mutation修改的，如果不是则会报错
// 如果我们是线下调式（npm run dev）则值为'dev'，如果是（npm run build）则是'production'环境
const debug = process.env.NODE_ENV !== 'production'
// 导出实例（相当于单例模式）
export default new Vuex.Store({
  actions,
  getters,
  State,
  Mutations,
  // 线下调式开启严格模式，它会检测你的mutation修改是不是来源于commit mutation，不是就会警告，上线即可关闭
  strick: debug,
  plugins: debug ? [createLogger()] : []
})