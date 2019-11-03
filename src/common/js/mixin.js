/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-03 19:19:19
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-03 19:35:38
 */
// 多个组件中相同逻辑的js代码，导入到组件中，则同名覆盖，不同名直接用
// 此为结束scroll底部被mini播放器挡住，导致无法滚动到底部的问题
import {mapGetters} from 'vuex'

export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal)
    }
  },
  methods: {
    handlePlayList() { // 如果导入到的组件没有该事件，则扔出错误
      throw new Error('commponent must implement handlePlayList methods')
    }
  }
}