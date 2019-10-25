/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:47:32
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-24 15:30:58
 */
import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 首页推荐页
      path: '/',
      redirect: '/recommend'
    },
    {
      // 推荐页
      path: '/recommend',
      component: Recommend
    },
    {
      // 排行页面
      path: '/rank',
      component: Rank
    },
    {
      // 搜索页面
      path: '/search',
      component: Search
    },
    {
      // 歌手页面
      path: '/singer',
      component: Singer,
      // 歌手子路由--歌手详情页面
      children: [
        {// 以id为变量,跳转不同路由
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
