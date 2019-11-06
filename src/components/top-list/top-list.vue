<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-05 18:51:21
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-06 13:38:10
 -->
<template>
  <transition name="slide">
    <music-list :rank="rank" :title="getTitle" :bgImg="getBgimg" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getTopListSong } from 'api/rank'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: [], // 歌曲属性，预计传入music-list
      rank: true // 排行榜效果
    }
  },
  computed: {
    ...mapGetters([ // 映射topList属性，因为多值依赖于他，所以写在computed中
      'topList'
    ]),
    getTitle() { // 返回标题名
      return this.topList.AdShareContent
    },
    getBgimg() {  // 返回背景图片
      return this.topList.mbFrontPicUrl
    }
  },
  created() {
    this._getTopListSong()
  },
  methods: {
    getTime() { // 向歌曲请求中传入时间
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      let nowDate = year + "-" + month + "-" + day;
      return nowDate
    },
    _getTopListSong() { // 请求歌曲数据
      if (!this.topList.topId) { // 没正常进入，则return
        this.$router.back()
        return
      }
      let time = this.getTime()
      getTopListSong(this.topList.topId, time).then((res) => { // 异步请求数据
        if (res.code === ERR_OK) {
          // console.log(res.detail.data);
          this.songs = this._normalizeSongs(res.detail.data.songInfoList)
          // console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) { // 格式化数据
      let ret = []
      list.forEach(element => {
        ret.push(createSong(element))
      });
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease 
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>