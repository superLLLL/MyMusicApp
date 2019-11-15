/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:47:32
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-15 12:54:33
 */
import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from 'components/recommend/recommend'
// import Rank from 'components/rank/rank'
// import Search from 'components/search/search'
// import Singer from 'components/singer/singer'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import Disc from 'components/disc/disc'
// import TopList from 'components/top-list/top-list'
// import UserCenter from 'components/user-center/user-center'

Vue.use(Router)

// 路由懒加载
// const Recommend = (resolve) => {
//   import('components/recommend/recommend').then((module) => {
//     resolve(module)
//   })
// }

const Recommend = () => import(/* webpackChunkName: Recommend */ 'components/recommend/recommend')
const Rank = () => import(/* webpackChunkName: Rank */ 'components/rank/rank')
const Search = () => import(/* webpackChunkName: Search */ 'components/search/search')
const Singer = () => import(/* webpackChunkName: Singer */ 'components/singer/singer')
const SingerDetail = () => import(/* webpackChunkName: SingerDetail */ 'components/singer-detail/singer-detail')
const Disc = () => import(/* webpackChunkName: Disc */ 'components/disc/disc')
const TopList = () => import(/* webpackChunkName: TopList */ 'components/top-list/top-list')
const UserCenter = () => import(/* webpackChunkName: UserCenter */ 'components/user-center/user-center')

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
      component: Recommend,
      children: [ // 推荐页子路由
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      // 排行页面
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
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
    },
    {
      // 搜索页面
      path: '/search',
      component: Search,
      children: [
        {// 以id为变量,跳转不同路由
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      // 用户中心页
      path: '/user',
      component: UserCenter
    }
  ]
})
