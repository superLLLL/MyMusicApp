<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-05 18:51:21
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-05 20:06:12
 -->
<template>
  <transition name="slide">
    <music-list :title="getTitle" :bgImg="getBgimg"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getTopListSong } from 'api/rank'
import { ERR_OK } from 'api/config'

export default {
  computed: {
    ...mapGetters([
      'topList'
    ]),
    getTitle() {
      return this.topList.AdShareContent
    },
    getBgimg() {
      return this.topList.mbFrontPicUrl
    }
  },
  created() {
    this._getTopListSong()
  },
  methods: {
    getTime() {
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
      console.log(nowDate);
      return nowDate
    },
    _getTopListSong() {
      let time = this.getTime()
      getTopListSong(this.topList.topId, time).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res);
        }
      })
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