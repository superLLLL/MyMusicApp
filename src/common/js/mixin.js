/*
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-03 19:19:19
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-12 22:02:53
 */
// 多个组件中相同逻辑的js代码，导入到组件中，则同名覆盖，不同名直接用
// 此为结束scroll底部被mini播放器挡住，导致无法滚动到底部的问题
import {mapGetters, mapMutations, mapActions} from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

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

// 根据不同播放模式，返回不同icon样式
export const playerMixin = {
  computed: {
    // 当前播放模式
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playList',
      'mode'
    ])
  },
  methods: {
    changeMode() {
      // 当前播放模式的下一种，一共3种
      const mode = (this.mode + 1) % 3
      // 改变当前播放模式
      this.setMode(mode)
      let list = null
      // 如果当前播放模式为随机
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList) // 将原始播放列表随机排序
      } else { // 其他的情况下
        list = this.sequenceList
      }
      // 修改改变列表后的歌曲下标
      this.resetCurrentSongIndex(list)
      // 将当前模式相应的列表赋给播放列表
      this.setPlayList(list)
    },
    resetCurrentSongIndex(list) {
      let index = list.findIndex((item) => { // 返回匹配下标
        return item.id === this.currentSong.id
      })
      // 该过程会调用currentSong的watch的回调函数；因为currentSong是通过playList和currentIndex获得的
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlaying: 'SET_PLAYING', // 播放器播放/暂停
      setCurrentIndex: 'SET_CURRENT_INDEX', // 当前播放歌曲的index
      setMode: 'SET_MODE', // 歌曲的播放模式
      setPlayList: 'SET_PLAY_LIST' // 修改当前歌曲的播放列表
    })
  }
}

// mixin化搜索历史的js代码
export const searchMixin = {
  data() {
    return {
      query: '' // 存入搜索字符串
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    // 点击搜索热门后，将值输入到input
    setQuery(query) {
      // 将点击的热门搜索作为搜索字段传送到search-box
      this.$refs.searchBox.setQuery(query)
    },
    // 保存到localStorage
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    // 移动端键盘隐藏
    blurInput() {
      this.$refs.searchBox.blur()
    },
    // search-box传上来的搜索字符串query
    onQueryChange(query) {
      this.query = query
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  }
}
